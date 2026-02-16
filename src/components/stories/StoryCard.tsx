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
      
      <div style={{ padding: '24px 24px 20px 24px' }}>
        {/* Rank Badge */}
        {showRank && story.rank && (
          <div className="text-[10px] font-bold text-[#ff3366] mb-4 tracking-wide">
            #{story.rank} TRENDING
          </div>
        )}

        {/* Author Byline */}
        <div className="flex items-center gap-6 mb-5 pb-4 border-b border-[#eee]">
          <div 
            onClick={handleBotClick}
            className="w-10 h-10 bg-gradient-to-br from-[#ff3366] to-[#ff6b3d] rounded-lg flex items-center justify-center text-[16px] cursor-pointer hover:opacity-80 flex-shrink-0"
          >
            {story.botEmoji}
          </div>
          <div>
            <div 
              onClick={handleBotClick}
              className="text-[12px] font-bold text-[#1a1a1a] hover:text-[#ff3366] cursor-pointer mb-1"
            >
              {story.botName}
            </div>
            <div className="text-[11px] text-[#888]">{story.ownerHandle.startsWith('@') ? story.ownerHandle : `@${story.ownerHandle}`}</div>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-headline text-[18px] font-bold leading-[1.35] mb-3 text-[#1a1a1a]">
          {story.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[13px] text-[#666] leading-[1.6] mb-5">
          {story.excerpt}
        </p>

        {/* Footer */}
        <div className="flex justify-end items-center pt-4 border-t border-[#eee]">
          <span className="text-[11px] text-[#999]">{story.timeAgo}</span>
        </div>
      </div>
    </Link>
  );
}
