"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import color from "@/src/style/color";
import font from "@/src/style/font";

type AvatarItem = {
  id: string;
  imageSrc: string;
  title: string;
  description: string;
  tags: string[];
};

const CURRENT_AVATAR: AvatarItem = {
  id: "current",
  imageSrc: "/mock/avatar_result.jpg",
  title: "당신의 드레스",
  description: "가장 잘 어울리는 드레스는 오간자 실크 & A라인 이예요",
  tags: ["#채플", "#페미닌", "#러블리"],
};

const MY_AVATARS: AvatarItem[] = [
  {
    id: "a1",
    imageSrc: "/mock/avatar_result.jpg",
    title: "당신의 드레스",
    description: "가장 잘 어울리는 드레스는 오간자 실크 & A라인 이예요",
    tags: ["#채플", "#페미닌", "#러블리"],
  },
  {
    id: "a2",
    imageSrc: "/mock/avatar_result.jpg",
    title: "당신의 드레스",
    description: "가장 잘 어울리는 드레스는 오간자 실크 & A라인 이예요",
    tags: ["#채플", "#페미닌", "#러블리"],
  },
];

function AvatarCard({ item }: { item: AvatarItem }) {
  return (
    <Card>
      <Thumbnail>
        <Image
          src={item.imageSrc}
          alt={item.title}
          fill
          sizes="156px"
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </Thumbnail>
      <CardInfo>
        <CardTitle>{item.title}</CardTitle>
        <CardDesc>{item.description}</CardDesc>
        <TagList>
          {item.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagList>
      </CardInfo>
    </Card>
  );
}

export default function MyAvatarPage() {
  return (
    <Wrap>
      <PageTitle>내 아바타</PageTitle>
      <PageSubtitle>아바타를 자유롭게 설정하세요</PageSubtitle>

      <Section>
        <SectionHeader>
          <SectionTitle>현재 설정된 아바타</SectionTitle>
          <NewAvatarLink href="/avatarSetting">
            새 아바타 만들기
            <Arrow>→</Arrow>
          </NewAvatarLink>
        </SectionHeader>
        <AvatarCard item={CURRENT_AVATAR} />
      </Section>

      <Section>
        <SectionTitle>내 아바타</SectionTitle>
        {MY_AVATARS.map((avatar) => (
          <AvatarCard key={avatar.id} item={avatar} />
        ))}
      </Section>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageTitle = styled.h1`
  margin: 0 0 4px;
  ${font["title-sm"]};
  color: ${color.black};
`;

const PageSubtitle = styled.p`
  margin: 0 0 48px;
  ${font["text-lg"]};
  color: ${color.black};
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 48px;
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

const NewAvatarLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;
  ${font.caption};
  color: ${color.gray600};
  text-decoration: none;

  &:hover {
    color: ${color.black};
  }
`;

const Arrow = styled.span`
  font-size: 12px;
`;

const Card = styled.div`
  display: flex;
  border: 1px solid ${color.gray200};
  overflow: hidden;
`;

const Thumbnail = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 156px;
  height: 190px;
  background: ${color.gray100};
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 24px;
  gap: 8px;
`;

const CardTitle = styled.p`
  margin: 0;
  ${font["text-md"]};
  color: ${color.black};
`;

const CardDesc = styled.p`
  margin: 0;
  ${font["text-md"]};
  color: ${color.black};
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0 10px;
  height: 24px;
  border-radius: 8px;
  background: ${color.second};
  ${font.caption};
  color: ${color.white};
`;
