"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";
import color from "@/src/style/color";
import font from "@/src/style/font";
import Header from "@/src/components/layout/header";
import type { RecommendBlock } from "@/src/app/api/recommend/route";

const LEFT_HERO = "/mock/avatar.png";
const FINISH_SRC = "/mock/finish.png";

export default function ResultPage() {
  const router = useRouter();
  const [heroSrc, setHeroSrc] = useState(LEFT_HERO);
  const [blocks, setBlocks] = useState<RecommendBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const resultUrl = sessionStorage.getItem("marrid_result_url");
    if (resultUrl) setHeroSrc(resultUrl);
  }, []);

  useEffect(() => {
    // 캐시된 추천 있으면 재사용
    const cached = sessionStorage.getItem("marrid_recommend");
    if (cached) {
      try {
        const { blocks: b } = JSON.parse(cached);
        if (b?.length) { setBlocks(b); setIsLoading(false); return; }
      } catch { /* ignore */ }
    }

    const hall            = sessionStorage.getItem("marrid_selected_hall") ?? "";
    const rawStyle        = sessionStorage.getItem("marrid_selected_style");
    const rawSilhouette   = sessionStorage.getItem("marrid_silhouette");
    const styleData       = rawStyle      ? JSON.parse(rawStyle)      : { label: "", hashtags: [] };
    const silhouetteZones = rawSilhouette ? JSON.parse(rawSilhouette) : [];

    fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hall, style: styleData.label, hashtags: styleData.hashtags, silhouetteZones }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.blocks) {
          setBlocks(data.blocks);
          sessionStorage.setItem("marrid_recommend", JSON.stringify({ blocks: data.blocks }));
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const handleFit = (imageUrl: string) => {
    sessionStorage.setItem("marrid_dress_url", imageUrl);
    router.push("/fitting");
  };

  return (
    <Shell>
      <Header peekOnly />

      <LeftPane>
        <LeftTopBar>
          <BackLink href="/" aria-label="홈으로">
            <img src="/icon/whiteBack.svg" alt="" width={14} height={26} style={{ filter: "brightness(0)" }} />
          </BackLink>
          <SaveButton type="button">저장하기</SaveButton>
        </LeftTopBar>
        <AvatarFrame>
          {heroSrc.startsWith("https://") ? (
            <AvatarImg src={heroSrc} alt="아바타" />
          ) : (
            <AvatarImgLocal src={heroSrc} alt="아바타" />
          )}
        </AvatarFrame>
      </LeftPane>

      <RightPane>
        <RightInner>
          {isLoading ? (
            <LoadingBox>
              <Spinner $dark />
              <LoadingText>어울리는 드레스를 찾고 있어요...</LoadingText>
            </LoadingBox>
          ) : blocks.length === 0 ? (
            <LoadingBox>
              <LoadingText>추천 드레스를 불러올 수 없어요</LoadingText>
            </LoadingBox>
          ) : (
            blocks.map((block, bi) => (
              <Section key={bi}>
                <SectionTitle>{block.title}</SectionTitle>
                <DressGrid $count={block.dresses.length}>
                  {block.dresses.map((dress) => (
                    <DressCard key={dress.id}>
                      <DressImageWrap>
                        {dress.image_url ? (
                          <DressImg src={dress.image_url} alt={dress.silhouette} />
                        ) : (
                          <DressImgPlaceholder />
                        )}
                        <CardOverlay>
                          <ShopRow>
                          <img src="/icon/place.svg" alt="" width={14} height={14} style={{ flexShrink: 0, filter: "brightness(0) invert(1)" }} />
                          <ShopName>{dress.shop_name}</ShopName>
                        </ShopRow>
                          <FitButton
                            type="button"
                            onClick={() => handleFit(dress.image_url)}
                          >
                            AI 피팅하기
                          </FitButton>
                        </CardOverlay>
                      </DressImageWrap>
                    </DressCard>
                  ))}
                </DressGrid>
              </Section>
            ))
          )}
          <MoreRow>
            <MoreLink href="/dress">더 많은 드레스 보러가기 →</MoreLink>
          </MoreRow>
        </RightInner>
      </RightPane>
    </Shell>
  );
}

// ── 레이아웃 ──────────────────────────────────────────────────────────────────

const Shell = styled.main`
  display: flex;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background: ${color.white};

  @media (max-width: 900px) {
    flex-direction: column;
    height: auto;
    overflow: visible;
  }
`;

const LeftPane = styled.aside`
  flex: 0 0 clamp(280px, 40vw, 560px);
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: ${color.gray100};
  padding: 48px clamp(20px, 3vw, 52px) 32px;

  @media (max-width: 900px) {
    flex: none;
    height: auto;
    max-height: 44dvh;
    padding: 24px 20px 20px;
  }
`;

const LeftTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  margin-bottom: 28px;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 4px;
  text-decoration: none;
`;

const SaveButton = styled.button`
  padding: 8px 22px;
  border: 1px solid ${color.gray700};
  border-radius: 16px;
  background: ${color.white};
  color: ${color.black};
  ${font["text-sm"]};
  cursor: pointer;
  &:hover { background: ${color.gray200}; }
`;

const AvatarFrame = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  border-radius: 8px;
  background: ${color.gray200};
  overflow: hidden;
`;

const AvatarImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const AvatarImgLocal = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const RightPane = styled.div`
  flex: 1;
  min-width: 0;
  height: 100dvh;
  overflow-y: auto;
  background: ${color.white};

  @media (max-width: 900px) {
    height: auto;
    overflow: visible;
  }
`;

const RightInner = styled.div`
  max-width: 780px;
  margin: 0 auto;
  padding: clamp(60px, 7vw, 96px) clamp(20px, 3vw, 48px) 80px;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

// ── 추천 섹션 ─────────────────────────────────────────────────────────────────

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  ${font["text-lg"]};
  color: ${color.black};
  max-width: 540px;
`;

const DressGrid = styled.div<{ $count: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $count }) => Math.min($count, 2)}, 1fr);
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const DressCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DressImageWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  background: ${color.gray100};
  overflow: hidden;
  border-radius: 4px;
`;

const DressImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
`;

const DressImgPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: ${color.gray200};
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
  gap: 8px;
`;

const ShopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ShopName = styled.p`
  margin: 0;
  ${font["text-sm"]};
  color: ${color.white};
`;

const FitButton = styled.button`
  align-self: flex-start;
  padding: 6px 14px;
  border: 1px solid ${color.white};
  border-radius: 20px;
  background: transparent;
  color: ${color.white};
  ${font["text-sm"]};
  cursor: pointer;
  white-space: nowrap;

  &:hover { background: rgba(255,255,255,0.15); }
`;


// ── 로딩 ──────────────────────────────────────────────────────────────────────

const LoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 100px 0;
`;

const LoadingText = styled.p`
  margin: 0;
  ${font["text-sm"]};
  color: ${color.gray500};
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const Spinner = styled.div<{ $dark?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid ${({ $dark }) => ($dark ? color.gray300 : "rgba(255,255,255,0.3)")};
  border-top-color: ${({ $dark }) => ($dark ? color.gray700 : color.white)};
  animation: ${spin} 0.8s linear infinite;
`;

const FittingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(0,0,0,0.4);
  z-index: 2;
`;

const FittingLabel = styled.p`
  margin: 0;
  ${font["text-sm"]};
  color: ${color.white};
`;

// ── 하단 ──────────────────────────────────────────────────────────────────────

const MoreRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MoreLink = styled(Link)`
  ${font["text-sm"]};
  color: ${color.gray600};
  text-decoration: none;
  &:hover { color: ${color.black}; }
`;
