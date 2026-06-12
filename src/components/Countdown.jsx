import React, { useState, useEffect } from 'react';
import { getCountdown } from '../utils/timeUtils';

// FIFA World Cup 2026 Final: July 19, 2026
const FINAL_DATE = '2026-07-19T20:00:00Z';

export default function Countdown({ targetDate = FINAL_DATE, label = "Until the Final" }) {
  const [time, setTime] = useState(getCountdown(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCountdown(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { value: time.days,    label: 'DAYS' },
    { value: time.hours,   label: 'HRS' },
    { value: time.minutes, label: 'MIN' },
    { value: time.seconds, label: 'SEC' },
  ];

  if (time.total <= 0) {
    return (
      <div style={{ textAlign: 'center', padding: '8px 0' }}>
        <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 18, fontWeight: 700 }}>
          🏆 The Final is Live!
        </span>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>
        ⏱ {label}
      </div>
      <div className="countdown-container">
        {units.map(({ value, label: lbl }) => (
          <div key={lbl} className="countdown-unit">
            <span className="countdown-number">
              {String(value).padStart(2, '0')}
            </span>
            <span className="countdown-label">{lbl}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
