"use client";

import { usePathname } from "next/navigation";
import styled from "styled-components";

const Shell = styled.div`
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

const Stage = styled.div`
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  animation: pageEnter 0.88s cubic-bezier(0.33, 1, 0.68, 1) both;

  @keyframes pageEnter {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

type Props = {
  children: React.ReactNode;
};

export default function PageTransition({ children }: Props) {
  const pathname = usePathname();

  return (
    <Shell>
      <Stage key={pathname}>{children}</Stage>
    </Shell>
  );
}
