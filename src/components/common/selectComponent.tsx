import styled from "styled-components";
import font from "@/src/style/font";
import color from "@/src/style/color";

type SelectSectionProps = {
  id?: string;
  title: string;
  images: string[];
};

export default function SelectComponent({ id, title, images }: SelectSectionProps) {
  return (
    <Section id={id}>
      <Title>{title}</Title>
      <Grid>
        {images.map((src, index) => (
          <Card key={src}>
            <CardImageWrap>
              <CardImage src={src} alt={`드레스 추천 이미지 ${index + 1}`} />
            </CardImageWrap>
            <CardLabel>미카도 실크</CardLabel>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}

const Section = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
`;

const Title = styled.h2`
  padding: 48px 0;
  text-align: center;
  font-size: 45px;
  font-weight: 300;
  letter-spacing: -0.01em;
  color: #5c5c5c;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 40px;
`;

const Card = styled.article`
  min-width: 0;
  overflow: hidden;
  background: transparent;
`;

const CardImageWrap = styled.div`
  width: 100%;
  aspect-ratio: 607 / 710;
  overflow: hidden;
  flex-shrink: 0;
`;

const CardImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const CardLabel = styled.p`
  padding: 12px 0;
  text-align: center;
  font-size: ${font["title-sm"]};
  color: ${color.black};
`;
