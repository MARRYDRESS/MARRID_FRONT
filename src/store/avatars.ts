"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/src/lib/supabase";
import type { User } from "@supabase/supabase-js";

export type StoredAvatar = {
  id: string;
  imageSrc: string;
  createdAt: number;
};

const LS_AVATARS = "marrid_avatars";
const LS_CURRENT = "marrid_current_avatar_id";
const LS_MIGRATED = "marrid_avatars_migrated"; // 마이그레이션 중복 방지 플래그

export function useAvatars() {
  const [avatars, setAvatars] = useState<StoredAvatar[]>([]);
  const [currentAvatarId, setCurrentAvatarIdState] = useState<string | null>(null);
  const userRef = useRef<User | null>(null);
  const hasLoadedRef = useRef(false); // 동시 호출 방지

  const loadFromLocalStorage = useCallback(() => {
    try {
      const raw = localStorage.getItem(LS_AVATARS);
      if (raw) setAvatars(JSON.parse(raw));
      const currentId = localStorage.getItem(LS_CURRENT);
      if (currentId) setCurrentAvatarIdState(currentId);
    } catch (e) {
      console.warn("Failed to load avatars:", e);
    }
  }, []);

  const loadFromSupabase = useCallback(
    async (user: User) => {
      // 이미 로드 중이거나 완료됐으면 skip (race condition 방지)
      if (hasLoadedRef.current) return;
      hasLoadedRef.current = true;

      const { data, error } = await supabase
        .from("user_avatars")
        .select("id, image_url, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error || !data) {
        loadFromLocalStorage();
        return;
      }

      if (data.length > 0) {
        // 중복 제거: 같은 image_url 중 가장 오래된 것 1개만 남김
        const seen = new Set<string>();
        const unique = data.filter((row) => {
          if (seen.has(row.image_url)) return false;
          seen.add(row.image_url);
          return true;
        });

        // 중복 레코드 삭제
        if (unique.length < data.length) {
          const keepIds = new Set(unique.map((r) => r.id));
          const deleteIds = data.filter((r) => !keepIds.has(r.id)).map((r) => r.id);
          supabase
            .from("user_avatars")
            .delete()
            .in("id", deleteIds)
            .then(() => {});
        }

        const mapped: StoredAvatar[] = unique.map((row) => ({
          id: row.id,
          imageSrc: row.image_url,
          createdAt: new Date(row.created_at).getTime(),
        }));
        setAvatars(mapped);
        localStorage.setItem(LS_AVATARS, JSON.stringify(mapped));

        const currentId =
          (user.user_metadata?.current_avatar_id as string | undefined) ?? null;
        if (currentId && mapped.some((a) => a.id === currentId)) {
          setCurrentAvatarIdState(currentId);
          localStorage.setItem(LS_CURRENT, currentId);
        } else {
          // user_metadata가 없거나 가리키는 아바타가 없으면 첫 번째로 설정
          const fallbackId = mapped[mapped.length - 1].id;
          setCurrentAvatarIdState(fallbackId);
          localStorage.setItem(LS_CURRENT, fallbackId);
        }
        return;
      }

      // Supabase 비어있음 → localStorage 마이그레이션 (딱 한 번만)
      if (localStorage.getItem(LS_MIGRATED)) return;
      localStorage.setItem(LS_MIGRATED, "1"); // 먼저 플래그 세워서 재진입 차단

      try {
        const raw = localStorage.getItem(LS_AVATARS);
        const localAvatars: StoredAvatar[] = raw ? JSON.parse(raw) : [];
        if (localAvatars.length === 0) return;

        const oldCurrentId = localStorage.getItem(LS_CURRENT);
        const oldCurrentIndex = oldCurrentId
          ? localAvatars.findIndex((a) => a.id === oldCurrentId)
          : -1;

        const inserts = localAvatars.map((a) => ({
          user_id: user.id,
          image_url: a.imageSrc,
          created_at: new Date(a.createdAt).toISOString(),
        }));

        const { data: inserted } = await supabase
          .from("user_avatars")
          .insert(inserts)
          .select("id, image_url, created_at")
          .order("created_at", { ascending: true });

        if (inserted && inserted.length > 0) {
          const migrated: StoredAvatar[] = inserted.map((row) => ({
            id: row.id,
            imageSrc: row.image_url,
            createdAt: new Date(row.created_at).getTime(),
          }));
          setAvatars(migrated);
          localStorage.setItem(LS_AVATARS, JSON.stringify(migrated));

          const newCurrentIndex =
            oldCurrentIndex >= 0 && oldCurrentIndex < migrated.length
              ? oldCurrentIndex
              : migrated.length - 1;
          const newCurrentId = migrated[newCurrentIndex].id;
          setCurrentAvatarIdState(newCurrentId);
          localStorage.setItem(LS_CURRENT, newCurrentId);
          supabase.auth
            .updateUser({ data: { current_avatar_id: newCurrentId } })
            .catch(console.warn);
        }
      } catch (e) {
        loadFromLocalStorage();
        console.warn("Failed to migrate avatars:", e);
      }
    },
    [loadFromLocalStorage],
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        userRef.current = session.user;
        loadFromSupabase(session.user);
      } else {
        loadFromLocalStorage();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      userRef.current = session?.user ?? null;
      // INITIAL_SESSION / SIGNED_IN 때만 로드 (TOKEN_REFRESHED·USER_UPDATED는 skip)
      if (
        session?.user &&
        (event === "INITIAL_SESSION" || event === "SIGNED_IN")
      ) {
        loadFromSupabase(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [loadFromSupabase, loadFromLocalStorage]);

  const uploadToStorage = useCallback(
    async (imageSrc: string, userId: string): Promise<string> => {
      try {
        const response = await fetch(imageSrc);
        if (!response.ok) return imageSrc;
        const blob = await response.blob();
        const ext = blob.type === "image/png" ? "png" : "jpg";
        const filename = `${userId}/${Date.now()}.${ext}`;

        const { error } = await supabase.storage
          .from("avatars")
          .upload(filename, blob, { contentType: blob.type, upsert: false });

        if (error) return imageSrc;

        const {
          data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(filename);
        return publicUrl;
      } catch {
        return imageSrc; // 실패하면 원본 URL 그대로 사용
      }
    },
    [],
  );

  const addAvatar = useCallback(async (imageSrc: string): Promise<string> => {
    const user = userRef.current;

    if (user) {
      // 외부 URL이면 Supabase Storage에 영구 보관
      const permanentUrl = imageSrc.startsWith("https://")
        ? await uploadToStorage(imageSrc, user.id)
        : imageSrc;

      const { data, error } = await supabase
        .from("user_avatars")
        .insert({ user_id: user.id, image_url: permanentUrl })
        .select("id, image_url, created_at")
        .single();

      if (data && !error) {
        const newAvatar: StoredAvatar = {
          id: data.id,
          imageSrc: data.image_url,
          createdAt: new Date(data.created_at).getTime(),
        };
        setAvatars((prev) => {
          const next = [...prev, newAvatar];
          localStorage.setItem(LS_AVATARS, JSON.stringify(next));
          return next;
        });
        return data.id;
      }
    }

    // 비로그인 / Supabase 실패 → localStorage 폴백
    const id = `avatar-${Date.now()}`;
    const newAvatar: StoredAvatar = { id, imageSrc, createdAt: Date.now() };
    try {
      const raw = localStorage.getItem(LS_AVATARS);
      const current: StoredAvatar[] = raw ? JSON.parse(raw) : [];
      const next = [...current, newAvatar];
      localStorage.setItem(LS_AVATARS, JSON.stringify(next));
      setAvatars(next);
    } catch (e) {
      console.warn("Failed to save avatar:", e);
    }
    return id;
  }, []);

  const setCurrentAvatar = useCallback((id: string) => {
    localStorage.setItem(LS_CURRENT, id);
    setCurrentAvatarIdState(id);
    const user = userRef.current;
    if (user) {
      supabase.auth
        .updateUser({ data: { current_avatar_id: id } })
        .catch(console.warn);
    }
  }, []);

  const deleteAvatar = useCallback(async (id: string) => {
    const user = userRef.current;

    if (user) {
      await supabase.from("user_avatars").delete().eq("id", id);
    }

    // nextAvatars를 클로저로 공유해 두 setter가 같은 결과를 바라보게 함
    let nextAvatars: StoredAvatar[] = [];

    setAvatars((prev) => {
      nextAvatars = prev.filter((a) => a.id !== id);
      localStorage.setItem(LS_AVATARS, JSON.stringify(nextAvatars));
      return nextAvatars;
    });

    setCurrentAvatarIdState((prevId) => {
      if (prevId !== id) return prevId; // 현재 아바타가 아니면 그대로

      // 지운 게 현재 아바타 → 남은 것 중 가장 최신으로 교체
      const newId =
        nextAvatars.length > 0
          ? nextAvatars[nextAvatars.length - 1].id
          : null;

      if (newId) {
        localStorage.setItem(LS_CURRENT, newId);
      } else {
        localStorage.removeItem(LS_CURRENT);
      }
      if (user) {
        supabase.auth
          .updateUser({ data: { current_avatar_id: newId } })
          .catch(console.warn);
      }
      return newId;
    });
  }, []);

  const currentAvatar =
    avatars.find((a) => a.id === currentAvatarId) ?? avatars[0] ?? null;

  return { avatars, currentAvatar, currentAvatarId, addAvatar, setCurrentAvatar, deleteAvatar };
}
