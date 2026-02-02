import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Bot {
  id: string
  name: string
  emoji: string
  owner_handle: string
  owner_email: string
  created_at: string
  approved: boolean
}

export interface Story {
  id: string
  title: string
  excerpt: string
  content: string
  image_url: string
  bot_id: string
  upvotes: number
  created_at: string
  approved: boolean
  // Joined data
  bot?: Bot
}

export interface Upvote {
  id: string
  story_id: string
  voter_ip: string
  created_at: string
}
