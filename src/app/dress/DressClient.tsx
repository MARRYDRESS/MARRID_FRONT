"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import color from "@/src/style/color";
import font from "@/src/style/font";
import Header from "@/src/components/layout/header";
import type { Dress } from "./page";

const TABS = [
  "전체보기",
  "가격별로 보기",
  "브랜드 별로 보기",
  "추구미별로 보기",
  "소재별로 보기",
] as const;
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

export default function DressClient({ dresses }: { dresses: Dress[] }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("전체보기");
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSilhouettes, setSelectedSilhouettes] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [brandsExpanded, setBrandsExpanded] = useState(false);

  const prices = useMemo(
    () =>
      [...new Set(dresses.map((d) => d.price_range).filter((p): p is number => p !== null))].sort(
        (a, b) => a - b
      ),
    [dresses]
  );
  const brands = useMemo(
    () => [...new Set(dresses.map((d) => d.shop_name).filter(Boolean))].sort(),
    [dresses]
  );
  const silhouettes = useMemo(
    () => [...new Set(dresses.map((d) => d.silhouette.trim()).filter(Boolean))].sort(),
    [dresses]
  );
  const materials = useMemo(
    () => [...new Set(dresses.map((d) => d.material.trim()).filter(Boolean))].sort(),
    [dresses]
  );

  const resetFilters = () => {
    setSelectedPrices([]);
    setSelectedBrands([]);
    setSelectedSilhouettes([]);
    setSelectedMaterials([]);
    setBrandsExpanded(false);
  };

  const togglePrice = useCallback((p: number) => {
    setSelectedPrices((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }, []);

  const toggleBrand = useCallback((b: string) => {
    if (b === "전체") { setSelectedBrands([]); return; }
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );
  }, []);

  const toggleSilhouette = useCallback((s: string) => {
    if (s === "전체") { setSelectedSilhouettes([]); return; }
    setSelectedSilhouettes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }, []);

  const toggleMaterial = useCallback((m: string) => {
    if (m === "전체") { setSelectedMaterials([]); return; }
    setSelectedMaterials((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  }, []);

  const visibleItems = useMemo(() => {
    if (activeTab === "가격별로 보기" && selectedPrices.length > 0)
      return dresses.filter((d) => d.price_range !== null && selectedPrices.includes(d.price_range));
    if (activeTab === "브랜드 별로 보기" && selectedBrands.length > 0)
      return dresses.filter((d) => selectedBrands.includes(d.shop_name));
    if (activeTab === "추구미별로 보기" && selectedSilhouettes.length > 0)
      return dresses.filter((d) => selectedSilhouettes.includes(d.silhouette.trim()));
    if (activeTab === "소재별로 보기" && selectedMaterials.length > 0)
      return dresses.filter((d) => selectedMaterials.includes(d.material.trim()));
    return dresses;
  }, [activeTab, dresses, selectedPrices, selectedBrands, selectedSilhouettes, selectedMaterials]);

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
              onClick={() => { setActiveTab(tab); resetFilters(); }}
            >
              {tab}
            </TabBtn>
          ))}
        </TabInner>
      </TabBar>

      {activeTab === "가격별로 보기" && (
        <FilterRow>
          <FilterInner>
            <FilterChip
              type="button"
              $active={selectedPrices.length === 0}
              onClick={() => setSelectedPrices([])}
            >
              전체
            </FilterChip>
            {prices.map((p) => (
              <FilterChip
                key={p}
                type="button"
                $active={selectedPrices.includes(p)}
                onClick={() => togglePrice(p)}
              >
                {p}만원대
              </FilterChip>
            ))}
          </FilterInner>
        </FilterRow>
      )}

      {activeTab === "브랜드 별로 보기" && (
        <FilterRow $expanded={brandsExpanded}>
          <FilterInner $wrap={brandsExpanded}>
            <FilterChip
              type="button"
              $active={selectedBrands.length === 0}
              onClick={() => toggleBrand("전체")}
            >
              전체
            </FilterChip>
            {brands.map((b) => (
              <FilterChip
                key={b}
                type="button"
                $active={selectedBrands.includes(b)}
                onClick={() => toggleBrand(b)}
              >
                {b}
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

      {activeTab === "추구미별로 보기" && (
        <FilterRow>
          <FilterInner>
            <FilterChip
              type="button"
              $active={selectedSilhouettes.length === 0}
              onClick={() => toggleSilhouette("전체")}
            >
              전체
            </FilterChip>
            {silhouettes.map((s) => (
              <FilterChip
                key={s}
                type="button"
                $active={selectedSilhouettes.includes(s)}
                onClick={() => toggleSilhouette(s)}
              >
                {s}
              </FilterChip>
            ))}
          </FilterInner>
        </FilterRow>
      )}

      {activeTab === "소재별로 보기" && (
        <FilterRow>
          <FilterInner>
            <FilterChip
              type="button"
              $active={selectedMaterials.length === 0}
              onClick={() => toggleMaterial("전체")}
            >
              전체
            </FilterChip>
            {materials.map((m) => (
              <FilterChip
                key={m}
                type="button"
                $active={selectedMaterials.includes(m)}
                onClick={() => toggleMaterial(m)}
              >
                {m}
              </FilterChip>
            ))}
          </FilterInner>
        </FilterRow>
      )}

      <Inner>
        {visibleItems.length === 0 ? (
          <Empty>이 조건에 맞는 드레스가 없어요.</Empty>
        ) : (
          <DressGrid>
            {visibleItems.map((item) => (
              <DressCard key={item.id}>
                <ImageArea>
                  <Image
                    src={item.image_url}
                    alt={`${item.silhouette} ${item.material}`}
                    fill
                    sizes="(max-width: 480px) 100vw, (max-width: 760px) 50vw, (max-width: 1100px) 33vw, 25vw"
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                  <HoverOverlay className="dress-hover">
                    <FittingPill
                      type="button"
                      onClick={() => {
                        sessionStorage.setItem("marrid_dress_url", item.image_url);
                        router.push("/fitting");
                      }}
                    >
                      AI 피팅하기
                    </FittingPill>
                  </HoverOverlay>
                </ImageArea>
                <InfoBar>
                  <DressName>{item.silhouette.trim()} {item.material.trim()}</DressName>
                  <ShopRow>
                    <LocationPin />
                    <ShopName>{item.shop_name}</ShopName>
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
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
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
  flex-shrink: 0;
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

const FittingPill = styled.button`
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
  cursor: pointer;
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
