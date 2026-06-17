"use client";

import { useEffect } from "react";
import styled from "styled-components";
import AvatarFlowNextLink from "@/src/components/avatar/avatarFlowNextLink";
import StyleSelectComponent from "@/src/components/common/styleSelectComponent";
import color from "@/src/style/color";
import { styleSelectItems } from "@/src/mock/mock";

export default function SelectStylePage() {
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
      <StyleSelectComponent
        id="style-select"
        title="어떤 스타일을 원하나요?"
        subtitle="추구미를 선택해주세요"
        items={styleSelectItems}
        showPaginationDots
        keepOverlayUntilNext
        onSelect={(item) => {
          if (item) sessionStorage.setItem("marrid_selected_style", JSON.stringify({ label: item.label, hashtags: item.hashtags }));
        }}
      />
      <AvatarFlowNextLink href="/randering?intent=avatar" aria-label="다음 단계">
        <NextIcon src="/icon/blackFront.svg" alt="" width={17} height={32} />
      </AvatarFlowNextLink>
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

const NextIcon = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`;
