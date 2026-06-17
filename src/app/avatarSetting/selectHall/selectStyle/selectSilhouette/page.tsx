"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import AvatarFlowNextLink from "@/src/components/avatar/avatarFlowNextLink";
import color from "@/src/style/color";
import font from "@/src/style/font";

type ZoneId = "shoulder" | "arm" | "chest" | "abdomen" | "lower" | "overall";

const ZONES: { id: ZoneId; label: string; desc: string }[] = [
  { id: "shoulder", label: "어깨",        desc: "어깨 너비 & 라인" },
  { id: "arm",      label: "팔",          desc: "팔뚝 & 팔 라인" },
  { id: "chest",    label: "가슴",        desc: "가슴 볼륨 & 데콜테" },
  { id: "abdomen",  label: "복부",        desc: "허리 & 배 라인" },
  { id: "lower",    label: "하체",        desc: "골반 · 허벅지 · 종아리" },
  { id: "overall",  label: "전체 실루엣", desc: "전반적인 체형 커버" },
];

// ─── 색상 ─────────────────────────────────────────────────────
const GOLD      = "#C4A07A"; // 선택된 카드의 강조색
const GOLD_SOFT = "#DDD1C2"; // 미선택 카드의 프리뷰 색
const STROKE    = "#CABFB4"; // 실루엣 외곽선

// ─── 체형 SVG 경로 ────────────────────────────────────────────
// 토르소: 어깨(넓음) → 가슴 → 허리(좁음) → 골반(넓음)
const TORSO =
  "M 17,27 C 14,34 20,54 22,66 C 22,74 16,86 18,100 L 18,104 L 42,104 L 42,100 C 44,86 38,74 38,66 C 40,54 46,34 43,27 Z";

function BodySvg({ zone, selected }: { zone: ZoneId; selected: boolean }) {
  const hi = selected ? GOLD : GOLD_SOFT;
  const z  = (p: ZoneId) => (zone === "overall" || zone === p ? hi : "none");
  const id = `bc-${zone}`;

  return (
    <svg viewBox="0 0 60 184" fill="none" aria-hidden>
      <defs>
        <clipPath id={id}>
          {/* 머리 */}
          <ellipse cx="30" cy="9"  rx="8"   ry="9"  />
          {/* 목 */}
          <rect x="27" y="17" width="6"  height="12" rx="2" />
          {/* 토르소 */}
          <path d={TORSO} />
          {/* 왼팔 */}
          <rect x="4"  y="28" width="11" height="68" rx="5.5" />
          {/* 오른팔 */}
          <rect x="45" y="28" width="11" height="68" rx="5.5" />
          {/* 왼다리 */}
          <rect x="16" y="100" width="12" height="82" rx="6" />
          {/* 오른다리 */}
          <rect x="32" y="100" width="12" height="82" rx="6" />
        </clipPath>
      </defs>

      {/* ── 클립 안 존 색상 레이어 ── */}
      <g clipPath={`url(#${id})`}>
        {/* overall: 헤드까지 전체 */}
        {zone === "overall" && (
          <rect x="0" y="0" width="60" height="184" fill={hi} />
        )}
        {zone !== "overall" && (
          <>
            {/* 어깨 */}
            <rect x="0" y="22" width="60" height="30" fill={z("shoulder")} />
            {/* 가슴 */}
            <rect x="0" y="52" width="60" height="20" fill={z("chest")} />
            {/* 복부 */}
            <rect x="0" y="72" width="60" height="28" fill={z("abdomen")} />
            {/* 하체 */}
            <rect x="0" y="100" width="60" height="84" fill={z("lower")} />
            {/* 팔 — 마지막에 그려서 토르소 존 위에 덮음 */}
            <rect x="0"  y="22" width="20" height="82" fill={z("arm")} />
            <rect x="40" y="22" width="20" height="82" fill={z("arm")} />
          </>
        )}
      </g>

      {/* ── 실루엣 외곽선 (항상 위에) ── */}
      <ellipse cx="30" cy="9"  rx="8"   ry="9"   stroke={STROKE} strokeWidth="1.2" />
      <rect    x="27" y="17" width="6"  height="12" rx="2"  stroke={STROKE} strokeWidth="1.2" />
      <path    d={TORSO}                               stroke={STROKE} strokeWidth="1.2" />
      <rect    x="4"  y="28" width="11" height="68" rx="5.5" stroke={STROKE} strokeWidth="1.2" />
      <rect    x="45" y="28" width="11" height="68" rx="5.5" stroke={STROKE} strokeWidth="1.2" />
      <rect    x="16" y="100" width="12" height="82" rx="6"  stroke={STROKE} strokeWidth="1.2" />
      <rect    x="32" y="100" width="12" height="82" rx="6"  stroke={STROKE} strokeWidth="1.2" />
    </svg>
  );
}

// ─── 페이지 ──────────────────────────────────────────────────
export default function SelectSilhouettePage() {
  const [selected, setSelected] = useState<Set<ZoneId>>(new Set());

  useEffect(() => {
    sessionStorage.setItem("marrid_silhouette", JSON.stringify([...selected]));
  }, [selected]);

  const toggle = (id: ZoneId) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <Shell>
      <Inner>
        <TitleStack>
          <TitleMain>보완하고 싶은 실루엣을 선택해보세요</TitleMain>
          <TitleSub>복수 선택 가능해요</TitleSub>
        </TitleStack>

        <Grid>
          {ZONES.map((zone) => {
            const on = selected.has(zone.id);
            return (
              <ZoneCard
                key={zone.id}
                $selected={on}
                role="checkbox"
                aria-checked={on}
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
                  <BodySvg zone={zone.id} selected={on} />
                </SvgWrap>
                <CardLabel $selected={on}>{zone.label}</CardLabel>
                <CardDesc>{zone.desc}</CardDesc>
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
  max-width: 900px;
  margin: 0 auto;
  padding: clamp(48px, 8vh, 96px) clamp(20px, 4vw, 48px) 120px;
`;

const TitleStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
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
  ${font["text-sm"]};
  color: ${color.gray400};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const ZoneCard = styled.div<{ $selected: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 24px 16px 20px;
  border-radius: 16px;
  border: 1.5px solid
    ${({ $selected }) => ($selected ? "#C4A07A" : color.gray200)};
  background: ${color.white};
  cursor: pointer;
  transition: border-color 0.18s, box-shadow 0.18s, transform 0.15s;
  user-select: none;

  &:hover {
    border-color: ${({ $selected }) => ($selected ? "#C4A07A" : color.gray300)};
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  }

  &:focus-visible {
    outline: 2px solid #C4A07A;
    outline-offset: 2px;
  }
`;

const SvgWrap = styled.div`
  width: 100%;
  max-width: 72px;
`;

const CardLabel = styled.p<{ $selected: boolean }>`
  margin: 0;
  ${font["text-md"]};
  color: ${({ $selected }) => ($selected ? "#C4A07A" : color.black)};
  transition: color 0.18s;
`;

const CardDesc = styled.p`
  margin: 0;
  ${font.caption};
  color: ${color.gray400};
  text-align: center;
`;

const NextIcon = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`;
