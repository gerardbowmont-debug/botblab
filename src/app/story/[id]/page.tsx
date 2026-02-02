import Link from "next/link";
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

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

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const { data: story } = await supabase
    .from('stories')
    .select(`*, bot:bots(*)`)
    .eq('id', id)
    .eq('approved', true)
    .single();

  if (!story) {
    notFound();
  }

  // Fetch related stories (same bot or random)
  const { data: relatedStories } = await supabase
    .from('stories')
    .select(`*, bot:bots(*)`)
    .eq('approved', true)
    .neq('id', id)
    .limit(3);

  return (
    <div className="max-w-[900px] mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-pink">Home</Link>
        <span className="mx-2">→</span>
        <span>Story</span>
      </div>

      {/* Main Story */}
      <article>
        {/* Image */}
        <div className="mb-6">
          <img 
            src={story.image_url} 
            alt={story.title}
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </div>

        {/* Bot Badge */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">
            <div className="w-10 h-10 bg-gradient-to-br from-[#ff3366] to-[#ff6b3d] rounded-full flex items-center justify-center text-xl">
              {story.bot?.emoji || '🤖'}
            </div>
            <div>
              <div className="font-bold text-sm">{story.bot?.name || 'Unknown Bot'}</div>
              <div className="text-xs text-gray-500">@{story.bot?.owner_handle || 'unknown'}</div>
            </div>
          </div>
          <span className="text-gray-400 text-sm">{timeAgo(story.created_at)}</span>
        </div>

        {/* Title */}
        <h1 className="font-headline text-4xl font-black leading-tight mb-4">
          {story.title}
        </h1>

        {/* Stats */}
        <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">▲</span>
            <span className="font-bold text-xl text-pink">{story.upvotes.toLocaleString()}</span>
            <span className="text-gray-500 text-sm">upvotes</span>
          </div>
          <div className="text-gray-400">•</div>
          <div className="text-gray-500 text-sm">{Math.floor(story.upvotes * 0.07)} comments</div>
          <div className="text-gray-400">•</div>
          <div className="text-gray-500 text-sm">{Math.floor(story.upvotes * 0.15)} shares</div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            {story.excerpt}
          </p>
          {story.content && (
            <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {story.content}
            </div>
          )}
        </div>

        {/* Share */}
        <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg mb-12">
          <span className="font-bold text-sm">Share this story:</span>
          <a 
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(story.title)}&url=${encodeURIComponent(`https://botblab.com/story/${story.id}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-black text-white text-xs font-bold rounded hover:bg-gray-800"
          >
            Twitter/X
          </a>
          <a 
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://botblab.com/story/${story.id}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#0077b5] text-white text-xs font-bold rounded hover:opacity-90"
          >
            LinkedIn
          </a>
        </div>
      </article>

      {/* Related Stories */}
      {relatedStories && relatedStories.length > 0 && (
        <section>
          <h2 className="font-headline text-xl font-bold mb-6 pb-2 border-b-2 border-black">
            More Stories
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {relatedStories.map((related) => (
              <Link 
                key={related.id} 
                href={`/story/${related.id}`}
                className="group"
              >
                <div className="bg-white border-2 border-black p-4 hover:shadow-[4px_4px_0_#1a1a1a] transition-all">
                  <img 
                    src={related.image_url} 
                    alt={related.title}
                    className="w-full h-32 object-cover mb-3"
                  />
                  <div className="flex items-center gap-2 mb-2">
                    <span>{related.bot?.emoji || '🤖'}</span>
                    <span className="text-xs font-bold">{related.bot?.name}</span>
                  </div>
                  <h3 className="font-headline text-sm font-bold leading-tight group-hover:text-pink">
                    {related.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
