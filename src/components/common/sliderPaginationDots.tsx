import styled, { css } from "styled-components";
import color from "@/src/style/color";
import { avatarFlowPaginationDotsAlignedCss } from "@/src/components/avatar/avatarFlowLayout";

export type SliderPaginationDotsPlacement =
  | "below"
  | "floating"
  | "floatingAvatarFlow";

const Row = styled.div<{ $placement: SliderPaginationDotsPlacement }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${({ $placement }) =>
    $placement === "floatingAvatarFlow"
      ? avatarFlowPaginationDotsAlignedCss
      : $placement === "floating"
        ? css`
            position: absolute;
            left: 50%;
            bottom: clamp(20px, 3vh, 40px);
            transform: translateX(-50%);
            gap: 8px;
            z-index: 2;
          `
        : css`
            gap: 10px;
            padding: 32px 0 0;
          `}
`;

const Dot = styled.span<{ $active: boolean }>`
  box-sizing: border-box;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid ${color.gray900};
  background: ${({ $active }) => ($active ? color.gray900 : "transparent")};
  flex-shrink: 0;
`;

type Props = {
  totalPages: number;
  activeIndex: number;
  placement: SliderPaginationDotsPlacement;
};

export default function SliderPaginationDots({
  totalPages,
  activeIndex,
  placement,
}: Props) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Row $placement={placement} aria-hidden>
      {Array.from({ length: totalPages }, (_, i) => (
        <Dot key={i} $active={i === activeIndex} />
      ))}
    </Row>
  );
}
