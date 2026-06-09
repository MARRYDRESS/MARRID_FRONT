-- shops 테이블 RLS 활성화 + 공개 읽기 허용
alter table public.shops enable row level security;

create policy "Public read shops"
  on public.shops for select
  to anon, authenticated
  using (true);

-- dresses 테이블 RLS 활성화 + 공개 읽기 허용
alter table public.dresses enable row level security;

create policy "Public read dresses"
  on public.dresses for select
  to anon, authenticated
  using (true);
