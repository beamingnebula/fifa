import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { FIXTURES, GROUPS } from '../data/fixtures';
import { getGroupStandings } from '../utils/matchUtils';

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
              staticMatch.homeScore = null;
              staticMatch.awayScore = null;
            }
            staticMatch.status = getEspnStatus(state, comp.status?.displayClock);
            staticMatch.clock = staticMatch.status === 'LIVE' ? comp.status?.displayClock : null;
            staticMatch.utcDate = event.date || staticMatch.utcDate;
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
            resolvedFixture.homeScore = null;
            resolvedFixture.awayScore = null;
          }
          
          // Overwrite actual team codes if they were placeholders
          if (homeComp?.team?.abbreviation) {
            resolvedFixture.home = staticIsHome ? homeCode : mapTeamCode(awayComp?.team?.abbreviation);
            resolvedFixture.away = staticIsHome ? mapTeamCode(awayComp?.team?.abbreviation) : homeCode;
          }
          
          resolvedFixture.status = getEspnStatus(state, comp?.status?.displayClock);
          resolvedFixture.clock = resolvedFixture.status === 'LIVE' ? comp?.status?.displayClock : null;
          resolvedFixture.utcDate = matchedEvent.date || resolvedFixture.utcDate;
        }
        
        return resolvedFixture;
      });
      
      setFixtures(finalMerged);
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
    
    // Check if any match is currently live
    const hasLiveMatch = fixtures.some(f => f.status === 'LIVE');
    const intervalTime = hasLiveMatch ? 30000 : 180000; // 30s for live, 3m otherwise
    
    const interval = setInterval(refresh, intervalTime);
    return () => clearInterval(interval);
  }, [refresh, fixtures]);

  // Derived helper methods
  const getFixturesByGroup = useCallback((group) => fixtures.filter(f => f.group === group), [fixtures]);
  const getFixturesByTeam = useCallback((teamCode) => fixtures.filter(f => f.home === teamCode || f.away === teamCode), [fixtures]);
  const getFixturesByStage = useCallback((stage) => fixtures.filter(f => f.stage === stage), [fixtures]);
  const getCompletedFixtures = useCallback(() => fixtures.filter(f => f.homeScore !== null), [fixtures]);
  const getUpcomingFixtures = useCallback(() => fixtures.filter(f => f.homeScore === null), [fixtures]);
  
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
    getNextFixture
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
