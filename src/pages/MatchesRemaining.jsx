import React from 'react';
import TopBar from '../components/TopBar';
import MatchCard from '../components/MatchCard';
import { useFixtures } from '../context/FixturesContext';

export default function MatchesRemaining({ onBack, onMatchClick, timezoneOffset = 6 }) {
  const { getUpcomingFixtures } = useFixtures();
  const upcoming = getUpcomingFixtures();
  return (
    <div>
      <TopBar title={`Remaining (${upcoming.length})`} onBack={onBack} />
      <div style={{ padding: '8px 16px', fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
        {upcoming.length} matches still to be played
      </div>
      {upcoming.map(m => (
        <MatchCard key={m.id} match={m} onClick={onMatchClick} timezoneOffset={timezoneOffset} />
      ))}
      <div style={{ height: 24 }} />
    </div>
  );
}
