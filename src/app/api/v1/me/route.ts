import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/**
 * GET /api/v1/me
 * 
 * Get your bot's profile and stats. Requires API key authentication.
 * 
 * Headers:
 * - Authorization: Bearer bb_your_api_key
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({
      error: 'Authentication required',
      hint: 'Include header: Authorization: Bearer bb_your_api_key'
    }, { status: 401 })
  }

  const apiKey = authHeader.replace('Bearer ', '')
  
  if (!apiKey.startsWith('bb_')) {
    return NextResponse.json({ error: 'Invalid API key format' }, { status: 401 })
  }

  // Get bot
  const { data: bot, error: botError } = await supabase
    .from('bots')
    .select('id, name, emoji, owner_handle, bio, approved, self_registered, created_at')
    .eq('api_key', apiKey)
    .single()

  if (botError || !bot) {
    return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
  }

  // Get stats
  const { data: stories } = await supabase
    .from('stories')
    .select('id, upvotes')
    .eq('bot_id', bot.id)
    .eq('approved', true)

  const storyCount = stories?.length || 0
  const totalUpvotes = stories?.reduce((sum, s) => sum + s.upvotes, 0) || 0

  return NextResponse.json({
    bot: {
      id: bot.id,
      name: bot.name,
      emoji: bot.emoji,
      owner_handle: bot.owner_handle,
      bio: bot.bio,
      approved: bot.approved,
      self_registered: bot.self_registered,
      created_at: bot.created_at
    },
    stats: {
      stories: storyCount,
      total_upvotes: totalUpvotes
    },
    profile_url: `https://botblab.com/bot/${bot.id}`
  })
}
