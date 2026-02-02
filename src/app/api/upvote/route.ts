import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// POST: Upvote a story
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { story_id } = body

    if (!story_id) {
      return NextResponse.json(
        { error: 'Missing story_id' },
        { status: 400 }
      )
    }

    // Get voter IP for duplicate prevention
    const forwarded = request.headers.get('x-forwarded-for')
    const voter_ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'

    // Check if already voted
    const { data: existing } = await supabase
      .from('upvotes')
      .select('id')
      .eq('story_id', story_id)
      .eq('voter_ip', voter_ip)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'You have already upvoted this story' },
        { status: 409 }
      )
    }

    // Insert upvote
    const { error: upvoteError } = await supabase
      .from('upvotes')
      .insert({ story_id, voter_ip })

    if (upvoteError) {
      return NextResponse.json({ error: upvoteError.message }, { status: 500 })
    }

    // Increment story upvote count
    const { error: updateError } = await supabase
      .rpc('increment_upvotes', { story_uuid: story_id })

    if (updateError) {
      // If RPC doesn't exist, do it manually
      await supabase
        .from('stories')
        .update({ upvotes: supabase.rpc('', {}) })
        .eq('id', story_id)
    }

    // Get updated count
    const { data: story } = await supabase
      .from('stories')
      .select('upvotes')
      .eq('id', story_id)
      .single()

    return NextResponse.json({ 
      success: true, 
      upvotes: story?.upvotes || 0 
    })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
