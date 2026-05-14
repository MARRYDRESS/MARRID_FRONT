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

/** 드레스 갤러리 상단 필터·카드 매칭에 공통으로 쓰는 태그 목록 */
export const dressFilterTagOptions = [
  "#발랄한",
  "#러블리한",
  "#우아한",
  "#페미닌",
  "#여성스러운",
  "#로맨틱",
  "#깔끔",
  "#클래식",
  "#글래머",
] as const;

export type DressFilterTag = (typeof dressFilterTagOptions)[number];

export type DressGalleryItem = {
  id: string;
  image: string;
  label: string;
  /** 필터 선택 시 이 태그 중 하나라도 포함되면 노출 */
  filterTags: DressFilterTag[];
};

/**
 * main1 ~ main14 (`public/mock`). 일부는 저장 형식이 png입니다.
 * 순서: main1.png … main4.png, main5.jpg … main9.jpg, main10.png, main11.jpg … main14.jpg
 */
export const dressGalleryImagePaths = [
  "/mock/main1.png",
  "/mock/main2.png",
  "/mock/main3.png",
  "/mock/main4.png",
  "/mock/main5.jpg",
  "/mock/main6.jpg",
  "/mock/main7.jpg",
  "/mock/main8.jpg",
  "/mock/main9.jpg",
  "/mock/main10.png",
  "/mock/main11.jpg",
  "/mock/main12.jpg",
  "/mock/main13.jpg",
  "/mock/main14.jpg",
] as const;

/** 행 5×열 3 기준 15장 — 이미지는 main1~14 순환, 필터 태그 조합 유지 */
export const dressGalleryItems: DressGalleryItem[] = [
  {
    id: "d1",
    image: dressGalleryImagePaths[0],
    label: "드레스 01",
    filterTags: ["#발랄한", "#러블리한", "#깔끔"],
  },
  {
    id: "d2",
    image: dressGalleryImagePaths[1],
    label: "드레스 02",
    filterTags: ["#러블리한", "#페미닌"],
  },
  {
    id: "d3",
    image: dressGalleryImagePaths[2],
    label: "드레스 03",
    filterTags: ["#우아한", "#클래식", "#여성스러운"],
  },
  {
    id: "d4",
    image: dressGalleryImagePaths[3],
    label: "드레스 04",
    filterTags: ["#로맨틱", "#글래머"],
  },
  {
    id: "d5",
    image: dressGalleryImagePaths[4],
    label: "드레스 05",
    filterTags: ["#깔끔", "#클래식"],
  },
  {
    id: "d6",
    image: dressGalleryImagePaths[5],
    label: "드레스 06",
    filterTags: ["#발랄한", "#여성스러운"],
  },
  {
    id: "d7",
    image: dressGalleryImagePaths[6],
    label: "드레스 07",
    filterTags: ["#페미닌", "#로맨틱", "#러블리한"],
  },
  {
    id: "d8",
    image: dressGalleryImagePaths[7],
    label: "드레스 08",
    filterTags: ["#글래머", "#우아한"],
  },
  {
    id: "d9",
    image: dressGalleryImagePaths[8],
    label: "드레스 09",
    filterTags: ["#클래식", "#깔끔", "#페미닌"],
  },
  {
    id: "d10",
    image: dressGalleryImagePaths[9],
    label: "드레스 10",
    filterTags: ["#여성스러운", "#로맨틱"],
  },
  {
    id: "d11",
    image: dressGalleryImagePaths[10],
    label: "드레스 11",
    filterTags: ["#발랄한", "#글래머", "#깔끔"],
  },
  {
    id: "d12",
    image: dressGalleryImagePaths[11],
    label: "드레스 12",
    filterTags: ["#러블리한", "#우아한", "#클래식"],
  },
  {
    id: "d13",
    image: dressGalleryImagePaths[12],
    label: "드레스 13",
    filterTags: ["#페미닌", "#여성스러운"],
  },
  {
    id: "d14",
    image: dressGalleryImagePaths[13],
    label: "드레스 14",
    filterTags: ["#로맨틱", "#깔끔", "#발랄한"],
  },
  {
    id: "d15",
    image: dressGalleryImagePaths[0],
    label: "드레스 15",
    filterTags: ["#글래머", "#클래식", "#우아한"],
  },
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
