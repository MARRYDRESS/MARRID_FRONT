"use client";

import { useMemo, useState } from "react";
import styled, { css } from "styled-components";
import font from "@/src/style/font";
import color from "@/src/style/color";
import SlideButton from "@/src/components/common/slideBtn";
import type { SelectMockItem } from "@/src/mock/mock";

type SelectSectionProps = {
  id?: string;
  title: string;
  items: SelectMockItem[];
  /** 피그마 홀 선택 화면과 같이 슬라이드 페이지 인디케이터를 표시합니다. */
  showPaginationDots?: boolean;
  /** 제목 타이포그래피 (기본 `md` = 홈 드레스 선택 섹션과 동일) */
  titleVariant?: "md" | "sm";
  /**
   * `hall`: 피그마 「홀 선택」(node 90:185) 레이아웃 — 절대 배치 제목, 1671×754 캐러셀, 슬라이드 버튼 좌표, 6개 도트.
   */
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
          <HallStrip>
            {pages.length > 1 ? (
              <>
                <HallSlideBtnWrap $role="left">
                  <SlideButton direction="left" variant="light" onClick={handlePrev} />
                </HallSlideBtnWrap>
                <HallSlideBtnWrap $role="ghost" aria-hidden>
                  <SlideButton direction="left" variant="light" disabled />
                </HallSlideBtnWrap>
                <HallSlideBtnWrap $role="right">
                  <SlideButton direction="right" variant="light" onClick={handleNext} />
                </HallSlideBtnWrap>
              </>
            ) : null}

            <Viewport $layout={layout}>
              <Track
                $layout={layout}
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
          </HallStrip>
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

          <Viewport $layout={layout}>
            <Track
              $layout={layout}
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
        isHall ? (
          <DotsRowHall aria-hidden>
            {pages.length === 2
              ? [0, 1, 2, 3, 4, 5].map((i) => (
                  <DotHall
                    key={i}
                    $active={
                      (activeDotIndex === 0 && i === 0) ||
                      (activeDotIndex === 1 && i === 3)
                    }
                  />
                ))
              : pages.map((_, i) => (
                  <DotHall key={i} $active={i === activeDotIndex} />
                ))}
          </DotsRowHall>
        ) : (
          <DotsRow aria-hidden>
            {pages.map((_, i) => (
              <Dot key={i} $active={i === activeDotIndex} />
            ))}
          </DotsRow>
        )
      ) : null}
    </Section>
  );
}

/** 피그마 홀 선택 캐러셀 래퍼 가로 (node 90:164) — 슬라이드 버튼 좌표 기준 */
const HALL_STRIP_W = 1671;

const Section = styled.section<{ $layout: "default" | "hall" }>`
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
  max-width: ${({ $layout }) => ($layout === "hall" ? "none" : "1440px")};
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
            ? "clamp(20px, 4vh, 48px) 0 clamp(12px, 2vh, 32px)"
            : "48px 0"};
          text-align: center;
          white-space: normal;
          ${$variant === "sm" ? font["title-sm"] : font["title-md"]};
        `}
`;

const HallSliderBody = styled.div`
  box-sizing: border-box;
  padding-top: 152px;
`;

const HallStrip = styled.div`
  position: relative;
  width: min(100%, ${HALL_STRIP_W}px);
  height: 754px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const HallSlideBtnWrap = styled.div<{ $role: "left" | "right" | "ghost" }>`
  position: absolute;
  z-index: 2;
  top: 329px;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $role }) =>
    $role === "left"
      ? css`
          left: ${(253 / HALL_STRIP_W) * 100}%;
        `
      : $role === "ghost"
        ? css`
            left: ${(1187 / HALL_STRIP_W) * 100}%;
            opacity: 0.2;
            pointer-events: none;
          `
        : css`
            left: ${(1596 / HALL_STRIP_W) * 100}%;
          `}
`;

const Viewport = styled.div<{ $layout: "default" | "hall" }>`
  width: 100%;
  overflow: hidden;
  ${({ $layout }) =>
    $layout === "hall"
      ? css`
          position: absolute;
          inset: 0;
        `
      : ""}
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
  $layout: "default" | "hall";
  $trackIndex: number;
  $isTransitionEnabled: boolean;
}>`
  display: flex;
  transform: translate3d(-${({ $trackIndex }) => $trackIndex * 100}%, 0, 0);
  transition: ${({ $isTransitionEnabled }) =>
    $isTransitionEnabled ? "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)" : "none"};
  will-change: transform;
  ${({ $layout }) =>
    $layout === "hall"
      ? css`
          height: 100%;
          min-height: 100%;
        `
      : ""}
`;

const Page = styled.div<{ $layout: "default" | "hall" }>`
  flex: 0 0 100%;
  display: flex;
  gap: 40px;
  ${({ $layout }) =>
    $layout === "hall"
      ? css`
          height: 100%;
          align-items: flex-start;
        `
      : ""}
`;

const Card = styled.article<{ $layout: "default" | "hall" }>`
  overflow: hidden;
  background: transparent;
  ${({ $layout }) =>
    $layout === "hall"
      ? css`
          flex: 0 0 calc((100% - 80px) / 3);
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        `
      : css`
          flex: 0 0 calc((100% - 80px) / 3);
        `}
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
  ${font["title-sm"]};
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

const DotsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 24px 0 0;
`;

const Dot = styled.span<{ $active: boolean }>`
  box-sizing: border-box;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid ${color.gray900};
  background: ${({ $active }) => ($active ? color.gray900 : "transparent")};
  flex-shrink: 0;
`;

const DotsRowHall = styled.div`
  position: absolute;
  left: 50%;
  top: 948px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 2;
`;

const DotHall = styled.span<{ $active: boolean }>`
  box-sizing: border-box;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid ${color.gray900};
  background: ${({ $active }) => ($active ? color.gray900 : "transparent")};
`;

