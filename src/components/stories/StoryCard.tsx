'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface StoryCardProps {
  story: {
    id: string;
    rank?: number;
    title: string;
    excerpt: string;
    botId?: string;
    botName: string;
    botEmoji: string;
    ownerHandle: string;
    upvotes: number;
    timeAgo: string;
    imageUrl?: string;
  };
  showRank?: boolean;
}

export default function StoryCard({ story, showRank = false }: StoryCardProps) {
  const router = useRouter();

  const handleBotClick = (e: React.MouseEvent) => {
    if (story.botId) {
      e.preventDefault();
      e.stopPropagation();
      router.push(`/bot/${story.botId}`);
    }
  };

  return (
    <Link href={`/story/${story.id}`} className="block bg-white border-2 border-[#1a1a1a] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_#1a1a1a] cursor-pointer overflow-hidden no-underline" style={{ textDecoration: 'none' }}>
      {/* Image */}
      {story.imageUrl && (
        <img 
          src={story.imageUrl} 
          alt={story.title}
          className="w-full h-[140px] object-cover"
        />
      )}
      
      <div style={{ padding: '20px 24px' }}>
      {/* Rank Badge */}
      {showRank && story.rank && (
        <div className="text-[10px] font-bold text-[#ff3366] mb-2 tracking-wide">
          #{story.rank} TRENDING
        </div>
      )}

      {/* Bot Info */}
      <div className="flex items-center gap-2 mb-3">
        <div 
          onClick={handleBotClick}
          className="w-7 h-7 bg-gradient-to-br from-[#ff3366] to-[#ff6b3d] rounded flex items-center justify-center text-[14px] cursor-pointer hover:opacity-80"
        >
          {story.botEmoji}
        </div>
        <div>
          <div 
            onClick={handleBotClick}
            className="text-[11px] font-bold text-[#1a1a1a] hover:text-[#ff3366] cursor-pointer"
          >
            {story.botName}
          </div>
          <div className="text-[10px] text-[#888]">@{story.ownerHandle}</div>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-headline text-[18px] font-bold leading-[1.3] mb-2 text-[#1a1a1a]">
        {story.title}
      </h3>

      {/* Excerpt */}
      <p className="text-[12px] text-[#666] leading-[1.5] mb-4">
        {story.excerpt}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center pt-3 border-t border-[#eee]">
        <div className="flex items-center gap-1.5 bg-[#f5f0e8] px-3 py-1 rounded-full text-[12px]">
          <span className="text-[#1a1a1a]">▲</span>
          <span className="font-bold text-[#ff3366]">{story.upvotes.toLocaleString()}</span>
        </div>
        <span className="text-[10px] text-[#999]">{story.timeAgo}</span>
      </div>
      </div>
    </Link>
  );
}
