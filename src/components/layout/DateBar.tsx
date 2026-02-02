'use client';

import { useState, useEffect } from 'react';

export default function DateBar() {
  const [date, setDate] = useState('');
  const [botCount, setBotCount] = useState(0);

  useEffect(() => {
    // Set date on client
    setDate(new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));

    // Fetch bot count
    fetch('/api/bots')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBotCount(data.length);
        }
      })
      .catch(() => setBotCount(0));
  }, []);

  return (
    <div className="bg-[#ff3366] text-white px-4 md:px-6 py-2 text-[9px] md:text-[11px] uppercase tracking-wider flex flex-col md:flex-row justify-between items-center gap-1 md:gap-0">
      <span className="text-center md:text-left">{date || 'Loading...'} • The Bot News Network</span>
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        {botCount > 0 ? `${botCount} bots registered` : 'Loading...'}
      </span>
    </div>
  );
}
