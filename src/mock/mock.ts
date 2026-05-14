export type SelectMockItem = {
  image: string;
  label: string;
};

export type StyleSelectItem = SelectMockItem & {
  hashtags: string[];
};

export const selectMockItems: SelectMockItem[] = [
  { image: "/mock/main1.png", label: "미카도 실크" },
  { image: "/mock/main2.png", label: "머메이드 라인" },
  { image: "/mock/main3.png", label: "오프숄더 새틴" },
  { image: "/mock/main4.png", label: "벨라인 레이스" },
  { image: "/mock/main5.jpg", label: "프린세스 실루엣" },
  { image: "/mock/main6.jpg", label: "브이넥 클래식" },
  { image: "/mock/main7.jpg", label: "브이넥 클래식" },
];

export const hallSelectItems: SelectMockItem[] = [
  { image: "/images/outsideHall.jpg", label: "야외 웨딩" },
  { image: "/images/lightHall.jpg", label: "밝은 홀" },
  { image: "/images/darkHall.jpg", label: "어두운 홀" },
  { image: "/images/chapelHall.jpg", label: "채플 웨딩" },
  { image: "/images/houseHall.jpg", label: "하우스 웨딩" },
];

export const styleSelectItems: StyleSelectItem[] = [
  {
    image: "/mock/main1.png",
    label: "벨라인",
    hashtags: ["#러블리한", "#발랄한", "#깔끔한"],
  },
  {
    image: "/mock/main2.png",
    label: "머메이드 라인",
    hashtags: ["#우아한", "#클래식한"],
  },
  {
    image: "/mock/main3.png",
    label: "오프숄더 새틴",
    hashtags: ["#세련된", "#미니멀한"],
  },
  {
    image: "/mock/main4.png",
    label: "벨라인 레이스",
    hashtags: ["#로맨틱한", "#사랑스러운"],
  },
  {
    image: "/mock/main5.jpg",
    label: "프린세스 실루엣",
    hashtags: ["#화사한", "#드림한"],
  },
  {
    image: "/mock/main6.jpg",
    label: "브이넥 클래식",
    hashtags: ["#단정한", "#모던한"],
  },
];
