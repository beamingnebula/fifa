import React, { useState, useEffect } from 'react';
import { getLiveMatchClock } from '../utils/timeUtils';

export default function MatchClock({ utcDate, status }) {
  const [clockText, setClockText] = useState(() => getLiveMatchClock(utcDate));

  useEffect(() => {
    if (status !== 'LIVE') {
      setClockText(status === 'FT' ? 'FT' : 'Upcoming');
      return;
    }

    // Initial state setup
    setClockText(getLiveMatchClock(utcDate));

    const interval = setInterval(() => {
      setClockText(getLiveMatchClock(utcDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [utcDate, status]);

  return <span>{clockText}</span>;
}
