import Image from "next/image";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import color from "@/src/style/color";
import font from "@/src/style/font";
import Header from "@/src/components/layout/header";
import HeroRotatingBanner from "@/src/components/home/heroRotatingBanner";

const ACCENT = "#c9a96e";
const ACCENT_LIGHT = "#f5efe4";
const GRAY_LIGHT = "#f9f8f6";
const GRAY_MID = "#e8e5e0";

const HERO_SRCS = ["/images/banner.png", "/images/banner4.jpg"] as const;

const FEATURED = [
  { id: "f1", imageSrc: "/mock/main1.png", label: "미카도 실크 A라인", shop: "엔조 최재훈", tag: "#우아한" },
  { id: "f2", imageSrc: "/mock/main3.png", label: "오프숄더 레이스", shop: "Kelly SONYUNHUI", tag: "#로맨틱" },
  { id: "f3", imageSrc: "/mock/main5.jpg", label: "프린세스 튤레", shop: "소유 브라이덜", tag: "#러블리한" },
  { id: "f4", imageSrc: "/mock/main8.jpg", label: "엠파이어 오간자", shop: "아뜰리에로리에", tag: "#글래머" },
];

const PRICE_CARDS = [
  { range: "100만원대", title: "합리적인 첫 드레스", desc: "부담 없는 가격으로 만나는\n아름다운 드레스" },
  { range: "200~300만원대", title: "감각적인 프리미엄", desc: "세련된 디자인과\n고급 소재의 드레스" },
  { range: "500만원대~", title: "오직 나만을 위한", desc: "완전 맞춤 제작의\n럭셔리 쿠튀르" },
];

export default function Home() {
  return (
    <PageShell>
      <Header />
      <HeroSection>
        <HeroRotatingBanner bannerSrcs={HERO_SRCS} />
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>
            For a one-time wedding
          </HeroTitle>
          <HeroDesc>
            사진 한 장으로 나만의 아바타를 만들고,<br />
            세상의 모든 드레스를 직접 입어보세요.<br />
          </HeroDesc>
          <HeroActions>
            <BtnPrimary href="/avatarSetting">
              
              지금 아바타 만들기
            </BtnPrimary>
            <BtnGhost href="/dress">드레스 둘러보기</BtnGhost>
          </HeroActions>
        </HeroContent>
        <ScrollHint>
          SCROLL
          <ChevronIcon />
        </ScrollHint>
      </HeroSection>

      {/* ── WHY MARRID ── */}
      <Section>
        <SectionLabel>WHY MARRID</SectionLabel>
        <SectionTitle>드레스 투어, 더 똑똑하게</SectionTitle>
        <SectionSub>발품 팔기 전에, 온라인에서 미리 입어보고 결정하세요</SectionSub>
        <ValueGrid>
          <ValueItem>
            <ValueIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.3" width={28} height={28}>
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </ValueIcon>
            <ValueHeading>나만의 AI 아바타</ValueHeading>
            <ValueDesc>얼굴과 전신 사진만 올리면<br />나와 똑같은 아바타가 완성돼요.</ValueDesc>
          </ValueItem>
          <ValueItem>
            <ValueIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.3" width={28} height={28}>
                <path d="M12 3l1.6 4.8L18 9.5l-4.4 1.7L12 16l-1.6-4.8L6 9.5l4.4-1.7z" />
              </svg>
            </ValueIcon>
            <ValueHeading>무제한 가상 피팅</ValueHeading>
            <ValueDesc>궁금했던 드레스를 부담 없이<br />몇 번이든 입어볼 수 있어요.</ValueDesc>
          </ValueItem>
          <ValueItem>
            <ValueIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.3" width={28} height={28}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </ValueIcon>
            <ValueHeading>예산별 샵 추천</ValueHeading>
            <ValueDesc>마음에 든 드레스를 실제로<br />입어볼 수 있는 샵까지 연결해드려요.</ValueDesc>
          </ValueItem>
        </ValueGrid>
      </Section>

      {/* ── HOW IT WORKS ── */}
      <Section $bg={GRAY_LIGHT}>
        <SectionLabel>HOW IT WORKS</SectionLabel>
        <SectionTitle>단 세 단계면 충분해요</SectionTitle>
        <SectionSub>복잡한 과정 없이, 사진 한 장에서 시작돼요</SectionSub>
        <HowGrid>
          <HowStep>
            <HowNum>01</HowNum>
            <HowHeading>사진 업로드</HowHeading>
            <HowDesc>얼굴 사진과 전신 사진을 한 장씩 올리면, AI가 체형과 분위기를 분석해 나만의 아바타를 만들어요.</HowDesc>
          </HowStep>
          <HowStep>
            <HowNum>02</HowNum>
            <HowHeading>추구미 분석 & 피팅</HowHeading>
            <HowDesc>나에게 어울리는 스타일을 분석하고, 원하는 드레스를 아바타에 입혀 어울림 정도를 확인해요.</HowDesc>
          </HowStep>
          <HowStep>
            <HowNum>03</HowNum>
            <HowHeading>드레스샵 연결</HowHeading>
            <HowDesc>마음에 든 드레스를 실제로 입어볼 수 있는 샵을 예산과 위치에 맞춰 추천하고 예약까지 도와드려요.</HowDesc>
          </HowStep>
        </HowGrid>
      </Section>

      {/* ── FEATURED DRESSES ── */}
      <Section>
        <SectionLabel>FEATURED DRESSES</SectionLabel>
        <SectionTitle>지금 인기 있는 드레스</SectionTitle>
        <SectionSub>많은 예비 신부님들이 입어보고 있어요</SectionSub>
        <FeaturedGrid>
          {FEATURED.map((d) => (
            <FeatCard key={d.id}>
              <FeatImageWrap>
                <Image
                  src={d.imageSrc}
                  alt={d.label}
                  fill
                  sizes="(max-width: 900px) 50vw, 300px"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
                <FeatTag>{d.tag}</FeatTag>
                <FeatOverlay>
                  <FeatFitBtn href="/dress">
                    <SparkIcon />
                    AI 피팅하기
                  </FeatFitBtn>
                </FeatOverlay>
              </FeatImageWrap>
              <FeatBody>
                <FeatName>{d.label}</FeatName>
                <FeatShop>{d.shop}</FeatShop>
              </FeatBody>
            </FeatCard>
          ))}
        </FeaturedGrid>
        <CenterBtn>
          <BtnOutline href="/dress">
            드레스 전체 보기
            <ArrowIcon />
          </BtnOutline>
        </CenterBtn>
      </Section>

      {/* ── BY BUDGET ── */}
      <PriceSection>
        <SectionLabel $light>BY BUDGET</SectionLabel>
        <SectionTitle $light>예산에 맞는 드레스샵</SectionTitle>
        <SectionSub $light>가격대별로 엄선한 드레스샵을 만나보세요</SectionSub>
        <PriceGrid>
          {PRICE_CARDS.map((p) => (
            <PriceCard key={p.range} href="/shop">
              <PriceRange>{p.range}</PriceRange>
              <PriceCardTitle>{p.title}</PriceCardTitle>
              <PriceCardDesc>{p.desc}</PriceCardDesc>
              <PriceArrow>샵 보기 →</PriceArrow>
            </PriceCard>
          ))}
        </PriceGrid>
      </PriceSection>

      {/* ── FINAL CTA ── */}
      <CtaSection>
        <SectionLabel>START NOW</SectionLabel>
        <CtaTitle>당신의 완벽한 드레스를<br />지금 만나보세요</CtaTitle>
        <CtaDesc>회원가입 없이도 바로 체험할 수 있어요</CtaDesc>
        <BtnCta href="/avatarSetting">
          <SparkIcon />
          무료로 아바타 만들기
        </BtnCta>
      </CtaSection>

    </PageShell>
  );
}

/* ── SVG icons ── */
function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width={16} height={16}>
      <path d="M12 3l1.6 4.8L18 9.5l-4.4 1.7L12 16l-1.6-4.8L6 9.5l4.4-1.7z" />
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width={18} height={18}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width={15} height={15}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ── Keyframes ── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(6px); }
`;

/* ── Styled components ── */
const PageShell = styled.main`
  background: ${color.white};
  color: ${color.black};
  overflow-x: hidden;
  font-family: "Leferi Base Type", sans-serif;
`;

/* hero */
const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  min-height: 640px;
  overflow: hidden;
  display: flex;
  align-items: center;
`;
const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.55) 100%);
  z-index: 1;
`;
const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 0 clamp(32px, 6vw, 100px);
  max-width: 760px;
`;
const HeroEyebrow = styled.p`
  font-size: 13px;
  letter-spacing: 0.28em;
  color: ${ACCENT};
  text-transform: uppercase;
  margin: 0 0 26px;
  opacity: 0;
  animation: ${fadeUp} 0.9s 0.2s ease forwards;
`;
const HeroTitle = styled.h1`
  ${font["title-lg"]};
  font-family: "Restweek", serif;
  font-size: clamp(64px, 10vw, 120px);
  color: ${color.white};
  margin: 0 0 10px;
  line-height: 0.85;
  opacity: 0;
  animation: ${fadeUp} 0.9s 0.4s ease forwards;
`;
const HeroDesc = styled.p`
  font-size: 17px;
  font-weight: 300;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.78);
  letter-spacing: 0.03em;
  margin: 0 0 42px;
  margin-top: 10px;
  opacity: 0;
  animation: ${fadeUp} 0.9s 0.6s ease forwards;
`;
const HeroActions = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  opacity: 0;
  animation: ${fadeUp} 0.9s 0.8s ease forwards;
`;
const BtnPrimary = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 17px 40px;
  background: ${color.white};
  color: ${color.black};
  font-size: 15px;
  letter-spacing: 0.06em;
  text-decoration: none;
  transition: background 0.25s, color 0.25s;
  &:hover { background: ${ACCENT}; color: ${color.white}; }
`;
const BtnGhost = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 17px 40px;
  background: transparent;
  color: ${color.white};
  font-size: 15px;
  letter-spacing: 0.06em;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.45);
  transition: background 0.25s, border-color 0.25s;
  &:hover { background: rgba(255, 255, 255, 0.1); border-color: ${color.white}; }
`;
const ScrollHint = styled.div`
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  color: rgba(255, 255, 255, 0.55);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  svg { animation: ${bounce} 1.8s infinite; }
`;

/* shared section */
const Section = styled.section<{ $bg?: string }>`
  padding: clamp(72px, 9vw, 120px) clamp(24px, 6vw, 100px);
  background: ${({ $bg }) => $bg ?? color.white};
`;
const SectionLabel = styled.p<{ $light?: boolean }>`
  font-size: 12px;
  letter-spacing: 0.24em;
  color: ${ACCENT};
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 16px;
`;
const SectionTitle = styled.h2<{ $light?: boolean }>`
  ${font["title-md"]};
  text-align: center;
  letter-spacing: 0.03em;
  line-height: 1.4;
  margin: 0 0 14px;
  color: ${({ $light }) => ($light ? color.white : color.black)};
`;
const SectionSub = styled.p<{ $light?: boolean }>`
  font-size: 15px;
  color: ${({ $light }) => ($light ? "rgba(255,255,255,0.5)" : color.gray400)};
  font-weight: 300;
  text-align: center;
  line-height: 1.8;
  margin: 0 0 64px;
`;

/* value props */
const ValueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  max-width: 1080px;
  margin: 0 auto;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;
const ValueItem = styled.div`
  text-align: center;
`;
const ValueIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${ACCENT_LIGHT};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 22px;
`;
const ValueHeading = styled.h3`
  ${font["title-sm"]};
  margin: 0 0 12px;
`;
const ValueDesc = styled.p`
  font-size: 14px;
  color: ${color.gray700};
  font-weight: 300;
  line-height: 1.9;
`;

/* how it works */
const HowGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 1080px;
  margin: 0 auto;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;
const HowStep = styled.div`
  background: ${color.white};
  border: 1px solid ${GRAY_MID};
  padding: 40px 36px;
`;
const HowNum = styled.p`
  font-size: 48px;
  font-weight: 300;
  color: ${ACCENT};
  line-height: 1;
  margin: 0 0 18px;
  font-family: "Leferi Point Type", sans-serif;
`;
const HowHeading = styled.h4`
  ${font["text-lg"]};
  margin: 0 0 10px;
`;
const HowDesc = styled.p`
  font-size: 13px;
  color: ${color.gray700};
  font-weight: 300;
  line-height: 1.85;
`;

/* featured dresses */
const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;
const FeatOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.45), transparent 45%);
  opacity: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 18px;
  transition: opacity 0.28s;
`;
const FeatCard = styled.article`
  border: 1px solid ${GRAY_MID};
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.28s, box-shadow 0.28s;
  &:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.09); }
  &:hover ${FeatOverlay} { opacity: 1; }
`;
const FeatImageWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: ${color.gray100};
`;
const FeatTag = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1;
  background: rgba(255, 255, 255, 0.85);
  font-size: 10px;
  color: ${color.gray700};
  padding: 4px 9px;
  border-radius: 10px;
`;
const FeatFitBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${color.white};
  color: ${color.black};
  font-size: 13px;
  padding: 9px 20px;
  border-radius: 20px;
  letter-spacing: 0.04em;
  text-decoration: none;
  &:hover { background: ${ACCENT_LIGHT}; }
`;
const FeatBody = styled.div`
  padding: 15px;
  background: ${color.white};
`;
const FeatName = styled.p`
  ${font["text-sm"]};
  margin: 0 0 4px;
  color: ${color.black};
`;
const FeatShop = styled.p`
  font-size: 11px;
  color: ${color.gray400};
  font-weight: 300;
  margin: 0;
`;
const CenterBtn = styled.div`
  text-align: center;
  margin-top: 48px;
`;
const BtnOutline = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 34px;
  border: 1px solid ${color.black};
  font-size: 14px;
  letter-spacing: 0.06em;
  color: ${color.black};
  text-decoration: none;
  transition: background 0.22s, color 0.22s;
  &:hover { background: ${color.black}; color: ${color.white}; }
`;

/* price range */
const PriceSection = styled.section`
  padding: clamp(72px, 9vw, 120px) clamp(24px, 6vw, 100px);
  background: ${color.black};
`;
const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1080px;
  margin: 0 auto;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;
const PriceCard = styled(Link)`
  display: block;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 38px 34px;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.25s, border-color 0.25s;
  &:hover { background: rgba(255,255,255,0.04); border-color: ${ACCENT}; }
`;
const PriceRange = styled.p`
  font-size: 28px;
  font-weight: 300;
  color: ${ACCENT};
  margin: 0 0 14px;
  font-family: "Leferi Point Type", sans-serif;
`;
const PriceCardTitle = styled.h4`
  ${font["text-lg"]};
  color: ${color.white};
  margin: 0 0 10px;
`;
const PriceCardDesc = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
  line-height: 1.8;
  margin: 0 0 20px;
  white-space: pre-line;
`;
const PriceArrow = styled.span`
  font-size: 13px;
  color: ${color.white};
  letter-spacing: 0.06em;
`;

/* final cta */
const CtaSection = styled.section`
  padding: clamp(80px, 9vw, 140px) clamp(24px, 6vw, 100px);
  text-align: center;
  background: linear-gradient(170deg, ${ACCENT_LIGHT}, ${color.white});
`;
const CtaTitle = styled.h2`
  ${font["title-md"]};
  line-height: 1.45;
  letter-spacing: 0.03em;
  margin: 0 0 20px;
`;
const CtaDesc = styled.p`
  font-size: 16px;
  color: ${color.gray700};
  font-weight: 300;
  margin: 0 0 40px;
`;
const BtnCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 18px 52px;
  background: ${color.black};
  color: ${color.white};
  font-size: 16px;
  letter-spacing: 0.06em;
  text-decoration: none;
  transition: background 0.25s;
  &:hover { background: ${ACCENT}; }
`;

/* footer */
const Footer = styled.footer`
  background: ${color.black};
  padding: 60px clamp(24px, 6vw, 100px) 40px;
`;
const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  padding-bottom: 36px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  @media (max-width: 768px) { flex-direction: column; gap: 32px; }
`;
const FooterLogo = styled.p`
  font-size: 26px;
  font-weight: 300;
  color: ${color.white};
  letter-spacing: 0.18em;
  margin: 0 0 14px;
`;
const FooterTagline = styled.p`
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
`;
const FooterLinks = styled.div`
  display: flex;
  gap: 48px;
  @media (max-width: 560px) { gap: 28px; flex-wrap: wrap; }
`;
const FooterCol = styled.div``;
const FooterColTitle = styled.h5`
  font-size: 13px;
  color: ${color.white};
  font-weight: 400;
  margin: 0 0 16px;
  letter-spacing: 0.06em;
`;
const FooterLink = styled(Link)`
  display: block;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.45);
  text-decoration: none;
  margin-bottom: 10px;
  font-weight: 300;
  transition: color 0.2s;
  &:hover { color: ${color.white}; }
`;
const FooterBottom = styled.p`
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.35);
  margin: 0;
`;
