"use client";

import styled from "styled-components";

type Props = {
  direction: "left" | "right";
  variant: "light" | "dark";
  onClick?: () => void;
  disabled?: boolean;
};

type StyledButtonProps = {
  $variant: Props["variant"];
};

const ICON_SRC = {
  light: { left: "/icon/whiteBack.svg", right: "/icon/whiteFront.svg" },
  dark: { left: "/icon/blackBack.svg", right: "/icon/blackFront.svg" },
} as const;

export default function SlideButton({ direction, variant, onClick, disabled }: Props) {
  const isLight = variant === "light";
  const iconSrc = ICON_SRC[variant][direction];
  const iconWidth = isLight ? 14 : 17;
  const iconHeight = isLight ? 26 : 32;

  const a11y =
    disabled === true
      ? {}
      : { "aria-label": direction === "left" ? ("이전" as const) : ("다음" as const) };

  return (
    <StyledButton
      type="button"
      $variant={variant}
      onClick={onClick}
      disabled={disabled}
      {...a11y}
    >
      <IconImg
        src={iconSrc}
        alt=""
        width={iconWidth}
        height={iconHeight}
        draggable={false}
      />
    </StyledButton>
  );
}

const StyledButton = styled.button<StyledButtonProps>`
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

  &:hover:not(:disabled) {
    opacity: 0.88;
  }

  &:disabled {
    cursor: default;
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