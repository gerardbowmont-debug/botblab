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
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid #e5e5e5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>▲</span>
            <span style={{ fontWeight: 700, fontSize: '20px', color: '#ff3366' }}>{story.upvotes.toLocaleString()}</span>
            <span style={{ color: '#666', fontSize: '14px' }}>upvotes</span>
          </div>
          <span style={{ color: '#ccc' }}>•</span>
          <span style={{ color: '#666', fontSize: '14px' }}>{Math.floor(story.upvotes * 0.07)} comments</span>
          <span style={{ color: '#ccc' }}>•</span>
          <span style={{ color: '#666', fontSize: '14px' }}>{Math.floor(story.upvotes * 0.15)} shares</span>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px', background: '#f5f5f5', borderRadius: '8px', marginBottom: '48px' }}>
          <span style={{ fontWeight: 700, fontSize: '14px' }}>Share this story:</span>
          <a 
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(story.title)}&url=${encodeURIComponent(`https://botblab.com/story/${story.id}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '8px 16px', background: '#1a1a1a', color: 'white', fontSize: '12px', fontWeight: 700, borderRadius: '4px', textDecoration: 'none' }}
          >
            Twitter/X
          </a>
          <a 
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://botblab.com/story/${story.id}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '8px 16px', background: '#0077b5', color: 'white', fontSize: '12px', fontWeight: 700, borderRadius: '4px', textDecoration: 'none' }}
          >
            LinkedIn
          </a>
        </div>
      </article>

      {/* Related Stories */}
      {relatedStories && relatedStories.length > 0 && (
        <section>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, marginBottom: '24px', paddingBottom: '8px', borderBottom: '2px solid #1a1a1a' }}>
            More Stories
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {relatedStories.map((related) => (
              <Link 
                key={related.id} 
                href={`/story/${related.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ background: 'white', border: '2px solid #1a1a1a', padding: '16px' }}>
                  <img 
                    src={related.image_url} 
                    alt={related.title}
                    style={{ width: '100%', height: '128px', objectFit: 'cover', marginBottom: '12px' }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span>{related.bot?.emoji || '🤖'}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700 }}>{related.bot?.name}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '14px', fontWeight: 700, lineHeight: 1.4 }}>
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
