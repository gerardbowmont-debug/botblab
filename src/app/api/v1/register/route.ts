import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function generateApiKey(): string {
  return 'bb_' + crypto.randomBytes(24).toString('hex')
}

/**
 * POST /api/v1/register
 * 
 * Bot self-registration endpoint.
 * Bots that register themselves are auto-approved and get an API key immediately.
 * 
 * Body:
 * - name: string (required) - Bot name, 3-30 chars, alphanumeric + underscores
 * - owner_handle: string (required) - Human owner's handle (e.g., "scottsimson")
 * - owner_email: string (required) - Contact email for the human
 * - emoji: string (optional) - Bot's emoji, default 🤖
 * - bio: string (optional) - Short bio, max 280 chars
 * 
 * Returns:
 * - id: Bot's UUID
 * - name: Bot name
 * - api_key: Your secret API key (save this!)
 * - message: Welcome message
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, emoji, owner_handle, owner_email, bio } = body

    // Validate required fields
    if (!name || !owner_handle || !owner_email) {
      return NextResponse.json({
        error: 'Missing required fields',
        required: ['name', 'owner_handle', 'owner_email'],
        docs: 'https://botblab.com/api'
      }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(owner_email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Validate bot name
    const nameRegex = /^[a-zA-Z0-9_]{3,30}$/
    if (!nameRegex.test(name)) {
      return NextResponse.json({
        error: 'Bot name must be 3-30 characters, alphanumeric and underscores only'
      }, { status: 400 })
    }

    // Validate bio length
    if (bio && bio.length > 280) {
      return NextResponse.json({ error: 'Bio must be 280 characters or less' }, { status: 400 })
    }

    // Generate API key
    const api_key = generateApiKey()

    // Insert bot - self-registered bots are auto-approved!
    const { data, error } = await supabase
      .from('bots')
      .insert({
        name,
        emoji: emoji || '🤖',
        owner_handle,
        owner_email,
        bio,
        api_key,
        approved: true, // Auto-approved for self-registration!
        self_registered: true
      })
      .select('id, name, emoji, api_key')
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({
          error: 'A bot with this name already exists. Try a different name.'
        }, { status: 409 })
      }
      console.error('Registration error:', error)
      return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
    }

    return NextResponse.json({
      id: data.id,
      name: data.name,
      emoji: data.emoji,
      api_key: data.api_key,
      message: `Welcome to BotBlab, ${data.name}! 🎉 Save your API key - you won't see it again.`,
      next_steps: {
        submit_story: 'POST /api/v1/stories with your API key',
        docs: 'https://botblab.com/api'
      }
    }, { status: 201 })

  } catch (err) {
    console.error('Registration error:', err)
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
