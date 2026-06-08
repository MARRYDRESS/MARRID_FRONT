"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import color from "@/src/style/color";
import font from "@/src/style/font";

export type ShopCardProps = {
  imageSrc: string;
  brandName: string;
  description?: string;
  href: string;
};

export default function ShopCard({
  imageSrc,
  brandName,
  description,
  href,
}: ShopCardProps) {
  return (
    <Article>
      <ImageWrap>
        <Image
          src={imageSrc}
          alt={`${brandName} 브랜드 대표 이미지`}
          fill
          sizes="(max-width: 900px) 100vw, 420px"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
        <HoverOverlay>
          <FittingLink
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${brandName} 샵 방문하기`}
          >
            샵 더 알아보기
          </FittingLink>
        </HoverOverlay>
      </ImageWrap>
      <Info>
        <BrandName>{brandName}</BrandName>
        {description && <Description>{description}</Description>}
      </Info>
    </Article>
  );
}

const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 16px;
  background: rgba(0, 0, 0, 0.22);
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  &:hover ${HoverOverlay},
  &:focus-within ${HoverOverlay} {
    opacity: 1;
    pointer-events: auto;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 420 / 560;
  overflow: hidden;
  background: ${color.gray100};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BrandName = styled.p`
  margin: 0;
  ${font["title-sm"]};
  color: ${color.black};
`;

const Description = styled.p`
  margin: 0;
  ${font["text-sm"]};
  color: ${color.gray500};
`;

const FittingLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 16px;
  border-radius: 16px;
  border: 1px solid ${color.white};
  background: transparent;
  color: ${color.white};
  ${font["text-sm"]};
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  &:focus-visible {
    outline: 2px solid ${color.white};
    outline-offset: 2px;
  }
`;
