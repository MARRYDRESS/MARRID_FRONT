import styled, { css } from "styled-components";
import font from "@/src/style/font";
import color from "@/src/style/color";

type StyleHashTagProps = {
  label: string;
  /** 카드 오버레이(기본) · 상단 필터 칩 */
  variant?: "overlay" | "filter";
};

export default function StyleHashTag({
  label,
  variant = "overlay",
}: StyleHashTagProps) {
  return <Pill $variant={variant}>{label}</Pill>;
}

const Pill = styled.span<{ $variant: "overlay" | "filter" }>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  white-space: nowrap;

  ${(p) =>
    p.$variant === "filter"
      ? css`
          padding: 8px 17px;
          border: 1px solid ${color.gray900};
          color: ${color.gray700};
          ${font["text-lg"]};
        `
      : css`
          padding: 4px 11px;
          border: 1px solid ${color.white};
          color: ${color.white};
          ${font["text-md"]};
        `}
`;
