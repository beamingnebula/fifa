import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { FIXTURES, GROUPS } from '../data/fixtures';
import { TEAMS } from '../data/teams';
import { getGroupStandings, getMatchStatus } from '../utils/matchUtils';

const FixturesContext = createContext(null);

const ESPN_TEAM_MAPPING = {
  'RSA': 'ZAF', // South Africa
  'IRI': 'IRN', // Iran
  'IRI_FIFA': 'IRN'
};

const mapTeamCode = (abbr) => {
  if (!abbr) return '';
  const upper = abbr.toUpperCase();
  return ESPN_TEAM_MAPPING[upper] || upper;
};

// Helper to determine match status from ESPN
const getEspnStatus = (state, displayClock) => {
  if (state === 'in') return 'LIVE';
  if (state === 'post') return 'FT';
  return 'UPCOMING';
};

// Parse competitor stats and yellow/red cards from ESPN response
const extractStats = (comp, homeCode) => {
  if (!comp) return null;
  const homeComp = comp.competitors?.find(c => c.homeAway === 'home');
  const awayComp = comp.competitors?.find(c => c.homeAway === 'away');
  
  if (!homeComp || !awayComp) return null;

  const isHomeCompHomeTeam = mapTeamCode(homeComp.team?.abbreviation) === homeCode;
  const localHomeComp = isHomeCompHomeTeam ? homeComp : awayComp;
  const localAwayComp = isHomeCompHomeTeam ? awayComp : homeComp;

  const getStatVal = (competitor, name) => {
    const stat = competitor?.statistics?.find(s => s.name === name);
    return stat ? parseFloat(stat.displayValue) : 0;
  };

  const possession = [
    getStatVal(localHomeComp, 'possessionPct') || 50,
    getStatVal(localAwayComp, 'possessionPct') || 50
  ];
  const shots = [
    getStatVal(localHomeComp, 'totalShots') || 0,
    getStatVal(localAwayComp, 'totalShots') || 0
  ];
  const shotsOnTarget = [
    getStatVal(localHomeComp, 'shotsOnTarget') || 0,
    getStatVal(localAwayComp, 'shotsOnTarget') || 0
  ];
  const corners = [
    getStatVal(localHomeComp, 'wonCorners') || 0,
    getStatVal(localAwayComp, 'wonCorners') || 0
  ];
  const fouls = [
    getStatVal(localHomeComp, 'foulsCommitted') || 0,
    getStatVal(localAwayComp, 'foulsCommitted') || 0
  ];

  let homeYellow = 0;
  let homeRed = 0;
  let awayYellow = 0;
  let awayRed = 0;

  comp.details?.forEach(detail => {
    const detailTeamAbbr = detail.team?.abbreviation || (detail.team?.id === homeComp.team?.id ? homeComp.team?.abbreviation : awayComp.team?.abbreviation);
    const detailCode = mapTeamCode(detailTeamAbbr);
    const isHome = detailCode === homeCode;
    
    if (detail.yellowCard) {
      if (isHome) homeYellow++; else awayYellow++;
    }
    if (detail.redCard) {
      if (isHome) homeRed++; else awayRed++;
    }
  });

  return {
    possession,
    shots,
    shotsOnTarget,
    corners,
    fouls,
    yellowCards: [homeYellow, awayYellow],
    redCards: [homeRed, awayRed]
  };
};

export function FixturesProvider({ children }) {
  const [fixtures, setFixtures] = useState(() => {
    const cached = localStorage.getItem('fifa_live_fixtures');
    return cached ? JSON.parse(cached) : FIXTURES;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(() => {
    const cached = localStorage.getItem('fifa_fixtures_last_updated');
    return cached ? new Date(cached) : null;
  });

  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, ...toast, timestamp: Date.now() }]);
    
    setTimeout(() => {
      dismissToast(id);
    }, 6000);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const triggerNotification = useCallback(({ type, title, body, match }) => {
    const settings = JSON.parse(localStorage.getItem('fifa_settings') || '{}');
    if (settings.notifications === false) return;
    if (type === 'GOAL' && settings.goalAlerts === false) return;
    if (type === 'KICKOFF' && settings.matchReminders === false) return;

    addToast({ type, title, body, match });

    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/trophy.svg'
        });
      } catch (e) {
        console.warn('System notifications failed: ', e);
      }
    }
  }, [addToast]);

  const simulateEvent = useCallback((eventType) => {
    const mockMatch = {
      id: 'D1',
      stage: 'GROUP',
      group: 'D',
      home: 'USA',
      away: 'AUS',
      homeScore: 3,
      awayScore: 1,
      utcDate: '2026-06-13T21:00:00Z',
      venue: 'LOS_ANGELES',
      status: 'LIVE'
    };

    if (eventType === 'KICKOFF') {
      triggerNotification({
        type: 'KICKOFF',
        title: '⚽ Match Started! (Simulation)',
        body: 'USA vs Australia has kicked off!',
        match: mockMatch
      });
    } else if (eventType === 'GOAL') {
      triggerNotification({
        type: 'GOAL',
        title: '⚽ GOAL! United States (Simulation)',
        body: 'USA 4 - 1 Australia (Pulisic 72\')',
        match: mockMatch
      });
    } else if (eventType === 'FULL_TIME') {
      triggerNotification({
        type: 'FULL_TIME',
        title: '🏁 Match Finished! (Simulation)',
        body: 'Full Time: USA 3 - 1 Australia',
        match: mockMatch
      });
    }
  }, [triggerNotification]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260720&limit=150`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch official live scores');
      const data = await res.json();
      
      const events = data.events || [];
      
      // Step 1: Compute temporary standings to resolve group placeholders
      // We start with our current fixtures state or static fixtures
      const currentMerged = [...FIXTURES];
      
      // Update group scores from ESPN events first (so standings can be computed accurately)
      events.forEach(event => {
        const comp = event.competitions?.[0];
        const note = comp?.altGameNote || '';
        const isGroup = note.toLowerCase().includes('group');
        
        if (isGroup && comp) {
          const homeComp = comp.competitors?.find(c => c.homeAway === 'home');
          const awayComp = comp.competitors?.find(c => c.homeAway === 'away');
          
          const homeCode = mapTeamCode(homeComp?.team?.abbreviation);
          const awayCode = mapTeamCode(awayComp?.team?.abbreviation);
          
          const state = comp.status?.type?.state;
          const isStarted = state === 'in' || state === 'post';
          
          const staticMatch = currentMerged.find(f => 
            f.stage === 'GROUP' && 
            ((f.home === homeCode && f.away === awayCode) || (f.home === awayCode && f.away === homeCode))
          );
          
          if (staticMatch) {
            // Update scores
            if (isStarted && homeComp?.score !== undefined && awayComp?.score !== undefined) {
              const staticIsHome = staticMatch.home === homeCode;
              staticMatch.homeScore = Number(staticIsHome ? homeComp.score : awayComp.score);
              staticMatch.awayScore = Number(staticIsHome ? awayComp.score : homeComp.score);
            } else {
              // Preserve static scores if present
              const orig = FIXTURES.find(x => x.id === staticMatch.id);
              staticMatch.homeScore = orig ? orig.homeScore : null;
              staticMatch.awayScore = orig ? orig.awayScore : null;
            }
            staticMatch.status = getEspnStatus(state, comp.status?.displayClock);
            staticMatch.clock = staticMatch.status === 'LIVE' ? comp.status?.displayClock : null;
            staticMatch.utcDate = event.date || staticMatch.utcDate;
            staticMatch.stats = isStarted ? extractStats(comp, staticMatch.home) : null;
          }
        }
      });
      
      // Step 2: Resolve the Group Winners and Second positions
      const groupWinners = {};
      Object.entries(GROUPS).forEach(([groupName, groupTeams]) => {
        const groupFixtures = currentMerged.filter(f => f.group === groupName);
        const standings = getGroupStandings(groupFixtures, groupTeams);
        standings.forEach((team, index) => {
          groupWinners[`${index + 1}${groupName}`] = team.code;
        });
      });
      
      // Step 3: Now merge all matches, including knockouts (R32, R16, QF, SF, TPM, FINAL)
      const finalMerged = FIXTURES.map(f => {
        // Resolve placeholders in this fixture
        const resolvedFixture = { ...f };
        if (groupWinners[resolvedFixture.home]) resolvedFixture.home = groupWinners[resolvedFixture.home];
        if (groupWinners[resolvedFixture.away]) resolvedFixture.away = groupWinners[resolvedFixture.away];
        
        // Find corresponding ESPN event
        const matchedEvent = events.find(event => {
          const comp = event.competitions?.[0];
          if (!comp) return false;
          
          const homeComp = comp.competitors?.find(c => c.homeAway === 'home');
          const awayComp = comp.competitors?.find(c => c.homeAway === 'away');
          
          const homeCode = mapTeamCode(homeComp?.team?.abbreviation);
          const awayCode = mapTeamCode(awayComp?.team?.abbreviation);
          
          // Match by team codes
          const teamsMatch = (resolvedFixture.home === homeCode && resolvedFixture.away === awayCode) ||
                             (resolvedFixture.home === awayCode && resolvedFixture.away === homeCode);
          if (teamsMatch) return true;
          
          // Match by kickoff date and stage name (for placeholder/TBD matches where teams aren't fully resolved in app yet)
          const espnDate = event.date;
          const datesClose = Math.abs(new Date(espnDate).getTime() - new Date(resolvedFixture.utcDate).getTime()) < 60 * 60 * 1000; // within 1 hr
          
          const note = comp.altGameNote || '';
          const name = event.name || '';
          const noteLower = note.toLowerCase();
          const nameLower = name.toLowerCase();
          
          let stageMatches = false;
          if (resolvedFixture.stage === 'R32' && noteLower.includes('round of 32')) stageMatches = true;
          else if (resolvedFixture.stage === 'R16' && (noteLower.includes('round of 16') || noteLower.includes('rd of 16'))) stageMatches = true;
          else if (resolvedFixture.stage === 'QF' && noteLower.includes('quarter')) stageMatches = true;
          else if (resolvedFixture.stage === 'SF' && noteLower.includes('semi')) stageMatches = true;
          else if (resolvedFixture.stage === 'TPM' && (noteLower.includes('third') || noteLower.includes('3rd'))) stageMatches = true;
          else if (resolvedFixture.stage === 'FINAL' && noteLower.includes('final') && !noteLower.includes('quarter') && !noteLower.includes('semi')) stageMatches = true;
          
          return datesClose && stageMatches;
        });
        
        if (matchedEvent) {
          const comp = matchedEvent.competitions?.[0];
          const homeComp = comp?.competitors?.find(c => c.homeAway === 'home');
          const awayComp = comp?.competitors?.find(c => c.homeAway === 'away');
          
          const homeCode = mapTeamCode(homeComp?.team?.abbreviation);
          const staticIsHome = resolvedFixture.home === homeCode;
          
          const state = comp?.status?.type?.state;
          const isStarted = state === 'in' || state === 'post';
          
          // Overwrite values with live data
          if (isStarted && homeComp?.score !== undefined && awayComp?.score !== undefined) {
            resolvedFixture.homeScore = Number(staticIsHome ? homeComp.score : awayComp.score);
            resolvedFixture.awayScore = Number(staticIsHome ? awayComp.score : homeComp.score);
          } else {
            // Keep static simulated completed scores if not overwritten by a live/real post game
            resolvedFixture.homeScore = f.homeScore;
            resolvedFixture.awayScore = f.awayScore;
          }
          
          // Overwrite actual team codes if they were placeholders
          if (homeComp?.team?.abbreviation) {
            resolvedFixture.home = staticIsHome ? homeCode : mapTeamCode(awayComp?.team?.abbreviation);
            resolvedFixture.away = staticIsHome ? mapTeamCode(awayComp?.team?.abbreviation) : homeCode;
          }
          
          resolvedFixture.status = getEspnStatus(state, comp?.status?.displayClock);
          resolvedFixture.clock = resolvedFixture.status === 'LIVE' ? comp?.status?.displayClock : null;
          resolvedFixture.utcDate = matchedEvent.date || resolvedFixture.utcDate;
          resolvedFixture.stats = isStarted ? extractStats(comp, resolvedFixture.home) : null;
        }
        
        return resolvedFixture;
      });
      
      setFixtures(prevFixtures => {
        if (prevFixtures && prevFixtures.length > 0) {
          const prevMap = new Map(prevFixtures.map(f => [f.id, f]));
          
          finalMerged.forEach(newMatch => {
            const oldMatch = prevMap.get(newMatch.id);
            if (oldMatch) {
              if (oldMatch.status === 'UPCOMING' && newMatch.status === 'LIVE') {
                triggerNotification({
                  type: 'KICKOFF',
                  title: '⚽ Match Started!',
                  body: `${TEAMS[newMatch.home]?.name || newMatch.home} vs ${TEAMS[newMatch.away]?.name || newMatch.away} has kicked off!`,
                  match: newMatch
                });
              }
              
              if (newMatch.status === 'LIVE' || newMatch.status === 'FT') {
                const oldHome = oldMatch.homeScore;
                const oldAway = oldMatch.awayScore;
                const newHome = newMatch.homeScore;
                const newAway = newMatch.awayScore;
                
                if (newHome !== null && oldHome !== null && newHome > oldHome) {
                  triggerNotification({
                    type: 'GOAL',
                    title: `⚽ GOAL for ${TEAMS[newMatch.home]?.name || newMatch.home}!`,
                    body: `${TEAMS[newMatch.home]?.name || newMatch.home} ${newHome} - ${newAway} ${TEAMS[newMatch.away]?.name || newMatch.away}`,
                    match: newMatch
                  });
                } else if (newAway !== null && oldAway !== null && newAway > oldAway) {
                  triggerNotification({
                    type: 'GOAL',
                    title: `⚽ GOAL for ${TEAMS[newMatch.away]?.name || newMatch.away}!`,
                    body: `${TEAMS[newMatch.home]?.name || newMatch.home} ${newHome} - ${newAway} ${TEAMS[newMatch.away]?.name || newMatch.away}`,
                    match: newMatch
                  });
                }
              }

              if (oldMatch.status === 'LIVE' && newMatch.status === 'FT') {
                triggerNotification({
                  type: 'FULL_TIME',
                  title: '🏁 Match Finished!',
                  body: `Full Time: ${TEAMS[newMatch.home]?.name || newMatch.home} ${newMatch.homeScore} - ${newMatch.awayScore} ${TEAMS[newMatch.away]?.name || newMatch.away}`,
                  match: newMatch
                });
              }
            }
          });
        }
        return finalMerged;
      });
      const now = new Date();
      setLastUpdated(now);
      
      localStorage.setItem('fifa_live_fixtures', JSON.stringify(finalMerged));
      localStorage.setItem('fifa_fixtures_last_updated', now.toISOString());
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to refresh World Cup live data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Poll for updates
  useEffect(() => {
    refresh();
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refresh();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        refresh();
      }
    }, 30000); // Poll every 30 seconds
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(interval);
    };
  }, [refresh]);

  // Derived helper methods
  const getFixturesByGroup = useCallback((group) => fixtures.filter(f => f.group === group), [fixtures]);
  const getFixturesByTeam = useCallback((teamCode) => fixtures.filter(f => f.home === teamCode || f.away === teamCode), [fixtures]);
  const getFixturesByStage = useCallback((stage) => fixtures.filter(f => f.stage === stage), [fixtures]);
  const getCompletedFixtures = useCallback(() => fixtures.filter(f => getMatchStatus(f) === 'FT'), [fixtures]);
  const getUpcomingFixtures = useCallback(() => fixtures.filter(f => getMatchStatus(f) !== 'FT'), [fixtures]);
  
  const getTodayFixtures = useCallback(() => {
    const today = new Date();
    return fixtures.filter(f => {
      const d = new Date(f.utcDate);
      return d.getUTCFullYear() === today.getUTCFullYear() &&
             d.getUTCMonth() === today.getUTCMonth() &&
             d.getUTCDate() === today.getUTCDate();
    });
  }, [fixtures]);

  const getNextFixture = useCallback(() => {
    const now = new Date();
    return fixtures
      .filter(f => new Date(f.utcDate) > now)
      .sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate))[0] || null;
  }, [fixtures]);

  const value = {
    fixtures,
    loading,
    error,
    lastUpdated,
    refresh,
    getFixturesByGroup,
    getFixturesByTeam,
    getFixturesByStage,
    getCompletedFixtures,
    getUpcomingFixtures,
    getTodayFixtures,
    getNextFixture,
    toasts,
    dismissToast,
    simulateEvent
  };

  return (
    <FixturesContext.Provider value={value}>
      {children}
    </FixturesContext.Provider>
  );
}

export function useFixtures() {
  const context = useContext(FixturesContext);
  if (!context) throw new Error('useFixtures must be used within a FixturesProvider');
  return context;
}
