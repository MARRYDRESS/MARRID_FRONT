import styled from "styled-components";

export const Viewport = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const SliderFrame = styled.div`
  position: relative;
`;

export const SlideBtnWrap = styled.div<{ $position: "left" | "right" }>`
  position: absolute;
  top: 50%;
  z-index: 2;
  transform: translateY(-50%);
  ${({ $position }) => ($position === "left" ? "left: 24px;" : "right: 24px;")}
`;

export const Track = styled.div<{
  $trackIndex: number;
  $isTransitionEnabled: boolean;
}>`
  display: flex;
  transform: translate3d(-${({ $trackIndex }) => $trackIndex * 100}%, 0, 0);
  transition: ${({ $isTransitionEnabled }) =>
    $isTransitionEnabled ? "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)" : "none"};
  will-change: transform;
`;
