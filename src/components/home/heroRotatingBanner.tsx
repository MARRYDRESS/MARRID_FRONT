"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

const BANNER_SRCS = [
  "/images/banner1.jpg",
  "/images/banner2.jpg",
  "/images/banner3.jpg",
  "/images/banner4.jpg",
  "/images/banner.png",
] as const;

const ROTATE_MS = 5000;

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
  backface-visibility: hidden;
  transform: translateZ(0);
  image-rendering: high-quality;
`;

export default function HeroRotatingBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % BANNER_SRCS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Root>
      {BANNER_SRCS.map((src, i) => (
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
