"use client";

import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";
import SelectComponent from "@/src/components/common/selectComponent";
import color from "@/src/style/color";
import { hallSelectItems } from "@/src/mock/mock";

/**
 * 피그마 「홀 선택」(90:185)과 동일한 단일 화면: `SelectComponent`만 사용하고
 * 뒤로가기 버튼만 프레임 좌표(1440×1024 기준)로 겹칩니다.
 */
export default function SelectHallPage() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);

  return (
    <Shell>
      <SelectComponent
        id="hall-select"
        title="내 결혼식장 스타일을 선택해 보세요."
        titleVariant="sm"
        layout="hall"
        items={hallSelectItems}
        showPaginationDots
      />
      <BackLink href="/avatarSetting" aria-label="이전 단계">
        <BackIcon src="/icon/blackFront.svg" alt="" width={17} height={32} />
      </BackLink>
    </Shell>
  );
}

const Shell = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 100dvh;
  max-height: 100dvh;
  margin: 0;
  overflow-x: clip;
  overflow-y: hidden;
  background: ${color.white};
  color: ${color.black};
`;

const BackLink = styled(Link)`
  position: absolute;
  z-index: 4;
  right: max(24px, calc((100vw - 1440px) * 0.5 + 62px));
  top: min(927px, calc(100dvh - 80px));
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  padding: 0;
  border-radius: 100px;
  border: 1px solid ${color.gray900};
  background: ${color.white};
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: background 0.2s ease, border-color 0.2s ease;
  &:hover {
    background: ${color.gray100};
  }
  &:focus-visible {
    outline: 2px solid ${color.primary};
    outline-offset: 2px;
  }
  @media (max-height: 900px) {
    top: auto;
    bottom: 24px;
  }
`;

const BackIcon = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  transform: rotate(180deg);
`;
