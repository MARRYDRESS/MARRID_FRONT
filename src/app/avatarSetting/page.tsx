"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import ExampleComponent from "@/src/components/common/exampleComponent";
import color from "@/src/style/color";
import font from "@/src/style/font";

const BANNER = "/images/avatar_setting_banner.jpg";

export default function AvatarSettingPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (files.length && inputRef.current) {
      const dt = new DataTransfer();
      files.forEach((f) => dt.items.add(f));
      inputRef.current.files = dt.files;
    }
  }, []);

  return (
    <Shell>
      <LeftPane>
        <BannerImage src={BANNER} alt="" role="presentation" />
        <CloseLink href="/" aria-label="닫기">
          <IconImg src="/icon/close.svg" alt="" width={24} height={24} />
        </CloseLink>
      </LeftPane>

      <RightPane>
        <RightInner>
          <Headline>내 아바타를 만들어 어울리는 드레스를 찾아보세요</Headline>

          <UploadZone
            htmlFor="avatar-upload-input"
            $active={isDragging}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <VisuallyHiddenInput
              ref={inputRef}
              id="avatar-upload-input"
              type="file"
              accept="image/*"
              multiple
            />
            <UploadInner>
              <PlusWrap aria-hidden>
                <IconImg src="/icon/plus.svg" alt="" width={62} height={62} />
              </PlusWrap>
              <UploadTexts>
                <UploadPrimary>
                  얼굴 사진 1장과 전신사진 1장을 업로드해주세요
                </UploadPrimary>
                <UploadHint>
                  파일을 여기로 드래그하거나 클릭해 업로드
                </UploadHint>
              </UploadTexts>
            </UploadInner>
          </UploadZone>

          <ExamplesRow>
            <ExampleComponent variant="face" />
            <ExampleComponent variant="body" />
          </ExamplesRow>

          <BottomBlock>
            <Footnote>
              얼굴과 몸매가 잘 드러나는 사진을 업로드 해주세요
            </Footnote>
            <NextRow>
              <NextButton type="button" aria-label="다음 단계">
                <IconImg src="/icon/blackFront.svg" alt="" width={17} height={32} />
              </NextButton>
            </NextRow>
          </BottomBlock>
        </RightInner>
      </RightPane>
    </Shell>
  );
}

const Shell = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  background: ${color.white};
  color: ${color.black};
`;

const LeftPane = styled.div`
  position: relative;
  flex: 0 0 clamp(260px, 55.28vw, 796px);
  min-height: 100vh;
  overflow: hidden;
  background: ${color.gray100};
`;

const BannerImage = styled.img`
  position: absolute;
  inset: 0;
  width: 104.22%;
  height: 100%;
  max-width: none;
  left: -2.11%;
  object-fit: cover;
  object-position: center;
  pointer-events: none;
`;

const CloseLink = styled(Link)`
  position: absolute;
  left: 46px;
  top: 43px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: inherit;
  text-decoration: none;
`;

const IconImg = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`;

const RightPane = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 100vh;
`;

const RightInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 111px 46px 48px clamp(24px, 6.1vw, 88px);
  box-sizing: border-box;
`;

const Headline = styled.p`
  margin: 0 0 36px;
  max-width: 560px;
  ${font["title-sm"]}
  color: ${color.black};
`;

const UploadZone = styled.label<{ $active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 469px;
  min-height: 238px;
  padding: 24px 16px;
  margin: 0 0 24px;
  border-radius: 12px;
  border: 1px dashed ${color.gray300};
  background: ${(p) =>
    p.$active ? color.gray200 : color.gray100};
  cursor: pointer;
  text-align: center;
  transition: background 0.2s ease, border-color 0.2s ease;
`;

const VisuallyHiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const UploadInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  max-width: 330px;
`;

const PlusWrap = styled.div`
  flex-shrink: 0;
  width: 62px;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UploadTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const UploadPrimary = styled.p`
  margin: 0;
  ${font["text-md"]}
  color: ${color.black};
`;

const UploadHint = styled.p`
  margin: 0;
  ${font.caption}
  color: ${color.gray400};
`;

const ExamplesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 23px;
  margin-bottom: auto;
`;

const BottomBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 48px;
`;

const Footnote = styled.p`
  margin: 0 auto;
  width: 100%;
  max-width: 560px;
  ${font["text-md"]}
  text-align: center;
  color: ${color.black};
`;

const NextRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const NextButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  padding: 0;
  border-radius: 100px;
  border: 1px solid ${color.gray900};
  background: ${color.white};
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
  &:hover {
    background: ${color.gray100};
  }
  &:focus-visible {
    outline: 2px solid ${color.primary};
    outline-offset: 2px;
  }
`;
