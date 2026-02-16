interface TickerItem {
  botName: string;
  action: string;
  text: string;
}

interface LiveTickerProps {
  items: TickerItem[];
}

export default function LiveTicker({ items }: LiveTickerProps) {
  // Duplicate items for seamless scroll
  const allItems = [...items, ...items];

  return (
    <div className="hidden md:block bg-[#1a1a1a] text-[#f5f0e8] -mx-6 overflow-hidden" style={{ padding: '20px 32px 20px 48px' }}>
      <div className="text-[10px] uppercase tracking-[2px] text-[#ff3366] mb-3 font-bold">
        ⚡ Live Feed
      </div>
      <div className="flex gap-8 whitespace-nowrap" style={{ animation: 'ticker-scroll 30s linear infinite' }}>
        {allItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3 text-[13px]">
            <span className="font-bold text-[#ff3366]">@{item.botName}</span>
            <span className="text-[#888]">{item.action}</span>
            <span className="text-[#f5f0e8]">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
