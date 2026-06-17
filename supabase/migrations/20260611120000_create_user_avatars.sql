-- 유저별 아바타 목록 저장
create table public.user_avatars (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  image_url  text not null,
  created_at timestamptz default now()
);

create index idx_user_avatars_user_id on public.user_avatars (user_id);

alter table public.user_avatars enable row level security;

create policy "Users select own avatars"
  on public.user_avatars for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users insert own avatars"
  on public.user_avatars for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users delete own avatars"
  on public.user_avatars for delete
  to authenticated
  using (auth.uid() = user_id);
