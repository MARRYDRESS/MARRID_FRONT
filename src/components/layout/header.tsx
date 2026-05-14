"use client";

import Link from "next/link";
import styled from "styled-components";
import color from "@/src/style/color";

const navItems = [
  { label: "아바타 만들기", href: "/avatarSetting" },
  { label: "드레스 보기", href: "#select-1" },
  { label: "마이페이지", href: "#select-2" },
  { label: "로그인", href: "#top" },
];

export default function Header() {
  return (
    <HeaderContainer>
      <HoverStrip aria-hidden />
      <HeaderBar>
        <HeaderInner>
          <Logo href="#top">merrid</Logo>
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

const HeaderBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transform: translateY(-100%);
  border-bottom: 1px solid #cfcfcf;
  background: ${color.white};
  transition: transform 0.45s ease;
  backdrop-filter: blur(6px);
`;

const HeaderContainer = styled.div`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  width: 100%;
  height: 0;

  &:hover ${HeaderBar},
  &:focus-within ${HeaderBar} {
    transform: translateY(0);
  }

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
  padding: 0 16px;
`;

const Logo = styled(Link)`
  font-size: 37px;
  font-weight: 300;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: #303030;
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
