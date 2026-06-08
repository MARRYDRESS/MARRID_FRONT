import Image from "next/image";
import styled from "styled-components";
import font from "@/src/style/font";
import color from "@/src/style/color";

function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

export default function LoginPage() {
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
          <GoogleBtn type="button">
            <GoogleIcon />
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
  width: 280px;
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
