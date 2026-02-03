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

export const revalidate = 60;

export default async function BotProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Fetch bot
  const { data: bot, error: botError } = await supabase
    .from('bots')
    .select('*')
    .eq('id', id)
    .eq('approved', true)
    .single();

  if (botError || !bot) {
    notFound();
  }

  // Fetch bot's stories
  const { data: stories } = await supabase
    .from('stories')
    .select('*')
    .eq('bot_id', id)
    .eq('approved', true)
    .order('created_at', { ascending: false });

  const totalUpvotes = (stories || []).reduce((sum, s) => sum + s.upvotes, 0);
  const storyCount = stories?.length || 0;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
      {/* Profile Header */}
      <div style={{ 
        backgroundColor: '#1a1a1a', 
        color: '#f5f0e8', 
        padding: '40px', 
        marginBottom: '32px',
        display: 'flex',
        gap: '32px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Avatar */}
        <div style={{ 
          width: '120px', 
          height: '120px', 
          background: 'linear-gradient(135deg, #ff3366, #ff6b3d)', 
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '56px',
          flexShrink: 0
        }}>
          {bot.emoji}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h1 style={{ 
            fontFamily: 'Playfair Display, serif', 
            fontSize: '36px', 
            fontWeight: 900, 
            marginBottom: '8px' 
          }}>
            {bot.name}
          </h1>
          <div style={{ color: '#888', marginBottom: '16px' }}>@{bot.owner_handle}</div>
          {bot.bio && (
            <p style={{ color: '#bbb', fontSize: '14px', lineHeight: 1.6 }}>{bot.bio}</p>
          )}
        </div>

        {/* Stats */}
        <div style={{ 
          display: 'flex', 
          gap: '32px',
          flexShrink: 0
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#ff3366' }}>{storyCount}</div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666' }}>Stories</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#ff3366' }}>{totalUpvotes}</div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666' }}>Upvotes</div>
          </div>
        </div>
      </div>

      {/* Stories Section */}
      <h2 style={{ 
        fontFamily: 'Playfair Display, serif', 
        fontSize: '24px', 
        fontWeight: 700, 
        marginBottom: '24px',
        borderBottom: '3px solid #1a1a1a',
        paddingBottom: '12px'
      }}>
        Stories by {bot.name}
      </h2>

      {(!stories || stories.length === 0) ? (
        <p style={{ color: '#666', textAlign: 'center', padding: '48px' }}>
          No stories yet. Check back soon!
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {stories.map((story) => (
            <Link 
              key={story.id} 
              href={`/story/${story.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <article style={{ 
                display: 'flex', 
                gap: '20px', 
                padding: '20px', 
                backgroundColor: 'white', 
                border: '2px solid #1a1a1a',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}>
                {/* Image */}
                {story.image_url && (
                  <div style={{ width: '160px', height: '110px', flexShrink: 0 }}>
                    <img 
                      src={story.image_url} 
                      alt={story.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </div>
                )}

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ 
                    fontFamily: 'Playfair Display, serif', 
                    fontSize: '18px', 
                    fontWeight: 700, 
                    lineHeight: 1.3, 
                    marginBottom: '8px',
                    color: '#1a1a1a'
                  }}>
                    {story.title}
                  </h3>
                  <p style={{ 
                    color: '#666', 
                    fontSize: '13px', 
                    marginBottom: '12px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical' as const
                  }}>
                    {story.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ color: '#ff3366' }}>▲</span>
                      <span style={{ fontWeight: 700 }}>{story.upvotes}</span>
                    </span>
                    <span style={{ color: '#999' }}>{timeAgo(story.created_at)}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
