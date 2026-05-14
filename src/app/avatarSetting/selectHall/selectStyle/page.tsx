"use client";

import Link from "next/link";
import styled from "styled-components";
import StyleComponent from "@/src/components/common/styleComponent";
import color from "@/src/style/color";
import font from "@/src/style/font";
import { styleSelectItems } from "@/src/mock/mock";

export default function SelectStylePage() {
  return (
    <Shell>
      <TopBar>
        <BackLink href="/avatarSetting/selectHall" aria-label="이전 단계">
          <BackIcon src="/icon/blackBack.svg" alt="" width={24} height={24} />
        </BackLink>
      </TopBar>

      <Header>
        <Lead>어떤 스타일을 원하나요?</Lead>
        <Headline>추구미를 선택해주세요</Headline>
      </Header>

      <Grid>
        {styleSelectItems.map((item) => (
          <StyleComponent
            key={`${item.image}-${item.label}`}
            imageSrc={item.image}
            label={item.label}
            hashtags={item.hashtags}
          />
        ))}
      </Grid>

      <NextLink href="/avatarSetting" aria-label="다음 단계">
        <NextIcon src="/icon/blackFront.svg" alt="" width={17} height={32} />
      </NextLink>
    </Shell>
  );
}

const Shell = styled.main`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  padding: 0 24px 120px;
  background: ${color.white};
  color: ${color.black};
`;

const TopBar = styled.div`
  box-sizing: border-box;
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 0 0;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: background 0.2s ease;

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
`;

const Header = styled.header`
  box-sizing: border-box;
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px 0 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: flex-start;

  @media (min-width: 1024px) {
    padding-left: clamp(0px, calc((100vw - 1440px) * 0.5 + 61px), 85px);
  }
`;

const Lead = styled.p`
  margin: 0;
  width: 100%;
  max-width: 520px;
  ${font["title-md"]};
  color: ${color.black};
`;

const Headline = styled.h1`
  margin: 0;
  padding-top: 4px;
  width: 100%;
  max-width: 520px;
  ${font["title-lg"]};
  color: ${color.black};
`;

const Grid = styled.div`
  box-sizing: border-box;
  max-width: 1269px;
  margin: 48px auto 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 40px 55px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 32px;
    margin-top: 32px;
  }
`;

const NextLink = styled(Link)`
  position: fixed;
  z-index: 4;
  right: max(24px, calc((100vw - 1440px) * 0.5 + 62px));
  bottom: max(24px, calc(100dvh - 80px));
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
    bottom: 24px;
  }
`;

const NextIcon = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`;
