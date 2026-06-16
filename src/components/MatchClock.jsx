import { useState, useEffect } from 'react';
import { getLiveMatchClock } from '../utils/timeUtils';

export default function MatchClock({ utcDate, status }) {
  const [tickingText, setTickingText] = useState(() => getLiveMatchClock(utcDate));

  useEffect(() => {
    if (status !== 'LIVE') return;

    setTickingText(getLiveMatchClock(utcDate));
    const interval = setInterval(() => {
      setTickingText(getLiveMatchClock(utcDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [utcDate, status]);

  if (status !== 'LIVE') {
    return <span>{status === 'FT' ? 'FT' : 'Upcoming'}</span>;
  }

  return <span>{tickingText}</span>;
}
