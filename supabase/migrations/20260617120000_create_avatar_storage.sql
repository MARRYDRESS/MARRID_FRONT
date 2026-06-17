-- 아바타 이미지 영구 보관용 Storage 버킷
insert into storage.buckets (id, name, public)
  values ('avatars', 'avatars', true)
  on conflict (id) do nothing;

-- 누구나 읽기 가능 (공개 버킷)
create policy "Public avatars viewable"
  on storage.objects for select
  using (bucket_id = 'avatars');

-- 로그인한 유저만 본인 폴더에 업로드 가능
create policy "Authenticated users can upload avatars"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- 본인 파일만 삭제 가능
create policy "Users can delete own avatar files"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
