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
const GOLD      = "#C4A07A";
const GOLD_SOFT = "#DDD1C2";
const STROKE    = "#C8BCAF";

// ─── 단일 연속 실루엣 경로 ────────────────────────────────────
// 오른쪽 목 → 오른쪽 어깨 → 오른팔 외측(하행) → 손목 → 오른팔 내측(상행) →
// 오른쪽 겨드랑이 → 오른쪽 몸통(하행) → 오른쪽 골반 → 오른쪽 다리 외측(하행) →
// 발 → 오른쪽 다리 내측(상행) → 사타구니 → 왼쪽 다리 내측(하행) →
// 발 → 왼쪽 다리 외측(상행) → 왼쪽 골반 → 왼쪽 몸통(상행) →
// 왼쪽 겨드랑이 → 왼팔 내측(하행) → 손목 → 왼팔 외측(상행) → 왼쪽 어깨 → 목
const BODY =
  "M 43,26" +
  " C 50,28 62,36 65,50" +        // 오른쪽 어깨
  " C 68,58 68,70 68,86" +        // 오른팔 외측 상단
  " C 68,102 67,114 65,122" +     // 오른팔 외측 하단
  " C 63,126 60,128 57,126" +     // 오른쪽 손목 외측
  " C 54,124 53,120 54,114" +     // 오른쪽 손목 내측
  " C 55,102 56,90 56,78" +       // 오른팔 내측 상행
  " C 56,68 55,62 52,58" +        // 오른쪽 겨드랑이
  " C 54,68 54,80 52,94" +        // 오른쪽 가슴·몸통
  " C 50,104 48,114 50,124" +     // 오른쪽 허리
  " C 52,132 54,140 54,150" +     // 오른쪽 골반
  " L 54,158" +                   // 오른쪽 허벅지 상단
  " L 52,220" +                   // 오른쪽 다리 외측
  " C 52,224 50,226 48,226" +     // 오른쪽 발목 외측
  " L 44,226" +                   // 발 바닥
  " C 42,226 40,224 40,220" +     // 오른쪽 발목 내측
  " L 43,158" +                   // 오른쪽 다리 내측 상행
  " L 37,158" +                   // 사타구니
  " L 40,220" +                   // 왼쪽 다리 내측 하행
  " C 40,224 38,226 36,226" +     // 왼쪽 발목 내측
  " L 32,226" +                   // 왼쪽 발 바닥
  " C 30,226 28,224 28,220" +     // 왼쪽 발목 외측
  " L 26,158" +                   // 왼쪽 다리 외측 상행
  " L 26,150" +                   // 왼쪽 허벅지 상단
  " C 26,140 28,132 30,124" +     // 왼쪽 골반
  " C 32,114 30,104 28,94" +      // 왼쪽 허리
  " C 26,80 26,68 28,58" +        // 왼쪽 몸통 상행 → 겨드랑이
  " C 25,62 24,68 24,78" +        // 왼팔 내측 하행
  " C 23,90 23,102 23,114" +      // 왼팔 내측 하단
  " C 23,120 22,124 19,126" +     // 왼쪽 손목 내측
  " C 16,128 13,126 11,122" +     // 왼쪽 손목 외측
  " C 13,114 12,102 12,86" +      // 왼팔 외측 하단
  " C 12,70 12,58 15,50" +        // 왼팔 외측 상단
  " C 18,36 30,28 37,26" +        // 왼쪽 어깨
  " Z";

// ─── 존별 강조 영역 정의 (clipPath 안 rect) ────────────────────
// 어깨: 목 하단~겨드랑이 높이
// 팔:   양 측면 띠 (마지막에 그려 토르소 존 위에 덮음)
// 가슴: 겨드랑이~허리 상단
// 복부: 허리
// 하체: 골반 + 다리

function BodySvg({ zone, selected }: { zone: ZoneId; selected: boolean }) {
  const hi = selected ? GOLD : GOLD_SOFT;
  const z  = (p: ZoneId) => (zone === "overall" || zone === p ? hi : "none");
  const id = `bc-${zone}`;

  return (
    <svg viewBox="0 0 80 228" fill="none" aria-hidden>
      <defs>
        <clipPath id={id}>
          <circle cx="40" cy="14" r="13" />
          <path d={BODY} />
        </clipPath>
      </defs>

      {/* 존 색상 레이어 (clip 안) */}
      <g clipPath={`url(#${id})`}>
        {zone === "overall" ? (
          <rect x="0" y="0" width="80" height="228" fill={hi} />
        ) : (
          <>
            <rect x="0"  y="22"  width="80" height="36"  fill={z("shoulder")} />
            <rect x="0"  y="58"  width="80" height="44"  fill={z("chest")}    />
            <rect x="0"  y="102" width="80" height="26"  fill={z("abdomen")}  />
            <rect x="0"  y="128" width="80" height="100" fill={z("lower")}    />
            {/* 팔: 양측 띠, 마지막에 그려서 토르소 색 위에 덮음 */}
            <rect x="0"  y="22"  width="26" height="108" fill={z("arm")}      />
            <rect x="54" y="22"  width="26" height="108" fill={z("arm")}      />
          </>
        )}
      </g>

      {/* 실루엣 외곽선 (항상 최상단) */}
      <circle cx="40" cy="14" r="13" stroke={STROKE} strokeWidth="1.2" />
      <path   d={BODY}               stroke={STROKE} strokeWidth="1.2" />
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
  overflow-x: hidden;
`;

const Inner = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: clamp(48px, 8vh, 100px) clamp(24px, 4vw, 56px) 120px;
`;

const TitleStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
  margin-bottom: clamp(36px, 5vh, 60px);
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 28px 16px 22px;
  border-radius: 16px;
  border: 1.5px solid
    ${({ $selected }) => ($selected ? GOLD : color.gray200)};
  background: ${color.white};
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
  user-select: none;

  &:hover {
    border-color: ${({ $selected }) => ($selected ? GOLD : color.gray300)};
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.07);
  }

  &:focus-visible {
    outline: 2px solid ${GOLD};
    outline-offset: 2px;
  }
`;

const SvgWrap = styled.div`
  width: 100%;
  max-width: 68px;
`;

const CardLabel = styled.p<{ $selected: boolean }>`
  margin: 0;
  ${font["text-md"]};
  color: ${({ $selected }) => ($selected ? GOLD : color.black)};
  transition: color 0.2s;
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
