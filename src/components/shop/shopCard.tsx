"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import color from "@/src/style/color";
import font from "@/src/style/font";

export type ShopCardProps = {
  imageSrc: string;
  brandName: string;
  region?: string;
  url: string;
};

export default function ShopCard({
  imageSrc,
  brandName,
  region,
  url,
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
            href={`/shop/${url}`}
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
        {region && (
          <RegionRow>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <Description>{region}</Description>
          </RegionRow>
        )}
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

const RegionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${color.gray500};
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
