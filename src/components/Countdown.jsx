import React, { useState, useEffect } from 'react';
import { getCountdown } from '../utils/timeUtils';

// FIFA World Cup 2026 Final: July 19, 2026
const FINAL_DATE = '2026-07-19T20:00:00Z';

export default function Countdown({ 
  targetDate = FINAL_DATE, 
  label = "Until the Final", 
  compact = false, 
  hud = false, 
  className = '' 
}) {
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
      <div className={`countdown-finished ${hud ? 'text-hud-active' : ''}`} style={{ textAlign: 'center', padding: compact ? '2px 0' : '8px 0' }}>
        <span style={{ fontSize: compact ? 12 : 18, fontWeight: 700 }}>
          ⚽ Live / Completed
        </span>
      </div>
    );
  }

  const containerClass = compact ? 'countdown-compact-adaptive' : 'countdown-container-adaptive';
  const hudClass = hud ? 'countdown-hud' : '';
  const combinedClass = `${containerClass} ${hudClass} ${className}`.trim();

  // If compact, we also show a small inline label if specified
  if (compact) {
    return (
      <div className={`countdown-compact-wrapper ${hudClass}`} style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
        {label && (
          <span className="countdown-compact-label" style={{ 
            fontSize: 10, 
            fontWeight: 700, 
            textTransform: 'uppercase', 
            letterSpacing: 0.5,
            color: hud ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)'
          }}>
            {label}
          </span>
        )}
        <div className={combinedClass}>
          {units.map(({ value, label: lbl }) => (
            <div key={lbl} className="countdown-unit-adaptive">
              <span className="countdown-number-adaptive">
                {String(value).padStart(2, '0')}
              </span>
              <span className="countdown-label-adaptive">
                {lbl.substring(0, 3)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={hudClass}>
      {label && (
        <div className="countdown-header-label" style={{ 
          fontSize: 11, 
          fontWeight: 600, 
          textTransform: 'uppercase', 
          letterSpacing: '1.2px', 
          marginBottom: 8,
          color: hud ? 'rgba(255,255,255,0.6)' : 'var(--text-secondary)'
        }}>
          ⏱ {label}
        </div>
      )}
      <div className={combinedClass}>
        {units.map(({ value, label: lbl }) => (
          <div key={lbl} className="countdown-unit-adaptive">
            <span className="countdown-number-adaptive">
              {String(value).padStart(2, '0')}
            </span>
            <span className="countdown-label-adaptive">{lbl}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
