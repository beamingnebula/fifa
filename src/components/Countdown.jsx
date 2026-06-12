import React, { useState, useEffect } from 'react';
import { getCountdown } from '../utils/timeUtils';

// FIFA World Cup 2026 Final: July 19, 2026
const FINAL_DATE = '2026-07-19T20:00:00Z';

export default function Countdown({ targetDate = FINAL_DATE, label = "Until the Final", compact = false }) {
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
      <div style={{ textAlign: 'center', padding: compact ? '2px 0' : '8px 0' }}>
        <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: compact ? 12 : 18, fontWeight: 700 }}>
          ⚽ Live / Completed
        </span>
      </div>
    );
  }

  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
        {label && (
          <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {label}
          </span>
        )}
        <div style={{ display: 'flex', gap: 4 }}>
          {units.map(({ value, label: lbl }) => (
            <div key={lbl} style={{
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 6,
              padding: '3px 6px',
              minWidth: 28,
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#FFD700', fontFamily: 'monospace', display: 'block', lineHeight: 1 }}>
                {String(value).padStart(2, '0')}
              </span>
              <span style={{ fontSize: 6, fontWeight: 600, color: 'rgba(255,255,255,0.5)', display: 'block', marginTop: 1 }}>
                {lbl.substring(0, 3)}
              </span>
            </div>
          ))}
        </div>
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
