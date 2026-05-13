"use client";

import { useMemo, useState } from "react";
import styled from "styled-components";
import font from "@/src/style/font";
import color from "@/src/style/color";
import SlideButton from "@/src/components/common/slideBtn";
import type { SelectMockItem } from "@/src/mock/mock";

type SelectSectionProps = {
  id?: string;
  title: string;
  items: SelectMockItem[];
};

export default function SelectComponent(props: SelectSectionProps) {
  return <SelectComponentInner key={props.items.length} {...props} />;
}

function SelectComponentInner({ id, title, items }: SelectSectionProps) {
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

  return (
    <Section id={id}>
      <Title>{title}</Title>
      <SliderFrame>
      {pages.length > 1 && (
          <>
            <SlideBtnWrap $position="left">
              <SlideButton direction="left" variant="light" onClick={handlePrev} />
            </SlideBtnWrap>
            <SlideBtnWrap $position="right">
              <SlideButton direction="right" variant="light" onClick={handleNext} />
            </SlideBtnWrap>
          </>
        )}

        <Viewport>
          <Track
            $trackIndex={trackIndex}
            $isTransitionEnabled={isTransitionEnabled}
            onTransitionEnd={handleTrackTransitionEnd}
          >
            {loopedPages.map((page, pageIndex) => (
              <Page key={`page-${pageIndex}`}>
                {page.map((item, cardIndex) => (
                  <Card key={`${item.image}-${pageIndex}-${cardIndex}`}>
                    <CardImageWrap>
                      <CardImage
                        src={item.image}
                        alt={`${item.label} 이미지 ${pageIndex * VISIBLE_COUNT + cardIndex + 1}`}
                      />
                    </CardImageWrap>
                    <CardLabel>{item.label}</CardLabel>
                  </Card>
                ))}
              </Page>
            ))}
          </Track>
        </Viewport>
      </SliderFrame>
    </Section>
  );
}

const Section = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
`;

const Title = styled.h2`
  padding: 48px 0;
  text-align: center;
  font-size: ${font["title-md"]};
  color: ${color.gray900};
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

const Track = styled.div<{ $trackIndex: number; $isTransitionEnabled: boolean }>`
  display: flex;
  transform: translate3d(-${({ $trackIndex }) => $trackIndex * 100}%, 0, 0);
  transition: ${({ $isTransitionEnabled }) =>
    $isTransitionEnabled ? "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)" : "none"};
  will-change: transform;
`;

const Page = styled.div`
  flex: 0 0 100%;
  display: flex;
  gap: 40px;
`;

const Card = styled.article`
  flex: 0 0 calc((100% - 80px) / 3);
  overflow: hidden;
  background: transparent;
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

const CardLabel = styled.p`
  padding: 12px 0;
  text-align: center;
  font-size: ${font["title-sm"]};
  color: ${color.black};
`;

