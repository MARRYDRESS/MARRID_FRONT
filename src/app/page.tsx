import SelectComponent from "@/src/components/common/selectComponent";
import HeroRotatingBanner from "@/src/components/home/heroRotatingBanner";
import Header from "@/src/components/layout/header";
import styled from "styled-components";
import font from "@/src/style/font";
import color from "@/src/style/color";
import { selectMockItems } from "@/src/mock/mock";

const HERO_BANNER_SRCS = ["/images/banner.png", "/images/banner4.jpg"] as const;

export default function Home() {
  return (
    <Main id="top">
      <Header />

      <HeroSection>
        <HeroRotatingBanner bannerSrcs={HERO_BANNER_SRCS} />
        <HeroOverlay />
        <HeroTitle>
            인생의 한 번뿐인
            <br />
            내 드레스를 완벽하게
        </HeroTitle>
      </HeroSection>

      <SpacingTop />

      <SelectComponent
        id="select-1"
        title="좋아하는 드레스를 찾아보세요"
        titleVariant="sm"
        items={selectMockItems}
      />

      <SpacingMiddle />

      <SelectComponent
        id="select-2"
        title="추구미가 우아함이라면 머메이드를 추천해요"
        titleVariant="sm"
        items={selectMockItems}
      />

      <SpacingBottom />
    </Main>
  );
}

const Main = styled.main`
  min-height: 100vh;
  background: ${color.white};
  color: #18181b;
`;

const HeroSection = styled.section`
  position: relative;
  margin: 0 auto;
  height: 811px;
  width: 100%;
  max-width: 1440px;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.3);
`;

const HeroTitle = styled.h1`
  position: absolute;
  z-index: 2;
  left: 189px;
  top: 492px;
  color: ${color.white};
  ${font["title-lg"]};
`;

const SpacingTop = styled.div`
  margin: 0 auto;
  height: 139px;
  width: 100%;
  max-width: 1440px;
`;

const SpacingMiddle = styled.div`
  margin: 0 auto;
  height: 106px;
  width: 100%;
  max-width: 1440px;
`;

const SpacingBottom = styled.div`
  height: 120px;
`;
