"use client";

import { useMemo, useState } from "react";
import styled from "styled-components";
import font from "@/src/style/font";
import color from "@/src/style/color";
import SlideButton from "@/src/components/common/slideBtn";

type SelectSectionProps = {
  id?: string;
  title: string;
  images: string[];
};

export default function SelectComponent({ id, title, images }: SelectSectionProps) {
  const VISIBLE_COUNT = 3;
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = useMemo(() => {
    if (images.length <= VISIBLE_COUNT) {
      return 0;
    }

    return images.length - VISIBLE_COUNT;
  }, [images.length]);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  const handlePrev = () => {
    if (!canGoPrev) {
      return;
    }
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!canGoNext) {
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <Section id={id}>
      <Title>{title}</Title>
      <SliderFrame>
        <SlideBtnWrap $position="left">
          <SlideButton direction="left" variant="dark" onClick={handlePrev} disabled={!canGoPrev} />
        </SlideBtnWrap>

        <SlideBtnWrap $position="right">
          <SlideButton direction="right" variant="dark" onClick={handleNext} disabled={!canGoNext} />
        </SlideBtnWrap>

        <Viewport>
        <Track $currentIndex={currentIndex}>
          {images.map((src, index) => (
            <Card key={`${src}-${index}`}>
              <CardImageWrap>
                <CardImage src={src} alt={`드레스 추천 이미지 ${index + 1}`} />
              </CardImageWrap>
              <CardLabel>미카도 실크</CardLabel>
            </Card>
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

const Track = styled.div<{ $currentIndex: number }>`
  display: flex;
  gap: 40px;
  transform: translateX(calc((100% + 40px) / 3 * -${({ $currentIndex }) => $currentIndex}));
  transition: transform 0.32s ease;
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

