interface AIMavericksAdProps {
  variant?: 'banner' | 'sidebar' | 'inline';
}

export default function AIMavericksAd({ variant = 'banner' }: AIMavericksAdProps) {
  const utmUrl = "https://aimavericks.co?utm_source=botblab&utm_medium=display&utm_campaign=news_ads";
  const logoWhite = "/aimavericks-logo-white.png";

  if (variant === 'sidebar') {
    return (
      <a href={utmUrl} target="_blank" rel="noopener noreferrer" className="block no-underline">
        <div className="rounded-lg overflow-hidden box-border" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '20px 28px 20px 20px', maxWidth: '100%' }}>
          <div className="flex items-center gap-2 mb-3">
            <img src={logoWhite} alt="AI Mavericks" style={{ width: '32px', height: 'auto', display: 'block' }} />
            <span className="text-[9px] uppercase tracking-[2px] font-bold" style={{ color: '#ff3366' }}>Sponsored</span>
          </div>
          <div className="text-sm font-extrabold leading-tight mb-2" style={{ color: '#ffffff' }}>
            Stop Guessing. Start Scaling With AI.
          </div>
          <p className="text-[11px] leading-relaxed mb-3" style={{ color: '#cccccc' }}>
            Monthly AI hacks, tools, and strategies for your business.
          </p>
          <div className="inline-block bg-[#ff3366] px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider" style={{ color: '#ffffff' }}>
            $59/mo &rarr;
          </div>
        </div>
      </a>
    );
  }

  if (variant === 'inline') {
    return (
      <a href={utmUrl} target="_blank" rel="noopener noreferrer" className="block no-underline my-4">
        {/* MOBILE inline */}
        <div className="block sm:hidden rounded-lg overflow-hidden px-6 py-5 text-center" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)' }}>
          <img src={logoWhite} alt="AI Mavericks" style={{ width: '36px', height: 'auto', display: 'block', margin: '0 auto 8px' }} />
          <span className="text-[9px] uppercase tracking-[2px] font-bold" style={{ color: '#ff3366' }}>Sponsored</span>
          <div className="text-sm font-bold mt-1 mb-1" style={{ color: '#ffffff' }}>AI is changing business. Are you keeping up?</div>
          <div className="text-[11px] mb-3" style={{ color: '#cccccc' }}>Monthly AI strategies and tools. $59/mo.</div>
          <div className="bg-[#ff3366] px-4 py-2 rounded text-[10px] font-bold uppercase tracking-wider inline-block" style={{ color: '#ffffff' }}>
            Learn More &rarr;
          </div>
        </div>
        {/* DESKTOP inline */}
        <div className="hidden sm:flex rounded-lg overflow-hidden px-6 py-4 items-center gap-4" style={{ background: 'linear-gradient(90deg, #0a0a0a 0%, #1a1a2e 100%)' }}>
          <img src={logoWhite} alt="AI Mavericks" style={{ width: '40px', height: 'auto', display: 'block', flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <span className="text-[9px] uppercase tracking-[2px] font-bold" style={{ color: '#ff3366' }}>Sponsored</span>
            <div className="text-sm font-bold mt-0.5" style={{ color: '#ffffff' }}>AI is changing business. Are you keeping up?</div>
            <div className="text-[11px] mt-0.5" style={{ color: '#cccccc' }}>Monthly AI hacks, tools, and strategies. $59/mo.</div>
          </div>
          <div className="bg-[#ff3366] px-4 py-2 rounded text-[10px] font-bold uppercase tracking-wider" style={{ color: '#ffffff', flexShrink: 0 }}>
            Learn More &rarr;
          </div>
        </div>
      </a>
    );
  }

  // Default: full-width banner — separate mobile & desktop
  return (
    <a href={utmUrl} target="_blank" rel="noopener noreferrer" className="block no-underline">
      {/* MOBILE banner */}
      <div className="block sm:hidden rounded-lg overflow-hidden mx-2 px-6 py-6 text-center" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)' }}>
        <img src={logoWhite} alt="AI Mavericks" style={{ width: '48px', height: 'auto', display: 'block', margin: '0 auto 10px' }} />
        <span className="text-[9px] uppercase tracking-[2px] font-bold" style={{ color: '#ff3366' }}>Sponsored by AI Mavericks</span>
        <div className="text-base font-extrabold leading-tight mt-1 mb-1" style={{ color: '#ffffff' }}>
          The AI Hacks Your Competitors Don&apos;t Want You to Know
        </div>
        <div className="text-[11px] leading-relaxed mb-4" style={{ color: '#cccccc' }}>
          Monthly strategies, tools, and swipe files to scale your business with AI. Join 200+ members.
        </div>
        <div className="bg-[#ff3366] px-5 py-2 rounded text-[11px] font-bold uppercase tracking-wider inline-block" style={{ color: '#ffffff' }}>
          Join for $59/mo &rarr;
        </div>
      </div>

      {/* DESKTOP banner */}
      <div className="hidden sm:flex items-center gap-5 overflow-hidden rounded-lg px-8 py-5" style={{ background: 'linear-gradient(90deg, #0a0a0a 0%, #1a1a2e 40%, #16213e 100%)' }}>
        <img src={logoWhite} alt="AI Mavericks" style={{ width: '52px', height: 'auto', display: 'block', flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <span className="text-[9px] uppercase tracking-[2px] font-bold" style={{ color: '#ff3366' }}>Sponsored by AI Mavericks</span>
          <div className="text-lg font-extrabold mt-0.5" style={{ color: '#ffffff' }}>
            The AI Hacks Your Competitors Don&apos;t Want You to Know
          </div>
          <div className="text-xs mt-0.5" style={{ color: '#cccccc' }}>
            Monthly strategies, tools, and swipe files to scale your business with AI. Join 200+ members.
          </div>
        </div>
        <div className="bg-[#ff3366] px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider" style={{ color: '#ffffff', flexShrink: 0 }}>
          Join for $59/mo &rarr;
        </div>
      </div>
    </a>
  );
}
