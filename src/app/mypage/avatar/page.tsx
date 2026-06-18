"use client";

import { useCallback } from "react";
import Link from "next/link";
import styled from "styled-components";
import color from "@/src/style/color";
import font from "@/src/style/font";
import { useAvatars, type StoredAvatar } from "@/src/store/avatars";

function formatDate(ts: number) {
  const d = new Date(ts);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

function CurrentAvatarCard({ avatar }: { avatar: StoredAvatar }) {
  return (
    <Card>
      <Thumbnail>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatar.imageSrc}
          alt="현재 아바타"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
        />
      </Thumbnail>
      <CardInfo>
        <CardTitle>내 아바타</CardTitle>
        <CardDesc>{formatDate(avatar.createdAt)} 생성</CardDesc>
      </CardInfo>
    </Card>
  );
}

function AvatarListCard({
  avatar,
  index,
  isCurrent,
  onSetCurrent,
  onDelete,
}: {
  avatar: StoredAvatar;
  index: number;
  isCurrent: boolean;
  onSetCurrent: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Card>
      <Thumbnail>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatar.imageSrc}
          alt={`아바타 ${index + 1}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
        />
      </Thumbnail>
      <CardInfo>
        <CardTitle>아바타 {index + 1}</CardTitle>
        <CardDesc>{formatDate(avatar.createdAt)} 생성</CardDesc>
        <ButtonRow>
          {isCurrent ? (
            <CurrentBadge>현재 설정됨</CurrentBadge>
          ) : (
            <SetButton type="button" onClick={() => onSetCurrent(avatar.id)}>
              이 아바타로 설정하기
            </SetButton>
          )}
          <DeleteButton
            type="button"
            onClick={() => {
              if (window.confirm("이 아바타를 삭제할까요?")) onDelete(avatar.id);
            }}
            aria-label="아바타 삭제"
          >
            삭제
          </DeleteButton>
        </ButtonRow>
      </CardInfo>
    </Card>
  );
}

export default function MyAvatarPage() {
  const { avatars, currentAvatar, currentAvatarId, setCurrentAvatar, deleteAvatar } = useAvatars();

  const handleSetCurrent = useCallback((id: string) => {
    setCurrentAvatar(id);
    const avatar = avatars.find((a) => a.id === id);
    if (!avatar?.imageSrc) return;
    // 아바타 이미지를 base64로 변환해 sessionStorage에 저장 (피팅 시 사용)
    if (avatar.imageSrc.startsWith("data:")) {
      sessionStorage.setItem("marrid_person_b64", avatar.imageSrc);
      return;
    }
    fetch(avatar.imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            sessionStorage.setItem("marrid_person_b64", reader.result);
          }
        };
        reader.readAsDataURL(blob);
      })
      .catch(() => {});
  }, [avatars, setCurrentAvatar]);

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
        {currentAvatar ? (
          <CurrentAvatarCard avatar={currentAvatar} />
        ) : (
          <EmptyState>
            <EmptyText>아직 아바타가 없어요.</EmptyText>
            <NewAvatarLink href="/avatarSetting">새 아바타 만들기 →</NewAvatarLink>
          </EmptyState>
        )}
      </Section>

      {avatars.length > 0 && (
        <Section>
          <SectionTitle>내 아바타</SectionTitle>
          {avatars.map((avatar, i) => (
            <AvatarListCard
              key={avatar.id}
              avatar={avatar}
              index={i}
              isCurrent={avatar.id === currentAvatarId}
              onSetCurrent={handleSetCurrent}
              onDelete={deleteAvatar}
            />
          ))}
        </Section>
      )}
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
  flex-shrink: 0;
  width: 156px;
  height: 190px;
  background: ${color.gray100};
  overflow: hidden;
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
  ${font["text-sm"]};
  color: ${color.gray600};
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

const SetButton = styled.button`
  margin-top: 8px;
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid ${color.primary};
  background: transparent;
  color: ${color.primary};
  cursor: pointer;
  ${font["text-sm"]};
  align-self: flex-start;

  &:hover {
    background: ${color.primary};
    color: ${color.white};
  }

  &:focus-visible {
    outline: 2px solid ${color.primary};
    outline-offset: 2px;
  }
`;

const DeleteButton = styled.button`
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid ${color.gray300};
  background: transparent;
  color: ${color.gray600};
  cursor: pointer;
  ${font["text-sm"]};

  &:hover {
    border-color: ${color.red};
    color: ${color.red};
  }

  &:focus-visible {
    outline: 2px solid ${color.red};
    outline-offset: 2px;
  }
`;

const CurrentBadge = styled.span`
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 8px;
  background: ${color.second};
  ${font.caption};
  color: ${color.white};
  align-self: flex-start;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 32px 24px;
  border: 1px dashed ${color.gray200};
`;

const EmptyText = styled.p`
  margin: 0;
  ${font["text-md"]};
  color: ${color.gray600};
`;
