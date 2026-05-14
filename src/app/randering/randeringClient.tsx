"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";
import font from "@/src/style/font";
import color from "@/src/style/color";

const HERO_SRC = "/images/rander.jpg";

type RanderingClientProps = {
  isFitting: boolean;
};

export default function RanderingClient({ isFitting }: RanderingClientProps) {
  const router = useRouter();

  useEffect(() => {
    const id = window.setTimeout(() => {
      router.push("/result");
    }, 3000);
    return () => window.clearTimeout(id);
  }, [router]);

  const lead = isFitting ? "옷을 입고 있어요" : "아바타를 만들고 있어요";
  const heroAlt = isFitting
    ? "드레스 피팅 안내 이미지"
    : "아바타 생성 안내 이미지";

  return (
    <Shell>
      <VisualPane>
        <Image
          src={HERO_SRC}
          alt={heroAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 796px"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
      </VisualPane>
      <ContentPane>
        <Copy>
          <Lead>{lead}</Lead>
          <Headline>조금만 기다려 주세요</Headline>
        </Copy>
        <Dots role="status" aria-label="로딩 중">
          <Dot $delay={0} />
          <Dot $delay={0.2} />
          <Dot $delay={0.4} />
        </Dots>
      </ContentPane>
    </Shell>
  );
}

const Shell = styled.main`
  display: flex;
  min-height: 100dvh;
  width: 100%;
  margin: 0;
  background: ${color.white};
  color: ${color.black};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const VisualPane = styled.div`
  position: relative;
  flex: 0 0 min(796px, 52vw);
  min-height: 100dvh;
  overflow: hidden;
  background: ${color.gray100};

  @media (max-width: 768px) {
    flex: 0 0 auto;
    width: 100%;
    min-height: min(42dvh, 360px);
    height: min(42dvh, 360px);
  }
`;

const ContentPane = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 48px;
  min-width: 0;
  padding: 32px 24px 48px;
`;

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  max-width: 360px;
`;

const Lead = styled.p`
  margin: 0;
  width: 100%;
  ${font["title-sm"]};
  color: ${color.black};
`;

const Headline = styled.h1`
  margin: 0;
  width: 100%;
  ${font["title-md"]};
  color: ${color.black};
`;

const dotPulse = keyframes`
  0%,
  100% {
    opacity: 0.28;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
`;

const Dots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Dot = styled.span<{ $delay: number }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${color.primary};
  animation: ${dotPulse} 1.2s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;
