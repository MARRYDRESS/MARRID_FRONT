"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import color from "@/src/style/color";
import font from "@/src/style/font";
import { useSavedDresses } from "@/src/store/savedDresses";
import { useAuth } from "@/src/hooks/useAuth";


export default function DashboardPage() {
  const { dresses } = useSavedDresses();
  const { user } = useAuth();
  const displayName = user?.user_metadata?.name ?? user?.email ?? "";
  const recentDresses = dresses.slice(-3).reverse();

  const stats = [
    { label: "저장된 드레스", value: dresses.length },
    { label: "저장된 샵", value: 0 },
    { label: "내 아바타", value: 1 },
  ];

  return (
    <Wrap>
      <Welcome>
        <WelcomeTitle>안녕하세요{displayName ? `, ${displayName}님` : ""}</WelcomeTitle>
        <WelcomeSub>MERRID와 함께 나만의 드레스를 찾아보세요</WelcomeSub>
      </Welcome>

      <StatRow>
        {stats.map((s) => (
          <StatCard key={s.label}>
            <StatValue>{s.value}</StatValue>
            <StatLabel>{s.label}</StatLabel>
          </StatCard>
        ))}
      </StatRow>

      <Section>
        <SectionHeader>
          <SectionTitle>최근 저장된 드레스</SectionTitle>
          <SectionLink href="/mypage/saved-dress">전체 보기 →</SectionLink>
        </SectionHeader>

        {recentDresses.length === 0 ? (
          <EmptyBox>
            아직 저장된 드레스가 없어요.{" "}
            <InlineLink href="/dress">드레스 피팅하러 가기 →</InlineLink>
          </EmptyBox>
        ) : (
          <DressRow>
            {recentDresses.map((d) => (
              <DressThumb key={d.id}>
                <Image
                  src={d.imageSrc}
                  alt="저장된 드레스"
                  fill
                  sizes="200px"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </DressThumb>
            ))}
          </DressRow>
        )}
      </Section>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const Welcome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${color.gray200};
`;

const WelcomeTitle = styled.h1`
  margin: 0;
  ${font["title-sm"]};
  color: ${color.black};
`;

const WelcomeSub = styled.p`
  margin: 0;
  ${font["text-sm"]};
  color: ${color.gray500};
`;

const StatRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 28px 16px;
  border: 1px solid ${color.gray200};
  background: ${color.gray100};
`;

const StatValue = styled.span`
  ${font["title-sm"]};
  color: ${color.primary};
`;

const StatLabel = styled.span`
  ${font.caption};
  color: ${color.gray600};
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SectionTitle = styled.h2`
  margin: 0;
  ${font["text-lg"]};
  color: ${color.black};
`;

const SectionLink = styled(Link)`
  ${font.caption};
  color: ${color.gray500};
  text-decoration: none;

  &:hover {
    color: ${color.black};
  }
`;

const DressRow = styled.div`
  display: flex;
  gap: 16px;
`;

const DressThumb = styled.div`
  position: relative;
  flex: 1;
  aspect-ratio: 339 / 510;
  background: ${color.gray100};
  overflow: hidden;
`;

const EmptyBox = styled.p`
  margin: 0;
  padding: 32px 24px;
  border: 1px dashed ${color.gray300};
  ${font["text-sm"]};
  color: ${color.gray500};
  text-align: center;
`;

const InlineLink = styled(Link)`
  color: ${color.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;