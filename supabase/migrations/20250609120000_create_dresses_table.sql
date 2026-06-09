-- 드레스 카탈로그 테이블
create table public.dresses (
  id uuid primary key default gen_random_uuid(),

  -- 출처 정보
  shop_name   text not null,            -- 샵 이름 (예: 최재훈)
  source_url  text,                     -- 원본 페이지 주소

  -- 이미지 (파일은 Storage에, 여기엔 URL만)
  image_url   text not null,

  -- 스타일 분류
  silhouette  text,                     -- 실루엣 (A라인, 머메이드, 볼가운 등)
  neckline    text,                     -- 네크라인 (브이넥, 오프숄더 등)

  -- 가격대 (정확한 값보다 구간이 현실적이라 텍스트로)
  price_range text,                     -- 예: "200-300만원", "문의"

  -- 지역/매장
  region      text,                     -- 예: "서울 강남", "부산"
  store_name  text,                     -- 매장명 (샵 이름과 다를 수 있어 분리)

  created_at  timestamptz default now()
);

-- 자주 거를 칼럼에 인덱스 (목록 필터링 빨라짐)
create index idx_dresses_silhouette on public.dresses (silhouette);
create index idx_dresses_region     on public.dresses (region);