// FIFA World Cup 2026 — All 104 Matches
// Times stored in UTC — converted to local timezone in UI
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
  HOUSTON:       { id: 'HOUSTON',       name: 'NRG Stadium',                   city: 'Houston',        country: 'USA',     capacity: 72220 },
};

export const GROUPS = {
  A: ['MEX', 'ZAF', 'KOR', 'CZE'],
  B: ['CAN', 'BIH', 'QAT', 'SUI'],
  C: ['BRA', 'HAI', 'MAR', 'SCO'],
  D: ['USA', 'AUS', 'PAR', 'TUR'],
  E: ['GER', 'CUW', 'CIV', 'ECU'],
  F: ['NED', 'JPN', 'SWE', 'TUN'],
  G: ['BEL', 'EGY', 'IRN', 'NZL'],
  H: ['ESP', 'CPV', 'KSA', 'URU'],
  I: ['FRA', 'IRQ', 'NOR', 'SEN'],
  J: ['ARG', 'ALG', 'AUT', 'JOR'],
  K: ['POR', 'COD', 'UZB', 'COL'],
  L: ['ENG', 'CRO', 'GHA', 'PAN'],
};

export const getMatchStatus = (match) => {
  if (match.status) return match.status;
  if (match.homeScore !== null && match.awayScore !== null) return 'FT';
  const now = new Date();
  const kickoff = new Date(match.utcDate);
  const end = new Date(kickoff.getTime() + 116 * 60 * 1000); // 116 min including HT
  if (now >= kickoff && now <= end) return 'LIVE';
  if (now < kickoff) return 'UPCOMING';
  return 'FT';
};

export const FIXTURES = [
  {
    "home": "MEX",
    "away": "ZAF",
    "utcDate": "2026-06-11T19:00Z",
    "venue": "NEW_YORK",
    "homeScore": 2,
    "awayScore": 0,
    "stage": "GROUP",
    "group": "A",
    "id": "A1"
  },
  {
    "home": "KOR",
    "away": "CZE",
    "utcDate": "2026-06-12T02:00Z",
    "venue": "NEW_YORK",
    "homeScore": 2,
    "awayScore": 1,
    "stage": "GROUP",
    "group": "A",
    "id": "A2"
  },
  {
    "home": "CZE",
    "away": "ZAF",
    "utcDate": "2026-06-18T16:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "A",
    "id": "A3"
  },
  {
    "home": "MEX",
    "away": "KOR",
    "utcDate": "2026-06-19T01:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "A",
    "id": "A4"
  },
  {
    "home": "CZE",
    "away": "MEX",
    "utcDate": "2026-06-25T01:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "A",
    "id": "A5"
  },
  {
    "home": "ZAF",
    "away": "KOR",
    "utcDate": "2026-06-25T01:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "A",
    "id": "A6"
  },
  {
    "home": "CAN",
    "away": "BIH",
    "utcDate": "2026-06-12T19:00Z",
    "venue": "NEW_YORK",
    "homeScore": 1,
    "awayScore": 1,
    "stage": "GROUP",
    "group": "B",
    "id": "B1"
  },
  {
    "home": "QAT",
    "away": "SUI",
    "utcDate": "2026-06-13T19:00Z",
    "venue": "NEW_YORK",
    "homeScore": 1,
    "awayScore": 1,
    "stage": "GROUP",
    "group": "B",
    "id": "B2"
  },
  {
    "home": "SUI",
    "away": "BIH",
    "utcDate": "2026-06-18T19:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "B",
    "id": "B3"
  },
  {
    "home": "CAN",
    "away": "QAT",
    "utcDate": "2026-06-18T22:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "B",
    "id": "B4"
  },
  {
    "home": "BIH",
    "away": "QAT",
    "utcDate": "2026-06-24T19:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "B",
    "id": "B5"
  },
  {
    "home": "SUI",
    "away": "CAN",
    "utcDate": "2026-06-24T19:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "B",
    "id": "B6"
  },
  {
    "home": "BRA",
    "away": "MAR",
    "utcDate": "2026-06-13T22:00Z",
    "venue": "NEW_YORK",
    "homeScore": 1,
    "awayScore": 1,
    "stage": "GROUP",
    "group": "C",
    "id": "C1"
  },
  {
    "home": "HAI",
    "away": "SCO",
    "utcDate": "2026-06-14T01:00Z",
    "venue": "NEW_YORK",
    "homeScore": 0,
    "awayScore": 1,
    "stage": "GROUP",
    "group": "C",
    "id": "C2"
  },
  {
    "home": "SCO",
    "away": "MAR",
    "utcDate": "2026-06-19T22:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "C",
    "id": "C3"
  },
  {
    "home": "BRA",
    "away": "HAI",
    "utcDate": "2026-06-20T00:30Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "C",
    "id": "C4"
  },
  {
    "home": "MAR",
    "away": "HAI",
    "utcDate": "2026-06-24T22:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "C",
    "id": "C5"
  },
  {
    "home": "SCO",
    "away": "BRA",
    "utcDate": "2026-06-24T22:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "C",
    "id": "C6"
  },
  {
    "home": "USA",
    "away": "PAR",
    "utcDate": "2026-06-13T01:00Z",
    "venue": "NEW_YORK",
    "homeScore": 4,
    "awayScore": 1,
    "stage": "GROUP",
    "group": "D",
    "id": "D1"
  },
  {
    "home": "AUS",
    "away": "TUR",
    "utcDate": "2026-06-14T04:00Z",
    "venue": "NEW_YORK",
    "homeScore": 2,
    "awayScore": 0,
    "stage": "GROUP",
    "group": "D",
    "id": "D2"
  },
  {
    "home": "USA",
    "away": "AUS",
    "utcDate": "2026-06-19T19:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "D",
    "id": "D3"
  },
  {
    "home": "TUR",
    "away": "PAR",
    "utcDate": "2026-06-20T03:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "D",
    "id": "D4"
  },
  {
    "home": "PAR",
    "away": "AUS",
    "utcDate": "2026-06-26T02:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "D",
    "id": "D5"
  },
  {
    "home": "TUR",
    "away": "USA",
    "utcDate": "2026-06-26T02:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "D",
    "id": "D6"
  },
  {
    "home": "GER",
    "away": "CUW",
    "utcDate": "2026-06-14T17:00Z",
    "venue": "NEW_YORK",
    "homeScore": 7,
    "awayScore": 1,
    "stage": "GROUP",
    "group": "E",
    "id": "E1"
  },
  {
    "home": "CIV",
    "away": "ECU",
    "utcDate": "2026-06-14T23:00Z",
    "venue": "NEW_YORK",
    "homeScore": 1,
    "awayScore": 0,
    "stage": "GROUP",
    "group": "E",
    "id": "E2"
  },
  {
    "home": "GER",
    "away": "CIV",
    "utcDate": "2026-06-20T20:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "E",
    "id": "E3"
  },
  {
    "home": "ECU",
    "away": "CUW",
    "utcDate": "2026-06-21T00:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "E",
    "id": "E4"
  },
  {
    "home": "CUW",
    "away": "CIV",
    "utcDate": "2026-06-25T20:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "E",
    "id": "E5"
  },
  {
    "home": "ECU",
    "away": "GER",
    "utcDate": "2026-06-25T20:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "E",
    "id": "E6"
  },
  {
    "home": "NED",
    "away": "JPN",
    "utcDate": "2026-06-14T20:00Z",
    "venue": "NEW_YORK",
    "homeScore": 2,
    "awayScore": 2,
    "stage": "GROUP",
    "group": "F",
    "id": "F1"
  },
  {
    "home": "SWE",
    "away": "TUN",
    "utcDate": "2026-06-15T02:00Z",
    "venue": "NEW_YORK",
    "homeScore": 5,
    "awayScore": 1,
    "stage": "GROUP",
    "group": "F",
    "id": "F2"
  },
  {
    "home": "NED",
    "away": "SWE",
    "utcDate": "2026-06-20T17:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "F",
    "id": "F3"
  },
  {
    "home": "TUN",
    "away": "JPN",
    "utcDate": "2026-06-21T04:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "F",
    "id": "F4"
  },
  {
    "home": "JPN",
    "away": "SWE",
    "utcDate": "2026-06-25T23:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "F",
    "id": "F5"
  },
  {
    "home": "TUN",
    "away": "NED",
    "utcDate": "2026-06-25T23:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "F",
    "id": "F6"
  },
  {
    "home": "BEL",
    "away": "EGY",
    "utcDate": "2026-06-15T19:00Z",
    "venue": "NEW_YORK",
    "homeScore": 1,
    "awayScore": 1,
    "stage": "GROUP",
    "group": "G",
    "id": "G1"
  },
  {
    "home": "IRN",
    "away": "NZL",
    "utcDate": "2026-06-16T01:00Z",
    "venue": "NEW_YORK",
    "homeScore": 2,
    "awayScore": 2,
    "stage": "GROUP",
    "group": "G",
    "id": "G2"
  },
  {
    "home": "BEL",
    "away": "IRN",
    "utcDate": "2026-06-21T19:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "G",
    "id": "G3"
  },
  {
    "home": "NZL",
    "away": "EGY",
    "utcDate": "2026-06-22T01:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "G",
    "id": "G4"
  },
  {
    "home": "EGY",
    "away": "IRN",
    "utcDate": "2026-06-27T03:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "G",
    "id": "G5"
  },
  {
    "home": "NZL",
    "away": "BEL",
    "utcDate": "2026-06-27T03:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "G",
    "id": "G6"
  },
  {
    "home": "ESP",
    "away": "CPV",
    "utcDate": "2026-06-15T16:00Z",
    "venue": "NEW_YORK",
    "homeScore": 0,
    "awayScore": 0,
    "stage": "GROUP",
    "group": "H",
    "id": "H1"
  },
  {
    "home": "KSA",
    "away": "URU",
    "utcDate": "2026-06-15T22:00Z",
    "venue": "NEW_YORK",
    "homeScore": 1,
    "awayScore": 1,
    "stage": "GROUP",
    "group": "H",
    "id": "H2"
  },
  {
    "home": "ESP",
    "away": "KSA",
    "utcDate": "2026-06-21T16:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "H",
    "id": "H3"
  },
  {
    "home": "URU",
    "away": "CPV",
    "utcDate": "2026-06-21T22:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "H",
    "id": "H4"
  },
  {
    "home": "CPV",
    "away": "KSA",
    "utcDate": "2026-06-27T00:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "H",
    "id": "H5"
  },
  {
    "home": "URU",
    "away": "ESP",
    "utcDate": "2026-06-27T00:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "H",
    "id": "H6"
  },
  {
    "home": "FRA",
    "away": "SEN",
    "utcDate": "2026-06-16T19:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "I",
    "id": "I1"
  },
  {
    "home": "IRQ",
    "away": "NOR",
    "utcDate": "2026-06-16T22:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "I",
    "id": "I2"
  },
  {
    "home": "FRA",
    "away": "IRQ",
    "utcDate": "2026-06-22T21:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "I",
    "id": "I3"
  },
  {
    "home": "NOR",
    "away": "SEN",
    "utcDate": "2026-06-23T00:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "I",
    "id": "I4"
  },
  {
    "home": "NOR",
    "away": "FRA",
    "utcDate": "2026-06-26T19:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "I",
    "id": "I5"
  },
  {
    "home": "SEN",
    "away": "IRQ",
    "utcDate": "2026-06-26T19:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "I",
    "id": "I6"
  },
  {
    "home": "ARG",
    "away": "ALG",
    "utcDate": "2026-06-17T01:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "J",
    "id": "J1"
  },
  {
    "home": "AUT",
    "away": "JOR",
    "utcDate": "2026-06-17T04:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "J",
    "id": "J2"
  },
  {
    "home": "ARG",
    "away": "AUT",
    "utcDate": "2026-06-22T17:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "J",
    "id": "J3"
  },
  {
    "home": "JOR",
    "away": "ALG",
    "utcDate": "2026-06-23T03:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "J",
    "id": "J4"
  },
  {
    "home": "ALG",
    "away": "AUT",
    "utcDate": "2026-06-28T02:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "J",
    "id": "J5"
  },
  {
    "home": "JOR",
    "away": "ARG",
    "utcDate": "2026-06-28T02:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "J",
    "id": "J6"
  },
  {
    "home": "POR",
    "away": "COD",
    "utcDate": "2026-06-17T17:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "K",
    "id": "K1"
  },
  {
    "home": "UZB",
    "away": "COL",
    "utcDate": "2026-06-18T02:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "K",
    "id": "K2"
  },
  {
    "home": "POR",
    "away": "UZB",
    "utcDate": "2026-06-23T17:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "K",
    "id": "K3"
  },
  {
    "home": "COL",
    "away": "COD",
    "utcDate": "2026-06-24T02:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "K",
    "id": "K4"
  },
  {
    "home": "COL",
    "away": "POR",
    "utcDate": "2026-06-27T23:30Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "K",
    "id": "K5"
  },
  {
    "home": "COD",
    "away": "UZB",
    "utcDate": "2026-06-27T23:30Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "K",
    "id": "K6"
  },
  {
    "home": "ENG",
    "away": "CRO",
    "utcDate": "2026-06-17T20:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "L",
    "id": "L1"
  },
  {
    "home": "GHA",
    "away": "PAN",
    "utcDate": "2026-06-17T23:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "L",
    "id": "L2"
  },
  {
    "home": "ENG",
    "away": "GHA",
    "utcDate": "2026-06-23T20:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "L",
    "id": "L3"
  },
  {
    "home": "PAN",
    "away": "CRO",
    "utcDate": "2026-06-23T23:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "L",
    "id": "L4"
  },
  {
    "home": "CRO",
    "away": "GHA",
    "utcDate": "2026-06-27T21:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "L",
    "id": "L5"
  },
  {
    "home": "PAN",
    "away": "ENG",
    "utcDate": "2026-06-27T21:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "GROUP",
    "group": "L",
    "id": "L6"
  },
  {
    "home": "2A",
    "away": "2B",
    "utcDate": "2026-06-28T19:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R32",
    "id": "R32_1"
  },
  {
    "home": "1C",
    "away": "2F",
    "utcDate": "2026-06-29T17:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R32",
    "id": "R32_2"
  },
  {
    "home": "1E",
    "away": "3RD",
    "utcDate": "2026-06-29T20:30Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R32",
    "id": "R32_3"
  },
  {
    "home": "1F",
    "away": "2C",
    "utcDate": "2026-06-30T01:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R32",
    "id": "R32_4"
  },
  {
    "home": "2E",
    "away": "2I",
    "utcDate": "2026-06-30T17:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R32",
    "id": "R32_5"
  },
  {
    "home": "1I",
    "away": "3RD",
    "utcDate": "2026-06-30T21:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R32",
    "id": "R32_6"
  },
  {
    "home": "1A",
    "away": "3RD",
    "utcDate": "2026-07-01T01:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R32",
    "id": "R32_7"
  },
  {
    "home": "1L",
    "away": "3RD",
    "utcDate": "2026-07-01T16:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R32",
    "id": "R32_8"
  },
  {
    "home": "1G",
    "away": "3RD",
    "utcDate": "2026-07-01T20:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R32",
    "id": "R32_9"
  },
  {
    "home": "1D",
    "away": "3RD",
    "utcDate": "2026-07-02T00:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R32",
    "id": "R32_10"
  },
  {
    "home": "1H",
    "away": "2J",
    "utcDate": "2026-07-02T19:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R32",
    "id": "R32_11"
  },
  {
    "home": "2K",
    "away": "2L",
    "utcDate": "2026-07-02T23:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R32",
    "id": "R32_12"
  },
  {
    "home": "1B",
    "away": "3RD",
    "utcDate": "2026-07-03T03:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R32",
    "id": "R32_13"
  },
  {
    "home": "2D",
    "away": "2G",
    "utcDate": "2026-07-03T18:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R32",
    "id": "R32_14"
  },
  {
    "home": "1J",
    "away": "2H",
    "utcDate": "2026-07-03T22:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R32",
    "id": "R32_15"
  },
  {
    "home": "1K",
    "away": "3RD",
    "utcDate": "2026-07-04T01:30Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R32",
    "id": "R32_16"
  },
  {
    "home": "RD32",
    "away": "RD32",
    "utcDate": "2026-07-04T17:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R16",
    "id": "R16_1"
  },
  {
    "home": "RD32",
    "away": "RD32",
    "utcDate": "2026-07-04T21:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R16",
    "id": "R16_2"
  },
  {
    "home": "RD32",
    "away": "RD32",
    "utcDate": "2026-07-05T20:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R16",
    "id": "R16_3"
  },
  {
    "home": "RD32",
    "away": "RD32",
    "utcDate": "2026-07-06T00:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R16",
    "id": "R16_4"
  },
  {
    "home": "RD32",
    "away": "RD32",
    "utcDate": "2026-07-06T19:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R16",
    "id": "R16_5"
  },
  {
    "home": "RD32",
    "away": "RD32",
    "utcDate": "2026-07-07T00:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R16",
    "id": "R16_6"
  },
  {
    "home": "RD32",
    "away": "RD32",
    "utcDate": "2026-07-07T16:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R16",
    "id": "R16_7"
  },
  {
    "home": "RD32",
    "away": "RD32",
    "utcDate": "2026-07-07T20:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "R16",
    "id": "R16_8"
  },
  {
    "home": "RD16 W1",
    "away": "RD16 W2",
    "utcDate": "2026-07-09T20:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "QF",
    "id": "QF_1"
  },
  {
    "home": "RD16 W5",
    "away": "RD16 W6",
    "utcDate": "2026-07-10T19:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "QF",
    "id": "QF_2"
  },
  {
    "home": "RD16 W3",
    "away": "RD16 W4",
    "utcDate": "2026-07-11T21:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "QF",
    "id": "QF_3"
  },
  {
    "home": "RD16 W7",
    "away": "RD16 W8",
    "utcDate": "2026-07-12T01:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "QF",
    "id": "QF_4"
  },
  {
    "home": "QFW1",
    "away": "QFW2",
    "utcDate": "2026-07-14T19:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "SF",
    "id": "SF_1"
  },
  {
    "home": "QFW3",
    "away": "QW4",
    "utcDate": "2026-07-15T19:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "SF",
    "id": "SF_2"
  },
  {
    "home": "SF L1",
    "away": "SF L2",
    "utcDate": "2026-07-18T21:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "TPM",
    "id": "TPM"
  },
  {
    "home": "SFW1",
    "away": "SFW2",
    "utcDate": "2026-07-19T19:00Z",
    "venue": "NEW_YORK",
    "homeScore": null,
    "awayScore": null,
    "stage": "FINAL",
    "id": "FINAL"
  }
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
