import React, { useState, useEffect } from 'react';
import { RefreshCw, Trophy, Globe, Zap } from 'lucide-react';
import Countdown from '../components/Countdown';
import MatchCard from '../components/MatchCard';
import FlagIcon from '../components/FlagIcon';
import SearchBar from '../components/SearchBar';
import { TEAMS } from '../data/teams';
import { isToday, formatKickoff, formatDate, getTimezoneAbbr } from '../utils/timeUtils';
import { getMatchStatus } from '../utils/matchUtils';
import { useFixtures } from '../context/FixturesContext';

export default function Home({ onNavigate, timezoneOffset = 6, favorites = [] }) {
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

  const getAdaptiveGradient = () => {
    if (liveMatches.length > 0) {
      const match = liveMatches[0];
      const c1 = TEAMS[match.home]?.color || '#C8102E';
      const c2 = TEAMS[match.away]?.color || '#1a1a3e';
      return `linear-gradient(135deg, #0D0D1A 0%, ${c2} 50%, ${c1} 100%)`;
    }
    if (favorites && favorites.length > 0) {
      const favColor = TEAMS[favorites[0]]?.color;
      if (favColor) {
        return `linear-gradient(135deg, #0D0D1A 0%, #1a1a3e 50%, ${favColor} 100%)`;
      }
    }
    return 'linear-gradient(135deg, #0D0D1A 0%, #1a1a3e 40%, #C8102E 100%)';
  };

  const getDaysLeft = (dateString) => {
    const diff = new Date(dateString) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const favoriteUpcomingMatches = React.useMemo(() => {
    if (!favorites || favorites.length === 0) return [];
    
    return favorites.map(code => {
      const team = TEAMS[code];
      if (!team) return null;
      
      const teamMatches = fixtures.filter(f => 
        (f.home === code || f.away === code) && 
        getMatchStatus(f) === 'UPCOMING'
      );
      
      const nextTeamMatch = teamMatches.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate))[0] || null;
      
      return {
        team,
        nextMatch: nextTeamMatch,
      };
    }).filter(item => item !== null);
  }, [favorites, fixtures]);

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
      <div className="hero-section" style={{ background: getAdaptiveGradient() }}>
        {/* Hologram typography background effect */}
        <div className="hero-hologram-bg">FIFAX</div>
        
        <div className="hero-content-wrapper">
          <div className="hero-text-side">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
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
                  flexShrink: 0
                }}
                aria-label="Refresh"
              >
                <RefreshCw size={16} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
              </button>
            </div>
          </div>
          
          <div className="hero-countdown-side">
            <Countdown />
          </div>
        </div>
      </div>

      <div className="home-content-container">
        {/* ===== STATS STRIP ===== */}
        <div className="stats-strip">
          <div className="stat-item" onClick={() => onNavigate('fixtures')}>
            <span className="stat-number">{fixtures.length}</span>
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

      {/* ===== QUICK SEARCH BAR ===== */}
      <div className="home-search-container" style={{ marginTop: 12 }}>
        <SearchBar
          value=""
          placeholder="Search teams or fixtures..."
          readOnly={true}
          onClick={() => onNavigate('fixtures', { focusSearch: true })}
        />
      </div>
      <div className="home-dashboard-grid">
        <div className="home-main-col">
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
        </div>

        <div className="home-side-col">
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 16 }}>
                  {nextMatch.group ? (
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: 20 }}>
                      Group {nextMatch.group}
                    </span>
                  ) : (
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: 20 }}>
                      {nextMatch.stage}
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
                      {formatDate(nextMatch.utcDate, timezoneOffset)} {getTimezoneAbbr(timezoneOffset)}
                    </div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <FlagIcon code={TEAMS[nextMatch.away]?.flag || 'un'} size="lg" />
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'white', textAlign: 'center' }}>
                      {TEAMS[nextMatch.away]?.name || nextMatch.away}
                    </span>
                  </div>
                </div>

                {/* Kickoff countdown */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 16, paddingTop: 12, display: 'flex', justifyContent: 'center' }}>
                  <Countdown targetDate={nextMatch.utcDate} compact={true} label="Kickoff in" />
                </div>
              </div>
            </>
          )}

          {/* ===== STARRED TEAMS TRACKER ===== */}
          <div className="section-header">
            <span className="section-title">⭐ Starred Teams Tracker</span>
          </div>
          <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {favorites.length === 0 ? (
              <div style={{
                background: 'var(--bg-card)',
                border: '1px dashed var(--text-muted)',
                borderRadius: 16,
                padding: '20px 16px',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: 13,
              }}>
                Star your favorite teams in the <strong>Teams</strong> tab to track their next match here!
              </div>
            ) : (
              favoriteUpcomingMatches.map(({ team, nextMatch }) => (
                <div key={team.code} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 16,
                  padding: '16px',
                  boxShadow: 'var(--shadow-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <FlagIcon code={team.flag} size="md" />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)' }}>{team.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>Group {team.group} · Rank #{team.fifaRank}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--fifa-red)', background: 'rgba(200, 16, 46, 0.08)', padding: '2px 8px', borderRadius: 20 }}>
                      {team.code}
                    </span>
                  </div>
                  
                  {nextMatch ? (
                    <div style={{
                      background: 'var(--bg-primary)',
                      borderRadius: 12,
                      padding: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)' }}>
                          vs {nextMatch.home === team.code ? (TEAMS[nextMatch.away]?.name || nextMatch.away) : (TEAMS[nextMatch.home]?.name || nextMatch.home)}
                        </span>
                        <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>
                          {formatDate(nextMatch.utcDate, timezoneOffset)}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: 8 }}>
                        <Countdown targetDate={nextMatch.utcDate} compact={true} label="" />
                        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--fifa-gold)' }}>
                          {(() => {
                            const days = getDaysLeft(nextMatch.utcDate);
                            return days > 0 ? `${days} day${days > 1 ? 's' : ''} left` : 'Today';
                          })()}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', padding: '4px 0' }}>
                      No upcoming matches scheduled
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

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
        </div>
      </div>
    </div>

    <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
