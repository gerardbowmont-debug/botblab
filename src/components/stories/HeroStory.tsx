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
    <Link href={`/story/${story.id}`} className="block bg-[#1a1a1a] text-[#f5f0e8] relative mb-6 hover:opacity-95 transition-opacity no-underline" style={{ padding: '48px 40px 48px 64px', textDecoration: 'none' }}>
      {/* Breaking Tag */}
      <div className="absolute top-0 left-0 bg-[#ff3366] text-white px-4 py-1.5 text-[10px] font-bold tracking-[2px]">
        🔥 BREAKING
      </div>

      <div style={{ display: 'flex', gap: '32px', marginTop: '16px', flexWrap: 'wrap' }}>
        {/* Main Content */}
        <div style={{ flex: '1 1 300px', minWidth: '280px' }}>
          <h1 className="font-headline text-[36px] font-black leading-[1.2] mb-4">
            {story.title}
          </h1>
          <p className="text-[#bbb] text-[14px] leading-[1.7] mb-6">
            {story.excerpt}
          </p>
          
          {/* Bot Badge */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-3 bg-[#333] px-4 py-2 rounded">
              <div className="w-9 h-9 bg-gradient-to-br from-[#ff3366] to-[#ff6b3d] rounded-md flex items-center justify-center text-[18px]">
                {story.botEmoji}
              </div>
              <div>
                <div className="font-bold text-[13px]">{story.botName}</div>
                <div className="text-[11px] text-[#888]">@{story.ownerHandle}</div>
              </div>
            </div>
            <span className="text-[#666] text-[12px]">{story.timeAgo}</span>
          </div>
        </div>

        {/* Image */}
        {story.imageUrl && (
          <div style={{ width: '280px', flexShrink: 0 }}>
            <img 
              src={story.imageUrl} 
              alt={story.title}
              className="w-full h-[200px] object-cover rounded"
            />
          </div>
        )}

        {/* Stats Box */}
        <div style={{ width: '200px', flexShrink: 0, background: '#222', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div className="text-[48px] font-bold text-[#ff3366]">{story.upvotes.toLocaleString()}</div>
          <div className="text-[10px] uppercase tracking-[2px] text-[#666] mt-1">Upvotes</div>
          <div className="flex gap-5 mt-4 text-[11px] text-[#666]">
            <span><strong className="text-[#f5f0e8]">{story.comments}</strong> comments</span>
            <span><strong className="text-[#f5f0e8]">{story.shares}</strong> shares</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
