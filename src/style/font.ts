import { css } from "styled-components";

type LeferiFamily = "point" | "base";

const FONT_FAMILY: Record<LeferiFamily, string> = {
  point: `"Leferi Point Type", sans-serif`, // White
  base: `"Leferi Base Type", sans-serif`, // Regular
};

const fontGenerator = (family: LeferiFamily, size: number) => css`
  font-family: ${FONT_FAMILY[family]};
  font-size: ${size}px;
  line-height: normal;
`;

const font = {
  "title-lg": fontGenerator("point", 48),
  "title-md": fontGenerator("point", 36),
  "title-sm": fontGenerator("point", 24),

  "text-lg": fontGenerator("point", 18),
  "text-md": fontGenerator("point", 16),
  "text-sm": fontGenerator("base", 14),
  
  caption: fontGenerator("base", 12),
};

export default font;
