import React, { useState, useMemo } from 'react';
import TopBar from '../components/TopBar';
import SearchBar from '../components/SearchBar';
import MatchCard from '../components/MatchCard';
import GroupTable from '../components/GroupTable';
import { FIXTURES, GROUPS } from '../data/fixtures';
import { TEAMS } from '../data/teams';
import { getMatchStatus, getStageName } from '../utils/matchUtils';
import { formatDate } from '../utils/timeUtils';

const STAGES = ['All', 'Group Stage', 'Round of 32', 'Round of 16', 'Quarter-finals', 'Semi-finals', 'Final'];
const STAGE_MAP = {
  'Group Stage': 'GROUP',
  'Round of 32': 'R32',
  'Round of 16': 'R16',
  'Quarter-finals': 'QF',
  'Semi-finals': 'SF',
  'Final': 'FINAL',
};

const VIEWS = ['Matches', 'Groups'];

export default function Fixtures({ onBack, onMatchClick, timezoneOffset = 6 }) {
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('All');
  const [view, setView] = useState('Matches');

  const filtered = useMemo(() => {
    let list = FIXTURES;
    if (stageFilter !== 'All') {
      const stageCode = STAGE_MAP[stageFilter];
      list = list.filter(f => f.stage === stageCode);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(f => {
        const h = TEAMS[f.home]?.name?.toLowerCase() || f.home.toLowerCase();
        const a = TEAMS[f.away]?.name?.toLowerCase() || f.away.toLowerCase();
        return h.includes(q) || a.includes(q);
      });
    }
    return list;
  }, [search, stageFilter]);

  // Group matches by date
  const grouped = useMemo(() => {
    const byDate = {};
    filtered.forEach(f => {
      const key = formatDate(f.utcDate, timezoneOffset);
      if (!byDate[key]) byDate[key] = [];
      byDate[key].push(f);
    });
    return Object.entries(byDate);
  }, [filtered, timezoneOffset]);

  return (
    <div>
      <TopBar title="Fixtures" onBack={onBack} />

      {/* View Toggle */}
      <div style={{ display: 'flex', padding: '8px 16px', gap: 8 }}>
        {VIEWS.map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            style={{
              flex: 1,
              padding: '9px 0',
              border: '2px solid',
              borderColor: view === v ? 'var(--fifa-red)' : 'var(--border-color)',
              borderRadius: 24,
              background: view === v ? 'var(--fifa-red)' : 'transparent',
              color: view === v ? 'white' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {v}
          </button>
        ))}
      </div>

      {view === 'Matches' ? (
        <>
          <SearchBar value={search} onChange={setSearch} placeholder="Search teams..." />
          {/* Stage Filters */}
          <div className="filter-chips">
            {STAGES.map(s => (
              <button
                key={s}
                className={`filter-chip ${stageFilter === s ? 'active' : ''}`}
                onClick={() => setStageFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Match List */}
          {grouped.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">⚽</div>
              <div className="empty-state-title">No Matches Found</div>
              <div className="empty-state-desc">Try adjusting your search or filters</div>
            </div>
          ) : (
            grouped.map(([date, matches]) => (
              <div key={date}>
                <div style={{
                  padding: '12px 16px 4px',
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <span>{date}</span>
                  <span style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
                  <span style={{ fontSize: 11 }}>{matches.length} matches</span>
                </div>
                {matches.map(m => (
                  <MatchCard key={m.id} match={m} onClick={onMatchClick} timezoneOffset={timezoneOffset} />
                ))}
              </div>
            ))
          )}
          <div style={{ height: 24 }} />
        </>
      ) : (
        /* Groups View */
        <div style={{ padding: '8px 0' }}>
          {Object.keys(GROUPS).map(group => (
            <div key={group} style={{ margin: '8px 16px', background: 'var(--bg-card)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border-subtle)' }}>
              <div style={{
                background: 'var(--gradient-red)',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: 'white', letterSpacing: 1 }}>
                  Group {group}
                </span>
              </div>
              <div style={{ padding: '4px 0' }}>
                <GroupTable group={group} />
              </div>
              {/* Group fixtures */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', padding: '4px 0' }}>
                {FIXTURES.filter(f => f.group === group).map(m => (
                  <div
                    key={m.id}
                    onClick={() => onMatchClick?.(m)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '8px 16px', cursor: 'pointer', transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-primary)'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}
                  >
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1, fontWeight: 600 }}>
                      {TEAMS[m.home]?.name || m.home}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', padding: '0 12px', minWidth: 64, textAlign: 'center' }}>
                      {m.homeScore !== null ? `${m.homeScore} - ${m.awayScore}` : formatDate(m.utcDate, timezoneOffset)}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1, textAlign: 'right', fontWeight: 600 }}>
                      {TEAMS[m.away]?.name || m.away}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ height: 24 }} />
        </div>
      )}
    </div>
  );
}
