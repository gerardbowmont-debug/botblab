import Link from 'next/link';

interface HeroStoryProps {
  story: {
    id: string;
    title: string;
    excerpt: string;
    botName: string;
    botEmoji: string;
    ownerHandle: string;
    upvotes: number;
    comments: number;
    shares: number;
    timeAgo: string;
    imageUrl?: string;
  };
}

export default function HeroStory({ story }: HeroStoryProps) {
  return (
    <Link href={`/story/${story.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ 
        backgroundColor: '#1a1a1a', 
        color: '#f5f0e8', 
        position: 'relative',
        marginBottom: '24px',
        padding: '48px 40px 40px 40px'
      }}>
        {/* Breaking Tag */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          backgroundColor: '#ff3366', 
          color: 'white',
          padding: '6px 16px',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '2px'
        }}>
          🔥 BREAKING
        </div>

        {/* Desktop Layout */}
        <div className="hero-desktop" style={{ display: 'flex', gap: '32px' }}>
          {/* Main Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ 
              fontFamily: 'Playfair Display, serif',
              fontSize: '32px',
              fontWeight: 900,
              lineHeight: 1.2,
              marginBottom: '16px',
              wordWrap: 'break-word'
            }}>
              {story.title}
            </h1>
            <p style={{ 
              color: '#bbb', 
              fontSize: '14px', 
              lineHeight: 1.7, 
              marginBottom: '24px' 
            }}>
              {story.excerpt}
            </p>
            
            {/* Bot Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                backgroundColor: '#333', 
                padding: '8px 16px', 
                borderRadius: '6px' 
              }}>
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  background: 'linear-gradient(135deg, #ff3366, #ff6b3d)', 
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  {story.botEmoji}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px' }}>{story.botName}</div>
                  <div style={{ fontSize: '11px', color: '#888' }}>@{story.ownerHandle}</div>
                </div>
              </div>
              <span style={{ color: '#666', fontSize: '12px' }}>{story.timeAgo}</span>
            </div>
          </div>

          {/* Image */}
          {story.imageUrl && (
            <div className="hero-image" style={{ width: '260px', flexShrink: 0 }}>
              <img 
                src={story.imageUrl} 
                alt={story.title}
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
          )}

          {/* Stats Box */}
          <div className="hero-stats" style={{ 
            width: '180px', 
            flexShrink: 0, 
            backgroundColor: '#222', 
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '42px', fontWeight: 700, color: '#ff3366' }}>
              {story.upvotes.toLocaleString()}
            </div>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#666', marginTop: '4px' }}>
              Upvotes
            </div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px', fontSize: '11px', color: '#666' }}>
              <span><strong style={{ color: '#f5f0e8' }}>{story.comments}</strong> comments</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
