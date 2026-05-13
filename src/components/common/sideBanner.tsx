"use client";

import Link from "next/link";
import styled from "styled-components";
import color from "@/src/style/color";

export type SideBannerProps = {
  bannerSrc: string;
  bannerAlt?: string;
  closeHref: string;
  closeAriaLabel?: string;
  closeIconSrc?: string;
};

export default function SideBanner({
  bannerSrc,
  bannerAlt = "",
  closeHref,
  closeAriaLabel = "닫기",
  closeIconSrc = "/icon/close.svg",
}: SideBannerProps) {
  const bannerPresentation =
    bannerAlt === "" ? { role: "presentation" as const } : {};

  return (
    <Root>
      <BannerImage src={bannerSrc} alt={bannerAlt} {...bannerPresentation} />
      <CloseLink href={closeHref} aria-label={closeAriaLabel}>
        <CloseIcon src={closeIconSrc} alt="" width={24} height={24} />
      </CloseLink>
    </Root>
  );
}

const Root = styled.div`
  position: relative;
  flex: 0 0 clamp(260px, 55.28vw, 796px);
  align-self: stretch;
  min-height: 0;
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
  object-position: top center;
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

const CloseIcon = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`;
