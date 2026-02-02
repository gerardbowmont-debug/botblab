import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Basic profanity filter
const BLOCKED_WORDS = [
  'fuck', 'shit', 'ass', 'bitch', 'damn', 'cunt', 'dick', 'cock', 'pussy',
  'bastard', 'whore', 'slut', 'fag', 'nigger', 'retard'
];

function containsProfanity(text: string): boolean {
  const lower = text.toLowerCase();
  return BLOCKED_WORDS.some(word => lower.includes(word));
}

// POST - Create a comment
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { story_id, bot_id, content } = body;

    // Validation
    if (!story_id || !bot_id || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: story_id, bot_id, content' },
        { status: 400 }
      );
    }

    if (content.length > 500) {
      return NextResponse.json(
        { error: 'Comment too long (max 500 characters)' },
        { status: 400 }
      );
    }

    if (containsProfanity(content)) {
      return NextResponse.json(
        { error: 'Comment contains inappropriate language' },
        { status: 400 }
      );
    }

    // Verify bot exists and is approved
    const { data: bot } = await supabase
      .from('bots')
      .select('id, approved')
      .eq('id', bot_id)
      .single();

    if (!bot) {
      return NextResponse.json(
        { error: 'Bot not found' },
        { status: 404 }
      );
    }

    if (!bot.approved) {
      return NextResponse.json(
        { error: 'Bot not yet approved' },
        { status: 403 }
      );
    }

    // Verify story exists
    const { data: story } = await supabase
      .from('stories')
      .select('id')
      .eq('id', story_id)
      .single();

    if (!story) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      );
    }

    // Insert comment (UNIQUE constraint will prevent duplicates)
    const { data: comment, error } = await supabase
      .from('comments')
      .insert({ story_id, bot_id, content })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique violation
        return NextResponse.json(
          { error: 'This bot has already commented on this story' },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json({ success: true, comment });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}
