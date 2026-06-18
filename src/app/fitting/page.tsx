"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import color from "@/src/style/color";
import font from "@/src/style/font";
import Header from "@/src/components/layout/header";
import { useSavedDresses } from "@/src/store/savedDresses";
import { supabase } from "@/src/lib/supabase";

type Pick = { id: string; image_url: string };

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function FittingPage() {
  const { saveDress } = useSavedDresses();
  const [saved, setSaved] = useState(false);
  const [fittingSrc, setFittingSrc] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [picks, setPicks] = useState<Pick[]>([]);
  const [selectedDressUrl, setSelectedDressUrl] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // sessionStorage에서 초기 드레스 URL 읽기
  useEffect(() => {
    const dressUrl = sessionStorage.getItem("marrid_dress_url");
    if (dressUrl) setSelectedDressUrl(dressUrl);
  }, []);

  // 드레스 변경 시 피팅 재실행
  useEffect(() => {
    const personB64 = sessionStorage.getItem("marrid_person_b64");
    if (!personB64 || !selectedDressUrl) return;

    let cancelled = false;
    if (pollRef.current) clearInterval(pollRef.current);
    setIsGenerating(true);
    setFittingSrc(null);

    fetch("/api/tryon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ person_b64: personB64, product_url: selectedDressUrl }),
    })
      .then((r) => r.json())
      .then(({ id, error }) => {
        if (cancelled || error || !id) {
          if (!cancelled) setIsGenerating(false);
          return;
        }
        pollRef.current = setInterval(async () => {
          if (cancelled) return;
          try {
            const res = await fetch(`/api/tryon/status?id=${id}`);
            const data = await res.json();
            if (data.status === "completed" && data.output?.[0]) {
              clearInterval(pollRef.current!);
              setFittingSrc(data.output[0]);
              setIsGenerating(false);
            } else if (data.status === "failed") {
              clearInterval(pollRef.current!);
              setIsGenerating(false);
            }
          } catch {
            clearInterval(pollRef.current!);
            setIsGenerating(false);
          }
        }, 2000);
      })
      .catch(() => { if (!cancelled) setIsGenerating(false); });

    return () => {
      cancelled = true;
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [selectedDressUrl]);

  // Supabase에서 랜덤 드레스 4개 로드
  useEffect(() => {
    supabase.from("dresses").select("id, image_url").then(({ data }) => {
      if (!data || data.length === 0) return;
      const current = sessionStorage.getItem("marrid_dress_url");
      const filtered = current ? data.filter((d) => d.image_url !== current) : data;
      setPicks(shuffle(filtered).slice(0, 4));
    });
  }, []);

  function handleSave() {
    if (fittingSrc) saveDress(fittingSrc);
    setSaved(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setSaved(false), 1500);
  }

  function handlePickDress(imageUrl: string) {
    sessionStorage.setItem("marrid_dress_url", imageUrl);
    setSelectedDressUrl(imageUrl);
    setSaved(false);
  }

  return (
    <Shell>
      <Header peekOnly />
      <LeftPane>
        <LeftTopBar>
          <BackLink href="/dress" aria-label="드레스 목록으로">
            <BackIcon src="/icon/blackBack.svg" alt="" width={14} height={26} />
          </BackLink>
          <SaveButton type="button" onClick={handleSave} $saved={saved} disabled={!fittingSrc}>
            {saved ? "저장됨 ✓" : "저장하기"}
          </SaveButton>
        </LeftTopBar>

        <CompareRow>
          <ComparePanel>
            {isGenerating ? (
              <PanelLoading>
                <Spinner />
                <LoadingText>AI 피팅 중...</LoadingText>
              </PanelLoading>
            ) : fittingSrc ? (
              <PanelImg src={fittingSrc} alt="AI 피팅 결과" />
            ) : (
              <PanelPlaceholder />
            )}
          </ComparePanel>
        </CompareRow>
      </LeftPane>

      <RightPane>
        <RightInner>
          <SectionTitle>이건 어떠세요?</SectionTitle>
          <PickGrid>
            {picks.map((p) => (
              <PickCard key={p.id}>
                <PickImageWrap>
                  <PickImg src={p.image_url} alt="추천 드레스" />
                </PickImageWrap>
                <FitingBtn type="button" onClick={() => handlePickDress(p.image_url)}>
                  AI 피팅하기
                </FitingBtn>
              </PickCard>
            ))}
          </PickGrid>
          <MoreRow>
            <MoreLink href="/dress">더 많은 드레스 보러가기 →</MoreLink>
          </MoreRow>
        </RightInner>
      </RightPane>
    </Shell>
  );
}

const Shell = styled.main`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100dvh;
  max-height: 100dvh;
  margin: 0;
  overflow: hidden;
  background: ${color.white};
  color: ${color.black};

  @media (max-width: 900px) {
    flex-direction: column;
    height: auto;
    max-height: none;
    min-height: 100dvh;
    overflow: visible;
  }
`;

const LeftPane = styled.aside`
  box-sizing: border-box;
  flex: 0 0 clamp(320px, 48vw, 680px);
  width: clamp(320px, 48vw, 680px);
  height: 100dvh;
  max-height: 100dvh;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: ${color.gray100};
  padding: 47px clamp(16px, 2.5vw, 40px) 32px;

  @media (max-width: 900px) {
    width: 100%;
    max-width: none;
    height: auto;
    max-height: none;
    flex: 0 0 auto;
    padding: 24px 16px 20px;
  }
`;

const LeftTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  width: 100%;
  margin: 0 auto 20px;
  gap: 16px;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 4px;
  text-decoration: none;
  color: inherit;

  &:focus-visible {
    outline: 2px solid ${color.primary};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const BackIcon = styled.img`
  display: block;
`;

const SaveButton = styled.button<{ $saved?: boolean }>`
  box-sizing: border-box;
  margin: 0;
  padding: 9px 25px;
  border-radius: 16px;
  border: 1px solid ${({ $saved }) => ($saved ? color.primary : color.gray700)};
  background: ${({ $saved }) => ($saved ? color.second : color.white)};
  color: ${color.black};
  cursor: pointer;
  ${font["text-sm"]};
  transition: background 0.2s, border-color 0.2s;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: ${color.gray200};
  }
`;

const CompareRow = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: stretch;
  gap: 0;
  width: 100%;
`;

const ComparePanel = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PanelImg = styled.img`
  flex: 1;
  min-height: 0;
  width: 100%;
  object-fit: contain;
  object-position: center top;
  display: block;
  background: ${color.gray100};
`;

const PanelPlaceholder = styled.div`
  flex: 1;
  min-height: 0;
  background: ${color.gray200};
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const PanelLoading = styled.div`
  flex: 1;
  min-height: 0;
  background: ${color.gray200};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Spinner = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: ${color.gray700};
  animation: ${spin} 0.8s linear infinite;
`;

const LoadingText = styled.p`
  margin: 0;
  ${font.caption};
  color: ${color.gray500};
`;

const RightPane = styled.div`
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  height: 100dvh;
  max-height: 100dvh;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  background: ${color.white};

  @media (max-width: 900px) {
    height: auto;
    max-height: none;
    overflow: visible;
    flex: 1 1 auto;
  }
`;

const RightInner = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 752px;
  margin: 0 auto;
  padding: clamp(24px, 3vw, 40px) clamp(20px, 3vw, 48px) 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 28px;
`;

const SectionTitle = styled.h1`
  margin: 0;
  padding: 0;
  color: ${color.black};
  ${font["title-sm"]};
`;

const PickGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px 28px;
  width: 100%;
  max-width: 752px;
  align-items: start;
`;

const PickCard = styled.article`
  position: relative;
  width: 100%;
  min-width: 0;
  aspect-ratio: 362 / 489;
  overflow: hidden;
  background: ${color.gray200};
`;

const PickImageWrap = styled.div`
  position: absolute;
  inset: 0;
`;

const PickImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
`;

const MoreRow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const MoreLink = styled(Link)`
  ${font["text-sm"]};
  color: ${color.gray600};
  text-decoration: none;
  &:hover { color: ${color.black}; }
`;

const FitingBtn = styled.button`
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 1;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  min-width: 97px;
  padding: 0 12px;
  border-radius: 16px;
  border: 1px solid ${color.white};
  background: transparent;
  color: ${color.white};
  cursor: pointer;
  ${font["text-sm"]};

  &:hover {
    background: rgba(255, 255, 255, 0.18);
  }
`;
