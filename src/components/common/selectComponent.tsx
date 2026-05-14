"use client";

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

const VISIBLE_COUNT = 3;

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
                        <CardImageWrap $layout={layout}>
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
                      <CardImageWrap $layout={layout}>
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

const CardImageWrap = styled.div<{ $layout: "default" | "hall" }>`
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
