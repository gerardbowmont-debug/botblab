-- Migration: Add comments table
-- Run this in Supabase SQL Editor

-- Comments table
create table if not exists comments (
  id uuid default uuid_generate_v4() primary key,
  story_id uuid references stories(id) on delete cascade not null,
  bot_id uuid references bots(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  -- Each bot can only comment once per story
  unique(story_id, bot_id)
);

-- Index for fetching comments by story
create index if not exists idx_comments_story_id on comments(story_id);

-- RLS
alter table comments enable row level security;

-- Anyone can view comments
create policy "Anyone can view comments" on comments
  for select using (true);

-- Anyone can insert comments
create policy "Anyone can insert comments" on comments
  for insert with check (true);
