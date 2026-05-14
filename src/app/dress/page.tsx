"use client";

import Image from "next/image";
import styled from "styled-components";
import color from "@/src/style/color";
import font from "@/src/style/font";
import { selectMockItems } from "@/src/mock/mock";

const FILTER_TAGS = [
  "#발랄한",
  "#러블리한",
  "#우아한",
  "#페미닌",
  "#여성스러운",
  "#로맨틱",
  "#깔끔",
  "#클래식",
  "#글래머",
] as const;

const FIRST_CARD_TAGS = ["#러블리한", "#발랄한", "#발랄한"] as const;

const DRESS_CARDS = selectMockItems.slice(0, 6);

export default function DressPage() {
  return (
    <Shell>
      <Inner>
        <Headline>
          <TitleLine>세상의 모든 드레스,</TitleLine>
          <TitleAccent>궁금했던 드레스를 입어보세요</TitleAccent>
        </Headline>

        <FilterRow aria-label="스타일 필터">
          {FILTER_TAGS.map((tag) => (
            <FilterTag key={tag} type="button">
              {tag}
            </FilterTag>
          ))}
        </FilterRow>

        <DressGrid>
          {DRESS_CARDS.map((item, index) => (
            <DressCard key={item.image}>
              <DressImageWrap>
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(max-width: 900px) 100vw, 420px"
                  style={{ objectFit: "cover" }}
                />
              </DressImageWrap>
              {index === 0 ? (
                <>
                  <CardDim />
                  <TagCluster>
                    {FIRST_CARD_TAGS.map((tag, tagIndex) => (
                      <OverlayTag key={`${tag}-${tagIndex}`}>{tag}</OverlayTag>
                    ))}
                  </TagCluster>
                  <FittingCta type="button">AI 피팅하기</FittingCta>
                </>
              ) : null}
            </DressCard>
          ))}
        </DressGrid>
      </Inner>
    </Shell>
  );
}

const Shell = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  background: ${color.white};
  color: ${color.black};
`;

const Inner = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(48px, 8vw, 120px) clamp(24px, 5vw, 85px) 80px;
`;

const Headline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  margin-bottom: 24px;
`;

const TitleLine = styled.p`
  margin: 0;
  width: 100%;
  ${font["title-md"]};
`;

const TitleAccent = styled.p`
  margin: 0;
  width: 100%;
  ${font["title-lg"]};
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 16px;
  margin-bottom: 40px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 6px;
  }
`;

const FilterTag = styled.button`
  box-sizing: border-box;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 17px;
  border-radius: 20px;
  border: 1px solid ${color.gray900};
  background: ${color.white};
  color: ${color.gray700};
  cursor: pointer;
  ${font["text-lg"]};

  &:focus-visible {
    outline: 2px solid ${color.primary};
    outline-offset: 2px;
  }
`;

const DressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 420px));
  gap: 24px 31px;
  justify-content: start;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const DressCard = styled.article`
  position: relative;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 420 / 567;
  overflow: hidden;
  border-radius: 0;
`;

const DressImageWrap = styled.div`
  position: absolute;
  inset: 0;
`;

const CardDim = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  pointer-events: none;
`;

const TagCluster = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  max-width: calc(100% - 32px);
  pointer-events: none;
`;

const OverlayTag = styled.span`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 17px;
  border-radius: 20px;
  border: 1px solid ${color.white};
  color: ${color.white};
  ${font["text-lg"]};
  white-space: nowrap;
`;

const FittingCta = styled.button`
  position: absolute;
  right: 16px;
  bottom: 16px;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  color: ${color.white};
  font-family: "Leferi Base Type", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  text-align: right;
  white-space: nowrap;

  &:focus-visible {
    outline: 2px solid ${color.white};
    outline-offset: 2px;
  }
`;
