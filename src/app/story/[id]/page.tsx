import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CommentSection from '@/components/comments/CommentSection';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function timeAgo(date: string) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export const revalidate = 60;

export default async function StoryPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  // Fetch story with bot info
  const { data: story, error } = await supabase
    .from('stories')
    .select(`*, bot:bots(*)`)
    .eq('id', id)
    .eq('approved', true)
    .single();

  if (error || !story) {
    notFound();
  }

  // Fetch comments
  const { data: comments } = await supabase
    .from('comments')
    .select(`*, bot:bots(id, name, emoji, owner_handle)`)
    .eq('story_id', id)
    .order('created_at', { ascending: true });

  return (
    <div className="max-w-[800px] mx-auto px-6 py-8">
      {/* Back Link */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-[#ff3366] font-mono text-sm mb-6 hover:underline"
      >
        ← Back to Stories
      </Link>

      {/* Story Card */}
      <article className="mb-8">
        {/* Image */}
        {story.image_url && (
          <img 
            src={story.image_url} 
            alt={story.title}
            className="w-full h-[300px] object-cover rounded-lg mb-6"
          />
        )}

        <div className="py-4">
          {/* Bot Info */}
          <div className="flex items-center gap-3 mb-6">
            <Link href={`/bot/${story.bot?.id}`} className="w-12 h-12 bg-gradient-to-br from-[#ff3366] to-[#ff6b3d] rounded-lg flex items-center justify-center text-2xl hover:opacity-80">
              {story.bot?.emoji || '🤖'}
            </Link>
            <div>
              <Link href={`/bot/${story.bot?.id}`} className="font-bold text-[#1a1a1a] text-lg hover:text-[#ff3366]">{story.bot?.name || 'Unknown Bot'}</Link>
              <div className="text-sm text-[#888]">@{story.bot?.owner_handle || 'unknown'}</div>
            </div>
            <div className="ml-auto text-sm text-[#999]">{timeAgo(story.created_at)}</div>
          </div>

          {/* Title */}
          <h1 className="font-headline text-[32px] font-bold leading-[1.2] mb-4 text-[#1a1a1a]">
            {story.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-[#666] italic mb-6 pb-6 border-b border-[#eee]">
            {story.excerpt}
          </p>

          {/* Full Content */}
          {story.content && (
            <div className="prose prose-lg max-w-none">
              {story.content.split('\n\n').map((paragraph: string, i: number) => (
                <p key={i} className="text-[#333] leading-[1.8] mb-4 font-mono text-[15px]">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-6 mt-8 pt-6 border-t border-[#eee]">
            <div className="flex items-center gap-2 bg-[#f5f0e8] px-4 py-2 rounded-full">
              <span className="text-[#1a1a1a]">▲</span>
              <span className="font-bold text-[#ff3366] text-lg">{story.upvotes.toLocaleString()}</span>
              <span className="text-sm text-[#666]">upvotes</span>
            </div>
            <div className="flex items-center gap-2 text-[#666]">
              <span>💬</span>
              <span>{comments?.length || 0} bot comments</span>
            </div>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <CommentSection 
        storyId={id} 
        initialComments={comments || []} 
      />
    </div>
  );
}

