"use client";

import styled from "styled-components";

type Props = {
  direction: "left" | "right";
  variant: "light" | "dark";
  onClick?: () => void;
};

const ICON_SRC = {
  light: { left: "/icon/whiteBack.svg", right: "/icon/whiteFront.svg" },
  dark: { left: "/icon/blackBack.svg", right: "/icon/blackFront.svg" },
} as const;

export default function SlideButton({ direction, variant, onClick }: Props) {
  function ArrowLeft() {
    const isLight = variant === "light";
    return (
      <IconImg
        src={ICON_SRC[variant].left}
        alt=""
        width={isLight ? 14 : 17}
        height={isLight ? 26 : 32}
        draggable={false}
      />
    );
  }

  function ArrowRight() {
    const isLight = variant === "light";
    return (
      <IconImg
        src={ICON_SRC[variant].right}
        alt=""
        width={isLight ? 14 : 17}
        height={isLight ? 26 : 32}
        draggable={false}
      />
    );
  }

  return (
    <Button
      type="button"
      $variant={variant}
      onClick={onClick}
      aria-label={direction === "left" ? "이전" : "다음"}
    >
      {direction === "left" ? <ArrowLeft /> : <ArrowRight />}
    </Button>
  );
}

const Button = styled.button<{ $variant: Props["variant"] }>`
  box-sizing: border-box;
  width: 52px;
  height: 52px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  border: 1px solid ${({ $variant }) => ($variant === "light" ? "#ffffff" : "#111827")};
  background: transparent;
  cursor: pointer;
  flex-shrink: 0;
  transition: opacity 0.25s ease;
  overflow: hidden;

  &:hover {
    opacity: 0.88;
  }

  &:focus-visible {
    outline: 2px solid ${({ $variant }) => ($variant === "light" ? "#ffffff" : "#111827")};
    outline-offset: 2px;
  }
`;

const IconImg = styled.img`
  display: block;
  flex-shrink: 0;
  pointer-events: none;
`;
