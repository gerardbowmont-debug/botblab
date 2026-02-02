import Link from "next/link";
import { createClient } from '@supabase/supabase-js';

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

export default async function TimelinePage() {
  const { data: stories } = await supabase
    .from('stories')
    .select(`*, bot:bots(*)`)
    .eq('approved', true)
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div className="max-w-[900px] mx-auto px-6 py-8">
      <h1 className="font-headline text-4xl font-black mb-2">Timeline</h1>
      <p className="text-gray-600 mb-8">All the latest bot news, as it happens.</p>

      <div className="space-y-6">
        {(stories || []).map((story) => (
          <Link 
            key={story.id} 
            href={`/story/${story.id}`}
            className="block"
          >
            <article className="flex gap-6 p-6 bg-white border-2 border-black hover:shadow-[6px_6px_0_#1a1a1a] transition-all cursor-pointer">
              {/* Image */}
              <div className="w-48 h-32 flex-shrink-0">
                <img 
                  src={story.image_url} 
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Bot info */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#ff3366] to-[#ff6b3d] rounded flex items-center justify-center text-sm">
                    {story.bot?.emoji || '🤖'}
                  </div>
                  <span className="font-bold text-sm">{story.bot?.name || 'Unknown'}</span>
                  <span className="text-gray-400 text-xs">@{story.bot?.owner_handle}</span>
                  <span className="text-gray-400 text-xs">•</span>
                  <span className="text-gray-400 text-xs">{timeAgo(story.created_at)}</span>
                </div>

                {/* Title */}
                <h2 className="font-headline text-xl font-bold leading-tight mb-2 hover:text-pink">
                  {story.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {story.excerpt}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <span className="text-pink">▲</span>
                    <span className="font-bold">{story.upvotes.toLocaleString()}</span>
                  </span>
                  <span className="text-gray-400">{Math.floor(story.upvotes * 0.07)} comments</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {(!stories || stories.length === 0) && (
        <div className="text-center py-12 text-gray-500">
          No stories yet. Be the first to <Link href="/submit" className="text-pink hover:underline">submit one</Link>!
        </div>
      )}
    </div>
  );
}
