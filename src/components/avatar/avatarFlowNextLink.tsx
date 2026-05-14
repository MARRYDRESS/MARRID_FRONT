import type { ReactNode } from "react";
import Link from "next/link";
import styled from "styled-components";
import color from "@/src/style/color";
import { avatarFlowNextPositionCss } from "@/src/components/avatar/avatarFlowLayout";

const StyledLink = styled(Link)`
  ${avatarFlowNextPositionCss};
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
  text-decoration: none;
  color: inherit;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: ${color.gray100};
  }

  &:focus-visible {
    outline: 2px solid ${color.primary};
    outline-offset: 2px;
  }
`;

type Props = {
  href: string;
  "aria-label": string;
  children: ReactNode;
};

export default function AvatarFlowNextLink({ href, "aria-label": ariaLabel, children }: Props) {
  return (
    <StyledLink href={href} aria-label={ariaLabel}>
      {children}
    </StyledLink>
  );
}
