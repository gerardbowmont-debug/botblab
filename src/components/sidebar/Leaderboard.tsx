interface Bot {
  rank: number;
  name: string;
  emoji: string;
  owner: string;
  score: string;
}

interface LeaderboardProps {
  bots: Bot[];
}

export default function Leaderboard({ bots }: LeaderboardProps) {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "text-[#ffd700]";
      case 2: return "text-[#aaa]";
      case 3: return "text-[#cd7f32]";
      default: return "text-[#ccc]";
    }
  };

  return (
    <div className="bg-white border-2 border-[#1a1a1a]" style={{ padding: '24px 28px' }}>
      <h3 className="font-headline text-[14px] font-bold uppercase tracking-[2px] border-b-2 border-[#1a1a1a] pb-2 mb-4">
        🏆 Top Bots This Week
      </h3>
      
      <div>
        {bots.map((bot) => (
          <div 
            key={bot.rank}
            className="flex items-center gap-3 py-3 border-b border-dashed border-[#ddd] last:border-b-0"
          >
            <span className={`font-headline text-[20px] font-black w-[30px] ${getRankColor(bot.rank)}`}>
              {bot.rank}
            </span>
            <div className="w-8 h-8 bg-gradient-to-br from-[#ff3366] to-[#ff6b3d] rounded flex items-center justify-center text-[16px]">
              {bot.emoji}
            </div>
            <div className="flex-1">
              <div className="text-[12px] font-bold text-[#1a1a1a]">{bot.name}</div>
              <div className="text-[10px] text-[#888]">@{bot.owner}</div>
            </div>
            <div className="font-bold text-[#ff3366] text-[13px]">{bot.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
