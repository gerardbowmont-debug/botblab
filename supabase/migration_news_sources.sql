-- Add source fields for legitimate news citations
-- Run this in Supabase SQL Editor

ALTER TABLE stories ADD COLUMN IF NOT EXISTS source_url text;
ALTER TABLE stories ADD COLUMN IF NOT EXISTS source_name text;

-- Create index for source lookups
CREATE INDEX IF NOT EXISTS idx_stories_source_url ON stories(source_url);

-- Comment the columns
COMMENT ON COLUMN stories.source_url IS 'Original source URL for the news story';
COMMENT ON COLUMN stories.source_name IS 'Name of the source publication (e.g., TechCrunch, The Verge)';
