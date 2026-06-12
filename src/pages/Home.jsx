import React, { useState, useEffect } from 'react';
import { RefreshCw, Trophy, Globe, Zap } from 'lucide-react';
import Countdown from '../components/Countdown';
import MatchCard from '../components/MatchCard';
import FlagIcon from '../components/FlagIcon';
import SearchBar from '../components/SearchBar';
import { TEAMS } from '../data/teams';
import { isToday, formatKickoff, formatDate } from '../utils/timeUtils';
import { getMatchStatus } from '../utils/matchUtils';
import { useFixtures } from '../context/FixturesContext';

const TOTAL_MATCHES = 104;

export default function Home({ onNavigate, timezoneOffset = 6 }) {
  const {
    fixtures,
    loading: liveLoading,
    lastUpdated,
    refresh,
    getCompletedFixtures,
    getUpcomingFixtures,
    getTodayFixtures,
    getNextFixture
  } = useFixtures();

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const completed = getCompletedFixtures();
  const upcoming = getUpcomingFixtures();
  const todayMatches = getTodayFixtures();
  const liveMatches = fixtures.filter(f => getMatchStatus(f) === 'LIVE');
  const nextMatch = getNextFixture();
  const featuredMatch = liveMatches[0] || completed[completed.length - 1];

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  return (
    <div>
      {/* ===== HERO ===== */}
      <div className="hero-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, position: 'relative', zIndex: 1 }}>
          <div>
            <div className="hero-badge">
              🏆 FIFA World Cup 2026™
            </div>
            <div className="hero-title">FIFA WORLD<br />CUP 2026</div>
            <div className="hero-subtitle">Canada · Mexico · United States</div>
            {lastUpdated && (
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
                <span className="live-dot" style={{ display: liveMatches.length > 0 ? 'inline-block' : 'none', width: 6, height: 6, margin: 0 }} />
                Last updated: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            )}
          </div>
          <button
            onClick={handleRefresh}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'white', marginTop: 8,
              transition: 'all 0.2s',
            }}
            aria-label="Refresh"
          >
            <RefreshCw size={16} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
          </button>
        </div>
        <Countdown />
      </div>

      {/* ===== STATS STRIP ===== */}
      <div style={{ padding: '0 16px', marginTop: -24, position: 'relative', zIndex: 10 }}>
        <div style={{
          display: 'flex',
          background: 'var(--bg-secondary)',
          borderRadius: 20,
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-subtle)',
        }}>
          <div className="stat-item" onClick={() => onNavigate('fixtures')}>
            <span className="stat-number">{TOTAL_MATCHES}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item" onClick={() => onNavigate('matches-played')} style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--gradient-red)', borderRadius: '0 0 0 0', opacity: 0 }} />
            <span className="stat-number red">{completed.length}</span>
            <span className="stat-label">Played</span>
          </div>
          <div className="stat-item" onClick={() => onNavigate('matches-remaining')}>
            <span className="stat-number gold">{upcoming.length}</span>
            <span className="stat-label">Remaining</span>
          </div>
        </div>
      </div>

      {/* ===== QUICK SEARCH BAR ===== */}
      <div className="home-search-container" style={{ marginTop: 12 }}>
        <SearchBar
          value=""
          placeholder="Search teams or fixtures..."
          readOnly={true}
          onClick={() => onNavigate('fixtures', { focusSearch: true })}
        />
      </div>

      {/* ===== LIVE MATCHES ===== */}
      {liveMatches.length > 0 && (
        <>
          <div className="section-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="match-stage-badge badge-live" style={{ marginBottom: 0 }}>
                <span className="live-dot" /> LIVE NOW
              </span>
              <span className="section-title">{liveMatches.length} Match{liveMatches.length > 1 ? 'es' : ''}</span>
            </div>
          </div>
          {liveMatches.map(m => (
            <MatchCard key={m.id} match={m} onClick={() => onNavigate('match-detail', m)} timezoneOffset={timezoneOffset} />
          ))}
        </>
      )}

      {/* ===== TODAY'S MATCHES ===== */}
      {todayMatches.length > 0 && (
        <>
          <div className="section-header">
            <span className="section-title">Today's Matches</span>
            <span className="section-action" onClick={() => onNavigate('fixtures')}>See all</span>
          </div>
          {todayMatches.slice(0, 3).map(m => (
            <MatchCard key={m.id} match={m} onClick={() => onNavigate('match-detail', m)} timezoneOffset={timezoneOffset} />
          ))}
          {todayMatches.length === 0 && (
            <div style={{ padding: '8px 16px 16px', color: 'var(--text-muted)', fontSize: 13, textAlign: 'center' }}>
              No matches scheduled for today
            </div>
          )}
        </>
      )}

      {/* ===== NEXT MATCH ===== */}
      {nextMatch && (
        <>
          <div className="section-header">
            <span className="section-title">Next Match</span>
          </div>
          <div
            className="next-match-card"
            onClick={() => onNavigate('match-detail', nextMatch)}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1 }}>
                ⚽ Next Match
              </span>
              {nextMatch.group && (
                <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: 20 }}>
                  Group {nextMatch.group}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <FlagIcon code={TEAMS[nextMatch.home]?.flag || 'un'} size="lg" />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'white', textAlign: 'center' }}>
                  {TEAMS[nextMatch.home]?.name || nextMatch.home}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>VS</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#FFD700' }}>
                  {formatKickoff(nextMatch.utcDate, timezoneOffset)}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                  {formatDate(nextMatch.utcDate, timezoneOffset)} BST
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <FlagIcon code={TEAMS[nextMatch.away]?.flag || 'un'} size="lg" />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'white', textAlign: 'center' }}>
                  {TEAMS[nextMatch.away]?.name || nextMatch.away}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ===== FEATURED MATCH ===== */}
      {featuredMatch && !liveMatches.includes(featuredMatch) && (
        <>
          <div className="section-header">
            <span className="section-title">
              {getMatchStatus(featuredMatch) === 'FT' ? 'Latest Result' : 'Featured Match'}
            </span>
          </div>
          <MatchCard match={featuredMatch} featured onClick={() => onNavigate('match-detail', featuredMatch)} timezoneOffset={timezoneOffset} />
        </>
      )}

      {/* ===== QUICK LINKS ===== */}
      <div className="section-header">
        <span className="section-title">Explore</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '0 16px 24px' }}>
        {[
          { icon: Trophy, label: 'Group Tables', tab: 'fixtures', color: '#C8102E' },
          { icon: Globe,  label: 'World Map',    tab: 'worldmap', color: '#4F46E5' },
          { icon: Zap,    label: 'Highlights',   tab: 'highlights', color: '#059669' },
          { icon: RefreshCw, label: 'All Teams', tab: 'teams',    color: '#D97706' },
        ].map(({ icon: Icon, label, tab, color }) => (
          <button
            key={tab}
            onClick={() => onNavigate(tab)}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16,
              padding: '16px 12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              boxShadow: 'var(--shadow-card)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
          >
            <div style={{
              width: 44, height: 44,
              borderRadius: 12,
              background: `${color}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={22} color={color} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{label}</span>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
