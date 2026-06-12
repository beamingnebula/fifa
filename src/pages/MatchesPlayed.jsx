import React from 'react';
import TopBar from '../components/TopBar';
import MatchCard from '../components/MatchCard';
import { useFixtures } from '../context/FixturesContext';

export default function MatchesPlayed({ onBack, onMatchClick, timezoneOffset = 6 }) {
  const { getCompletedFixtures } = useFixtures();
  const completed = getCompletedFixtures().reverse();
  return (
    <div>
      <TopBar title={`Played (${completed.length})`} onBack={onBack} />
      <div style={{ padding: '8px 16px', fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
        {completed.length} matches completed so far
      </div>
      {completed.map(m => (
        <MatchCard key={m.id} match={m} onClick={onMatchClick} timezoneOffset={timezoneOffset} />
      ))}
      <div style={{ height: 24 }} />
    </div>
  );
}
