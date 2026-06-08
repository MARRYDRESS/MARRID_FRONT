"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import StyleHashTag from "@/src/components/common/styleHashTag";
import color from "@/src/style/color";
import font from "@/src/style/font";
import Header from "@/src/components/layout/header";
import {
  dressFilterTagOptions,
  dressGalleryItems,
  type DressFilterTag,
} from "@/src/mock/mock";

export default function DressPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleFilter = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const visibleItems = useMemo(() => {
    if (selectedTags.length === 0) return dressGalleryItems;
    return dressGalleryItems.filter((item) =>
      selectedTags.some((t) =>
        item.filterTags.includes(t as DressFilterTag),
      ),
    );
  }, [selectedTags]);

  return (
    <Shell>
      <Header />
      <Inner>
        <Headline>
          <TitleLine>세상의 모든 드레스,</TitleLine>
          <TitleAccent>궁금했던 드레스를 입어보세요</TitleAccent>
        </Headline>

        <FilterRow aria-label="스타일 필터">
          {dressFilterTagOptions.map((tag) => {
            const pressed = selectedTags.includes(tag);
            return (
              <FilterChip
                key={tag}
                type="button"
                $active={pressed}
                onClick={() => toggleFilter(tag)}
                aria-pressed={pressed}
              >
                {tag}
              </FilterChip>
            );
          })}
        </FilterRow>

        {visibleItems.length === 0 ? (
          <EmptyMessage>이 스타일에 맞는 드레스가 없어요.</EmptyMessage>
        ) : (
          <DressGrid>
            {visibleItems.map((item) => (
              <DressCard key={item.id}>
                <DressImageWrap>
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    sizes="(max-width: 900px) 100vw, 420px"
                    style={{ objectFit: "cover" }}
                  />
                </DressImageWrap>
                <HoverLayer className="dress-hover-layer">
                  <CardDim aria-hidden />
                  <TagCluster>
                    {item.filterTags.map((tag) => (
                      <StyleHashTag key={tag} label={tag} />
                    ))}
                  </TagCluster>
                  <FittingCta href="/fitting" aria-label="AI 피팅하기 페이지로">
                    AI 피팅하기
                  </FittingCta>
                </HoverLayer>
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
  margin: 0;
  background: ${color.white};
  color: ${color.black};
`;

const Inner = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(48px, 8vw, 120px) clamp(24px, 5vw, 85px) 80px;
`;

const Headline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  margin-bottom: 24px;
`;

const TitleLine = styled.p`
  margin: 0;
  width: 100%;
  ${font["title-sm"]};
`;

const TitleAccent = styled.p`
  margin: 0;
  width: 100%;
  ${font["title-lg"]};
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  overflow-x: auto;
  padding-bottom: 2px;
  scrollbar-width: thin;
  margin-top: 32px;

  &::-webkit-scrollbar {
    height: 6px;
  }
`;

const FilterChip = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  padding: 8px 17px;
  border-radius: 20px;
  border: 1px solid ${color.gray900};
  background: ${({ $active }) => ($active ? color.gray900 : "transparent")};
  color: ${({ $active }) => ($active ? color.white : color.gray700)};
  ${font["text-lg"]};
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: ${color.gray900};
    color: ${color.white};
  }

  &:focus-visible {
    outline: 2px solid ${color.gray900};
    outline-offset: 2px;
  }
`;

const DressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 420px));
  gap: 24px 31px;
  justify-content: start;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const DressCard = styled.article`
  position: relative;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 420 / 567;
  overflow: hidden;
  border-radius: 0;

  @media (hover: hover) and (pointer: fine) {
    &:hover .dress-hover-layer,
    &:focus-within .dress-hover-layer {
      opacity: 1;
      pointer-events: auto;
    }
  }
`;

const DressImageWrap = styled.div`
  position: absolute;
  inset: 0;
`;

const HoverLayer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  opacity: 1;
  pointer-events: auto;
  transition: opacity 0.2s ease;

  @media (hover: hover) and (pointer: fine) {
    opacity: 0;
    pointer-events: none;
  }
`;

const CardDim = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  pointer-events: none;
`;

const TagCluster = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  max-width: calc(100% - 32px);
  margin: 0 auto;
  pointer-events: none;
`;

const FittingCta = styled(Link)`
  position: absolute;
  z-index: 1;
  right: 16px;
  bottom: 16px;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  color: ${color.white};
  font-family: "Leferi Base Type", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  text-align: right;
  white-space: nowrap;
  text-decoration: none;

  &:focus-visible {
    outline: 2px solid ${color.white};
    outline-offset: 2px;
  }
`;

const EmptyMessage = styled.p`
  margin: 0;
  padding: 48px 0;
  ${font["text-md"]};
  color: ${color.gray600};
`;
