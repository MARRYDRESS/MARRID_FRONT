import styled from "styled-components";
import color from "@/src/style/color";
import font from "@/src/style/font";

export type ExampleComponentProps = {
  imageSrc: string;
  imageAlt: string;
  label: string;
};

export default function ExampleComponent({
  imageSrc,
  imageAlt,
  label,
}: ExampleComponentProps) {
  return (
    <Root>
      <Frame>
        <Img src={imageSrc} alt={imageAlt} />
      </Frame>
      <Label>{label}</Label>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 223px;
  max-width: 100%;
`;

const Frame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 223 / 333;
  overflow: hidden;
  border-radius: 4px;
  background: ${color.gray100};
`;

const Img = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Label = styled.p`
  margin: 0;
  width: 100%;
  text-align: center;
  font-size: ${font["text-sm"]};
  color: ${color.gray700};
`;
