"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import color from "@/src/style/color";
import font from "@/src/style/font";
import Header from "@/src/components/layout/header";
import { useSavedDresses } from "@/src/store/savedDresses";

const LEFT_HERO = "/mock/avatarResult.jpg";

const FITTING_PICKS = [
  { src: "/mock/main1.png", alt: "추천 드레스 1" },
  { src: "/mock/main2.png", alt: "추천 드레스 2" },
  { src: "/mock/main3.png", alt: "추천 드레스 3" },
  { src: "/mock/main4.png", alt: "추천 드레스 4" },
] as const;

export default function FittingPage() {
  const { saveDress } = useSavedDresses();
  const [saved, setSaved] = useState(false);

  function handleSave() {
    saveDress(LEFT_HERO);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <Shell>
      <Header peekOnly />
      <LeftPane>
        <LeftTopBar>
          <BackLink href="/dress" aria-label="드레스 목록으로">
            <BackIcon src="/icon/blackBack.svg" alt="" width={14} height={26} />
          </BackLink>
          <SaveButton type="button" onClick={handleSave} $saved={saved}>
            {saved ? "저장됨 ✓" : "저장하기"}
          </SaveButton>
        </LeftTopBar>
        <LeftImageFrame>
          <LeftImageInner>
            <Image
              src={LEFT_HERO}
              alt="피팅 미리보기"
              fill
              sizes="533px"
              priority
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </LeftImageInner>
        </LeftImageFrame>
      </LeftPane>

      <RightPane>
        <RightInner>
          <SectionTitle>이건 어떠세요?</SectionTitle>
          <PickGrid>
            {FITTING_PICKS.map((p) => (
              <PickCard key={p.src}>
                <PickImageWrap>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="362px"
                    style={{ objectFit: "cover" }}
                  />
                </PickImageWrap>
                <FitingLink
                  href="/randering?intent=fitting"
                  aria-label="AI 피팅 로딩으로"
                >
                  AI 피팅하기
                </FitingLink>
              </PickCard>
            ))}
          </PickGrid>
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

  &:hover {
    background: ${color.gray200};
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
  max-width: 533px;
  margin: 0 auto;
  display: flex;
  align-items: stretch;
  justify-content: center;
`;

const LeftImageInner = styled.div`
  position: relative;
  width: 100%;
  max-width: 533px;
  border-radius: 0;
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
  max-width: 165px;
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
  border-radius: 0;
  background: ${color.gray200};
`;

const PickImageWrap = styled.div`
  position: absolute;
  inset: 0;
`;

const FitingLink = styled(Link)`
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
  text-decoration: none;
  ${font["text-sm"]};

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }

  &:focus-visible {
    outline: 2px solid ${color.white};
    outline-offset: 2px;
  }
`;
