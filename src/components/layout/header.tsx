"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import color from "@/src/style/color";
import font from "@/src/style/font";

const STORAGE_KEY = "marrid_home_header_intro_dismissed";

const navItems = [
  { label: "아바타 만들기", href: "/avatarSetting" },
  { label: "드레스 보기", href: "/dress" },
  { label: "샵 보기", href: "/shop" },
  { label: "마이페이지", href: "/mypage" },
  { label: "로그인", href: "/login" },
];

function readIntroDismissed(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return sessionStorage.getItem(STORAGE_KEY) === "1";
}

export default function Header() {
  const [introDismissed, setIntroDismissed] = useState(false);

  useLayoutEffect(() => {
    setIntroDismissed(readIntroDismissed());
  }, []);

  useEffect(() => {
    const dismiss = () => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setIntroDismissed(true);
    };

    const onScroll = () => {
      if (window.scrollY > 24) {
        dismiss();
      }
    };

    const onClickCapture = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest("a[href]");
      if (!el) {
        return;
      }
      const raw = el.getAttribute("href");
      if (!raw || raw.startsWith("mailto:") || raw.startsWith("tel:")) {
        return;
      }
      try {
        const url = new URL(raw, window.location.href);
        if (
          url.pathname !== window.location.pathname ||
          url.search !== window.location.search
        ) {
          dismiss();
        }
      } catch {
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    document.addEventListener("click", onClickCapture, true);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  const peekOnly = introDismissed;

  return (
    <HeaderContainer $peekOnly={peekOnly}>
      <HoverStrip aria-hidden />
      <HeaderBar $peekOnly={peekOnly}>
        <HeaderInner>
          <Logo href="/">MERRID</Logo>
          <Nav>
            {navItems.map((item) => (
              <NavLink key={item.label} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </Nav>
        </HeaderInner>
      </HeaderBar>
    </HeaderContainer>
  );
}

const HeaderBar = styled.header<{ $peekOnly: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transform: translateY(${({ $peekOnly }) => ($peekOnly ? "-100%" : "0")});
  border-bottom: 1px solid #cfcfcf;
  background: ${color.white};
  transition: transform 0.45s ease;
  backdrop-filter: blur(6px);
`;

const HeaderContainer = styled.div<{ $peekOnly: boolean }>`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  width: 100%;
  height: 0;

  ${({ $peekOnly }) =>
    $peekOnly
      ? css`
          &:hover ${HeaderBar},
          &:focus-within ${HeaderBar} {
            transform: translateY(0);
          }
        `
      : ""}

  @media (hover: none) {
    ${HeaderBar} {
      transform: translateY(0);
    }
  }
`;

const HoverStrip = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 24px;
  z-index: 51;
`;

const HeaderInner = styled.div`
  margin: 0 auto;
  display: flex;
  height: 64px;
  width: 100%;
  max-width: 1440px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 clamp(24px, 4vw, 48px);
`;

const Logo = styled(Link)`
  ${font["title-md"]};
  color: ${color.gray900};
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 56px;
`;

const NavLink = styled(Link)`
  color: #666;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.25s ease;
  &:hover {
    color: #1f1f1f;
  }
`;
