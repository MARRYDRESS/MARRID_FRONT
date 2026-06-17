"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import AvatarFlowNextLink from "@/src/components/avatar/avatarFlowNextLink";
import color from "@/src/style/color";
import font from "@/src/style/font";

// ─── 영역 정의 ───────────────────────────────────────────────
type ZoneId = "shoulder" | "arm" | "chest" | "abdomen" | "lower" | "overall";

const ZONES: { id: ZoneId; label: string; desc: string }[] = [
  { id: "shoulder", label: "어깨",        desc: "어깨 너비 & 라인" },
  { id: "arm",      label: "팔",          desc: "팔뚝 & 팔 라인" },
  { id: "chest",    label: "가슴",        desc: "가슴 볼륨 & 데콜테" },
  { id: "abdomen",  label: "복부",        desc: "허리 & 배 라인" },
  { id: "lower",    label: "하체",        desc: "골반 · 허벅지 · 종아리" },
  { id: "overall",  label: "전체 실루엣", desc: "전반적인 체형 커버" },
];

// ─── 신체 SVG ────────────────────────────────────────────────
const BASE = color.gray200;   // 비활성 부위
const HI   = color.primary;   // 활성 부위 (선택됨)
const SOFT = "#D9B8B8";       // 활성이지만 카드 미선택

function BodySvg({ zone, selected }: { zone: ZoneId; selected: boolean }) {
  const active = selected ? HI : SOFT;
  const z = (part: ZoneId) =>
    zone === "overall" || zone === part ? active : BASE;

  return (
    <svg viewBox="0 0 96 216" fill="none" aria-hidden>
      {/* 머리 */}
      <ellipse cx="48" cy="15" rx="13" ry="14" fill={BASE} />
      {/* 목 */}
      <rect x="43" y="28" width="10" height="12" rx="4" fill={BASE} />

      {/* 어깨 */}
      <rect x="14" y="38" width="68" height="14" rx="7" fill={z("shoulder")} />

      {/* 왼팔 */}
      <rect x="6"  y="42" width="14" height="54" rx="7" fill={z("arm")} />
      {/* 오른팔 */}
      <rect x="76" y="42" width="14" height="54" rx="7" fill={z("arm")} />

      {/* 가슴 */}
      <rect x="22" y="52" width="52" height="34" rx="8" fill={z("chest")} />

      {/* 복부 */}
      <rect x="26" y="86" width="44" height="30" rx="8" fill={z("abdomen")} />

      {/* 골반·하체 */}
      <rect x="16" y="114" width="64" height="32" rx="10" fill={z("lower")} />

      {/* 왼쪽 허벅지 */}
      <rect x="18" y="142" width="26" height="40" rx="10" fill={z("lower")} />
      {/* 오른쪽 허벅지 */}
      <rect x="52" y="142" width="26" height="40" rx="10" fill={z("lower")} />

      {/* 왼쪽 종아리 */}
      <rect x="20" y="178" width="22" height="34" rx="9" fill={BASE} />
      {/* 오른쪽 종아리 */}
      <rect x="54" y="178" width="22" height="34" rx="9" fill={BASE} />
    </svg>
  );
}

// ─── 페이지 ──────────────────────────────────────────────────
export default function SelectSilhouettePage() {
  const [selected, setSelected] = useState<Set<ZoneId>>(new Set());

  useEffect(() => {
    sessionStorage.setItem(
      "marrid_silhouette",
      JSON.stringify([...selected]),
    );
  }, [selected]);

  const toggle = (id: ZoneId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <Shell>
      <Inner>
        <TitleStack>
          <TitleMain>내가 보완하고 싶은 실루엣을 선택해보세요</TitleMain>
          <TitleSub>복수 선택 가능해요</TitleSub>
        </TitleStack>

        <Grid>
          {ZONES.map((zone) => {
            const isSelected = selected.has(zone.id);
            return (
              <ZoneCard
                key={zone.id}
                $selected={isSelected}
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => toggle(zone.id)}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    toggle(zone.id);
                  }
                }}
              >
                <SvgWrap>
                  <BodySvg zone={zone.id} selected={isSelected} />
                </SvgWrap>
                <CardLabel $selected={isSelected}>{zone.label}</CardLabel>
                <CardDesc>{zone.desc}</CardDesc>
                {isSelected && <CheckMark aria-hidden>✓</CheckMark>}
              </ZoneCard>
            );
          })}
        </Grid>
      </Inner>

      <AvatarFlowNextLink href="/randering" aria-label="다음 단계">
        <NextIcon src="/icon/blackFront.svg" alt="" width={17} height={32} />
      </AvatarFlowNextLink>
    </Shell>
  );
}

// ─── 스타일 ──────────────────────────────────────────────────
const Shell = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100dvh;
  background: ${color.white};
  color: ${color.black};
  overflow-x: hidden;
`;

const Inner = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: clamp(48px, 8vh, 96px) clamp(20px, 4vw, 48px) 120px;
`;

const TitleStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  margin-bottom: clamp(32px, 5vh, 56px);
`;

const TitleMain = styled.h1`
  margin: 0;
  ${font["title-sm"]};
  color: ${color.black};
`;

const TitleSub = styled.p`
  margin: 0;
  ${font["text-lg"]};
  color: ${color.gray500};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
`;

const ZoneCard = styled.div<{ $selected: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 16px 18px;
  border-radius: 12px;
  border: 2px solid ${({ $selected }) =>
    $selected ? color.primary : color.gray200};
  background: ${({ $selected }) =>
    $selected ? "#FDF5F5" : color.white};
  cursor: pointer;
  transition: border-color 0.18s ease, background 0.18s ease,
    transform 0.15s ease;
  user-select: none;

  &:hover {
    border-color: ${({ $selected }) =>
      $selected ? color.primary : color.gray400};
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${color.primary};
    outline-offset: 2px;
  }
`;

const SvgWrap = styled.div`
  width: 100%;
  max-width: 96px;
`;

const CardLabel = styled.p<{ $selected: boolean }>`
  margin: 0;
  ${font["text-md"]};
  color: ${({ $selected }) => ($selected ? color.primary : color.black)};
  transition: color 0.18s ease;
`;

const CardDesc = styled.p`
  margin: 0;
  ${font.caption};
  color: ${color.gray500};
  text-align: center;
`;

const CheckMark = styled.span`
  position: absolute;
  top: 10px;
  right: 12px;
  font-size: 14px;
  font-weight: 600;
  color: ${color.primary};
`;

const NextIcon = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`;
