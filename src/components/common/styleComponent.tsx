"use client";

import styled from "styled-components";
import font from "@/src/style/font";
import color from "@/src/style/color";
import StyleHashTag from "@/src/components/common/styleHashTag";

export type StyleComponentProps = {
  imageSrc: string;
  label: string;
  hashtags: string[];
  imageAlt?: string;
};

export default function StyleComponent({
  imageSrc,
  label,
  hashtags,
  imageAlt,
}: StyleComponentProps) {
  return (
    <Article tabIndex={0}>
      <Visual>
        <ImageWrap>
          <CardImage
            src={imageSrc}
            alt={imageAlt ?? `${label} 스타일`}
            loading="lazy"
          />
        </ImageWrap>
        <HoverOverlay aria-hidden>
          <TagRow>
            {hashtags.map((tag) => (
              <StyleHashTag key={tag} label={tag} />
            ))}
          </TagRow>
        </HoverOverlay>
      </Visual>
      <Caption>{label}</Caption>
    </Article>
  );
}

const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.26);
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
  outline: none;

  &:focus-visible {
    outline: 2px solid ${color.primary};
    outline-offset: 4px;
  }

  &:hover ${HoverOverlay},
  &:focus-within ${HoverOverlay} {
    opacity: 1;
  }
`;

const Visual = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const ImageWrap = styled.div`
  width: 100%;
  aspect-ratio: 607 / 710;
  overflow: hidden;
`;

const CardImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0 16px;
`;

const Caption = styled.p`
  margin: 0;
  width: 100%;
  text-align: center;
  ${font["title-sm"]};
  color: ${color.black};
`;
