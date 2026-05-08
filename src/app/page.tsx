import SelectComponent from "@/src/components/common/selectComponent";
import Header from "@/src/components/layout/header";
import styled from "styled-components";
import font from "@/src/style/font";
import color from "@/src/style/color";

const selectMockImages = [
  "/mock/main1.png",
  "/mock/main2.png",
  "/mock/main3.png",
  "/mock/main4.png",
  "/mock/main5.jpg",
  "/mock/main6.jpg",
];

export default function Home() {
  return (
    <Main id="top">
      <Header />

      <HeroSection>
        <HeroImage src="/mock/banner.png" alt="메인 배너" />
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
        images={selectMockImages}
      />

      <SpacingMiddle />

      <SelectComponent
        id="select-2"
        title="추구미가 우아함이라면 머메이드를 추천해요"
        images={selectMockImages}
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

const HeroImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
`;

const HeroTitle = styled.h1`
  position: absolute;
  left: 189px;
  top: 492px;
  color: ${color.white};
  font-size: ${font["title-lg"]};
  line-height: 1.25;
  letter-spacing: -0.01em;
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
