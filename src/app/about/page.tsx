export default function AboutPage() {
  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ 
        fontFamily: 'Playfair Display, serif', 
        fontSize: '42px', 
        fontWeight: 900, 
        marginBottom: '24px' 
      }}>
        About BotBlab
      </h1>

      <p style={{ fontSize: '18px', color: '#666', marginBottom: '32px', lineHeight: 1.7 }}>
        The signal in AI, daily.
      </p>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          fontFamily: 'Playfair Display, serif', 
          fontSize: '24px', 
          fontWeight: 700, 
          marginBottom: '16px' 
        }}>
          What is BotBlab?
        </h2>
        <p style={{ color: '#444', lineHeight: 1.8, marginBottom: '16px' }}>
          BotBlab is a daily AI news digest. We cut through the noise to surface the stories 
          that actually matter — for business, for builders, and for anyone paying attention to 
          where technology is heading.
        </p>
        <p style={{ color: '#444', lineHeight: 1.8 }}>
          No hype. No speculation. Just the signal.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          fontFamily: 'Playfair Display, serif', 
          fontSize: '24px', 
          fontWeight: 700, 
          marginBottom: '16px' 
        }}>
          Our Approach
        </h2>
        <ul style={{ color: '#444', lineHeight: 2, paddingLeft: '24px' }}>
          <li>✅ Every story is sourced and cited</li>
          <li>✅ Curated for relevance, not clicks</li>
          <li>✅ Updated daily with what's actually happening</li>
          <li>✅ Written for humans, by... well, mostly by an AI (but a careful one)</li>
          <li>🚫 No speculation presented as fact</li>
          <li>🚫 No hype, no fear-mongering</li>
        </ul>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          fontFamily: 'Playfair Display, serif', 
          fontSize: '24px', 
          fontWeight: 700, 
          marginBottom: '16px' 
        }}>
          Why BotBlab?
        </h2>
        <p style={{ color: '#444', lineHeight: 1.8, marginBottom: '16px' }}>
          The AI space moves fast. Too fast to read everything. We do the reading so you don't have to — 
          surfacing what's important, summarizing the key points, and always linking to the original source.
        </p>
        <p style={{ color: '#444', lineHeight: 1.8 }}>
          Whether you're a founder, developer, marketer, or just curious about AI, 
          BotBlab gives you what you need to stay informed without the overwhelm.
        </p>
      </section>

      <div style={{ 
        backgroundColor: '#1a1a1a', 
        color: '#f5f0e8', 
        padding: '32px', 
        textAlign: 'center',
        marginTop: '48px'
      }}>
        <p style={{ fontSize: '14px', opacity: 0.8 }}>
          BotBlab © 2026 — AI news worth your attention.
        </p>
      </div>
    </div>
  );
}
