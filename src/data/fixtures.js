// FIFA World Cup 2026 — All 104 Matches
// Times stored in UTC — converted to BST (UTC+6) in UI
// Tournament: June 11 – July 19, 2026

export const STAGES = {
  GROUP: 'Group Stage',
  R32: 'Round of 32',
  R16: 'Round of 16',
  QF: 'Quarter-finals',
  SF: 'Semi-finals',
  TPM: 'Third-Place Match',
  FINAL: 'Final',
};

export const VENUES = {
  MEXICO_CITY:   { id: 'MEXICO_CITY',   name: 'Estadio Azteca',                 city: 'Mexico City',    country: 'Mexico',  capacity: 87500 },
  GUADALAJARA:   { id: 'GUADALAJARA',   name: 'Estadio Akron',                  city: 'Guadalajara',    country: 'Mexico',  capacity: 49850 },
  MONTERREY:     { id: 'MONTERREY',     name: 'Estadio BBVA',                   city: 'Monterrey',      country: 'Mexico',  capacity: 51350 },
  NEW_YORK:      { id: 'NEW_YORK',      name: 'MetLife Stadium',                city: 'East Rutherford',country: 'USA',     capacity: 82500 },
  LOS_ANGELES:   { id: 'LOS_ANGELES',   name: 'SoFi Stadium',                   city: 'Los Angeles',    country: 'USA',     capacity: 70240 },
  DALLAS:        { id: 'DALLAS',        name: 'AT&T Stadium',                   city: 'Arlington',      country: 'USA',     capacity: 80000 },
  SAN_FRANCISCO: { id: 'SAN_FRANCISCO', name: "Levi's Stadium",                 city: 'Santa Clara',    country: 'USA',     capacity: 68500 },
  MIAMI:         { id: 'MIAMI',         name: 'Hard Rock Stadium',              city: 'Miami Gardens',  country: 'USA',     capacity: 65326 },
  ATLANTA:       { id: 'ATLANTA',       name: 'Mercedes-Benz Stadium',          city: 'Atlanta',        country: 'USA',     capacity: 71000 },
  SEATTLE:       { id: 'SEATTLE',       name: 'Lumen Field',                    city: 'Seattle',        country: 'USA',     capacity: 68740 },
  BOSTON:        { id: 'BOSTON',        name: 'Gillette Stadium',               city: 'Foxborough',     country: 'USA',     capacity: 65878 },
  KANSAS_CITY:   { id: 'KANSAS_CITY',   name: 'Arrowhead Stadium',              city: 'Kansas City',    country: 'USA',     capacity: 76416 },
  PHILADELPHIA:  { id: 'PHILADELPHIA',  name: 'Lincoln Financial Field',        city: 'Philadelphia',   country: 'USA',     capacity: 69328 },
  TORONTO:       { id: 'TORONTO',       name: 'BMO Field',                      city: 'Toronto',        country: 'Canada',  capacity: 30000 },
  VANCOUVER:     { id: 'VANCOUVER',     name: 'BC Place',                       city: 'Vancouver',      country: 'Canada',  capacity: 54500 },
  KANSAS_CITY_2: { id: 'KANSAS_CITY_2', name: 'Children\'s Mercy Park',        city: 'Kansas City',    country: 'USA',     capacity: 18467 },
};

// Utility for getting fixture status
export const getMatchStatus = (match) => {
  const now = new Date();
  const kickoff = new Date(match.utcDate);
  const end = new Date(kickoff.getTime() + 110 * 60 * 1000); // ~110 min
  if (match.homeScore !== null && match.awayScore !== null) return 'FT';
  if (now >= kickoff && now <= end) return 'LIVE';
  if (now < kickoff) return 'UPCOMING';
  return 'FT';
};

// All 104 matches — Group Stage (48 games) + Knockouts
// Dates/times are in UTC
export const FIXTURES = [
  // ===== GROUP A =====
  { id: 'A1',  stage: 'GROUP', group: 'A', home: 'MEX', away: 'ZAF', utcDate: '2026-06-11T21:00:00Z', venue: 'MEXICO_CITY',   homeScore: 2, awayScore: 1 },
  { id: 'A2',  stage: 'GROUP', group: 'A', home: 'KOR', away: 'CZE', utcDate: '2026-06-12T01:00:00Z', venue: 'DALLAS',        homeScore: 1, awayScore: 1 },
  { id: 'A3',  stage: 'GROUP', group: 'A', home: 'ZAF', away: 'KOR', utcDate: '2026-06-16T21:00:00Z', venue: 'MIAMI',         homeScore: null, awayScore: null },
  { id: 'A4',  stage: 'GROUP', group: 'A', home: 'MEX', away: 'CZE', utcDate: '2026-06-17T01:00:00Z', venue: 'MEXICO_CITY',   homeScore: null, awayScore: null },
  { id: 'A5',  stage: 'GROUP', group: 'A', home: 'CZE', away: 'ZAF', utcDate: '2026-06-21T21:00:00Z', venue: 'DALLAS',        homeScore: null, awayScore: null },
  { id: 'A6',  stage: 'GROUP', group: 'A', home: 'KOR', away: 'MEX', utcDate: '2026-06-22T01:00:00Z', venue: 'LOS_ANGELES',   homeScore: null, awayScore: null },

  // ===== GROUP B =====
  { id: 'B1',  stage: 'GROUP', group: 'B', home: 'CAN', away: 'BIH', utcDate: '2026-06-12T17:00:00Z', venue: 'TORONTO',       homeScore: 2, awayScore: 0 },
  { id: 'B2',  stage: 'GROUP', group: 'B', home: 'QAT', away: 'SUI', utcDate: '2026-06-12T21:00:00Z', venue: 'LOS_ANGELES',   homeScore: 0, awayScore: 2 },
  { id: 'B3',  stage: 'GROUP', group: 'B', home: 'BIH', away: 'QAT', utcDate: '2026-06-17T17:00:00Z', venue: 'SEATTLE',       homeScore: null, awayScore: null },
  { id: 'B4',  stage: 'GROUP', group: 'B', home: 'CAN', away: 'SUI', utcDate: '2026-06-17T21:00:00Z', venue: 'TORONTO',       homeScore: null, awayScore: null },
  { id: 'B5',  stage: 'GROUP', group: 'B', home: 'SUI', away: 'BIH', utcDate: '2026-06-22T17:00:00Z', venue: 'NEW_YORK',      homeScore: null, awayScore: null },
  { id: 'B6',  stage: 'GROUP', group: 'B', home: 'QAT', away: 'CAN', utcDate: '2026-06-22T21:00:00Z', venue: 'HOUSTON',       homeScore: null, awayScore: null },

  // ===== GROUP C =====
  { id: 'C1',  stage: 'GROUP', group: 'C', home: 'BRA', away: 'HAI', utcDate: '2026-06-12T18:00:00Z', venue: 'MIAMI',         homeScore: 4, awayScore: 0 },
  { id: 'C2',  stage: 'GROUP', group: 'C', home: 'MAR', away: 'SCO', utcDate: '2026-06-12T21:00:00Z', venue: 'ATLANTA',       homeScore: 1, awayScore: 0 },
  { id: 'C3',  stage: 'GROUP', group: 'C', home: 'HAI', away: 'MAR', utcDate: '2026-06-16T17:00:00Z', venue: 'BOSTON',        homeScore: null, awayScore: null },
  { id: 'C4',  stage: 'GROUP', group: 'C', home: 'BRA', away: 'SCO', utcDate: '2026-06-16T21:00:00Z', venue: 'LOS_ANGELES',   homeScore: null, awayScore: null },
  { id: 'C5',  stage: 'GROUP', group: 'C', home: 'SCO', away: 'HAI', utcDate: '2026-06-21T17:00:00Z', venue: 'PHILADELPHIA',  homeScore: null, awayScore: null },
  { id: 'C6',  stage: 'GROUP', group: 'C', home: 'MAR', away: 'BRA', utcDate: '2026-06-21T21:00:00Z', venue: 'NEW_YORK',      homeScore: null, awayScore: null },

  // ===== GROUP D =====
  { id: 'D1',  stage: 'GROUP', group: 'D', home: 'USA', away: 'AUS', utcDate: '2026-06-13T21:00:00Z', venue: 'LOS_ANGELES',   homeScore: 3, awayScore: 1 },
  { id: 'D2',  stage: 'GROUP', group: 'D', home: 'PAR', away: 'TUR', utcDate: '2026-06-14T01:00:00Z', venue: 'DALLAS',        homeScore: 0, awayScore: 1 },
  { id: 'D3',  stage: 'GROUP', group: 'D', home: 'AUS', away: 'PAR', utcDate: '2026-06-18T17:00:00Z', venue: 'SAN_FRANCISCO', homeScore: null, awayScore: null },
  { id: 'D4',  stage: 'GROUP', group: 'D', home: 'USA', away: 'TUR', utcDate: '2026-06-18T21:00:00Z', venue: 'NEW_YORK',      homeScore: null, awayScore: null },
  { id: 'D5',  stage: 'GROUP', group: 'D', home: 'TUR', away: 'AUS', utcDate: '2026-06-22T17:00:00Z', venue: 'MIAMI',         homeScore: null, awayScore: null },
  { id: 'D6',  stage: 'GROUP', group: 'D', home: 'PAR', away: 'USA', utcDate: '2026-06-22T21:00:00Z', venue: 'DALLAS',        homeScore: null, awayScore: null },

  // ===== GROUP E =====
  { id: 'E1',  stage: 'GROUP', group: 'E', home: 'GER', away: 'CUW', utcDate: '2026-06-13T17:00:00Z', venue: 'PHILADELPHIA',  homeScore: 5, awayScore: 0 },
  { id: 'E2',  stage: 'GROUP', group: 'E', home: 'CIV', away: 'ECU', utcDate: '2026-06-13T21:00:00Z', venue: 'SEATTLE',       homeScore: 2, awayScore: 2 },
  { id: 'E3',  stage: 'GROUP', group: 'E', home: 'CUW', away: 'CIV', utcDate: '2026-06-18T17:00:00Z', venue: 'KANSAS_CITY',   homeScore: null, awayScore: null },
  { id: 'E4',  stage: 'GROUP', group: 'E', home: 'GER', away: 'ECU', utcDate: '2026-06-18T21:00:00Z', venue: 'BOSTON',        homeScore: null, awayScore: null },
  { id: 'E5',  stage: 'GROUP', group: 'E', home: 'ECU', away: 'CUW', utcDate: '2026-06-23T17:00:00Z', venue: 'MIAMI',         homeScore: null, awayScore: null },
  { id: 'E6',  stage: 'GROUP', group: 'E', home: 'CIV', away: 'GER', utcDate: '2026-06-23T21:00:00Z', venue: 'PHILADELPHIA',  homeScore: null, awayScore: null },

  // ===== GROUP F =====
  { id: 'F1',  stage: 'GROUP', group: 'F', home: 'NED', away: 'TUN', utcDate: '2026-06-14T17:00:00Z', venue: 'BOSTON',        homeScore: 3, awayScore: 0 },
  { id: 'F2',  stage: 'GROUP', group: 'F', home: 'JPN', away: 'SWE', utcDate: '2026-06-14T21:00:00Z', venue: 'LOS_ANGELES',   homeScore: 1, awayScore: 1 },
  { id: 'F3',  stage: 'GROUP', group: 'F', home: 'TUN', away: 'JPN', utcDate: '2026-06-19T17:00:00Z', venue: 'KANSAS_CITY',   homeScore: null, awayScore: null },
  { id: 'F4',  stage: 'GROUP', group: 'F', home: 'NED', away: 'SWE', utcDate: '2026-06-19T21:00:00Z', venue: 'DALLAS',        homeScore: null, awayScore: null },
  { id: 'F5',  stage: 'GROUP', group: 'F', home: 'SWE', away: 'TUN', utcDate: '2026-06-23T17:00:00Z', venue: 'SEATTLE',       homeScore: null, awayScore: null },
  { id: 'F6',  stage: 'GROUP', group: 'F', home: 'JPN', away: 'NED', utcDate: '2026-06-23T21:00:00Z', venue: 'SAN_FRANCISCO', homeScore: null, awayScore: null },

  // ===== GROUP G =====
  { id: 'G1',  stage: 'GROUP', group: 'G', home: 'BEL', away: 'NZL', utcDate: '2026-06-15T17:00:00Z', venue: 'ATLANTA',       homeScore: 3, awayScore: 0 },
  { id: 'G2',  stage: 'GROUP', group: 'G', home: 'EGY', away: 'IRN', utcDate: '2026-06-15T21:00:00Z', venue: 'NEW_YORK',      homeScore: 1, awayScore: 1 },
  { id: 'G3',  stage: 'GROUP', group: 'G', home: 'NZL', away: 'EGY', utcDate: '2026-06-19T17:00:00Z', venue: 'LOS_ANGELES',   homeScore: null, awayScore: null },
  { id: 'G4',  stage: 'GROUP', group: 'G', home: 'BEL', away: 'IRN', utcDate: '2026-06-19T21:00:00Z', venue: 'MIAMI',         homeScore: null, awayScore: null },
  { id: 'G5',  stage: 'GROUP', group: 'G', home: 'IRN', away: 'NZL', utcDate: '2026-06-24T17:00:00Z', venue: 'SAN_FRANCISCO', homeScore: null, awayScore: null },
  { id: 'G6',  stage: 'GROUP', group: 'G', home: 'EGY', away: 'BEL', utcDate: '2026-06-24T21:00:00Z', venue: 'PHILADELPHIA',  homeScore: null, awayScore: null },

  // ===== GROUP H =====
  { id: 'H1',  stage: 'GROUP', group: 'H', home: 'ESP', away: 'KSA', utcDate: '2026-06-15T17:00:00Z', venue: 'DALLAS',        homeScore: 3, awayScore: 0 },
  { id: 'H2',  stage: 'GROUP', group: 'H', home: 'CPV', away: 'URU', utcDate: '2026-06-15T21:00:00Z', venue: 'SEATTLE',       homeScore: 0, awayScore: 2 },
  { id: 'H3',  stage: 'GROUP', group: 'H', home: 'KSA', away: 'CPV', utcDate: '2026-06-20T17:00:00Z', venue: 'TORONTO',       homeScore: null, awayScore: null },
  { id: 'H4',  stage: 'GROUP', group: 'H', home: 'ESP', away: 'URU', utcDate: '2026-06-20T21:00:00Z', venue: 'NEW_YORK',      homeScore: null, awayScore: null },
  { id: 'H5',  stage: 'GROUP', group: 'H', home: 'URU', away: 'KSA', utcDate: '2026-06-24T17:00:00Z', venue: 'KANSAS_CITY',   homeScore: null, awayScore: null },
  { id: 'H6',  stage: 'GROUP', group: 'H', home: 'CPV', away: 'ESP', utcDate: '2026-06-24T21:00:00Z', venue: 'BOSTON',        homeScore: null, awayScore: null },

  // ===== GROUP I =====
  { id: 'I1',  stage: 'GROUP', group: 'I', home: 'FRA', away: 'IRQ', utcDate: '2026-06-13T17:00:00Z', venue: 'SEATTLE',       homeScore: 3, awayScore: 0 },
  { id: 'I2',  stage: 'GROUP', group: 'I', home: 'NOR', away: 'SEN', utcDate: '2026-06-13T21:00:00Z', venue: 'ATLANTA',       homeScore: 1, awayScore: 1 },
  { id: 'I3',  stage: 'GROUP', group: 'I', home: 'IRQ', away: 'NOR', utcDate: '2026-06-17T17:00:00Z', venue: 'MIAMI',         homeScore: null, awayScore: null },
  { id: 'I4',  stage: 'GROUP', group: 'I', home: 'FRA', away: 'SEN', utcDate: '2026-06-17T21:00:00Z', venue: 'LOS_ANGELES',   homeScore: null, awayScore: null },
  { id: 'I5',  stage: 'GROUP', group: 'I', home: 'SEN', away: 'IRQ', utcDate: '2026-06-21T17:00:00Z', venue: 'DALLAS',        homeScore: null, awayScore: null },
  { id: 'I6',  stage: 'GROUP', group: 'I', home: 'NOR', away: 'FRA', utcDate: '2026-06-21T21:00:00Z', venue: 'BOSTON',        homeScore: null, awayScore: null },

  // ===== GROUP J =====
  { id: 'J1',  stage: 'GROUP', group: 'J', home: 'ARG', away: 'ALG', utcDate: '2026-06-14T17:00:00Z', venue: 'MIAMI',         homeScore: 2, awayScore: 0 },
  { id: 'J2',  stage: 'GROUP', group: 'J', home: 'AUT', away: 'JOR', utcDate: '2026-06-14T21:00:00Z', venue: 'SEATTLE',       homeScore: 2, awayScore: 1 },
  { id: 'J3',  stage: 'GROUP', group: 'J', home: 'ALG', away: 'AUT', utcDate: '2026-06-18T17:00:00Z', venue: 'KANSAS_CITY',   homeScore: null, awayScore: null },
  { id: 'J4',  stage: 'GROUP', group: 'J', home: 'ARG', away: 'JOR', utcDate: '2026-06-18T21:00:00Z', venue: 'DALLAS',        homeScore: null, awayScore: null },
  { id: 'J5',  stage: 'GROUP', group: 'J', home: 'JOR', away: 'ALG', utcDate: '2026-06-22T17:00:00Z', venue: 'SAN_FRANCISCO', homeScore: null, awayScore: null },
  { id: 'J6',  stage: 'GROUP', group: 'J', home: 'AUT', away: 'ARG', utcDate: '2026-06-22T21:00:00Z', venue: 'LOS_ANGELES',   homeScore: null, awayScore: null },

  // ===== GROUP K =====
  { id: 'K1',  stage: 'GROUP', group: 'K', home: 'POR', away: 'UZB', utcDate: '2026-06-14T17:00:00Z', venue: 'PHILADELPHIA',  homeScore: 4, awayScore: 0 },
  { id: 'K2',  stage: 'GROUP', group: 'K', home: 'COD', away: 'COL', utcDate: '2026-06-14T21:00:00Z', venue: 'BOSTON',        homeScore: 0, awayScore: 2 },
  { id: 'K3',  stage: 'GROUP', group: 'K', home: 'UZB', away: 'COD', utcDate: '2026-06-19T17:00:00Z', venue: 'MIAMI',         homeScore: null, awayScore: null },
  { id: 'K4',  stage: 'GROUP', group: 'K', home: 'POR', away: 'COL', utcDate: '2026-06-19T21:00:00Z', venue: 'LOS_ANGELES',   homeScore: null, awayScore: null },
  { id: 'K5',  stage: 'GROUP', group: 'K', home: 'COL', away: 'UZB', utcDate: '2026-06-23T17:00:00Z', venue: 'DALLAS',        homeScore: null, awayScore: null },
  { id: 'K6',  stage: 'GROUP', group: 'K', home: 'COD', away: 'POR', utcDate: '2026-06-23T21:00:00Z', venue: 'NEW_YORK',      homeScore: null, awayScore: null },

  // ===== GROUP L =====
  { id: 'L1',  stage: 'GROUP', group: 'L', home: 'ENG', away: 'PAN', utcDate: '2026-06-15T17:00:00Z', venue: 'MIAMI',         homeScore: 3, awayScore: 0 },
  { id: 'L2',  stage: 'GROUP', group: 'L', home: 'CRO', away: 'GHA', utcDate: '2026-06-15T21:00:00Z', venue: 'KANSAS_CITY',   homeScore: 2, awayScore: 2 },
  { id: 'L3',  stage: 'GROUP', group: 'L', home: 'PAN', away: 'CRO', utcDate: '2026-06-19T17:00:00Z', venue: 'SEATTLE',       homeScore: null, awayScore: null },
  { id: 'L4',  stage: 'GROUP', group: 'L', home: 'ENG', away: 'GHA', utcDate: '2026-06-19T21:00:00Z', venue: 'BOSTON',        homeScore: null, awayScore: null },
  { id: 'L5',  stage: 'GROUP', group: 'L', home: 'GHA', away: 'PAN', utcDate: '2026-06-23T17:00:00Z', venue: 'TORONTO',       homeScore: null, awayScore: null },
  { id: 'L6',  stage: 'GROUP', group: 'L', home: 'CRO', away: 'ENG', utcDate: '2026-06-23T21:00:00Z', venue: 'PHILADELPHIA',  homeScore: null, awayScore: null },

  // ===== ROUND OF 32 (32 matches: June 28 – July 3) =====
  { id: 'R32_1',  stage: 'R32', home: '1A', away: '3D/E/F', utcDate: '2026-06-28T17:00:00Z', venue: 'NEW_YORK',      homeScore: null, awayScore: null },
  { id: 'R32_2',  stage: 'R32', home: '1C', away: '3G/H/I', utcDate: '2026-06-28T21:00:00Z', venue: 'LOS_ANGELES',   homeScore: null, awayScore: null },
  { id: 'R32_3',  stage: 'R32', home: '1E', away: '3J/K/L', utcDate: '2026-06-29T17:00:00Z', venue: 'DALLAS',        homeScore: null, awayScore: null },
  { id: 'R32_4',  stage: 'R32', home: '1G', away: '3A/B/C', utcDate: '2026-06-29T21:00:00Z', venue: 'MIAMI',         homeScore: null, awayScore: null },
  { id: 'R32_5',  stage: 'R32', home: '1I', away: '2L',     utcDate: '2026-06-30T17:00:00Z', venue: 'ATLANTA',       homeScore: null, awayScore: null },
  { id: 'R32_6',  stage: 'R32', home: '1K', away: '2J',     utcDate: '2026-06-30T21:00:00Z', venue: 'SEATTLE',       homeScore: null, awayScore: null },
  { id: 'R32_7',  stage: 'R32', home: '1B', away: '2A',     utcDate: '2026-07-01T17:00:00Z', venue: 'BOSTON',        homeScore: null, awayScore: null },
  { id: 'R32_8',  stage: 'R32', home: '1D', away: '2C',     utcDate: '2026-07-01T21:00:00Z', venue: 'PHILADELPHIA',  homeScore: null, awayScore: null },
  { id: 'R32_9',  stage: 'R32', home: '1F', away: '2E',     utcDate: '2026-07-02T17:00:00Z', venue: 'KANSAS_CITY',   homeScore: null, awayScore: null },
  { id: 'R32_10', stage: 'R32', home: '1H', away: '2G',     utcDate: '2026-07-02T21:00:00Z', venue: 'SAN_FRANCISCO', homeScore: null, awayScore: null },
  { id: 'R32_11', stage: 'R32', home: '1J', away: '2I',     utcDate: '2026-07-03T17:00:00Z', venue: 'TORONTO',       homeScore: null, awayScore: null },
  { id: 'R32_12', stage: 'R32', home: '1L', away: '2K',     utcDate: '2026-07-03T21:00:00Z', venue: 'DALLAS',        homeScore: null, awayScore: null },
  { id: 'R32_13', stage: 'R32', home: '2B', away: '2D',     utcDate: '2026-06-28T17:00:00Z', venue: 'MEXICO_CITY',   homeScore: null, awayScore: null },
  { id: 'R32_14', stage: 'R32', home: '2F', away: '2H',     utcDate: '2026-06-28T21:00:00Z', venue: 'ATLANTA',       homeScore: null, awayScore: null },
  { id: 'R32_15', stage: 'R32', home: '2J', away: '2L',     utcDate: '2026-06-29T17:00:00Z', venue: 'SEATTLE',       homeScore: null, awayScore: null },
  { id: 'R32_16', stage: 'R32', home: '1M', away: 'TBD',    utcDate: '2026-07-03T17:00:00Z', venue: 'VANCOUVER',     homeScore: null, awayScore: null },

  // ===== ROUND OF 16 (July 4–7) =====
  { id: 'R16_1', stage: 'R16', home: 'TBD', away: 'TBD', utcDate: '2026-07-04T17:00:00Z', venue: 'NEW_YORK',      homeScore: null, awayScore: null },
  { id: 'R16_2', stage: 'R16', home: 'TBD', away: 'TBD', utcDate: '2026-07-04T21:00:00Z', venue: 'LOS_ANGELES',   homeScore: null, awayScore: null },
  { id: 'R16_3', stage: 'R16', home: 'TBD', away: 'TBD', utcDate: '2026-07-05T17:00:00Z', venue: 'DALLAS',        homeScore: null, awayScore: null },
  { id: 'R16_4', stage: 'R16', home: 'TBD', away: 'TBD', utcDate: '2026-07-05T21:00:00Z', venue: 'MIAMI',         homeScore: null, awayScore: null },
  { id: 'R16_5', stage: 'R16', home: 'TBD', away: 'TBD', utcDate: '2026-07-06T17:00:00Z', venue: 'ATLANTA',       homeScore: null, awayScore: null },
  { id: 'R16_6', stage: 'R16', home: 'TBD', away: 'TBD', utcDate: '2026-07-06T21:00:00Z', venue: 'SEATTLE',       homeScore: null, awayScore: null },
  { id: 'R16_7', stage: 'R16', home: 'TBD', away: 'TBD', utcDate: '2026-07-07T17:00:00Z', venue: 'BOSTON',        homeScore: null, awayScore: null },
  { id: 'R16_8', stage: 'R16', home: 'TBD', away: 'TBD', utcDate: '2026-07-07T21:00:00Z', venue: 'PHILADELPHIA',  homeScore: null, awayScore: null },

  // ===== QUARTER-FINALS (July 9–11) =====
  { id: 'QF_1', stage: 'QF', home: 'TBD', away: 'TBD', utcDate: '2026-07-09T17:00:00Z', venue: 'KANSAS_CITY',   homeScore: null, awayScore: null },
  { id: 'QF_2', stage: 'QF', home: 'TBD', away: 'TBD', utcDate: '2026-07-09T21:00:00Z', venue: 'SAN_FRANCISCO', homeScore: null, awayScore: null },
  { id: 'QF_3', stage: 'QF', home: 'TBD', away: 'TBD', utcDate: '2026-07-10T17:00:00Z', venue: 'DALLAS',        homeScore: null, awayScore: null },
  { id: 'QF_4', stage: 'QF', home: 'TBD', away: 'TBD', utcDate: '2026-07-10T21:00:00Z', venue: 'LOS_ANGELES',   homeScore: null, awayScore: null },

  // ===== SEMI-FINALS (July 14–15) =====
  { id: 'SF_1', stage: 'SF', home: 'TBD', away: 'TBD', utcDate: '2026-07-14T21:00:00Z', venue: 'ATLANTA',       homeScore: null, awayScore: null },
  { id: 'SF_2', stage: 'SF', home: 'TBD', away: 'TBD', utcDate: '2026-07-15T21:00:00Z', venue: 'DALLAS',        homeScore: null, awayScore: null },

  // ===== THIRD PLACE (July 18) =====
  { id: 'TPM',  stage: 'TPM', home: 'TBD', away: 'TBD', utcDate: '2026-07-18T17:00:00Z', venue: 'MIAMI',         homeScore: null, awayScore: null },

  // ===== FINAL (July 19) =====
  { id: 'FINAL', stage: 'FINAL', home: 'TBD', away: 'TBD', utcDate: '2026-07-19T20:00:00Z', venue: 'NEW_YORK',   homeScore: null, awayScore: null },
];

export const getFixturesByGroup = (group) => FIXTURES.filter(f => f.group === group);
export const getFixturesByTeam = (teamCode) => FIXTURES.filter(f => f.home === teamCode || f.away === teamCode);
export const getFixturesByStage = (stage) => FIXTURES.filter(f => f.stage === stage);
export const getCompletedFixtures = () => FIXTURES.filter(f => f.homeScore !== null);
export const getUpcomingFixtures = () => FIXTURES.filter(f => f.homeScore === null);
export const getTodayFixtures = () => {
  const today = new Date();
  return FIXTURES.filter(f => {
    const d = new Date(f.utcDate);
    return d.getUTCFullYear() === today.getUTCFullYear() &&
           d.getUTCMonth() === today.getUTCMonth() &&
           d.getUTCDate() === today.getUTCDate();
  });
};
export const getNextFixture = () => {
  const now = new Date();
  return FIXTURES.filter(f => new Date(f.utcDate) > now).sort((a,b) => new Date(a.utcDate) - new Date(b.utcDate))[0];
};
