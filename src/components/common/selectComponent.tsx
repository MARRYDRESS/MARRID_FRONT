"use client";

import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import font from "@/src/style/font";
import color from "@/src/style/color";
import SlideButton from "@/src/components/common/slideBtn";
import SliderPaginationDots from "@/src/components/common/sliderPaginationDots";
import {
  SlideBtnWrap,
  SliderFrame,
  Track,
  Viewport,
} from "@/src/components/common/selectSlider/primitives";
import { useSelectSliderState } from "@/src/components/common/selectSlider/useSelectSliderState";
import type { SelectMockItem } from "@/src/mock/mock";

function selectCardKey(item: SelectMockItem): string {
  return `${item.image}|${item.label}`;
}

const VISIBLE_COUNT = 3;

type SelectSectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  items: SelectMockItem[];
  showPaginationDots?: boolean;
  titleVariant?: "md" | "sm";
  layout?: "default" | "hall";
  keepDimUntilNext?: boolean;
  onSelect?: (item: SelectMockItem | null) => void;
};

export default function SelectComponent(props: SelectSectionProps) {
  return (
    <SelectComponentInner
      key={`${props.id ?? props.title}-${props.items.length}`}
      {...props}
    />
  );
}

function SelectComponentInner({
  id,
  title,
  subtitle,
  items,
  showPaginationDots = false,
  titleVariant = "md",
  layout = "default",
  keepDimUntilNext = false,
  onSelect,
}: SelectSectionProps) {
  const {
    pages,
    loopedPages,
    trackIndex,
    isTransitionEnabled,
    handlePrev,
    handleNext,
    handleTrackTransitionEnd,
    activeDotIndex,
  } = useSelectSliderState(items, VISIBLE_COUNT);

  const isHall = layout === "hall";

  const [selectedCardKey, setSelectedCardKey] = useState<string | null>(null);
  const [persistHoverKey, setPersistHoverKey] = useState<string | null>(null);

  useEffect(() => {
    if (keepDimUntilNext || selectedCardKey == null) {
      return;
    }
    const onDocPointerDown = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el?.closest("[data-select-card]")) {
        setSelectedCardKey(null);
      }
    };
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [keepDimUntilNext, selectedCardKey]);

  const renderPages = (pageLayout: "default" | "hall") =>
    loopedPages.map((page, pageIndex) => (
      <Page key={`page-${pageIndex}`} $layout={pageLayout}>
        {page.map((item, cardIndex) => {
          const itemKey = selectCardKey(item);
          const dimOpen =
            selectedCardKey === itemKey ||
            (keepDimUntilNext &&
              selectedCardKey == null &&
              persistHoverKey === itemKey);
          return (
            <Card
              key={`${item.image}-${pageIndex}-${cardIndex}`}
              $layout={pageLayout}
              $dimOpen={dimOpen}
              $useCssHoverDim={!keepDimUntilNext}
              role="button"
              tabIndex={0}
              aria-pressed={selectedCardKey === itemKey}
              data-select-card=""
              onMouseEnter={() => {
                if (keepDimUntilNext) {
                  setPersistHoverKey(itemKey);
                }
              }}
              onMouseLeave={() => {
                if (keepDimUntilNext) {
                  setPersistHoverKey(null);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  const next = selectedCardKey === itemKey ? null : itemKey;
                  setSelectedCardKey(next);
                  onSelect?.(next === null ? null : item);
                }
              }}
              onClick={() => {
                const next = selectedCardKey === itemKey ? null : itemKey;
                setSelectedCardKey(next);
                onSelect?.(next === null ? null : item);
              }}
            >
              <CardImageWrap $layout={pageLayout} $selected={selectedCardKey === itemKey}>
                <CardImage
                  src={item.image}
                  alt={`${item.label} 이미지 ${pageIndex * VISIBLE_COUNT + cardIndex + 1}`}
                />
                <CardDimOverlay aria-hidden />
              </CardImageWrap>
              <CardLabel $layout={pageLayout}>{item.label}</CardLabel>
            </Card>
          );
        })}
      </Page>
    ));

  return (
    <Section id={id} $layout={layout}>
      {isHall ? (
        <TitleStack>
          <Title $variant={titleVariant} $layout={layout}>{title}</Title>
          {subtitle && <TitleSub>{subtitle}</TitleSub>}
        </TitleStack>
      ) : (
        <Title $variant={titleVariant} $layout={layout}>{title}</Title>
      )}

      {isHall ? (
        <HallSliderBody>
          <SliderFrame>
            {pages.length > 1 ? (
              <>
                <SlideBtnWrap $position="left">
                  <SlideButton direction="left" variant="light" onClick={handlePrev} />
                </SlideBtnWrap>
                <SlideBtnWrap $position="right">
                  <SlideButton direction="right" variant="light" onClick={handleNext} />
                </SlideBtnWrap>
              </>
            ) : null}

            <Viewport>
              <Track
                $trackIndex={trackIndex}
                $isTransitionEnabled={isTransitionEnabled}
                onTransitionEnd={handleTrackTransitionEnd}
              >
                {renderPages("hall")}
              </Track>
            </Viewport>
          </SliderFrame>
        </HallSliderBody>
      ) : (
        <SliderFrame>
          {pages.length > 1 ? (
            <>
              <SlideBtnWrap $position="left">
                <SlideButton direction="left" variant="light" onClick={handlePrev} />
              </SlideBtnWrap>
              <SlideBtnWrap $position="right">
                <SlideButton direction="right" variant="light" onClick={handleNext} />
              </SlideBtnWrap>
            </>
          ) : null}

          <Viewport>
            <Track
              $trackIndex={trackIndex}
              $isTransitionEnabled={isTransitionEnabled}
              onTransitionEnd={handleTrackTransitionEnd}
            >
              {renderPages("default")}
            </Track>
          </Viewport>
        </SliderFrame>
      )}

      {showPaginationDots && pages.length > 1 ? (
        <SliderPaginationDots
          totalPages={pages.length}
          activeIndex={activeDotIndex}
          placement={isHall ? "floatingAvatarFlow" : "below"}
        />
      ) : null}
    </Section>
  );
}

const Section = styled.section<{ $layout: "default" | "hall" }>`
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
  padding: 0 clamp(16px, 3vw, 32px);
  position: ${({ $layout }) => ($layout === "hall" ? "relative" : "static")};
  min-height: ${({ $layout }) => ($layout === "hall" ? "min(100dvh, 1024px)" : "0")};
`;

const TitleStack = styled.div`
  position: absolute;
  left: 50%;
  top: 150px;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
`;

const TitleSub = styled.p`
  margin: 0;
  padding: 0;
  color: ${color.black};
  ${font["text-lg"]};
`;

const Title = styled.h2<{ $variant: "md" | "sm"; $layout: "default" | "hall" }>`
  color: ${color.gray900};
  ${({ $layout, $variant }) =>
    $layout === "hall"
      ? css`
          margin: 0;
          padding: 0;
          white-space: nowrap;
          text-align: center;
          ${$variant === "sm" ? font["title-sm"] : font["title-md"]};
        `
      : css`
          padding: ${$variant === "sm"
            ? "clamp(18px, 3vh, 40px) 0 clamp(22px, 3vh, 48px)"
            : "40px 0 56px"};
          text-align: center;
          white-space: normal;
          ${$variant === "sm" ? font["title-sm"] : font["title-md"]};
        `}
`;

const HallSliderBody = styled.div`
  box-sizing: border-box;
  padding-top: 260px;
`;

const Page = styled.div<{ $layout: "default" | "hall" }>`
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 32px;
  ${({ $layout }) =>
    $layout === "hall"
      ? css`
          align-items: flex-start;
        `
      : ""}
`;

const CardDimOverlay = styled.div`
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.25);
  opacity: 0;
  transition: opacity 0.22s ease;
  z-index: 1;
  pointer-events: none;
`;

const Card = styled.article<{
  $layout: "default" | "hall";
  $dimOpen: boolean;
  $useCssHoverDim: boolean;
}>`
  overflow: hidden;
  background: transparent;
  flex: 1 1 0;
  min-width: 0;
  cursor: pointer;
  ${({ $layout }) =>
    $layout === "hall"
      ? css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        `
      : ""}

  ${({ $useCssHoverDim }) =>
    $useCssHoverDim
      ? css`
          &:hover ${CardDimOverlay} {
            opacity: 1;
          }
        `
      : ""}

  ${({ $dimOpen }) =>
    $dimOpen
      ? css`
          & ${CardDimOverlay} {
            opacity: 1;
          }
        `
      : ""}
`;

const CardImageWrap = styled.div<{ $layout: "default" | "hall"; $selected?: boolean }>`
  position: relative;
  width: 100%;
  aspect-ratio: 607 / 710;
  overflow: hidden;
  flex-shrink: 0;

  outline: ${({ $selected }) => ($selected ? `3px solid ${color.gray600}` : "none")};
  outline-offset: -3px;
`;

const CardImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const CardLabel = styled.p<{ $layout: "default" | "hall" }>`
  text-align: center;
  ${font["text-lg"]};
  color: ${color.black};
  ${({ $layout }) =>
    $layout === "hall"
      ? css`
          margin: 0;
          padding: 0;
        `
      : css`
          padding: 12px 0;
        `}
`;
