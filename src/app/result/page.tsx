"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import color from "@/src/style/color";
import font from "@/src/style/font";
import Header from "@/src/components/layout/header";

const LEFT_HERO = "/mock/avatar.png";
const FINISH_SRC = "/mock/finish.png";

const PICKS_ROW1 = [
  { src: "/mock/main1.png", alt: "추천 드레스 1" },
  { src: "/mock/main2.png", alt: "추천 드레스 2" },
];

const PICKS_ROW2 = [
  { src: "/mock/main3.png", alt: "추천 드레스 3" },
  { src: "/mock/main4.png", alt: "추천 드레스 4" },
  { src: "/mock/main5.jpg", alt: "추천 드레스 5" },
  { src: "/mock/main6.jpg", alt: "추천 드레스 6" },
];

export default function ResultPage() {
  const [heroSrc, setHeroSrc] = useState(LEFT_HERO);
  const [isFitting, setIsFitting] = useState(false);

  const handleFit = () => {
    if (isFitting || heroSrc === FINISH_SRC) return;
    setIsFitting(true);
    setTimeout(() => {
      setHeroSrc(FINISH_SRC);
      setIsFitting(false);
    }, 1500);
  };

  return (
    <Shell>
      <Header peekOnly />
      <LeftPane>
        <LeftTopBar>
          <BackLink href="/" aria-label="홈으로">
            <BackIcon src="/icon/whiteBack.svg" alt="" width={14} height={26} />
          </BackLink>
          <SaveButton type="button">저장하기</SaveButton>
        </LeftTopBar>
        <LeftImageFrame>
          <LeftImageInner>
            <Image
              src={heroSrc}
              alt="선택한 아바타"
              fill
              sizes="552px"
              priority
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
            {isFitting && (
              <FittingOverlay>
                <Spinner />
                <FittingLabel>AI 피팅 중...</FittingLabel>
              </FittingOverlay>
            )}
          </LeftImageInner>
        </LeftImageFrame>
      </LeftPane>

      <RightPane>
        <RightInner>
          <RecommendBlock>
            <SectionTitle>
              가장 잘 어울리는 드레스는 오간자 실크 &amp; A라인 이예요
            </SectionTitle>
            <PickGrid>
              {PICKS_ROW1.map((p) => (
                <PickCard key={p.src}>
                  <PickImageWrap>
                    <Image src={p.src} alt={p.alt} fill sizes="362px" style={{ objectFit: "cover" }} />
                  </PickImageWrap>
                  <FitingButton type="button" onClick={handleFit} disabled={isFitting}>
                    AI 피팅하기
                  </FitingButton>
                </PickCard>
              ))}
            </PickGrid>
          </RecommendBlock>

          <RecommendBlock>
            <SectionTitle $tight>
              머메이드를 입고 싶다면 세미 머메이드를 추천해요
            </SectionTitle>
            <PickGrid>
              {PICKS_ROW2.map((p) => (
                <PickCard key={p.src}>
                  <PickImageWrap>
                    <Image src={p.src} alt={p.alt} fill sizes="362px" style={{ objectFit: "cover" }} />
                  </PickImageWrap>
                  <FitingButton type="button" onClick={handleFit} disabled={isFitting}>
                    AI 피팅하기
                  </FitingButton>
                </PickCard>
              ))}
            </PickGrid>
          </RecommendBlock>

          <MoreRow>
            <MoreLink href="/dress">더 많은 드레스 보러가기</MoreLink>
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
  flex: 0 0 clamp(280px, 42vw, 604px);
  width: clamp(280px, 42vw, 604px);
  max-width: 604px;
  height: 100dvh;
  max-height: 100dvh;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: ${color.gray100};
  padding: 47px clamp(20px, 3vw, 54px) 32px;

  @media (max-width: 900px) {
    width: 100%;
    max-width: none;
    height: auto;
    max-height: min(48dvh, 440px);
    flex: 0 0 auto;
    padding: 24px 20px 20px;
  }
`;

const LeftTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  width: 100%;
  max-width: 515px;
  margin: 0 auto 32px;
  gap: 16px;

  @media (max-width: 900px) {
    margin-bottom: 16px;
  }
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 4px;
  text-decoration: none;
  color: inherit;
  filter: brightness(0);

  &:focus-visible {
    outline: 2px solid ${color.primary};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const BackIcon = styled.img`
  display: block;
`;

const SaveButton = styled.button`
  box-sizing: border-box;
  margin: 0;
  padding: 9px 25px;
  border-radius: 16px;
  border: 1px solid ${color.gray700};
  background: ${color.white};
  color: ${color.black};
  cursor: pointer;
  ${font["text-sm"]};

  &:hover {
    background: ${color.gray100};
  }

  &:focus-visible {
    outline: 2px solid ${color.primary};
    outline-offset: 2px;
  }
`;

const LeftImageFrame = styled.div`
  flex: 1;
  min-height: 0;
  width: 100%;
  max-width: 552px;
  margin: 0 auto;
  display: flex;
  align-items: stretch;
  justify-content: center;
`;

const LeftImageInner = styled.div`
  position: relative;
  width: 100%;
  max-width: 552px;
  border-radius: 8px;
  background: ${color.gray200};
  overflow: hidden;
  flex: 1;
  min-height: 320px;

  @media (max-width: 900px) {
    min-height: 220px;
    max-height: 320px;
    flex: 0 0 auto;
    height: min(36dvh, 320px);
  }
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
  max-width: 800px;
  margin: 0 auto;
  padding: clamp(72px, 8vw, 100px) clamp(20px, 3vw, 48px) 80px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 40px;
`;

const RecommendBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
`;

const SectionTitle = styled.h1<{ $tight?: boolean }>`
  margin: 0;
  padding: 0;
  max-width: ${({ $tight }) => ($tight ? "523px" : "576px")};
  color: ${color.black};
  ${font["text-lg"]};
`;

const PickGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px 28px;
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
  border-radius: 0;
  background: ${color.gray200};
`;

const PickImageWrap = styled.div`
  position: absolute;
  inset: 0;
`;

const FitingButton = styled.button`
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

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.12);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${color.white};
    outline-offset: 2px;
  }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const FittingOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  background: rgba(0, 0, 0, 0.45);
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: ${color.white};
  animation: ${spin} 0.8s linear infinite;
`;

const FittingLabel = styled.p`
  margin: 0;
  ${font["text-sm"]};
  color: ${color.white};
`;

const MoreRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  width: 100%;
  padding-top: 8px;
`;

const MoreLink = styled(Link)`
  ${font["text-lg"]};
  color: ${color.black};
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${color.primary};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

