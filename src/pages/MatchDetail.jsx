import React from 'react';
import TopBar from '../components/TopBar';
import FlagIcon from '../components/FlagIcon';
import { TEAMS } from '../data/teams';
import { VENUES } from '../data/fixtures';
import { getMatchStatus, getVenueById } from '../utils/matchUtils';
import { formatFullDate, formatKickoff, formatDateTime } from '../utils/timeUtils';
import { MapPin, Clock, Calendar, Activity, BarChart3, ArrowRight } from 'lucide-react';

export default function MatchDetail({ match, onBack, timezoneOffset = 6 }) {
  if (!match) return null;

  const status = getMatchStatus(match);
  const isLive = status === 'LIVE';
  const isFT = status === 'FT';
  const isUpcoming = status === 'UPCOMING';
  const venue = getVenueById(match.venue);
  const homeTeam = TEAMS[match.home] || { name: match.home, flag: 'un' };
  const awayTeam = TEAMS[match.away] || { name: match.away, flag: 'un' };

  // Simulated stats for played matches
  const stats = isFT || isLive ? {
    possession: [54, 46],
    shots: [14, 9],
    shotsOnTarget: [6, 3],
    corners: [7, 4],
    fouls: [11, 13],
    yellowCards: [1, 2],
    redCards: [0, 0],
  } : null;

  const StatRow = ({ label, home, away, max }) => {
    const homeWidth = max ? (home / max) * 50 : (home / (home + away || 1)) * 50;
    const awayWidth = max ? (away / max) * 50 : (away / (home + away || 1)) * 50;
    return (
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
          <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{home}{label === 'Possession' ? '%' : ''}</span>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: 11 }}>{label}</span>
          <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{away}{label === 'Possession' ? '%' : ''}</span>
        </div>
        <div style={{ display: 'flex', gap: 3, height: 6, borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ flex: home || 1, background: 'var(--fifa-red)', borderRadius: 3, transition: 'flex 0.5s' }} />
          <div style={{ flex: away || 1, background: 'var(--border-color)', borderRadius: 3, transition: 'flex 0.5s' }} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <TopBar title={`Match Detail`} onBack={onBack} />

      {/* Match Hero */}
      <div style={{
        background: 'var(--gradient-hero)',
        padding: '24px 20px 32px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Stage / Status */}
        <div style={{ marginBottom: 16 }}>
          {isLive && (
            <span className="match-stage-badge badge-live" style={{ marginBottom: 0 }}>
              <span className="live-dot" /> LIVE
            </span>
          )}
          {isFT && (
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              FULL TIME
            </span>
          )}
          {isUpcoming && (
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {match.group ? `GROUP ${match.group}` : match.stage}
            </span>
          )}
        </div>

        {/* Teams & Score */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <FlagIcon code={homeTeam.flag} size="xl" style={{ borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }} />
            <span style={{ fontSize: 14, fontWeight: 800, color: 'white', textAlign: 'center' }}>{homeTeam.name}</span>
            {homeTeam.fifaRank && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>#{homeTeam.fifaRank}</span>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            {isFT || isLive ? (
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 56, color: 'white', lineHeight: 1, letterSpacing: 4 }}>
                {match.homeScore} - {match.awayScore}
              </div>
            ) : (
              <>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: 'rgba(255,255,255,0.5)', letterSpacing: 3 }}>VS</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#FFD700' }}>{formatKickoff(match.utcDate, timezoneOffset)}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>BST</div>
              </>
            )}
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <FlagIcon code={awayTeam.flag} size="xl" style={{ borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }} />
            <span style={{ fontSize: 14, fontWeight: 800, color: 'white', textAlign: 'center' }}>{awayTeam.name}</span>
            {awayTeam.fifaRank && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>#{awayTeam.fifaRank}</span>}
          </div>
        </div>
      </div>

      {/* Match Info */}
      <div className="info-card">
        {[
          { icon: Calendar, label: 'Date', value: formatFullDate(match.utcDate, timezoneOffset) },
          { icon: Clock,    label: 'Kickoff',  value: `${formatKickoff(match.utcDate, timezoneOffset)} BST` },
          ...(venue ? [
            { icon: MapPin, label: 'Stadium', value: venue.name },
            { icon: MapPin, label: 'City',    value: `${venue.city}, ${venue.country}` },
          ] : []),
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="info-row">
            <span className="info-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon size={13} /> {label}
            </span>
            <span className="info-value">{value}</span>
          </div>
        ))}
      </div>

      {/* Match Stats */}
      {stats && (
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <BarChart3 size={18} /> Match Statistics
          </div>
          <div className="info-card">
            <StatRow label="Possession" home={stats.possession[0]} away={stats.possession[1]} />
            <StatRow label="Shots" home={stats.shots[0]} away={stats.shots[1]} />
            <StatRow label="On Target" home={stats.shotsOnTarget[0]} away={stats.shotsOnTarget[1]} />
            <StatRow label="Corners" home={stats.corners[0]} away={stats.corners[1]} />
            <StatRow label="Fouls" home={stats.fouls[0]} away={stats.fouls[1]} />
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {Array.from({ length: stats.yellowCards[0] }).map((_, i) => (
                  <div key={i} style={{ width: 12, height: 16, background: '#FFD700', borderRadius: 2 }} />
                ))}
                {Array.from({ length: stats.redCards[0] }).map((_, i) => (
                  <div key={i} style={{ width: 12, height: 16, background: '#DC2626', borderRadius: 2 }} />
                ))}
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Cards</span>
              <div style={{ display: 'flex', gap: 6 }}>
                {Array.from({ length: stats.yellowCards[1] }).map((_, i) => (
                  <div key={i} style={{ width: 12, height: 16, background: '#FFD700', borderRadius: 2 }} />
                ))}
                {Array.from({ length: stats.redCards[1] }).map((_, i) => (
                  <div key={i} style={{ width: 12, height: 16, background: '#DC2626', borderRadius: 2 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Countdown for upcoming */}
      {isUpcoming && (
        <div style={{ margin: '16px', background: 'var(--gradient-hero)', borderRadius: 20, padding: '20px 16px' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
            ⏱ Time Until Kickoff
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Days', 'Hrs', 'Min', 'Sec'].map((u) => (
              <div key={u} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 6px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: 'white', lineHeight: 1 }}>—</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{u}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ height: 24 }} />
    </div>
  );
}
