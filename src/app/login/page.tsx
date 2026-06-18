"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styled from "styled-components";
import font from "@/src/style/font";
import color from "@/src/style/color";
import { supabase } from "@/src/lib/supabase";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace("/mypage/dashboard");
    });
  }, [router]);

  const handleGoogleLogin = async () => {
    // NEXT_PUBLIC_SITE_URL이 있으면 그걸 쓰고, 없으면 현재 origin 사용
    // → 로컬: http://localhost:3000, 배포: Vercel 대시보드에서 설정한 값
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
      window.location.origin;

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${siteUrl}/auth/callback`,
      },
    });
  };
  return (
    <Shell>
      <LeftPane>
        <Image
          src="/images/login_bg.jpg"
          alt="웨딩 커플 사진"
          fill
          priority
          sizes="55vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </LeftPane>

      <RightPane>
        <RightInner>
          <Logo>MARRID</Logo>
          <GoogleBtn type="button" onClick={handleGoogleLogin}>
            <FcGoogle size={22} />
            <span>구글로 로그인하기</span>
          </GoogleBtn>
        </RightInner>
      </RightPane>
    </Shell>
  );
}

const Shell = styled.div`
  display: flex;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background: ${color.white};
`;

const LeftPane = styled.div`
  position: relative;
  flex: 0 0 55%;
  overflow: hidden;
  @media (max-width: 900px) {
    display: none;
  }
`;

const RightPane = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${color.white};
`;

const RightInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: min(92vw, 360px);
`;

const Logo = styled.h1`
  ${font["title-lg"]};
  color: ${color.black};
  letter-spacing: 0.05em;
  margin: 0;
`;

const GoogleBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 320px;
  height: 62px;
  padding: 0 24px;
  border: 1px solid ${color.gray700};
  border-radius: 12px;
  background: ${color.white};
  cursor: pointer;
  transition: background 0.18s;

  span {
    ${font["text-lg"]};
    color: ${color.black};
    white-space: nowrap;
  }

  &:hover {
    background: ${color.gray100};
  }
`;
