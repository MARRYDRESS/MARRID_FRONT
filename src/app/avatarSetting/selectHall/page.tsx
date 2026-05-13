"use client";

import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";
import SelectComponent from "@/src/components/common/selectComponent";
import color from "@/src/style/color";
import { hallSelectItems } from "@/src/mock/mock";

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
      <NextLink
        href="/avatarSetting/selectHall/selectStyle"
        aria-label="다음 단계"
      >
        <NextIcon src="/icon/blackFront.svg" alt="" width={17} height={32} />
      </NextLink>
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

const NextLink = styled(Link)`
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

const NextIcon = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`;
