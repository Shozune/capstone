-- Run in Supabase SQL Editor (or via supabase db push) before using signup.
-- Creates staff profile rows linked to auth.users and copies signup metadata.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  first_name text not null default '',
  middle_initial text not null default '',
  last_name text not null default '',
  office text not null default 'health',
  role text not null default 'Staff',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'CampusCare staff profile; one row per auth user.';

create index if not exists profiles_office_idx on public.profiles (office);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, middle_initial, last_name, office, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'middle_initial', ''),
    coalesce(new.raw_user_meta_data->>'last_name', ''),
    coalesce(nullif(trim(new.raw_user_meta_data->>'office'), ''), 'health'),
    coalesce(nullif(trim(new.raw_user_meta_data->>'role'), ''), 'Staff')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
