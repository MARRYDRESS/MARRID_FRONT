"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import color from "@/src/style/color";
import font from "@/src/style/font";
import Header from "@/src/components/layout/header";
import {
  dressFilterTagOptions,
  dressGalleryItems,
  brandList,
  type DressFilterTag,
} from "@/src/mock/mock";

const TABS = ["전체보기", "가격별로 보기", "브랜드 별로 보기", "추구미별로 보기"] as const;
type Tab = (typeof TABS)[number];

function ChevronIcon({ $expanded }: { $expanded: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      style={{
        transform: $expanded ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease",
        display: "block",
      }}
    >
      <path
        d="M2 4l4 4 4-4"
        stroke={color.gray700}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationPin() {
  return (
    <svg width="10" height="13" viewBox="0 0 10 13" fill="none">
      <path
        d="M5 0C2.79 0 1 1.79 1 4c0 2.99 4 9 4 9s4-6.01 4-9c0-2.21-1.79-4-4-4zm0 5.5A1.5 1.5 0 115 2.5a1.5 1.5 0 010 3z"
        fill={color.gray400}
      />
    </svg>
  );
}

export default function DressPage() {
  const [activeTab, setActiveTab] = useState<Tab>("전체보기");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brandsExpanded, setBrandsExpanded] = useState(false);

  const showTagFilter = activeTab === "추구미별로 보기";
  const showBrandFilter = activeTab === "브랜드 별로 보기";

  const toggleTag = useCallback((tag: string) => {
    if (tag === "#전체") { setSelectedTags([]); return; }
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const toggleBrand = useCallback((brand: string) => {
    if (brand === "전체") { setSelectedBrands([]); return; }
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  }, []);

  const visibleItems = useMemo(() => {
    if (showTagFilter && selectedTags.length > 0)
      return dressGalleryItems.filter((item) =>
        selectedTags.some((t) => item.filterTags.includes(t as DressFilterTag))
      );
    if (showBrandFilter && selectedBrands.length > 0)
      return dressGalleryItems.filter((item) => selectedBrands.includes(item.shopName));
    return dressGalleryItems;
  }, [showTagFilter, showBrandFilter, selectedTags, selectedBrands]);

  return (
    <Shell>
      <Header forceScrolled />

      <Inner>
        <HeadingGroup>
          <Sub>세상의 모든 드레스,</Sub>
          <Title>궁금했던 드레스를 입어보세요</Title>
        </HeadingGroup>
      </Inner>

      <TabBar>
        <TabInner>
          {TABS.map((tab) => (
            <TabBtn
              key={tab}
              type="button"
              $active={activeTab === tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedTags([]);
                setSelectedBrands([]);
                setBrandsExpanded(false);
              }}
            >
              {tab}
            </TabBtn>
          ))}
        </TabInner>
      </TabBar>

      {showTagFilter && (
        <FilterRow>
          <FilterInner>
            {(["#전체", ...dressFilterTagOptions] as const).map((tag) => (
              <FilterChip
                key={tag}
                type="button"
                $active={tag === "#전체" ? selectedTags.length === 0 : selectedTags.includes(tag)}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </FilterChip>
            ))}
          </FilterInner>
        </FilterRow>
      )}

      {showBrandFilter && (
        <FilterRow $expanded={brandsExpanded}>
          <FilterInner $wrap={brandsExpanded}>
            <FilterChip
              type="button"
              $active={selectedBrands.length === 0}
              onClick={() => toggleBrand("전체")}
            >
              전체
            </FilterChip>
            {brandList.map((brand) => (
              <FilterChip
                key={brand}
                type="button"
                $active={selectedBrands.includes(brand)}
                onClick={() => toggleBrand(brand)}
              >
                {brand}
              </FilterChip>
            ))}
          </FilterInner>
          <ExpandBtn
            type="button"
            onClick={() => setBrandsExpanded((v) => !v)}
            aria-label={brandsExpanded ? "접기" : "더 보기"}
          >
            <ChevronIcon $expanded={brandsExpanded} />
          </ExpandBtn>
        </FilterRow>
      )}

      <Inner>
        {visibleItems.length === 0 ? (
          <Empty>이 스타일에 맞는 드레스가 없어요.</Empty>
        ) : (
          <DressGrid>
            {visibleItems.map((item) => (
              <DressCard key={item.id}>
                <ImageArea>
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    sizes="(max-width: 1200px) 25vw, 294px"
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                  <HoverOverlay className="dress-hover">
                    <FittingPill href="/fitting">AI 피팅하기</FittingPill>
                  </HoverOverlay>
                </ImageArea>
                <InfoBar>
                  <DressName>{item.label}</DressName>
                  <ShopRow>
                    <LocationPin />
                    <ShopName>{item.shopName}</ShopName>
                  </ShopRow>
                </InfoBar>
              </DressCard>
            ))}
          </DressGrid>
        )}
      </Inner>
    </Shell>
  );
}

const Shell = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100dvh;
  padding-top: 64px;
  background: ${color.white};
  color: ${color.black};
`;

const Inner = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 85px);
`;

const HeadingGroup = styled.div`
  padding: clamp(48px, 8vw, 120px) 0 32px;
`;

const Sub = styled.p`
  margin: 0;
  ${font["title-sm"]};
  color: ${color.black};
`;

const Title = styled.h1`
  margin: 0;
  ${font["title-md"]};
  color: ${color.black};
`;

const TabBar = styled.nav`
  width: 100%;
  border-bottom: 1px solid ${color.gray300};
  height: 69px;
  display: flex;
  align-items: stretch;
`;

const TabInner = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 85px);
  display: flex;
  align-items: stretch;
  gap: 56px;
`;

const TabBtn = styled.button<{ $active: boolean }>`
  position: relative;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  ${font["text-sm"]};
  color: ${({ $active }) => ($active ? color.gray900 : color.gray600)};
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  white-space: nowrap;
  transition: color 0.15s;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${color.gray800};
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity 0.15s;
  }

  &:hover {
    color: ${color.gray900};
  }
`;

const FilterRow = styled.div<{ $expanded?: boolean }>`
  width: 100%;
  background: ${color.gray100};
  display: flex;
  align-items: flex-start;
  max-height: ${({ $expanded }) => ($expanded ? "400px" : "75px")};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const FilterInner = styled.div<{ $wrap?: boolean }>`
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px clamp(24px, 5vw, 79px);
  display: flex;
  align-items: center;
  flex-wrap: ${({ $wrap }) => ($wrap ? "wrap" : "nowrap")};
  gap: ${({ $wrap }) => ($wrap ? "12px 8px" : "8px")};
  overflow: ${({ $wrap }) => ($wrap ? "visible" : "hidden")};
`;

const ExpandBtn = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin: 16px clamp(12px, 3vw, 48px) 0 0;
  border: 1px solid ${color.gray300};
  border-radius: 50%;
  background: ${color.white};
  cursor: pointer;
  transition: border-color 0.15s;

  &:hover {
    border-color: ${color.gray500};
  }
`;

const FilterChip = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  padding: 8px 13px;
  border-radius: 20px;
  border: 1px solid ${({ $active }) => ($active ? color.gray900 : color.gray500)};
  background: ${({ $active }) => ($active ? color.gray900 : "transparent")};
  color: ${({ $active }) => ($active ? color.white : color.black)};
  ${font["text-sm"]};
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, color 0.15s, border-color 0.15s;

  &:hover {
    border-color: ${color.gray900};
    background: ${color.gray900};
    color: ${color.white};
  }
`;

const DressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 28px 24px;
  padding: 28px 0 80px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const DressCard = styled.article`
  display: flex;
  flex-direction: column;
  border: 1px solid ${color.gray200};
  overflow: hidden;

  &:hover .dress-hover {
    opacity: 1;
  }
`;

const ImageArea = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 294 / 378;
  overflow: hidden;
  flex-shrink: 0;
`;

const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, #505050 100%);
  opacity: 0;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 28px;
`;

const FittingPill = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 26px;
  border-radius: 20px;
  border: 1px solid ${color.white};
  background: transparent;
  color: ${color.white};
  ${font.caption};
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const InfoBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  height: 66px;
  padding: 0 24px;
  background: ${color.white};
  flex-shrink: 0;
`;

const DressName = styled.p`
  margin: 0;
  ${font["text-md"]};
  color: ${color.black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ShopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ShopName = styled.span`
  ${font.caption};
  color: ${color.gray400};
`;

const Empty = styled.p`
  padding: 80px 0;
  ${font["text-md"]};
  color: ${color.gray500};
`;
