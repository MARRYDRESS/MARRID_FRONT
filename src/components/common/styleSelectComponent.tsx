"use client";

import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import font from "@/src/style/font";
import color from "@/src/style/color";
import SlideButton from "@/src/components/common/slideBtn";
import SliderPaginationDots from "@/src/components/common/sliderPaginationDots";
import StyleHashTag from "@/src/components/common/styleHashTag";
import {
  SlideBtnWrap,
  SliderFrame,
  Track,
  Viewport,
} from "@/src/components/common/selectSlider/primitives";
import { useSelectSliderState } from "@/src/components/common/selectSlider/useSelectSliderState";
import type { StyleSelectItem } from "@/src/mock/mock";

const VISIBLE_COUNT = 4;

function styleSelectCardKey(item: StyleSelectItem): string {
  return `${item.image}|${item.label}`;
}

type StyleSelectSectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  items: StyleSelectItem[];
  showPaginationDots?: boolean;
  keepOverlayUntilNext?: boolean;
};

export default function StyleSelectComponent(props: StyleSelectSectionProps) {
  return (
    <StyleSelectComponentInner
      key={`${props.id ?? props.title}-${props.items.length}`}
      {...props}
    />
  );
}

function StyleSelectComponentInner({
  id,
  title,
  subtitle,
  items,
  showPaginationDots = false,
  keepOverlayUntilNext = false,
}: StyleSelectSectionProps) {
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

  const [styleOverlayPinnedKey, setStyleOverlayPinnedKey] = useState<string | null>(null);
  const [persistHoverKey, setPersistHoverKey] = useState<string | null>(null);

  useEffect(() => {
    if (keepOverlayUntilNext || styleOverlayPinnedKey == null) {
      return;
    }
    const onDocPointerDown = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el?.closest("[data-style-select-card]")) {
        setStyleOverlayPinnedKey(null);
      }
    };
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [styleOverlayPinnedKey]);

  return (
    <Section id={id}>
      <TitleStack>
        <TitleMain>{title}</TitleMain>
        {subtitle ? <TitleSub>{subtitle}</TitleSub> : null}
      </TitleStack>

      <StyleSliderShell>
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
              {loopedPages.map((page, pageIndex) => (
                <Page key={`page-${pageIndex}`}>
                  {page.map((item, cardIndex) => {
                    const cardKey = styleSelectCardKey(item);
                    const showHash = item.hashtags.length > 0;
                    const overlayShown =
                      showHash &&
                      (styleOverlayPinnedKey === cardKey ||
                        (keepOverlayUntilNext &&
                          styleOverlayPinnedKey == null &&
                          persistHoverKey === cardKey));

                    return (
                      <Card
                        key={`${item.image}-${pageIndex}-${cardIndex}`}
                        $overlayOpen={overlayShown}
                        $useCssHoverOverlay={showHash && !keepOverlayUntilNext}
                        $hashInteractive={showHash}
                        data-style-select-card={showHash ? "" : undefined}
                        onMouseEnter={() => {
                          if (keepOverlayUntilNext && showHash) {
                            setPersistHoverKey(cardKey);
                          }
                        }}
                        onClick={
                          showHash
                            ? () =>
                                setStyleOverlayPinnedKey((prev) =>
                                  prev === cardKey ? null : cardKey
                                )
                            : undefined
                        }
                      >
                        <CardImageWrap>
                          <CardImage
                            src={item.image}
                            alt={`${item.label} 이미지 ${pageIndex * VISIBLE_COUNT + cardIndex + 1}`}
                          />
                          {showHash ? (
                            <HashTagOverlay
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <HashTagRow>
                                {item.hashtags.map((tag) => (
                                  <StyleHashTag key={tag} label={tag} />
                                ))}
                              </HashTagRow>
                            </HashTagOverlay>
                          ) : null}
                        </CardImageWrap>
                        <CardLabel>{item.label}</CardLabel>
                      </Card>
                    );
                  })}
                </Page>
              ))}
            </Track>
          </Viewport>
        </SliderFrame>
      </StyleSliderShell>

      {showPaginationDots && pages.length > 1 ? (
        <SliderPaginationDots
          totalPages={pages.length}
          activeIndex={activeDotIndex}
          placement="floatingAvatarFlow"
        />
      ) : null}
    </Section>
  );
}

const Section = styled.section`
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
  padding: 0 clamp(16px, 3vw, 32px);
  position: relative;
  min-height: min(100dvh, 1024px);
`;

const TitleStack = styled.div`
  position: absolute;
  left: 50%;
  top: 92px;
  z-index: 3;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
  max-width: min(320px, calc(100vw - 48px));
`;

const TitleMain = styled.h2`
  margin: 0;
  padding: 0;
  color: ${color.black};
  font-weight: inherit;
  ${font["title-sm"]};
`;

const TitleSub = styled.p`
  margin: 0;
  padding: 0;
  color: ${color.black};
  ${font["text-lg"]};
`;

const StyleSliderShell = styled.div`
  box-sizing: border-box;
  padding-top: 196px;
`;

const Page = styled.div`
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
`;

const HashTagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  align-items: center;
  max-width: 100%;
`;

const HashTagOverlay = styled.div`
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background: rgba(0, 0, 0, 0.25);
  opacity: 0;
  transition: opacity 0.22s ease;
  z-index: 1;
`;

const Card = styled.article<{
  $overlayOpen?: boolean;
  $useCssHoverOverlay?: boolean;
  $hashInteractive?: boolean;
}>`
  overflow: hidden;
  background: transparent;
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  ${({ $hashInteractive }) =>
    $hashInteractive
      ? css`
          cursor: pointer;
        `
      : ""}

  ${({ $useCssHoverOverlay }) =>
    $useCssHoverOverlay
      ? css`
          &:hover ${HashTagOverlay} {
            opacity: 1;
          }
        `
      : ""}

  ${({ $overlayOpen }) =>
    $overlayOpen
      ? css`
          & ${HashTagOverlay} {
            opacity: 1;
          }
        `
      : ""}
`;

const CardImageWrap = styled.div`
  width: 100%;
  aspect-ratio: 311 / 411;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
`;

const CardImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const CardLabel = styled.p`
  margin: 0;
  padding: 0;
  text-align: center;
  ${font["text-md"]};
  color: ${color.black};
`;
