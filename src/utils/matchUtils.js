// Match utilities

import { TEAMS } from '../data/teams.js';
import { VENUES } from '../data/fixtures.js';

export const getMatchStatus = (match) => {
  if (match.homeScore !== null && match.awayScore !== null) return 'FT';
  const now = new Date();
  const kickoff = new Date(match.utcDate);
  const endTime = new Date(kickoff.getTime() + 110 * 60 * 1000);
  if (now >= kickoff && now <= endTime) return 'LIVE';
  if (now < kickoff) return 'UPCOMING';
  return 'FT';
};

export const getMatchResult = (match, teamCode) => {
  if (match.homeScore === null) return null;
  const isHome = match.home === teamCode;
  const myScore = isHome ? match.homeScore : match.awayScore;
  const oppScore = isHome ? match.awayScore : match.homeScore;
  if (myScore > oppScore) return 'W';
  if (myScore < oppScore) return 'L';
  return 'D';
};

export const getTeamFixtures = (fixtures, teamCode) =>
  fixtures.filter(f => f.home === teamCode || f.away === teamCode);

export const getGroupStandings = (fixtures, groupTeams) => {
  const table = {};
  groupTeams.forEach(code => {
    table[code] = { code, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 };
  });

  fixtures.forEach(f => {
    if (f.homeScore === null) return;
    const h = table[f.home];
    const a = table[f.away];
    if (!h || !a) return;

    h.played++; a.played++;
    h.gf += f.homeScore; h.ga += f.awayScore;
    a.gf += f.awayScore; a.ga += f.homeScore;
    h.gd = h.gf - h.ga; a.gd = a.gf - a.ga;

    if (f.homeScore > f.awayScore) { h.won++; h.pts += 3; a.lost++; }
    else if (f.homeScore < f.awayScore) { a.won++; a.pts += 3; h.lost++; }
    else { h.drawn++; h.pts++; a.drawn++; a.pts++; }
  });

  return Object.values(table).sort((a, b) =>
    b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || a.code.localeCompare(b.code)
  );
};

export const getVenueById = (id) => VENUES[id];
export const getTeamName = (code) => TEAMS[code]?.name || code;
export const getTeamFlag = (code) => TEAMS[code]?.flag || code.toLowerCase();

export const getStageName = (stage) => {
  const names = {
    GROUP: 'Group Stage',
    R32: 'Round of 32',
    R16: 'Round of 16',
    QF: 'Quarter-finals',
    SF: 'Semi-finals',
    TPM: 'Third-Place Match',
    FINAL: 'Final',
  };
  return names[stage] || stage;
};

export const getStageOrder = (stage) => {
  const order = { GROUP: 1, R32: 2, R16: 3, QF: 4, SF: 5, TPM: 6, FINAL: 7 };
  return order[stage] || 99;
};
