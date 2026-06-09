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
  // 100만원대
  {
    id: "sou",
    imageSrc: "/mock/sou.jpg",
    brandName: "SOYOO BRIDAL",
    description: "자연스러운 실루엣의 감각적인 웨딩 드레스",
    url: "http://www.soyoobridal.com/index.html",
    priceRange: "100",
  },
  {
    id: "blanc",
    imageSrc: "/mock/main1.png",
    brandName: "BLANC DE BLANC",
    description: "청순하고 순백의 미니멀 드레스 라인",
    url: "https://blancdeblancbridal.com",
    priceRange: "100",
  },
  {
    id: "lafleur",
    imageSrc: "/mock/main2.png",
    brandName: "LA FLEUR BRIDAL",
    description: "플로럴 레이스 포인트의 로맨틱 드레스",
    url: "https://lafleurbridal.kr",
    priceRange: "100",
  },
  {
    id: "purewhite",
    imageSrc: "/mock/main3.png",
    brandName: "PURE WHITE",
    description: "합리적인 가격의 모던 브라이덜 컬렉션",
    url: "https://purewhitebridal.co.kr",
    priceRange: "100",
  },
  // 200만원대
  {
    id: "kelly",
    imageSrc: "/mock/kelly.webp",
    brandName: "Kelly SONYUNHUI",
    description: "우아하고 클래식한 브라이덜 컬렉션",
    url: "http://sonyunhui.com/",
    priceRange: "200",
  },
  {
    id: "monique",
    imageSrc: "/mock/main4.png",
    brandName: "MONIQUE BRIDAL",
    description: "부드러운 새틴과 시폰의 조화로운 라인",
    url: "https://moniquebridal.co.kr",
    priceRange: "200",
  },
  {
    id: "rosemary",
    imageSrc: "/mock/main5.jpg",
    brandName: "ROSEMARY WEDDING",
    description: "빈티지 감성의 보헤미안 웨딩 스타일",
    url: "https://rosemarywedding.kr",
    priceRange: "200",
  },
  {
    id: "aurora",
    imageSrc: "/mock/main6.jpg",
    brandName: "AURORA BRIDAL",
    description: "은은한 광택의 고급 새틴 웨딩드레스",
    url: "https://aurorabridal.co.kr",
    priceRange: "200",
  },
  // 300만원대
  {
    id: "chaejaehoon",
    imageSrc: "/mock/chaejaehoon.jpg",
    brandName: "엔조 최재훈",
    description: "한국 대표 웨딩 드레스 디자이너 브랜드",
    url: "http://choijaehoon.co.kr/",
    priceRange: "300",
  },
  {
    id: "vera",
    imageSrc: "/mock/main7.jpg",
    brandName: "VERA BRIDAL SEOUL",
    description: "클래식과 모던이 공존하는 프리미엄 드레스",
    url: "https://verabridal.kr",
    priceRange: "300",
  },
  {
    id: "leerang",
    imageSrc: "/mock/main8.jpg",
    brandName: "이랑 브라이덜",
    description: "한복의 곡선미를 담은 퓨전 웨딩드레스",
    url: "https://eerang-bridal.co.kr",
    priceRange: "300",
  },
  {
    id: "maison",
    imageSrc: "/mock/main9.jpg",
    brandName: "MAISON DE MARIÉE",
    description: "파리지앵 감성의 쿠튀르 웨딩 드레스",
    url: "https://maisondemariee.kr",
    priceRange: "300",
  },
  // 400만원대
  {
    id: "jenny",
    imageSrc: "/mock/main10.png",
    brandName: "JENNY YOO",
    description: "뉴욕 감성의 트렌디한 브라이덜 라인",
    url: "https://jennyyoo.com",
    priceRange: "400",
  },
  {
    id: "hera",
    imageSrc: "/mock/main11.jpg",
    brandName: "HERA BRIDAL",
    description: "여신처럼 빛나는 럭셔리 A라인 드레스",
    url: "https://herabridal.co.kr",
    priceRange: "400",
  },
  {
    id: "sodam",
    imageSrc: "/mock/main12.jpg",
    brandName: "소담 브라이덜",
    description: "섬세한 자수 디테일의 국내 디자이너 브랜드",
    url: "https://sodam-bridal.kr",
    priceRange: "400",
  },
  {
    id: "elysian",
    imageSrc: "/mock/main13.jpg",
    brandName: "ELYSIAN ATELIER",
    description: "맞춤 제작 전문의 아틀리에 웨딩 드레스",
    url: "https://elysianatelier.co.kr",
    priceRange: "400",
  },
  // 500만원대
  {
    id: "pronovias",
    imageSrc: "/mock/main14.jpg",
    brandName: "PRONOVIAS KOREA",
    description: "스페인 프리미엄 브랜드의 한국 공식 매장",
    url: "https://pronovias.co.kr",
    priceRange: "500",
  },
  {
    id: "joonil",
    imageSrc: "/mock/main1.png",
    brandName: "준일 브라이덜",
    description: "40년 전통의 한국 대표 웨딩드레스 하우스",
    url: "https://joonil-bridal.co.kr",
    priceRange: "500",
  },
  {
    id: "celine",
    imageSrc: "/mock/main2.png",
    brandName: "CÉLINE BRIDAL",
    description: "정교한 비즈 자수와 최고급 레이스 소재",
    url: "https://celinebridal.kr",
    priceRange: "500",
  },
  // 600만원대
  {
    id: "moncheri",
    imageSrc: "/mock/main3.png",
    brandName: "MON CHERI COUTURE",
    description: "오트쿠튀르 기법으로 완성한 럭셔리 드레스",
    url: "https://monchericouture.kr",
    priceRange: "600",
  },
  {
    id: "elie",
    imageSrc: "/mock/main4.png",
    brandName: "ELIE SAAB BRIDAL",
    description: "레바논 출신 세계적 디자이너의 브라이덜 라인",
    url: "https://eliesaab-bridal.co.kr",
    priceRange: "600",
  },
  {
    id: "junko",
    imageSrc: "/mock/main5.jpg",
    brandName: "준코 브라이덜",
    description: "화려한 볼륨과 정교한 수공예 디테일",
    url: "https://junko-bridal.co.kr",
    priceRange: "600",
  },
  // 700만원대
  {
    id: "valli",
    imageSrc: "/mock/main6.jpg",
    brandName: "GIAMBATTISTA VALLI",
    description: "이탈리아 로마를 대표하는 쿠튀르 하우스",
    url: "https://giambattistavalli-bridal.co.kr",
    priceRange: "700",
  },
  {
    id: "oscar",
    imageSrc: "/mock/main7.jpg",
    brandName: "OSCAR DE LA RENTA",
    description: "뉴욕 하이패션의 정수, 전통과 혁신의 조화",
    url: "https://oscardelarenta-bridal.kr",
    priceRange: "700",
  },
  {
    id: "marchesa",
    imageSrc: "/mock/main8.jpg",
    brandName: "MARCHESA BRIDAL",
    description: "플로럴 자수와 오간자의 환상적인 앙상블",
    url: "https://marchesa-bridal.co.kr",
    priceRange: "700",
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
