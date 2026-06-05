"use client";

import Image from "next/image";
import styled from "styled-components";
import color from "@/src/style/color";
import font from "@/src/style/font";
import Header from "@/src/components/layout/header";
import ShopCard from "@/src/components/shop/shopCard";

const SHOP_BRANDS = [
  {
    id: "sou",
    imageSrc: "/mock/sou.jpg",
    brandName: "SOU",
    description: "자연스러운 실루엣의 감각적인 웨딩 드레스",
  },
  {
    id: "kelly",
    imageSrc: "/mock/kelly.webp",
    brandName: "KELLY",
    description: "우아하고 클래식한 브라이덜 컬렉션",
  },
  {
    id: "chaejaehoon",
    imageSrc: "/mock/chaejaehoon.jpg",
    brandName: "채재훈",
    description: "한국 대표 웨딩 드레스 디자이너 브랜드",
  },
] as const;

export default function ShopPage() {
  return (
    <Shell>
      <Header />

      <BannerWrap>
        <Image
          src="/images/shop_banner.jpg"
          alt="MARRID 웨딩 드레스 샵"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <BannerOverlay>
          <BannerTitle>세상의 모든 드레스,</BannerTitle>
          <BannerSubtitle>당신만의 웨딩 드레스를 찾아보세요</BannerSubtitle>
        </BannerOverlay>
      </BannerWrap>

      <Inner>
        <SectionHeadline>
          <SectionTitle>웨딩 드레스 브랜드</SectionTitle>
          <SectionDesc>국내외 유명 웨딩 드레스 브랜드를 한 곳에서 만나보세요</SectionDesc>
        </SectionHeadline>

        <BrandGrid>
          {SHOP_BRANDS.map((brand) => (
            <ShopCard
              key={brand.id}
              imageSrc={brand.imageSrc}
              brandName={brand.brandName}
              description={brand.description}
            />
          ))}
        </BrandGrid>
      </Inner>
    </Shell>
  );
}

const Shell = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100dvh;
  background: ${color.white};
  color: ${color.black};
`;

const BannerWrap = styled.section`
  position: relative;
  width: 100%;
  height: clamp(320px, 45vw, 600px);
  overflow: hidden;
  background: ${color.gray100};
`;

const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(24px, 4vw, 64px) clamp(24px, 5vw, 85px);
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.45) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    transparent 100%
  );
`;

const BannerTitle = styled.p`
  margin: 0;
  ${font["title-md"]};
  color: ${color.white};
`;

const BannerSubtitle = styled.p`
  margin: 4px 0 0;
  ${font["title-sm"]};
  color: ${color.white};
  opacity: 0.9;
`;

const Inner = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(48px, 6vw, 96px) clamp(24px, 5vw, 85px) 80px;
`;

const SectionHeadline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 40px;
`;

const SectionTitle = styled.h1`
  margin: 0;
  ${font["title-sm"]};
  color: ${color.black};
`;

const SectionDesc = styled.p`
  margin: 0;
  ${font["text-sm"]};
  color: ${color.gray500};
`;

const BrandGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px 28px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;
