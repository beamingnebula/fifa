import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import MatchCard from '../components/MatchCard';
import { FIXTURES } from '../data/fixtures';
import { getMatchStatus } from '../utils/matchUtils';
import { Activity, Clock } from 'lucide-react';

export default function MatchCenter({ onBack, onMatchClick, timezoneOffset = 6 }) {
  const [filter, setFilter] = useState('All');

  const live = FIXTURES.filter(f => getMatchStatus(f) === 'LIVE');
  const completed = FIXTURES.filter(f => getMatchStatus(f) === 'FT').reverse();
  const upcoming = FIXTURES.filter(f => getMatchStatus(f) === 'UPCOMING').slice(0, 20);

  const tabs = [
    { id: 'All',      label: `All (${FIXTURES.length})` },
    { id: 'LIVE',     label: `Live (${live.length})` },
    { id: 'FT',       label: `Finished (${completed.length})` },
    { id: 'UPCOMING', label: `Upcoming (${upcoming.length})` },
  ];

  const displayed = filter === 'LIVE' ? live
    : filter === 'FT' ? completed
    : filter === 'UPCOMING' ? upcoming
    : [...live, ...completed, ...upcoming];

  return (
    <div>
      <TopBar title="Match Center" onBack={onBack} />

      {/* Tabs */}
      <div className="filter-chips" style={{ paddingTop: 12 }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`filter-chip ${filter === tab.id ? 'active' : ''}`}
            onClick={() => setFilter(tab.id)}
          >
            {tab.id === 'LIVE' && live.length > 0 && (
              <span style={{ width: 7, height: 7, background: filter === 'LIVE' ? 'white' : '#C8102E', borderRadius: '50%', display: 'inline-block', marginRight: 4, animation: 'pulse-dot 1.5s infinite' }} />
            )}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Live Alert Banner */}
      {live.length > 0 && (
        <div style={{
          margin: '8px 16px',
          background: 'linear-gradient(135deg, #C8102E, #E8304A)',
          borderRadius: 14,
          padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: 10,
          color: 'white',
        }}>
          <Activity size={18} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{live.length} Match{live.length > 1 ? 'es' : ''} Live Right Now!</div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Tap to see live updates</div>
          </div>
          <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: 'white', animation: 'pulse-dot 1.5s infinite' }} />
        </div>
      )}

      {/* Match List */}
      {displayed.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            {filter === 'LIVE' ? <Activity size={28} /> : <Clock size={28} />}
          </div>
          <div className="empty-state-title">
            {filter === 'LIVE' ? 'No Live Matches' : 'No Matches'}
          </div>
          <div className="empty-state-desc">
            {filter === 'LIVE' ? 'Check back during match times' : 'Try another filter'}
          </div>
        </div>
      ) : (
        <>
          {displayed.map(m => (
            <MatchCard key={m.id} match={m} onClick={onMatchClick} timezoneOffset={timezoneOffset} />
          ))}
          <div style={{ height: 24 }} />
        </>
      )}

      <style>{`@keyframes pulse-dot { 0%,100% { opacity:1; } 50% { opacity:0.4; } }`}</style>
    </div>
  );
}
