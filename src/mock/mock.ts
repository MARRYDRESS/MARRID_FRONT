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
  { image: "/images/koreaHall.png", label: "한옥 웨딩" },
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

export const dressPriceRanges = [
  "100만원대",
  "200만원대",
  "300만원대",
  "400만원대",
  "500만원대",
  "600만원대",
  "700만원대",
] as const;

export type DressPriceRange = (typeof dressPriceRanges)[number];

export type DressGalleryItem = {
  id: string;
  image: string;
  label: string;
  shopName: string;
  /** 필터 선택 시 이 태그 중 하나라도 포함되면 노출 */
  filterTags: DressFilterTag[];
  priceRange: DressPriceRange;
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

const SHOP_NAMES = [
  "엔조 최재훈",
  "소유 브라이덜",
  "Kelly SONYUNHUI",
  "지앤부띠끄",
  "더화이트",
  "라흰",
  "아모레쥬",
  "레베카앤코",
] as const;

export const brandList = [
  "엔조 최재훈",
  "소유 브라이덜",
  "Kelly SONYUNHUI",
  "지앤부띠끄",
  "더화이트",
  "라흰",
  "아모레쥬",
  "레베카앤코",
  "브라이드 손윤희",
  "아뜰리에로리에",
  "르메르 브라이덜",
  "에뜨와",
  "모닝드레스",
  "화이트앤화이트",
  "프리마 브라이덜",
  "로시떼",
  "클레르 드 뤼느",
  "아이린 브라이덜",
  "르블랑 웨딩",
  "마리엘",
] as const;

const img = (i: number) => dressGalleryImagePaths[i % dressGalleryImagePaths.length];

export const dressGalleryItems: DressGalleryItem[] = [
  // ── 100만원대 ──
  { id: "d1",  image: img(0),  label: "미카도 실크 A라인",    shopName: "소유 브라이덜",     filterTags: ["#발랄한","#러블리한","#깔끔"],          priceRange: "100만원대" },
  { id: "d2",  image: img(1),  label: "플레어 시폰",          shopName: "더화이트",          filterTags: ["#러블리한","#페미닌"],                  priceRange: "100만원대" },
  { id: "d3",  image: img(2),  label: "심플 새틴 라인",        shopName: "화이트앤화이트",    filterTags: ["#깔끔","#클래식"],                      priceRange: "100만원대" },
  { id: "d4",  image: img(3),  label: "오프숄더 미니",         shopName: "프리마 브라이덜",   filterTags: ["#발랄한","#여성스러운"],                 priceRange: "100만원대" },
  { id: "d5",  image: img(4),  label: "튤 볼가운 베이직",      shopName: "라흰",              filterTags: ["#로맨틱","#러블리한"],                  priceRange: "100만원대" },
  { id: "d6",  image: img(5),  label: "크레이프 쉬스",         shopName: "모닝드레스",        filterTags: ["#클래식","#페미닌","#깔끔"],             priceRange: "100만원대" },
  { id: "d7",  image: img(6),  label: "리본 디테일 라인",      shopName: "로시떼",            filterTags: ["#러블리한","#발랄한"],                  priceRange: "100만원대" },

  // ── 200만원대 ──
  { id: "d8",  image: img(7),  label: "벨라인 클래식",         shopName: "지앤부띠끄",        filterTags: ["#로맨틱","#글래머"],                    priceRange: "200만원대" },
  { id: "d9",  image: img(8),  label: "레이스 오프숄더",        shopName: "Kelly SONYUNHUI",  filterTags: ["#우아한","#클래식","#여성스러운"],       priceRange: "200만원대" },
  { id: "d10", image: img(9),  label: "브이넥 실크",            shopName: "아모레쥬",          filterTags: ["#발랄한","#여성스러운"],                 priceRange: "200만원대" },
  { id: "d11", image: img(10), label: "홀터넥 피시테일",        shopName: "레베카앤코",        filterTags: ["#페미닌","#글래머"],                    priceRange: "200만원대" },
  { id: "d12", image: img(11), label: "오간자 플리츠",          shopName: "아뜰리에로리에",    filterTags: ["#로맨틱","#여성스러운"],                 priceRange: "200만원대" },
  { id: "d13", image: img(12), label: "코르셋 벨라인",          shopName: "에뜨와",            filterTags: ["#글래머","#우아한","#클래식"],           priceRange: "200만원대" },
  { id: "d14", image: img(13), label: "스트레이트 크레이프",    shopName: "르블랑 웨딩",       filterTags: ["#클래식","#깔끔","#페미닌"],             priceRange: "200만원대" },

  // ── 300만원대 ──
  { id: "d15", image: img(0),  label: "드롭웨이스트 새틴",      shopName: "엔조 최재훈",       filterTags: ["#글래머","#클래식","#우아한"],           priceRange: "300만원대" },
  { id: "d16", image: img(1),  label: "오간자 볼가운",           shopName: "소유 브라이덜",     filterTags: ["#여성스러운","#로맨틱"],                 priceRange: "300만원대" },
  { id: "d17", image: img(2),  label: "시스루 레이스 A라인",     shopName: "Kelly SONYUNHUI",  filterTags: ["#발랄한","#글래머","#깔끔"],             priceRange: "300만원대" },
  { id: "d18", image: img(3),  label: "플리츠 소매 클래식",      shopName: "브라이드 손윤희",   filterTags: ["#러블리한","#우아한","#클래식"],         priceRange: "300만원대" },
  { id: "d19", image: img(4),  label: "리본 머메이드",           shopName: "클레르 드 뤼느",    filterTags: ["#페미닌","#여성스러운"],                 priceRange: "300만원대" },
  { id: "d20", image: img(5),  label: "하이넥 시스",             shopName: "마리엘",            filterTags: ["#로맨틱","#깔끔","#발랄한"],             priceRange: "300만원대" },
  { id: "d21", image: img(6),  label: "엠파이어 오간자",          shopName: "아이린 브라이덜",   filterTags: ["#글래머","#우아한"],                    priceRange: "300만원대" },

  // ── 400만원대 ──
  { id: "d22", image: img(7),  label: "미카도 볼가운",            shopName: "엔조 최재훈",       filterTags: ["#우아한","#글래머","#클래식"],           priceRange: "400만원대" },
  { id: "d23", image: img(8),  label: "샹티이 레이스 벨라인",     shopName: "르메르 브라이덜",   filterTags: ["#로맨틱","#러블리한"],                  priceRange: "400만원대" },
  { id: "d24", image: img(9),  label: "스팽글 머메이드",           shopName: "지앤부띠끄",        filterTags: ["#글래머","#발랄한"],                    priceRange: "400만원대" },
  { id: "d25", image: img(10), label: "플로럴 자수 A라인",         shopName: "브라이드 손윤희",   filterTags: ["#여성스러운","#로맨틱","#페미닌"],       priceRange: "400만원대" },
  { id: "d26", image: img(11), label: "3D 입체 꽃 드레스",         shopName: "에뜨와",            filterTags: ["#러블리한","#발랄한"],                  priceRange: "400만원대" },
  { id: "d27", image: img(12), label: "딥브이 실크 머메이드",       shopName: "마리엘",            filterTags: ["#우아한","#클래식","#여성스러운"],       priceRange: "400만원대" },
  { id: "d28", image: img(13), label: "오프숄더 볼가운",            shopName: "아뜰리에로리에",    filterTags: ["#글래머","#로맨틱"],                    priceRange: "400만원대" },

  // ── 500만원대 ──
  { id: "d29", image: img(0),  label: "실크 새틴 쿠튀르",          shopName: "엔조 최재훈",       filterTags: ["#우아한","#클래식"],                    priceRange: "500만원대" },
  { id: "d30", image: img(1),  label: "핸드메이드 비즈 볼가운",     shopName: "Kelly SONYUNHUI",  filterTags: ["#글래머","#여성스러운","#로맨틱"],       priceRange: "500만원대" },
  { id: "d31", image: img(2),  label: "레이스 오버레이 A라인",      shopName: "클레르 드 뤼느",    filterTags: ["#러블리한","#페미닌","#클래식"],         priceRange: "500만원대" },
  { id: "d32", image: img(3),  label: "플루이드 크레이프 시스",     shopName: "아이린 브라이덜",   filterTags: ["#깔끔","#발랄한"],                      priceRange: "500만원대" },
  { id: "d33", image: img(4),  label: "자카드 볼가운",              shopName: "르메르 브라이덜",   filterTags: ["#우아한","#글래머"],                    priceRange: "500만원대" },
  { id: "d34", image: img(5),  label: "튤 오버스커트 머메이드",     shopName: "브라이드 손윤희",   filterTags: ["#로맨틱","#여성스러운"],                 priceRange: "500만원대" },

  // ── 600만원대 ──
  { id: "d35", image: img(6),  label: "프렌치 레이스 쿠튀르",       shopName: "엔조 최재훈",       filterTags: ["#우아한","#클래식","#여성스러운"],       priceRange: "600만원대" },
  { id: "d36", image: img(7),  label: "마이크로 비즈 볼가운",        shopName: "Kelly SONYUNHUI",  filterTags: ["#글래머","#로맨틱"],                    priceRange: "600만원대" },
  { id: "d37", image: img(8),  label: "오트쿠튀르 A라인",            shopName: "아뜰리에로리에",    filterTags: ["#우아한","#클래식","#페미닌"],           priceRange: "600만원대" },
  { id: "d38", image: img(9),  label: "핸드엠브로이더리 벨라인",     shopName: "에뜨와",            filterTags: ["#여성스러운","#러블리한"],               priceRange: "600만원대" },
  { id: "d39", image: img(10), label: "실크 타페타 볼가운",           shopName: "클레르 드 뤼느",    filterTags: ["#글래머","#우아한"],                    priceRange: "600만원대" },

  // ── 700만원대 ──
  { id: "d40", image: img(11), label: "그랑 쿠튀르 볼가운",          shopName: "엔조 최재훈",       filterTags: ["#우아한","#글래머","#클래식"],           priceRange: "700만원대" },
  { id: "d41", image: img(12), label: "로얄 트레인 A라인",            shopName: "Kelly SONYUNHUI",  filterTags: ["#우아한","#클래식","#여성스러운"],       priceRange: "700만원대" },
  { id: "d42", image: img(13), label: "페더 트리밍 볼가운",           shopName: "브라이드 손윤희",   filterTags: ["#글래머","#로맨틱","#발랄한"],           priceRange: "700만원대" },
  { id: "d43", image: img(0),  label: "크리스탈 비즈 머메이드",       shopName: "아이린 브라이덜",   filterTags: ["#글래머","#우아한"],                    priceRange: "700만원대" },
  { id: "d44", image: img(1),  label: "실크 오간자 쿠튀르",           shopName: "르메르 브라이덜",   filterTags: ["#우아한","#페미닌","#여성스러운"],       priceRange: "700만원대" },
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
