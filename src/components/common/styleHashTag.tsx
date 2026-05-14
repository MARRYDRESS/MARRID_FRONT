import styled from "styled-components";
import font from "@/src/style/font";
import color from "@/src/style/color";

type StyleHashTagProps = {
  label: string;
};

export default function StyleHashTag({ label }: StyleHashTagProps) {
  return <Pill>{label}</Pill>;
}

const Pill = styled.span`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 11px;
  border-radius: 20px;
  border: 1px solid ${color.white};
  color: ${color.white};
  ${font["text-md"]};
  white-space: nowrap;
`;
