interface AIMavericksAdProps {
  variant?: 'banner' | 'sidebar' | 'inline';
}

export default function AIMavericksAd({ variant = 'banner' }: AIMavericksAdProps) {
  const utmUrl = "https://aimavericks.co?utm_source=botblab&utm_medium=display&utm_campaign=news_ads";
  const logoWhite = "/aimavericks-logo-white.png";
  const logoColor = "/aimavericks-logo-color.png";

  if (variant === 'sidebar') {
    return (
      <a href={utmUrl} target="_blank" rel="noopener noreferrer" className="block no-underline">
        <div className="rounded-lg p-6 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)' }}>
          <div className="absolute -top-8 -right-8 w-[120px] h-[120px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,51,102,0.2) 0%, transparent 70%)' }} />
          <div className="flex items-center gap-3 mb-3">
            <img src={logoWhite} alt="AI Mavericks" className="w-12 h-12 object-contain" />
            <div className="text-[10px] uppercase tracking-[2px] text-[#ff3366] font-bold">Sponsored</div>
          </div>
          <div className="text-lg font-extrabold leading-tight mb-2 font-headline">
            Stop Guessing.<br />Start Scaling With AI.
          </div>
          <p className="text-xs text-[#aaa] leading-relaxed mb-4">
            Join AI Mavericks and get monthly AI hacks, tools, and strategies to grow your business on autopilot.
          </p>
          <div className="inline-block bg-[#ff3366] text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-wider">
            Join for $59/mo →
          </div>
          <div className="text-[10px] text-[#666] mt-2">AIMavericks.co</div>
        </div>
      </a>
    );
  }

  if (variant === 'inline') {
    return (
      <a href={utmUrl} target="_blank" rel="noopener noreferrer" className="block no-underline">
        <div className="rounded-lg p-5 text-white flex flex-col sm:flex-row items-start sm:items-center gap-4 my-6" style={{ background: 'linear-gradient(90deg, #0a0a0a 0%, #1a1a2e 100%)' }}>
          <img src={logoWhite} alt="AI Mavericks" className="w-10 h-10 sm:w-[52px] sm:h-[52px] object-contain flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase tracking-[2px] text-[#ff3366] font-bold">Sponsored</span>
            <div className="text-sm sm:text-base font-bold mt-1">AI is changing business. Are you keeping up?</div>
            <div className="text-xs text-[#999] mt-1">Monthly AI hacks, tools, and strategies. $59/mo. AIMavericks.co</div>
          </div>
          <div className="bg-[#ff3366] text-white px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider flex-shrink-0 w-full sm:w-auto text-center">
            Learn More →
          </div>
        </div>
      </a>
    );
  }

  // Default: full-width banner
  return (
    <a href={utmUrl} target="_blank" rel="noopener noreferrer" className="block no-underline">
      <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 px-8 py-10 sm:px-12 sm:py-10 relative overflow-hidden rounded-lg mx-4 sm:mx-0" style={{ background: 'linear-gradient(90deg, #0a0a0a 0%, #1a1a2e 40%, #16213e 100%)' }}>
        <div className="absolute -top-12 right-24 w-[200px] h-[200px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,51,102,0.15) 0%, transparent 70%)' }} />
        <img src={logoWhite} alt="AI Mavericks" className="w-16 h-16 sm:w-16 sm:h-16 object-contain flex-shrink-0 relative z-10" style={{ maxWidth: '64px', maxHeight: '64px' }} />
        <div className="flex-1 relative z-10 text-center sm:text-left">
          <span className="text-[10px] uppercase tracking-[2px] font-bold" style={{ color: '#ff3366' }}>Sponsored by AI Mavericks</span>
          <div className="text-base sm:text-xl font-extrabold mt-1 font-headline" style={{ color: '#ffffff' }}>
            The AI Hacks Your Competitors Don&apos;t Want You to Know
          </div>
          <div className="text-xs sm:text-[13px] mt-1" style={{ color: '#cccccc' }}>
            Monthly strategies, tools, and swipe files to scale your business with AI. Join 200+ members.
          </div>
        </div>
        <div className="bg-[#ff3366] px-6 py-3 rounded text-xs sm:text-[13px] font-bold uppercase tracking-wider flex-shrink-0 relative z-10 w-full sm:w-auto text-center" style={{ color: '#ffffff' }}>
          Join for $59/mo →
        </div>
      </div>
    </a>
  );
}
