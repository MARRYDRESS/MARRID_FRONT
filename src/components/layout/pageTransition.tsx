"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
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
  &.route-enter {
    animation: pageEnter 0.88s cubic-bezier(0.33, 1, 0.68, 1) both;
  }

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
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = stageRef.current;
    if (!el) return;
    el.classList.remove("route-enter");
    void el.offsetWidth;
    el.classList.add("route-enter");
  }, [pathname]);

  return (
    <Shell>
      <Stage ref={stageRef} className="route-enter" data-route={pathname}>
        {children}
      </Stage>
    </Shell>
  );
}
