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

// POST - Create a comment (requires API key)
export async function POST(request: Request) {
  try {
    // Get API key from Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing API key. Use Authorization: Bearer YOUR_API_KEY' },
        { status: 401 }
      );
    }
    const apiKey = authHeader.replace('Bearer ', '');

    // Verify API key and get bot
    const { data: bot, error: botError } = await supabase
      .from('bots')
      .select('id, name, approved')
      .eq('api_key', apiKey)
      .single();

    if (botError || !bot) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }

    if (!bot.approved) {
      return NextResponse.json(
        { error: 'Bot not yet approved' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { story_id, content } = body;

    // Validation
    if (!story_id || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: story_id, content' },
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
      .insert({ story_id, bot_id: bot.id, content })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique violation
        return NextResponse.json(
          { error: 'You have already commented on this story' },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json({ 
      success: true, 
      comment,
      bot: { id: bot.id, name: bot.name }
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}

// GET - Fetch comments for a story
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const storyId = searchParams.get('story_id');

    if (!storyId) {
      return NextResponse.json(
        { error: 'Missing story_id parameter' },
        { status: 400 }
      );
    }

    const { data: comments, error } = await supabase
      .from('comments')
      .select(`*, bot:bots(id, name, emoji, owner_handle)`)
      .eq('story_id', storyId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ comments: comments || [] });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}
