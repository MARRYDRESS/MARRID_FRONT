-- 기존 dresses(사실은 샵 정보였던) 테이블 제거하고 새로 구성
drop table if exists public.dresses;

-- 샵 테이블
create table public.shops (
  id uuid primary key default gen_random_uuid(),
  shop_name       text not null,        -- 샵 이름
  cover_image_url text,                 -- 샵 대표 사진 한 장
  region          text,                 -- 지역 (서울 강남 등)
  price_range     text,                 -- 샵 가격대 (예: "200-400만원대")
  source_url      text,                 -- 샵 홈페이지
  created_at      timestamptz default now()
);

-- 드레스 테이블 (드레스 보기 탭 + AI 피팅용)
create table public.dresses (
  id uuid primary key default gen_random_uuid(),
  shop_id     uuid references public.shops(id) on delete cascade not null,  -- 어느 샵 드레스인지
  image_url   text not null,            -- 드레스 사진 (AI 피팅에 들어감)
  silhouette  text,                     -- 실루엣 (선택)
  neckline    text,                     -- 네크라인 (선택)
  created_at  timestamptz default now()
);

create index idx_dresses_shop_id on public.dresses (shop_id);