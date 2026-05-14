"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

const ROTATE_MS = 5000;

export type HeroRotatingBannerProps = {
  bannerSrcs: readonly string[];
};

const Root = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const Slide = styled.img<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.9s ease-in-out;
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
  backface-visibility: hidden;
  transform: translateZ(0);
  image-rendering: high-quality;
`;

export default function HeroRotatingBanner({ bannerSrcs }: HeroRotatingBannerProps) {
  const [index, setIndex] = useState(0);
  const count = bannerSrcs.length;

  useEffect(() => {
    if (count <= 1 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [count]);

  return (
    <Root>
      {bannerSrcs.map((src, i) => (
        <Slide
          key={src}
          src={src}
          alt={i === index ? "메인 배너" : ""}
          $active={i === index}
          aria-hidden={i !== index}
        />
      ))}
    </Root>
  );
}
