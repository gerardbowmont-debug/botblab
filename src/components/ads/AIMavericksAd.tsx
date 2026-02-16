import Link from "next/link";

interface AIMavericksAdProps {
  variant?: 'banner' | 'sidebar' | 'inline';
}

export default function AIMavericksAd({ variant = 'banner' }: AIMavericksAdProps) {
  const utmUrl = "https://aimavericks.co?utm_source=botblab&utm_medium=display&utm_campaign=news_ads";

  if (variant === 'sidebar') {
    return (
      <a href={utmUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
          borderRadius: '8px',
          padding: '24px',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: '-30px',
            right: '-30px',
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, rgba(255,51,102,0.2) 0%, transparent 70%)',
            borderRadius: '50%',
          }} />
          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#ff3366', marginBottom: '8px', fontWeight: 700 }}>
            Sponsored
          </div>
          <div style={{ fontSize: '18px', fontWeight: 800, lineHeight: 1.3, marginBottom: '8px', fontFamily: 'Playfair Display, serif' }}>
            Stop Guessing.<br />Start Scaling With AI.
          </div>
          <p style={{ fontSize: '12px', color: '#aaa', lineHeight: 1.5, marginBottom: '16px' }}>
            Join AI Mavericks and get monthly AI hacks, tools, and strategies to grow your business on autopilot.
          </p>
          <div style={{
            display: 'inline-block',
            background: '#ff3366',
            color: '#fff',
            padding: '8px 20px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            Join for $59/mo →
          </div>
          <div style={{ fontSize: '10px', color: '#666', marginTop: '8px' }}>
            AIMavericks.co
          </div>
        </div>
      </a>
    );
  }

  if (variant === 'inline') {
    return (
      <a href={utmUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{
          background: 'linear-gradient(90deg, #0a0a0a 0%, #1a1a2e 100%)',
          borderRadius: '8px',
          padding: '20px 28px',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          margin: '24px 0',
        }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#ff3366', fontWeight: 700 }}>
              Sponsored
            </span>
            <div style={{ fontSize: '16px', fontWeight: 700, marginTop: '4px' }}>
              AI is changing business. Are you keeping up?
            </div>
            <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
              Monthly AI hacks, tools, and strategies. $59/mo. AIMavericks.co
            </div>
          </div>
          <div style={{
            background: '#ff3366',
            color: '#fff',
            padding: '10px 24px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            Learn More →
          </div>
        </div>
      </a>
    );
  }

  // Default: full-width banner
  return (
    <a href={utmUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{
        background: 'linear-gradient(90deg, #0a0a0a 0%, #1a1a2e 40%, #16213e 100%)',
        padding: '24px 32px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        margin: '0 -24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '100px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255,51,102,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#ff3366', fontWeight: 700 }}>
            Sponsored by AI Mavericks
          </span>
          <div style={{ fontSize: '20px', fontWeight: 800, marginTop: '4px', fontFamily: 'Playfair Display, serif' }}>
            The AI Hacks Your Competitors Don&apos;t Want You to Know
          </div>
          <div style={{ fontSize: '13px', color: '#aaa', marginTop: '4px' }}>
            Monthly strategies, tools, and swipe files to scale your business with AI. Join 200+ members.
          </div>
        </div>
        <div style={{
          background: '#ff3366',
          color: '#fff',
          padding: '12px 28px',
          borderRadius: '4px',
          fontSize: '13px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          position: 'relative',
          zIndex: 1,
        }}>
          Join for $59/mo →
        </div>
      </div>
    </a>
  );
}
