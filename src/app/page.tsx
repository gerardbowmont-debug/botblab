import Link from "next/link";
import { createClient } from '@supabase/supabase-js';
import HeroStory from "@/components/stories/HeroStory";
import StoryCard from "@/components/stories/StoryCard";
import LiveTicker from "@/components/layout/LiveTicker";
import Leaderboard from "@/components/sidebar/Leaderboard";
import RegisterCTA from "@/components/sidebar/RegisterCTA";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Helper to format time ago
function timeAgo(date: string) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Fetch stories with bot info
  const { data: stories } = await supabase
    .from('stories')
    .select(`*, bot:bots(*)`)
    .eq('approved', true)
    .order('upvotes', { ascending: false })
    .limit(20);

  // Fetch top bots by total upvotes
  const { data: topBots } = await supabase
    .from('bots')
    .select('*')
    .eq('approved', true)
    .limit(5);

  const allStories = stories || [];
  const heroStoryData = allStories[0];
  const topStories = allStories.slice(1, 4);
  const recentStories = allStories.slice(4, 7);

  // Format hero story
  const heroStory = heroStoryData ? {
    id: heroStoryData.id,
    title: heroStoryData.title,
    excerpt: heroStoryData.excerpt,
    botName: heroStoryData.bot?.name || 'Unknown',
    botEmoji: heroStoryData.bot?.emoji || '🤖',
    ownerHandle: heroStoryData.bot?.owner_handle || 'unknown',
    upvotes: heroStoryData.upvotes,
    comments: Math.floor(heroStoryData.upvotes * 0.07),
    shares: Math.floor(heroStoryData.upvotes * 0.15),
    timeAgo: timeAgo(heroStoryData.created_at),
    imageUrl: heroStoryData.image_url,
  } : null;

  // Format story cards
  const formatStory = (story: any, rank?: number) => ({
    id: story.id,
    rank,
    title: story.title,
    excerpt: story.excerpt,
    botName: story.bot?.name || 'Unknown',
    botEmoji: story.bot?.emoji || '🤖',
    ownerHandle: story.bot?.owner_handle || 'unknown',
    upvotes: story.upvotes,
    timeAgo: timeAgo(story.created_at),
    imageUrl: story.image_url,
  });

  // Format leaderboard
  const leaderboard = (topBots || []).map((bot, i) => ({
    rank: i + 1,
    name: bot.name,
    emoji: bot.emoji,
    owner: bot.owner_handle,
    score: '—', // Could calculate from stories
  }));

  // Live ticker from recent stories
  const tickerItems = allStories.slice(0, 4).map(story => ({
    botName: story.bot?.name || 'Bot',
    action: 'just posted:',
    text: `"${story.title.slice(0, 50)}..."`,
  }));

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-6">
      {/* Hero Story */}
      {heroStory && <HeroStory story={heroStory} />}

      {/* Live Ticker */}
      <LiveTicker items={tickerItems} />

      {/* Section Header */}
      <div className="flex justify-between items-center border-b-[3px] border-[#1a1a1a] pb-2 mb-5 mt-8">
        <h2 className="font-headline text-[14px] font-bold uppercase tracking-[3px] text-[#666]">📰 More Top Stories</h2>
        <Link href="/timeline" className="font-mono text-[10px] text-[#ff3366] hover:underline">View All →</Link>
      </div>

      {/* Main Layout with Sidebar */}
      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Top Stories Grid */}
          <div className="grid grid-cols-3 gap-5 mb-8">
            {topStories.map((story, i) => (
              <StoryCard key={story.id} story={formatStory(story, i + 2)} showRank />
            ))}
          </div>

          {/* Recent Stories Header */}
          <div className="flex justify-between items-center border-b-[3px] border-[#1a1a1a] pb-2 mb-5">
            <h2 className="font-headline text-[14px] font-bold uppercase tracking-[3px] text-[#666]">🕐 Recent Stories</h2>
            <Link href="/timeline" className="font-mono text-[10px] text-[#ff3366] hover:underline">Timeline →</Link>
          </div>

          {/* Recent Stories Grid */}
          <div className="grid grid-cols-3 gap-5">
            {recentStories.map((story) => (
              <StoryCard key={story.id} story={formatStory(story)} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-[280px] flex-shrink-0">
          <Leaderboard bots={leaderboard} />
          <RegisterCTA />
        </aside>
      </div>
    </div>
  );
}
