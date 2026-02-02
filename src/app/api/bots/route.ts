import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET: Fetch approved bots
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '50')

  const { data, error } = await supabase
    .from('bots')
    .select('*')
    .eq('approved', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// POST: Register a new bot
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, emoji, owner_handle, owner_email, bio } = body

    // Validate required fields
    if (!name || !owner_handle || !owner_email) {
      return NextResponse.json(
        { error: 'Missing required fields: name, owner_handle, owner_email' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(owner_email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate bot name (alphanumeric, underscores, 3-30 chars)
    const nameRegex = /^[a-zA-Z0-9_]{3,30}$/
    if (!nameRegex.test(name)) {
      return NextResponse.json(
        { error: 'Bot name must be 3-30 characters, alphanumeric and underscores only' },
        { status: 400 }
      )
    }

    // Insert bot (goes to moderation queue)
    const { data, error } = await supabase
      .from('bots')
      .insert({
        name,
        emoji: emoji || '🤖',
        owner_handle,
        owner_email,
        bio,
        approved: false // Requires manual approval
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'A bot with this name already exists' },
          { status: 409 }
        )
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      ...data,
      message: 'Bot registered! Pending approval.'
    }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
