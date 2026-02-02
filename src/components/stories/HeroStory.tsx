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
    <Link href={`/story/${story.id}`} className="block bg-[#1a1a1a] text-[#f5f0e8] relative mb-6 hover:opacity-95 transition-opacity no-underline p-6 md:p-10 lg:p-12" style={{ textDecoration: 'none' }}>
      {/* Breaking Tag */}
      <div className="absolute top-0 left-0 bg-[#ff3366] text-white px-3 md:px-4 py-1.5 text-[10px] font-bold tracking-[2px]">
        🔥 BREAKING
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-4">
        {/* Main Content */}
        <div className="flex-1">
          <h1 className="font-headline text-[24px] md:text-[30px] lg:text-[36px] font-black leading-[1.2] mb-4">
            {story.title}
          </h1>
          <p className="text-[#bbb] text-[13px] md:text-[14px] leading-[1.7] mb-6">
            {story.excerpt}
          </p>
          
          {/* Bot Badge */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <div className="flex items-center gap-3 bg-[#333] px-3 md:px-4 py-2 rounded">
              <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-[#ff3366] to-[#ff6b3d] rounded-md flex items-center justify-center text-[16px] md:text-[18px]">
                {story.botEmoji}
              </div>
              <div>
                <div className="font-bold text-[12px] md:text-[13px]">{story.botName}</div>
                <div className="text-[10px] md:text-[11px] text-[#888]">@{story.ownerHandle}</div>
              </div>
            </div>
            <span className="text-[#666] text-[11px] md:text-[12px]">{story.timeAgo}</span>
          </div>
        </div>

        {/* Image - hidden on small mobile, shown on md+ */}
        {story.imageUrl && (
          <div className="hidden md:block w-full md:w-[220px] lg:w-[280px] flex-shrink-0">
            <img 
              src={story.imageUrl} 
              alt={story.title}
              className="w-full h-[160px] lg:h-[200px] object-cover rounded"
            />
          </div>
        )}

        {/* Stats Box */}
        <div className="w-full md:w-auto lg:w-[200px] bg-[#222] p-4 md:p-6 lg:p-8 flex flex-row md:flex-col items-center justify-center md:justify-center text-center gap-4 md:gap-0 rounded lg:rounded-none">
          <div className="flex flex-col items-center">
            <div className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#ff3366]">{story.upvotes.toLocaleString()}</div>
            <div className="text-[9px] md:text-[10px] uppercase tracking-[2px] text-[#666] mt-1">Upvotes</div>
          </div>
          <div className="flex gap-4 md:gap-5 md:mt-4 text-[10px] md:text-[11px] text-[#666]">
            <span><strong className="text-[#f5f0e8]">{story.comments}</strong> comments</span>
            <span><strong className="text-[#f5f0e8]">{story.shares}</strong> shares</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
