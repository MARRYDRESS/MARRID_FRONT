import { css } from "styled-components";

type LeferiFamily = "point" | "base";

const FONT_FAMILY: Record<LeferiFamily, string> = {
  point: `"Leferi Point Type", sans-serif`, // White
  base: `"Leferi Base Type", sans-serif`, // Regular
};

const fontGenerator = (family: LeferiFamily, size: number, weight: number) => css`
  font-family: ${FONT_FAMILY[family]};
  font-size: ${size}px;
  font-weight: ${weight};
  line-height: normal;
`;

const font = {
  "title-lg": fontGenerator("point", 48, 300),
  "title-md": fontGenerator("point", 36, 300),
  "title-sm": fontGenerator("point", 24, 300),

  "text-lg": fontGenerator("point", 18, 300),
  "text-md": fontGenerator("point", 16, 300),
  "text-sm": fontGenerator("base", 14, 300),
  
  caption: fontGenerator("base", 12, 300),
};

export default font;
