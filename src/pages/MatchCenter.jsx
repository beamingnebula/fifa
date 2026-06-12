import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import MatchCard from '../components/MatchCard';
import { getMatchStatus } from '../utils/matchUtils';
import { Activity, Clock } from 'lucide-react';
import { useFixtures } from '../context/FixturesContext';

export default function MatchCenter({ onBack, onMatchClick, timezoneOffset = 6 }) {
  const { fixtures } = useFixtures();
  const [filter, setFilter] = useState('All');

  const live = fixtures.filter(f => getMatchStatus(f) === 'LIVE');
  const completed = fixtures.filter(f => getMatchStatus(f) === 'FT').reverse();
  const upcoming = fixtures.filter(f => getMatchStatus(f) === 'UPCOMING').slice(0, 20);

  const tabs = [
    { id: 'All',      label: `All (${fixtures.length})` },
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
          {filter === 'All' ? (
            <>
              {live.length > 0 && (
                <>
                  <div style={{
                    padding: '16px 16px 8px',
                    fontSize: 12,
                    fontWeight: 800,
                    color: 'var(--fifa-red)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}>
                    <span className="live-dot" style={{ margin: 0, width: 6, height: 6 }} />
                    Live Matches
                  </div>
                  {live.map(m => (
                    <MatchCard key={m.id} match={m} onClick={onMatchClick} timezoneOffset={timezoneOffset} />
                  ))}
                </>
              )}
              {upcoming.length > 0 && (
                <>
                  <div style={{
                    padding: '16px 16px 8px',
                    fontSize: 12,
                    fontWeight: 800,
                    color: 'var(--fifa-gold)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}>
                    ⚽ Upcoming Matches
                  </div>
                  {upcoming.map(m => (
                    <MatchCard key={m.id} match={m} onClick={onMatchClick} timezoneOffset={timezoneOffset} />
                  ))}
                </>
              )}
              {completed.length > 0 && (
                <>
                  <div style={{
                    padding: '16px 16px 8px',
                    fontSize: 12,
                    fontWeight: 800,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}>
                    ⏱ Finished Matches
                  </div>
                  {completed.map(m => (
                    <MatchCard key={m.id} match={m} onClick={onMatchClick} timezoneOffset={timezoneOffset} />
                  ))}
                </>
              )}
            </>
          ) : (
            displayed.map(m => (
              <MatchCard key={m.id} match={m} onClick={onMatchClick} timezoneOffset={timezoneOffset} />
            ))
          )}
          <div style={{ height: 24 }} />
        </>
      )}

      <style>{`@keyframes pulse-dot { 0%,100% { opacity:1; } 50% { opacity:0.4; } }`}</style>
    </div>
  );
}
