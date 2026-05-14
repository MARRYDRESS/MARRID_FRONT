"use client";

import { useMemo, useState } from "react";
import styled, { css } from "styled-components";
import font from "@/src/style/font";
import color from "@/src/style/color";
import SlideButton from "@/src/components/common/slideBtn";
import SliderPaginationDots from "@/src/components/common/sliderPaginationDots";
import type { SelectMockItem } from "@/src/mock/mock";

type SelectSectionProps = {
  id?: string;
  title: string;
  items: SelectMockItem[];
  showPaginationDots?: boolean;
  titleVariant?: "md" | "sm";
  layout?: "default" | "hall";
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
}: SelectSectionProps) {
  const VISIBLE_COUNT = 3;
  const [trackIndex, setTrackIndex] = useState(1);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const pages = useMemo(() => {
    if (items.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(items.length / VISIBLE_COUNT);

    return Array.from({ length: pageCount }, (_, pageIndex) => {
      const start = pageIndex * VISIBLE_COUNT;
      return Array.from({ length: VISIBLE_COUNT }, (_, offset) => {
        const index = (start + offset) % items.length;
        return items[index];
      });
    });
  }, [items]);

  const loopedPages = useMemo(() => {
    if (pages.length === 0) {
      return [];
    }
    if (pages.length === 1) {
      return [pages[0], pages[0], pages[0]];
    }
    return [pages[pages.length - 1], ...pages, pages[0]];
  }, [pages]);

  const handlePrev = () => {
    if (pages.length === 0 || isAnimating) {
      return;
    }
    setIsTransitionEnabled(true);
    setIsAnimating(true);
    setTrackIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (pages.length === 0 || isAnimating) {
      return;
    }
    setIsTransitionEnabled(true);
    setIsAnimating(true);
    setTrackIndex((prev) => prev + 1);
  };

  const handleTrackTransitionEnd = () => {
    if (pages.length === 0) {
      setIsAnimating(false);
      return;
    }

    if (pages.length === 1) {
      setIsTransitionEnabled(false);
      setTrackIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitionEnabled(true));
      });
      setIsAnimating(false);
      return;
    }

    if (trackIndex === 0) {
      setIsTransitionEnabled(false);
      setTrackIndex(pages.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitionEnabled(true));
      });
      setIsAnimating(false);
      return;
    }

    if (trackIndex === pages.length + 1) {
      setIsTransitionEnabled(false);
      setTrackIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitionEnabled(true));
      });
      setIsAnimating(false);
      return;
    }

    setIsAnimating(false);
  };

  const activeDotIndex = useMemo(() => {
    const n = pages.length;
    if (n <= 1) {
      return 0;
    }
    if (trackIndex === 0) {
      return n - 1;
    }
    if (trackIndex === n + 1) {
      return 0;
    }
    return trackIndex - 1;
  }, [pages.length, trackIndex]);

  const isHall = layout === "hall";

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
                {loopedPages.map((page, pageIndex) => (
                  <Page key={`page-${pageIndex}`} $layout={layout}>
                    {page.map((item, cardIndex) => (
                      <Card key={`${item.image}-${pageIndex}-${cardIndex}`} $layout={layout}>
                        <CardImageWrap>
                          <CardImage
                            src={item.image}
                            alt={`${item.label} 이미지 ${pageIndex * VISIBLE_COUNT + cardIndex + 1}`}
                          />
                        </CardImageWrap>
                        <CardLabel $layout={layout}>{item.label}</CardLabel>
                      </Card>
                    ))}
                  </Page>
                ))}
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
              {loopedPages.map((page, pageIndex) => (
                <Page key={`page-${pageIndex}`} $layout={layout}>
                  {page.map((item, cardIndex) => (
                    <Card key={`${item.image}-${pageIndex}-${cardIndex}`} $layout={layout}>
                      <CardImageWrap>
                        <CardImage
                          src={item.image}
                          alt={`${item.label} 이미지 ${pageIndex * VISIBLE_COUNT + cardIndex + 1}`}
                        />
                      </CardImageWrap>
                      <CardLabel $layout={layout}>{item.label}</CardLabel>
                    </Card>
                  ))}
                </Page>
              ))}
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

const Viewport = styled.div`
  width: 100%;
  overflow: hidden;
`;

const SliderFrame = styled.div`
  position: relative;
`;

const SlideBtnWrap = styled.div<{ $position: "left" | "right" }>`
  position: absolute;
  top: 50%;
  z-index: 2;
  transform: translateY(-50%);
  ${({ $position }) => ($position === "left" ? "left: 24px;" : "right: 24px;")}
`;

const Track = styled.div<{
  $trackIndex: number;
  $isTransitionEnabled: boolean;
}>`
  display: flex;
  transform: translate3d(-${({ $trackIndex }) => $trackIndex * 100}%, 0, 0);
  transition: ${({ $isTransitionEnabled }) =>
    $isTransitionEnabled ? "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)" : "none"};
  will-change: transform;
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

const Card = styled.article<{ $layout: "default" | "hall" }>`
  overflow: hidden;
  background: transparent;
  flex: 1 1 0;
  min-width: 0;
  ${({ $layout }) =>
    $layout === "hall"
      ? css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        `
      : ""}
`;

const CardImageWrap = styled.div`
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

