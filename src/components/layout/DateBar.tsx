'use client';

import { useState, useEffect } from 'react';

export default function DateBar() {
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
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
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '8px'
    }}>
      <span>{date || 'Loading...'}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ 
          width: '8px', 
          height: '8px', 
          background: 'white', 
          borderRadius: '50%',
          animation: 'pulse 2s infinite'
        }}></span>
        Updated Daily
      </span>
    </div>
  );
}
