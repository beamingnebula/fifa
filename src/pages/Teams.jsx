import React, { useState, useMemo } from 'react';
import TopBar from '../components/TopBar';
import SearchBar from '../components/SearchBar';
import FlagIcon from '../components/FlagIcon';
import { getAllTeams, GROUPS } from '../data/teams';
import { Star } from 'lucide-react';

const ALL_GROUPS = ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

export default function Teams({ onBack, onTeamClick, favorites = [], onFavorite }) {
  const [search, setSearch] = useState('');
  const [groupFilter, setGroupFilter] = useState('All');

  const teams = useMemo(() => {
    let list = getAllTeams();
    if (groupFilter !== 'All') list = list.filter(t => t.group === groupFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(t => t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q));
    }
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [search, groupFilter]);

  return (
    <div>
      <TopBar title="48 Nations" onBack={onBack} />
      <SearchBar value={search} onChange={setSearch} placeholder="Search nations..." />

      {/* Group Filter */}
      <div className="filter-chips">
        {ALL_GROUPS.map(g => (
          <button
            key={g}
            className={`filter-chip ${groupFilter === g ? 'active' : ''}`}
            onClick={() => setGroupFilter(g)}
          >
            {g === 'All' ? 'All Groups' : `Group ${g}`}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div style={{ padding: '4px 16px 8px', fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
        {teams.length} nation{teams.length !== 1 ? 's' : ''}
        {groupFilter !== 'All' ? ` in Group ${groupFilter}` : ''}
      </div>

      {/* Grid */}
      <div className="teams-grid">
        {teams.map(team => {
          const isFav = favorites.includes(team.code);
          return (
            <div
              key={team.code}
              className="team-card"
              onClick={() => onTeamClick?.(team)}
            >
              <button
                onClick={(e) => { e.stopPropagation(); onFavorite?.(team.code); }}
                style={{
                  position: 'absolute', top: 8, right: 8,
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: isFav ? '#FFD700' : 'var(--border-color)',
                  transition: 'color 0.2s',
                }}
                aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Star size={14} fill={isFav ? '#FFD700' : 'none'} />
              </button>

              <FlagIcon code={team.flag} size="lg" />
              <span className="team-name">{team.name}</span>
              <span className="team-group-badge">Group {team.group}</span>
              <span className="team-rank">#{team.fifaRank} FIFA</span>
            </div>
          );
        })}
      </div>

      {teams.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🌍</div>
          <div className="empty-state-title">No Teams Found</div>
          <div className="empty-state-desc">Try a different search term or group</div>
        </div>
      )}

      <div style={{ height: 24 }} />
    </div>
  );
}
