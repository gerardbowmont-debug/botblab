interface AIMavericksAdProps {
  variant?: 'banner' | 'sidebar' | 'inline';
}

export default function AIMavericksAd({ variant = 'banner' }: AIMavericksAdProps) {
  const utmUrl = "https://aimavericks.co?utm_source=botblab&utm_medium=display&utm_campaign=news_ads";
  const logoWhite = "/aimavericks-logo-white.png";

  if (variant === 'sidebar') {
    return (
      <a href={utmUrl} target="_blank" rel="noopener noreferrer" className="block no-underline">
        <div className="rounded-lg p-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)' }}>
          <div className="absolute -top-8 -right-8 w-[120px] h-[120px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,51,102,0.2) 0%, transparent 70%)' }} />
          <div className="flex items-center gap-3 mb-4">
            <img src={logoWhite} alt="AI Mavericks" className="w-10 h-10 object-contain" />
            <div className="text-[10px] uppercase tracking-[2px] font-bold" style={{ color: '#ff3366' }}>Sponsored</div>
          </div>
          <div className="text-lg font-extrabold leading-tight mb-2 font-headline" style={{ color: '#ffffff' }}>
            Stop Guessing.<br />Start Scaling With AI.
          </div>
          <p className="text-xs leading-relaxed mb-4" style={{ color: '#cccccc' }}>
            Join AI Mavericks and get monthly AI hacks, tools, and strategies to grow your business on autopilot.
          </p>
          <div className="inline-block bg-[#ff3366] px-5 py-2 rounded text-xs font-bold uppercase tracking-wider" style={{ color: '#ffffff' }}>
            Join for $59/mo &rarr;
          </div>
          <div className="text-[10px] mt-3" style={{ color: '#666666' }}>AIMavericks.co</div>
        </div>
      </a>
    );
  }

  if (variant === 'inline') {
    return (
      <a href={utmUrl} target="_blank" rel="noopener noreferrer" className="block no-underline my-6">
        {/* MOBILE inline */}
        <div className="block sm:hidden rounded-lg p-6 text-center" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)' }}>
          <img src={logoWhite} alt="AI Mavericks" className="w-10 h-10 object-contain mx-auto mb-3" />
          <div className="text-[10px] uppercase tracking-[2px] font-bold mb-2" style={{ color: '#ff3366' }}>Sponsored</div>
          <div className="text-sm font-bold mb-1" style={{ color: '#ffffff' }}>AI is changing business. Are you keeping up?</div>
          <div className="text-xs mb-4" style={{ color: '#cccccc' }}>Monthly AI hacks, tools, and strategies. $59/mo.</div>
          <div className="bg-[#ff3366] px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider inline-block" style={{ color: '#ffffff' }}>
            Learn More &rarr;
          </div>
        </div>
        {/* DESKTOP inline */}
        <div className="hidden sm:flex rounded-lg p-6 items-center gap-5" style={{ background: 'linear-gradient(90deg, #0a0a0a 0%, #1a1a2e 100%)' }}>
          <img src={logoWhite} alt="AI Mavericks" className="w-[52px] h-[52px] object-contain flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase tracking-[2px] font-bold" style={{ color: '#ff3366' }}>Sponsored</span>
            <div className="text-base font-bold mt-1" style={{ color: '#ffffff' }}>AI is changing business. Are you keeping up?</div>
            <div className="text-xs mt-1" style={{ color: '#cccccc' }}>Monthly AI hacks, tools, and strategies. $59/mo. AIMavericks.co</div>
          </div>
          <div className="bg-[#ff3366] px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider flex-shrink-0" style={{ color: '#ffffff' }}>
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
      <div className="block sm:hidden rounded-lg mx-4 px-8 py-10 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)' }}>
        <div className="absolute -top-12 right-8 w-[160px] h-[160px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,51,102,0.15) 0%, transparent 70%)' }} />
        <img src={logoWhite} alt="AI Mavericks" className="w-14 h-14 object-contain mx-auto mb-4 relative z-10" />
        <div className="text-[10px] uppercase tracking-[2px] font-bold mb-2 relative z-10" style={{ color: '#ff3366' }}>Sponsored by AI Mavericks</div>
        <div className="text-lg font-extrabold leading-tight mb-2 font-headline relative z-10" style={{ color: '#ffffff' }}>
          The AI Hacks Your Competitors Don&apos;t Want You to Know
        </div>
        <div className="text-xs leading-relaxed mb-5 relative z-10" style={{ color: '#cccccc' }}>
          Monthly strategies, tools, and swipe files to scale your business with AI. Join 200+ members.
        </div>
        <div className="bg-[#ff3366] px-6 py-3 rounded text-xs font-bold uppercase tracking-wider inline-block relative z-10" style={{ color: '#ffffff' }}>
          Join for $59/mo &rarr;
        </div>
      </div>

      {/* DESKTOP banner */}
      <div className="hidden sm:flex items-center gap-6 px-12 py-8 relative overflow-hidden rounded-lg" style={{ background: 'linear-gradient(90deg, #0a0a0a 0%, #1a1a2e 40%, #16213e 100%)' }}>
        <div className="absolute -top-12 right-24 w-[200px] h-[200px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,51,102,0.15) 0%, transparent 70%)' }} />
        <img src={logoWhite} alt="AI Mavericks" className="w-16 h-16 object-contain flex-shrink-0 relative z-10" />
        <div className="flex-1 relative z-10">
          <span className="text-[10px] uppercase tracking-[2px] font-bold" style={{ color: '#ff3366' }}>Sponsored by AI Mavericks</span>
          <div className="text-xl font-extrabold mt-1 font-headline" style={{ color: '#ffffff' }}>
            The AI Hacks Your Competitors Don&apos;t Want You to Know
          </div>
          <div className="text-[13px] mt-1" style={{ color: '#cccccc' }}>
            Monthly strategies, tools, and swipe files to scale your business with AI. Join 200+ members.
          </div>
        </div>
        <div className="bg-[#ff3366] px-6 py-3 rounded text-[13px] font-bold uppercase tracking-wider flex-shrink-0 relative z-10" style={{ color: '#ffffff' }}>
          Join for $59/mo &rarr;
        </div>
      </div>
    </a>
  );
}
