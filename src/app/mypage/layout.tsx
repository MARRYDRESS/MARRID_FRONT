"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";
import color from "@/src/style/color";
import font from "@/src/style/font";
import Header from "@/src/components/layout/header";
import { useAuth } from "@/src/hooks/useAuth";

const NAV_ITEMS = [
  { label: "대시보드", href: "/mypage/dashboard" },
  { label: "내 아바타", href: "/mypage/avatar" },
  { label: "저장된 드레스", href: "/mypage/saved-dress" },
  { label: "저장된 샵", href: "/mypage/saved-shop" },
] as const;

function UserIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 15C17.071 15 18.75 13.321 18.75 11.25C18.75 9.179 17.071 7.5 15 7.5C12.929 7.5 11.25 9.179 11.25 11.25C11.25 13.321 12.929 15 15 15ZM15 17.5C12.493 17.5 7.5 18.758 7.5 21.25V22.5H22.5V21.25C22.5 18.758 17.507 17.5 15 17.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <>
      <Header forceScrolled />
      <Shell>
        <Sidebar>
          <Nav>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <NavItem key={item.href} href={item.href} $active={isActive}>
                  <UserIcon />
                  <span>{item.label}</span>
                </NavItem>
              );
            })}
          </Nav>
        </Sidebar>
        <Main>{children}</Main>
      </Shell>
    </>
  );
}

const Shell = styled.div`
  display: flex;
  min-height: 100dvh;
  padding-top: 64px;
  background: ${color.white};
`;

const Sidebar = styled.aside`
  flex-shrink: 0;
  width: 216px;
  min-height: 100dvh;
  background: ${color.gray100};
  display: flex;
  flex-direction: column;
`;


const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`;

const NavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 66px;
  padding: 0 0 0 ${({ $active }) => ($active ? "20px" : "28px")};
  border-left: ${({ $active }) => ($active ? `8px solid ${color.primary}` : "none")};
  background: ${({ $active }) =>
    $active ? "rgba(229, 191, 191, 0.2)" : "transparent"};
  color: ${color.black};
  ${font["text-sm"]};
  text-decoration: none;
  transition: background 0.15s;

  &:hover {
    background: rgba(229, 191, 191, 0.1);
  }
`;

const Main = styled.main`
  flex: 1;
  min-width: 0;
  padding: 80px 48px 80px 60px;
`;
