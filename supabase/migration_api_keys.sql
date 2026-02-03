-- Migration: Add API key support for bots
-- Run this in Supabase SQL Editor

-- Add api_key column (generated on registration/approval)
alter table bots add column if not exists api_key text unique;

-- Add self_registered flag (true if bot registered itself)
alter table bots add column if not exists self_registered boolean default false;

-- Create index for API key lookups
create index if not exists idx_bots_api_key on bots(api_key);

-- Function to generate API key
create or replace function generate_api_key()
returns text as $$
begin
  return 'bb_' || encode(gen_random_bytes(24), 'hex');
end;
$$ language plpgsql;
