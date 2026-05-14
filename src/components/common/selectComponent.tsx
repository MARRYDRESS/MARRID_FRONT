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
  items: SelectMockItem[];
  showPaginationDots?: boolean;
  titleVariant?: "md" | "sm";
  layout?: "default" | "hall";
  /**
   * true면 카드 딤(호버·선택)이 문서 바깥 클릭으로 풀리지 않고,
   * 마지막으로 포인터가 올라간 카드 딤이 Next로 페이지 이탈할 때까지 유지됩니다. (홀 선택 등)
   */
  keepDimUntilNext?: boolean;
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
  items,
  showPaginationDots = false,
  titleVariant = "md",
  layout = "default",
  keepDimUntilNext = false,
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
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedCardKey((prev) => (prev === itemKey ? null : itemKey));
                }
              }}
              onClick={() =>
                setSelectedCardKey((prev) => (prev === itemKey ? null : itemKey))
              }
            >
              <CardImageWrap $layout={pageLayout}>
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
      <Title $variant={titleVariant} $layout={layout}>
        {title}
      </Title>

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

const Title = styled.h2<{ $variant: "md" | "sm"; $layout: "default" | "hall" }>`
  color: ${color.gray900};
  ${({ $layout, $variant }) =>
    $layout === "hall"
      ? css`
          position: absolute;
          left: calc(50% - 190px);
          top: 98px;
          margin: 0;
          padding: 0;
          z-index: 3;
          white-space: nowrap;
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
  padding-top: 160px;
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

const CardImageWrap = styled.div<{ $layout: "default" | "hall" }>`
  position: relative;
  width: 100%;
  aspect-ratio: 607 / 710;
  overflow: hidden;
  flex-shrink: 0;
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
