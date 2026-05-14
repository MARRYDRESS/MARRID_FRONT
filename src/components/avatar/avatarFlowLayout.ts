import { css } from "styled-components";

/** 아바타 플로우(업로드 / 홀 선택) 공통: Next CTA 뷰포트 기준 위치 */
export const avatarFlowNextPositionCss = css`
  position: fixed;
  z-index: 4;
  right: max(24px, calc((100vw - 1440px) * 0.5 + 62px));
  top: min(927px, calc(100dvh - 80px));

  @media (max-height: 900px) {
    top: auto;
    bottom: 24px;
  }
`;

/**
 * Next 버튼(높이 52px) 세로 중앙과 같은 높이에 점 줄 정렬.
 * 짧은 화면에서는 Next가 bottom:24 이므로 점 중심 = bottom 24 + 26 = 50 → 점열 하단 bottom:45px.
 */
export const avatarFlowPaginationDotsAlignedCss = css`
  position: fixed;
  left: 50%;
  z-index: 2;
  gap: 8px;
  top: calc(min(927px, calc(100dvh - 80px)) + 26px);
  transform: translate(-50%, -50%);

  @media (max-height: 900px) {
    top: auto;
    bottom: 45px;
    transform: translateX(-50%);
  }
`;
