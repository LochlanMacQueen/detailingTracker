-- Run this in the Supabase SQL editor to create the settings table

create table if not exists settings (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) not null unique,
  business_name text not null default '',
  business_type text not null default '',
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Row Level Security
alter table settings enable row level security;

create policy "Users can read own settings"
  on settings for select
  using (auth.uid() = user_id);

create policy "Users can insert own settings"
  on settings for insert
  with check (auth.uid() = user_id);

create policy "Users can update own settings"
  on settings for update
  using (auth.uid() = user_id);
