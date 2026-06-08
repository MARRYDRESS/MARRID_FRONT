"use client";

import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import color from "@/src/style/color";
import font from "@/src/style/font";
import Header from "@/src/components/layout/header";
import ShopCard from "@/src/components/shop/shopCard";

const PRICE_FILTERS = [
  { label: "전체 보기", value: "all" },
  { label: "100만원 대", value: "100" },
  { label: "200만원 대", value: "200" },
  { label: "300만원 대", value: "300" },
  { label: "400만원 대", value: "400" },
  { label: "500만원 대", value: "500" },
  { label: "600만원 대", value: "600" },
  { label: "700만원 대", value: "700" },
] as const;

type PriceRange = (typeof PRICE_FILTERS)[number]["value"];

const SHOP_BRANDS: {
  id: string;
  imageSrc: string;
  brandName: string;
  description: string;
  url: string;
  priceRange: Exclude<PriceRange, "all">;
}[] = [
  {
    id: "sou",
    imageSrc: "/mock/sou.jpg",
    brandName: "SOYOO BRIDAL",
    description: "자연스러운 실루엣의 감각적인 웨딩 드레스",
    url: "http://www.soyoobridal.com/index.html",
    priceRange: "100",
  },
  {
    id: "kelly",
    imageSrc: "/mock/kelly.webp",
    brandName: "Kelly SONYUNHUI",
    description: "우아하고 클래식한 브라이덜 컬렉션",
    url: "http://sonyunhui.com/",
    priceRange: "200",
  },
  {
    id: "chaejaehoon",
    imageSrc: "/mock/chaejaehoon.jpg",
    brandName: "엔조 최재훈",
    description: "한국 대표 웨딩 드레스 디자이너 브랜드",
    url: "http://choijaehoon.co.kr/",
    priceRange: "300",
  },
];

function getSectionTitle(filter: PriceRange) {
  if (filter === "all") return "전체 드레스, 여기서 확인하세요";
  return `${filter}만원 대 드레스, 여기서 확인하세요`;
}

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState<PriceRange>("all");

  const filtered =
    activeFilter === "all"
      ? SHOP_BRANDS
      : SHOP_BRANDS.filter((b) => b.priceRange === activeFilter);

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
          <BannerTitle>내 예산에 딱 맞게,</BannerTitle>
          <BannerSubtitle>드레스샵을 선택 해 보세요.</BannerSubtitle>
        </BannerOverlay>
      </BannerWrap>

      <FilterBar aria-label="가격대별 필터">
        {PRICE_FILTERS.map((f) => (
          <FilterTab
            key={f.value}
            type="button"
            $active={activeFilter === f.value}
            onClick={() => setActiveFilter(f.value)}
          >
            {f.label}
          </FilterTab>
        ))}
      </FilterBar>

      <Inner>
        <SectionTitle>{getSectionTitle(activeFilter)}</SectionTitle>

        <BrandGrid>
          {filtered.map((brand) => (
            <ShopCard
              key={brand.id}
              imageSrc={brand.imageSrc}
              brandName={brand.brandName}
              description={brand.description}
              href={brand.url}
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

const FilterBar = styled.nav`
  width: 100%;
  border-bottom: 1px solid ${color.gray300};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(24px, 4vw, 62px);
  height: 69px;
  overflow-x: auto;
`;

const FilterTab = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  ${font["text-sm"]};
  color: ${({ $active }) => ($active ? color.black : color.gray600)};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  border-bottom: ${({ $active }) =>
    $active ? `2px solid ${color.black}` : "2px solid transparent"};
  white-space: nowrap;
  height: 100%;
  transition: color 0.15s, border-color 0.15s;

  &:hover {
    color: ${color.black};
  }
`;

const Inner = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(32px, 4vw, 64px) clamp(24px, 5vw, 116px) 80px;
`;

const SectionTitle = styled.h1`
  margin: 0 0 44px;
  ${font["title-sm"]};
  color: ${color.black};
`;

const BrandGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 44px 40px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;
