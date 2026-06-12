import React from 'react';
import FlagIcon from '../components/FlagIcon';
import MatchCard from '../components/MatchCard';
import GroupTable from '../components/GroupTable';
import TopBar from '../components/TopBar';
import { FIXTURES } from '../data/fixtures';
import { getMatchResult } from '../utils/matchUtils';
import { ChevronRight, Trophy, Users, MapPin, Star } from 'lucide-react';

const CONFEDERATIONS = {
  UEFA: { name: 'UEFA', color: '#003399' },
  CONMEBOL: { name: 'CONMEBOL', color: '#006600' },
  AFC: { name: 'AFC', color: '#FF6600' },
  CAF: { name: 'CAF', color: '#009900' },
  CONCACAF: { name: 'CONCACAF', color: '#CC0000' },
  OFC: { name: 'OFC', color: '#0099CC' },
};

export default function TeamDetail({ team, onBack, onMatchClick, isFavorite, onFavorite, timezoneOffset = 6 }) {
  if (!team) return null;
  const teamFixtures = FIXTURES.filter(f => f.home === team.code || f.away === team.code);
  const conf = CONFEDERATIONS[team.confederation] || {};

  const results = teamFixtures
    .filter(f => f.homeScore !== null)
    .map(f => getMatchResult(f, team.code));
  const wins = results.filter(r => r === 'W').length;
  const draws = results.filter(r => r === 'D').length;
  const losses = results.filter(r => r === 'L').length;

  return (
    <div>
      {/* Hero */}
      <div className="team-detail-hero">
        <TopBar
          title=""
          onBack={onBack}
          rightAction={
            <button
              onClick={() => onFavorite?.(team.code)}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: isFavorite ? '#FFD700' : 'rgba(255,255,255,0.7)',
                transition: 'all 0.2s',
              }}
              aria-label="Toggle favorite"
            >
              <Star size={18} fill={isFavorite ? '#FFD700' : 'none'} />
            </button>
          }
        />
        <div style={{ textAlign: 'center', paddingBottom: 8 }}>
          <FlagIcon code={team.flag} size="xl" style={{ borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.3)', marginBottom: 12 }} />
          <div className="team-detail-name">{team.name}</div>
          <div className="team-detail-meta">
            <span className="team-meta-chip">Group {team.group}</span>
            <span className="team-meta-chip">#{team.fifaRank} FIFA</span>
            <span className="team-meta-chip">{team.confederation}</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {results.length > 0 && (
        <div style={{ display: 'flex', padding: '12px 16px', gap: 8, marginTop: -16 }}>
          {[
            { label: 'Played', value: results.length, color: 'var(--text-primary)' },
            { label: 'Won',    value: wins,           color: '#059669' },
            { label: 'Drawn',  value: draws,          color: '#D97706' },
            { label: 'Lost',   value: losses,         color: '#DC2626' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              flex: 1, background: 'var(--bg-card)', borderRadius: 14,
              padding: '12px 6px', textAlign: 'center',
              boxShadow: 'var(--shadow-card)', border: '1px solid var(--border-subtle)',
            }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, color, lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, marginTop: 2, textTransform: 'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Team Info */}
      <div className="info-card">
        {[
          { label: 'Coach', value: team.coach },
          { label: 'Confederation', value: team.confederation },
          { label: 'FIFA Ranking', value: `#${team.fifaRank}` },
          { label: 'Group', value: `Group ${team.group}` },
        ].map(({ label, value }) => (
          <div key={label} className="info-row">
            <span className="info-label">{label}</span>
            <span className="info-value">{value || '—'}</span>
          </div>
        ))}
      </div>

      {/* About */}
      {team.description && (
        <div className="info-card">
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: 8 }}>About</div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{team.description}</p>
        </div>
      )}

      {/* Group Table */}
      <div style={{ padding: '12px 16px 4px' }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Group {team.group} Standings</div>
        <div className="info-card" style={{ padding: '4px 0' }}>
          <GroupTable group={team.group} />
        </div>
      </div>

      {/* Fixtures */}
      <div className="section-header">
        <span className="section-title">Matches</span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{teamFixtures.length} games</span>
      </div>
      {teamFixtures.map(m => (
        <MatchCard key={m.id} match={m} onClick={onMatchClick} timezoneOffset={timezoneOffset} />
      ))}

      <div style={{ height: 24 }} />
    </div>
  );
}
