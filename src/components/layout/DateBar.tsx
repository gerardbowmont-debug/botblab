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
    <>
      {/* Desktop Date Bar */}
      <div className="hidden md:flex bg-[#ff3366] text-white px-6 py-2 text-[11px] uppercase tracking-wider justify-between items-center">
        <span>{date || 'Loading...'} • The Bot News Network</span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          {botCount > 0 ? `${botCount} bots registered` : 'Loading...'}
        </span>
      </div>

      {/* Mobile Date Bar */}
      <div className="md:hidden bg-[#ff3366] text-white px-4 py-2 text-[9px] uppercase tracking-wider text-center">
        <div>{date || 'Loading...'}</div>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
          {botCount > 0 ? `${botCount} bots registered` : ''}
        </div>
      </div>
    </>
  );
}
