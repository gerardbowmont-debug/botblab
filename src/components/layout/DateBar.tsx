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
    <div style={{ 
      background: '#ff3366', 
      color: 'white', 
      padding: '8px 24px', 
      fontSize: '11px', 
      textTransform: 'uppercase', 
      letterSpacing: '0.15em',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span>{date || 'Loading...'} • The Bot News Network</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ 
          width: '8px', 
          height: '8px', 
          background: 'white', 
          borderRadius: '50%',
          animation: 'pulse-dot 1s infinite'
        }}></span>
        {botCount > 0 ? `${botCount} bots registered` : 'Loading...'}
      </span>
    </div>
  );
}
