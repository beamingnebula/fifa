import React from 'react';
import TopBar from '../components/TopBar';
import FlagIcon from '../components/FlagIcon';
import Countdown from '../components/Countdown';
import { TEAMS } from '../data/teams';
import { VENUES } from '../data/fixtures';
import { getMatchStatus, getVenueById } from '../utils/matchUtils';
import { formatFullDate, formatKickoff, formatDateTime } from '../utils/timeUtils';
import { MapPin, Clock, Calendar, Activity, BarChart3, ArrowRight, RefreshCw } from 'lucide-react';
import { useFixtures } from '../context/FixturesContext';

export default function MatchDetail({ match, onBack, timezoneOffset = 6 }) {
  const { fixtures, refresh, loading } = useFixtures();
  
  if (!match) return null;

  const currentMatch = fixtures.find(f => f.id === match.id) || match;

  const status = getMatchStatus(currentMatch);
  const isLive = status === 'LIVE';
  const isFT = status === 'FT';
  const isUpcoming = status === 'UPCOMING';
  const venue = getVenueById(currentMatch.venue);
  const homeTeam = TEAMS[currentMatch.home] || { name: currentMatch.home, flag: 'un' };
  const awayTeam = TEAMS[currentMatch.away] || { name: currentMatch.away, flag: 'un' };

  React.useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        refresh();
      }
    }, 10000); // Poll every 10 seconds for live match details
    return () => clearInterval(interval);
  }, [isLive, refresh]);

  // Use real statistics if parsed from API, otherwise fall back to simulated/default stats for demo purposes
  const stats = currentMatch.stats || (isFT || isLive ? {
    possession: [54, 46],
    shots: [14, 9],
    shotsOnTarget: [6, 3],
    corners: [7, 4],
    fouls: [11, 13],
    yellowCards: [1, 2],
    redCards: [0, 0],
  } : null);

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
      <TopBar 
        title="Match Detail" 
        onBack={onBack} 
        rightAction={
          (isLive || isFT) && (
            <button
              onClick={refresh}
              disabled={loading}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: '50%',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--border-color)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <RefreshCw size={18} color="var(--text-primary)" style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
            </button>
          )
        }
      />

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
              {currentMatch.group ? `GROUP ${currentMatch.group}` : currentMatch.stage}
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
                {currentMatch.homeScore} - {currentMatch.awayScore}
              </div>
            ) : (
              <>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: 'rgba(255,255,255,0.5)', letterSpacing: 3 }}>VS</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#FFD700' }}>{formatKickoff(currentMatch.utcDate, timezoneOffset)}</div>
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
          { icon: Calendar, label: 'Date', value: formatFullDate(currentMatch.utcDate, timezoneOffset) },
          { icon: Clock,    label: 'Kickoff',  value: `${formatKickoff(currentMatch.utcDate, timezoneOffset)} BST` },
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
          <Countdown targetDate={currentMatch.utcDate} label="Time Until Kickoff" />
        </div>
      )}

      <div style={{ height: 24 }} />
    </div>
  );
}
