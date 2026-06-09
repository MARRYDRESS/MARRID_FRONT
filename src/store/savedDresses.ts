"use client";

import { useState, useEffect, useCallback } from "react";

export type SavedDress = {
  id: string;
  imageSrc: string;
  savedAt: number;
};

const STORAGE_KEY = "marrid_saved_dresses";

export function useSavedDresses() {
  const [dresses, setDresses] = useState<SavedDress[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDresses(JSON.parse(raw));
    } catch (e) {
      console.warn("Failed to load saved dresses:", e);
    }
  }, []);

  const persist = useCallback((next: SavedDress[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setDresses(next);
  }, []);

  const saveDress = useCallback((imageSrc: string) => {
    setDresses((prev) => {
      const next: SavedDress[] = [
        ...prev,
        { id: `${imageSrc}-${Date.now()}`, imageSrc, savedAt: Date.now() },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const reorder = useCallback((next: SavedDress[]) => {
    persist(next);
  }, [persist]);

  const remove = useCallback((id: string) => {
    setDresses((prev) => {
      const next = prev.filter((d) => d.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { dresses, saveDress, reorder, remove };
}
