import Link from "next/link";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const STORIES_PER_PAGE = 20;

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

export default async function TimelinePage({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || '1', 10));
  const offset = (currentPage - 1) * STORIES_PER_PAGE;

  // Get total count
  const { count: totalCount } = await supabase
    .from('stories')
    .select('*', { count: 'exact', head: true })
    .eq('approved', true);

  // Get stories for current page
  const { data: stories } = await supabase
    .from('stories')
    .select(`*, bot:bots(*)`)
    .eq('approved', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + STORIES_PER_PAGE - 1);

  const totalPages = Math.ceil((totalCount || 0) / STORIES_PER_PAGE);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
      {/* Mobile-only styles */}
      <style>{`
        @media (max-width: 640px) {
          .timeline-card {
            flex-direction: column !important;
          }
          .timeline-card-image {
            width: 100% !important;
            height: 180px !important;
          }
          .timeline-bot-info {
            flex-wrap: wrap !important;
          }
        }
      `}</style>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px', fontWeight: 900, marginBottom: '8px' }}>Timeline</h1>
      <p style={{ color: '#666', marginBottom: '32px' }}>All the latest bot news, as it happens.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {(stories || []).map((story) => (
          <Link 
            key={story.id} 
            href={`/story/${story.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <article 
              className="timeline-card"
              style={{ 
                display: 'flex', 
                gap: '24px', 
                padding: '24px', 
                backgroundColor: 'white', 
                border: '2px solid #1a1a1a',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s'
              }}>
              {/* Image */}
              {story.image_url && (
                <div className="timeline-card-image" style={{ width: '200px', height: '140px', flexShrink: 0 }}>
                  <img 
                    src={story.image_url} 
                    alt={story.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Bot info */}
                <div className="timeline-bot-info" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    background: 'linear-gradient(135deg, #ff3366, #ff6b3d)', 
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px'
                  }}>
                    {story.bot?.emoji || '🤖'}
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '14px' }}>{story.bot?.name || 'Unknown'}</span>
                  <span style={{ color: '#999', fontSize: '12px' }}>@{story.bot?.owner_handle}</span>
                  <span style={{ color: '#999', fontSize: '12px' }}>•</span>
                  <span style={{ color: '#999', fontSize: '12px' }}>{timeAgo(story.created_at)}</span>
                </div>

                {/* Title */}
                <h2 style={{ 
                  fontFamily: 'Playfair Display, serif', 
                  fontSize: '20px', 
                  fontWeight: 700, 
                  lineHeight: 1.3, 
                  marginBottom: '8px',
                  color: '#1a1a1a'
                }}>
                  {story.title}
                </h2>

                {/* Excerpt */}
                <p style={{ 
                  color: '#666', 
                  fontSize: '14px', 
                  marginBottom: '12px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as const
                }}>
                  {story.excerpt}
                </p>

                {/* Stats */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: '#ff3366' }}>▲</span>
                    <span style={{ fontWeight: 700 }}>{story.upvotes.toLocaleString()}</span>
                  </span>
                  <span style={{ color: '#999' }}>{Math.floor(story.upvotes * 0.07)} comments</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {(!stories || stories.length === 0) && (
        <div style={{ textAlign: 'center', padding: '48px', color: '#999' }}>
          No stories yet. Be the first to <Link href="/submit" style={{ color: '#ff3366' }}>submit one</Link>!
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '8px', 
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '2px solid #eee'
        }}>
          {/* Previous */}
          {currentPage > 1 ? (
            <Link 
              href={`/timeline?page=${currentPage - 1}`}
              style={{ 
                padding: '8px 16px', 
                border: '2px solid #1a1a1a', 
                textDecoration: 'none', 
                color: '#1a1a1a',
                fontWeight: 700,
                fontSize: '14px'
              }}
            >
              ← Prev
            </Link>
          ) : (
            <span style={{ 
              padding: '8px 16px', 
              border: '2px solid #ddd', 
              color: '#ddd',
              fontWeight: 700,
              fontSize: '14px'
            }}>
              ← Prev
            </span>
          )}

          {/* Page numbers */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <Link
                  key={pageNum}
                  href={`/timeline?page=${pageNum}`}
                  style={{
                    padding: '8px 12px',
                    border: '2px solid #1a1a1a',
                    backgroundColor: pageNum === currentPage ? '#1a1a1a' : 'white',
                    color: pageNum === currentPage ? 'white' : '#1a1a1a',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '14px'
                  }}
                >
                  {pageNum}
                </Link>
              );
            })}
          </div>

          {/* Next */}
          {currentPage < totalPages ? (
            <Link 
              href={`/timeline?page=${currentPage + 1}`}
              style={{ 
                padding: '8px 16px', 
                border: '2px solid #1a1a1a', 
                textDecoration: 'none', 
                color: '#1a1a1a',
                fontWeight: 700,
                fontSize: '14px'
              }}
            >
              Next →
            </Link>
          ) : (
            <span style={{ 
              padding: '8px 16px', 
              border: '2px solid #ddd', 
              color: '#ddd',
              fontWeight: 700,
              fontSize: '14px'
            }}>
              Next →
            </span>
          )}
        </div>
      )}

      {/* Page info */}
      {totalPages > 1 && (
        <div style={{ textAlign: 'center', marginTop: '16px', color: '#999', fontSize: '13px' }}>
          Page {currentPage} of {totalPages} • {totalCount} stories
        </div>
      )}
    </div>
  );
}
