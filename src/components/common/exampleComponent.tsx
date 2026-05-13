import styled from "styled-components";
import color from "@/src/style/color";
import font from "@/src/style/font";

const EXAMPLES = {
  face: {
    imageSrc: "/images/face_example.jpg",
    imageAlt: "얼굴 사진 예시",
    label: "얼굴 예시",
  },
  body: {
    imageSrc: "/images/body_example.jpg",
    imageAlt: "전신 사진 예시",
    label: "전신 예시",
  },
} as const;

export type ExampleVariant = keyof typeof EXAMPLES;

export type ExampleComponentProps = {
  variant: ExampleVariant;
};

export default function ExampleComponent({ variant }: ExampleComponentProps) {
  const { imageSrc, imageAlt, label } = EXAMPLES[variant];

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
  ${font["text-sm"]}
  color: ${color.gray700};
`;
