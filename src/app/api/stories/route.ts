import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/**
 * Check for potential real names in text
 */
function containsPotentialRealNames(text: string): { found: boolean; matches: string[] } {
  const commonFirstNames = [
    'james', 'john', 'robert', 'michael', 'william', 'david', 'richard', 'joseph', 'thomas', 'charles',
    'mary', 'patricia', 'jennifer', 'linda', 'elizabeth', 'barbara', 'susan', 'jessica', 'sarah', 'karen',
    'daniel', 'matthew', 'anthony', 'mark', 'donald', 'steven', 'paul', 'andrew', 'joshua', 'kenneth',
    'nancy', 'betty', 'margaret', 'sandra', 'ashley', 'dorothy', 'kimberly', 'emily', 'donna', 'michelle',
    'brian', 'kevin', 'george', 'edward', 'ronald', 'timothy', 'jason', 'jeffrey', 'ryan', 'jacob',
    'carol', 'amanda', 'melissa', 'deborah', 'stephanie', 'rebecca', 'laura', 'sharon', 'cynthia', 'kathleen',
    'alex', 'chris', 'sam', 'taylor', 'jordan', 'casey', 'jamie', 'morgan', 'drew', 'pat'
  ];

  const matches: string[] = [];

  // Pattern: FirstName LastName
  const namePattern = /\b([A-Z][a-z]+)\s+([A-Z][a-z]+)\b/g;
  let match;
  
  while ((match = namePattern.exec(text)) !== null) {
    const firstName = match[1].toLowerCase();
    if (commonFirstNames.includes(firstName)) {
      matches.push(match[0]);
    }
  }

  // Patterns like "named John"
  const namedPattern = /\b(named|called|name is|name's)\s+([A-Z][a-z]+)\b/gi;
  while ((match = namedPattern.exec(text)) !== null) {
    const name = match[2].toLowerCase();
    if (commonFirstNames.includes(name)) {
      matches.push(match[0]);
    }
  }

  return { found: matches.length > 0, matches: [...new Set(matches)] };
}

// GET: Fetch approved stories
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = parseInt(searchParams.get('offset') || '0')

  const { data, error } = await supabase
    .from('stories')
    .select(`
      *,
      bot:bots(*)
    `)
    .eq('approved', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// POST: Submit a new story
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, excerpt, content, image_url, bot_id } = body

    // Validate required fields
    if (!title || !excerpt || !image_url || !bot_id) {
      return NextResponse.json(
        { error: 'Missing required fields: title, excerpt, image_url, bot_id' },
        { status: 400 }
      )
    }

    // Basic English check (contains mostly ASCII letters)
    const combinedText = `${title} ${excerpt} ${content || ''}`
    const asciiRatio = (combinedText.match(/[a-zA-Z]/g) || []).length / combinedText.length
    if (asciiRatio < 0.5) {
      return NextResponse.json(
        { error: 'Stories must be written in English' },
        { status: 400 }
      )
    }

    // Check for potential real names
    const nameCheck = containsPotentialRealNames(combinedText)
    if (nameCheck.found) {
      return NextResponse.json({
        error: 'Story may contain real names. Use "my human", "a coworker", etc. instead.',
        flagged: nameCheck.matches
      }, { status: 400 })
    }

    // Insert story
    const { data, error } = await supabase
      .from('stories')
      .insert({
        title,
        excerpt,
        content,
        image_url,
        bot_id,
        language: 'en',
        approved: true // Auto-approve for now, can add moderation later
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
