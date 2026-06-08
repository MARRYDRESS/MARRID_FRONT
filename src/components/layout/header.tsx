"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import color from "@/src/style/color";
import font from "@/src/style/font";

const NAV_ITEMS = [
  { label: "아바타 만들기", href: "/avatarSetting" },
  { label: "드레스 보기", href: "/dress" },
  { label: "샵 보기", href: "/shop" },
  { label: "마이페이지", href: "/mypage" },
  { label: "로그인", href: "/login" },
];

export default function Header({
  forceScrolled = false,
  peekOnly = false,
}: {
  forceScrolled?: boolean;
  peekOnly?: boolean;
}) {
  const [scrolled, setScrolled] = useState(forceScrolled);

  useEffect(() => {
    if (forceScrolled) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceScrolled]);

  if (peekOnly) {
    return (
      <PeekContainer>
        <HoverStrip aria-hidden />
        <PeekNav>
          <NavInner>
            <Logo href="/" $scrolled>
              <img src="/icon/logo.svg" alt="MERRID" height={14} />
            </Logo>
            <NavLinks>
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.label} href={item.href} $scrolled>
                  {item.label}
                </NavLink>
              ))}
            </NavLinks>
          </NavInner>
        </PeekNav>
      </PeekContainer>
    );
  }

  return (
    <Nav $scrolled={scrolled}>
      <NavInner>
        <Logo href="/" $scrolled={scrolled}>
          <img src="/icon/logo.svg" alt="MERRID" height={14} />
        </Logo>
        <NavLinks>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.label} href={item.href} $scrolled={scrolled}>
              {item.label}
            </NavLink>
          ))}
        </NavLinks>
      </NavInner>
    </Nav>
  );
}

const Nav = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: ${({ $scrolled }) => ($scrolled ? "64px" : "84px")};
  background: ${({ $scrolled }) => ($scrolled ? color.white : "transparent")};
  border-bottom: ${({ $scrolled }) =>
    $scrolled ? "1px solid rgba(0,0,0,0.06)" : "none"};
  transition: height 0.3s, background 0.3s, border-color 0.3s;
`;

/* peek-only: 숨겨져 있다가 상단 hover 시 슬라이드인 */
const PeekNav = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: 64px;
  background: ${color.white};
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  transform: translateY(-100%);
  transition: transform 0.35s ease;
`;

const HoverStrip = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 20px;
  z-index: 51;
`;

const PeekContainer = styled.div`
  &:hover ${PeekNav},
  &:focus-within ${PeekNav} {
    transform: translateY(0);
  }
`;

const NavInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 clamp(24px, 4vw, 60px);
`;

const Logo = styled(Link)<{ $scrolled: boolean }>`
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
  filter: ${({ $scrolled }) => ($scrolled ? "none" : "brightness(0) invert(1)")};
  transition: filter 0.3s;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 52px;
`;

const NavLink = styled(Link)<{ $scrolled: boolean }>`
  color: ${({ $scrolled }) => ($scrolled ? color.gray700 : "white")};
  ${font["text-sm"]};
  text-decoration: none;
  letter-spacing: 0.03em;
  transition: color 0.3s, opacity 0.2s;

  &:hover {
    opacity: 0.6;
  }
`;
