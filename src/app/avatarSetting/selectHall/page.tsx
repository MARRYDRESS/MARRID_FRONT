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
      <RightPane>
        <RightInner>
          <SelectMain>
            <SelectComponent
              id="hall-select"
              title="내 결혼식장 스타일을 선택해 보세요."
              titleVariant="sm"
              items={hallSelectItems}
              showPaginationDots
            />
          </SelectMain>

          <BottomBlock>
            <BackRow>
              <BackLink href="/avatarSetting" aria-label="이전 단계">
                <BackIcon src="/icon/blackFront.svg" alt="" width={17} height={32} />
              </BackLink>
            </BackRow>
          </BottomBlock>
        </RightInner>
      </RightPane>
    
  );
}

const Shell = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  max-width: none;
  height: 100dvh;
  max-height: 100dvh;
  min-height: 0;
  overflow: hidden;
  margin: 0;
  background: ${color.white};
  color: ${color.black};
`;

const RightPane = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  height: 100%;
  overflow: hidden;
`;

const RightInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  padding: clamp(28px, 8vh, 111px) clamp(20px, 4vw, 46px) clamp(16px, 4vh, 48px)
    clamp(24px, 6.1vw, 88px);
  box-sizing: border-box;
`;

const SelectMain = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;

const BottomBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin-top: auto;
  padding-top: clamp(8px, 1.5vh, 24px);
`;

const BackRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const BackLink = styled(Link)`
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
  transition: background 0.2s ease, border-color 0.2s ease;
  &:hover {
    background: ${color.gray100};
  }
  &:focus-visible {
    outline: 2px solid ${color.primary};
    outline-offset: 2px;
  }
`;

const BackIcon = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  transform: rotate(180deg);
`;
