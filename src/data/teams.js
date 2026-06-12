// FIFA World Cup 2026 — All 48 Teams
// Data based on official FIFA draw (December 5, 2025)

export const TEAMS = {
  // GROUP A
  MEX: { code: 'MEX', name: 'Mexico', flag: 'mx', group: 'A', confederation: 'CONCACAF', fifaRank: 16, coach: 'Javier Aguirre', color: '#006847', kitColor: '#006847', lat: 23.6, lng: -102.5, qualified: true, description: 'Five-time Quarter-finalists, hosting for the third time' },
  ZAF: { code: 'ZAF', name: 'South Africa', flag: 'za', group: 'A', confederation: 'CAF', fifaRank: 60, coach: 'Hugo Broos', color: '#007A4D', kitColor: '#007A4D', lat: -30.6, lng: 22.9, qualified: true, description: 'Former 2010 World Cup hosts, back on the biggest stage' },
  KOR: { code: 'KOR', name: 'South Korea', flag: 'kr', group: 'A', confederation: 'AFC', fifaRank: 23, coach: 'Hong Myung-bo', color: '#C60C30', kitColor: '#C60C30', lat: 35.9, lng: 127.7, qualified: true, description: 'Asian giants with a history of World Cup upsets' },
  CZE: { code: 'CZE', name: 'Czechia', flag: 'cz', group: 'A', confederation: 'UEFA', fifaRank: 36, coach: 'Ivan Hasek', color: '#D7141A', kitColor: '#D7141A', lat: 49.8, lng: 15.5, qualified: true, description: 'European contenders with technical midfield play' },

  // GROUP B
  CAN: { code: 'CAN', name: 'Canada', flag: 'ca', group: 'B', confederation: 'CONCACAF', fifaRank: 43, coach: 'Jesse Marsch', color: '#FF0000', kitColor: '#FF0000', lat: 56.1, lng: -106.3, qualified: true, description: 'Co-host nation on their first ever senior World Cup' },
  BIH: { code: 'BIH', name: 'Bosnia & Herzegovina', flag: 'ba', group: 'B', confederation: 'UEFA', fifaRank: 65, coach: 'Sergej Barbarez', color: '#0032A0', kitColor: '#0032A0', lat: 43.9, lng: 17.7, qualified: true, description: 'Return to the World Cup stage after 2014' },
  QAT: { code: 'QAT', name: 'Qatar', flag: 'qa', group: 'B', confederation: 'AFC', fifaRank: 38, coach: 'Marquez Lopez', color: '#8D1B3D', kitColor: '#8D1B3D', lat: 25.4, lng: 51.2, qualified: true, description: 'Former hosts seeking redemption after 2022' },
  SUI: { code: 'SUI', name: 'Switzerland', flag: 'ch', group: 'B', confederation: 'UEFA', fifaRank: 19, coach: 'Murat Yakin', color: '#FF0000', kitColor: '#FF0000', lat: 46.8, lng: 8.2, qualified: true, description: 'Consistent performers, reached QF in 2022' },

  // GROUP C
  BRA: { code: 'BRA', name: 'Brazil', flag: 'br', group: 'C', confederation: 'CONMEBOL', fifaRank: 5, coach: 'Dorival Junior', color: '#009C3B', kitColor: '#FFDF00', lat: -14.2, lng: -51.9, qualified: true, description: 'Five-time World Champions, the most successful nation in history' },
  HAI: { code: 'HAI', name: 'Haiti', flag: 'ht', group: 'C', confederation: 'CONCACAF', fifaRank: 83, coach: 'Marc Collat', color: '#003F87', kitColor: '#003F87', lat: 18.9, lng: -72.3, qualified: true, description: 'Caribbean underdogs making their return to World Cup football' },
  MAR: { code: 'MAR', name: 'Morocco', flag: 'ma', group: 'C', confederation: 'CAF', fifaRank: 14, coach: 'Walid Regragui', color: '#C1272D', kitColor: '#C1272D', lat: 31.8, lng: -7.1, qualified: true, description: '2022 Semi-finalists, Africa\'s finest football nation' },
  SCO: { code: 'SCO', name: 'Scotland', flag: 'gb-sct', group: 'C', confederation: 'UEFA', fifaRank: 29, coach: 'Steve Clarke', color: '#003865', kitColor: '#003865', lat: 56.5, lng: -4.2, qualified: true, description: 'Back after decades, Scotland return to their first World Cup since 1998' },

  // GROUP D
  USA: { code: 'USA', name: 'United States', flag: 'us', group: 'D', confederation: 'CONCACAF', fifaRank: 13, coach: 'Mauricio Pochettino', color: '#002868', kitColor: '#BF0A30', lat: 37.1, lng: -95.7, qualified: true, description: 'Co-host and emerging football powerhouse under Pochettino' },
  AUS: { code: 'AUS', name: 'Australia', flag: 'au', group: 'D', confederation: 'AFC', fifaRank: 24, coach: 'Tony Popovic', color: '#00843D', kitColor: '#FFD700', lat: -25.3, lng: 133.8, qualified: true, description: 'The Socceroos, 2023 Women\'s WC hosts and Semi-finalists in 2022' },
  PAR: { code: 'PAR', name: 'Paraguay', flag: 'py', group: 'D', confederation: 'CONMEBOL', fifaRank: 55, coach: 'Gustavo Alfaro', color: '#D52B1E', kitColor: '#D52B1E', lat: -23.4, lng: -58.4, qualified: true, description: 'South American fighters, known for defensive resilience' },
  TUR: { code: 'TUR', name: 'Türkiye', flag: 'tr', group: 'D', confederation: 'UEFA', fifaRank: 26, coach: 'Vincenzo Montella', color: '#E30A17', kitColor: '#E30A17', lat: 38.9, lng: 35.2, qualified: true, description: '2002 Third-place finishers, on the rise again under Montella' },

  // GROUP E
  GER: { code: 'GER', name: 'Germany', flag: 'de', group: 'E', confederation: 'UEFA', fifaRank: 12, coach: 'Julian Nagelsmann', color: '#000000', kitColor: '#FFFFFF', lat: 51.2, lng: 10.5, qualified: true, description: 'Four-time World Champions hungry to reclaim glory' },
  CUW: { code: 'CUW', name: 'Curaçao', flag: 'cw', group: 'E', confederation: 'CONCACAF', fifaRank: 86, coach: 'Kamil Plachý', color: '#003082', kitColor: '#003082', lat: 12.2, lng: -69.0, qualified: true, description: 'Historic first World Cup qualification for the Caribbean island' },
  CIV: { code: 'CIV', name: 'Ivory Coast', flag: 'ci', group: 'E', confederation: 'CAF', fifaRank: 34, coach: 'Emerse Faé', color: '#F77F00', kitColor: '#009A44', lat: 7.5, lng: -5.5, qualified: true, description: 'Les Éléphants, Africa\'s most successful team of the 2000s' },
  ECU: { code: 'ECU', name: 'Ecuador', flag: 'ec', group: 'E', confederation: 'CONMEBOL', fifaRank: 44, coach: 'Sebastián Beccacece', color: '#FFDD00', kitColor: '#0033A0', lat: -1.8, lng: -78.2, qualified: true, description: 'Consistent CONMEBOL qualifiers with explosive attacking play' },

  // GROUP F
  NED: { code: 'NED', name: 'Netherlands', flag: 'nl', group: 'F', confederation: 'UEFA', fifaRank: 7, coach: 'Ronald Koeman', color: '#FF6600', kitColor: '#FF6600', lat: 52.1, lng: 5.3, qualified: true, description: 'Oranje — three-time finalists seeking their first title' },
  JPN: { code: 'JPN', name: 'Japan', flag: 'jp', group: 'F', confederation: 'AFC', fifaRank: 18, coach: 'Hajime Moriyasu', color: '#003087', kitColor: '#003087', lat: 36.2, lng: 138.3, qualified: true, description: 'Samurai Blue — Asia\'s most consistent World Cup performers' },
  SWE: { code: 'SWE', name: 'Sweden', flag: 'se', group: 'F', confederation: 'UEFA', fifaRank: 25, coach: 'Jon Dahl Tomasson', color: '#006AA7', kitColor: '#FECC02', lat: 60.1, lng: 18.6, qualified: true, description: 'Classic Scandinavian power with prolific striker tradition' },
  TUN: { code: 'TUN', name: 'Tunisia', flag: 'tn', group: 'F', confederation: 'CAF', fifaRank: 28, coach: 'Jalel Kadri', color: '#E70013', kitColor: '#FFFFFF', lat: 34.0, lng: 9.0, qualified: true, description: 'Africa\'s regulars, looking to go further than ever before' },

  // GROUP G
  BEL: { code: 'BEL', name: 'Belgium', flag: 'be', group: 'G', confederation: 'UEFA', fifaRank: 3, coach: 'Domenico Tedesco', color: '#000000', kitColor: '#EF3340', lat: 50.5, lng: 4.5, qualified: true, description: 'The Red Devils — perpetual contenders with world-class talent' },
  EGY: { code: 'EGY', name: 'Egypt', flag: 'eg', group: 'G', confederation: 'CAF', fifaRank: 46, coach: 'Hossam El-Badry', color: '#CE1126', kitColor: '#CE1126', lat: 26.0, lng: 30.0, qualified: true, description: 'The Pharaohs, seven-time African Champions' },
  IRN: { code: 'IRN', name: 'IR Iran', flag: 'ir', group: 'G', confederation: 'AFC', fifaRank: 22, coach: 'Amir Ghalenoei', color: '#239F40', kitColor: '#FFFFFF', lat: 32.4, lng: 53.7, qualified: true, description: 'Asia\'s most experienced World Cup nation with 6 appearances' },
  NZL: { code: 'NZL', name: 'New Zealand', flag: 'nz', group: 'G', confederation: 'OFC', fifaRank: 95, coach: 'Darren Bazeley', color: '#000000', kitColor: '#FFFFFF', lat: -40.9, lng: 174.9, qualified: true, description: 'All Whites — Oceania\'s representatives on the world stage' },

  // GROUP H
  ESP: { code: 'ESP', name: 'Spain', flag: 'es', group: 'H', confederation: 'UEFA', fifaRank: 6, coach: 'Luis de la Fuente', color: '#AA151B', kitColor: '#AA151B', lat: 40.5, lng: -3.7, qualified: true, description: 'La Roja — 2010 World Champions and current European Champions' },
  CPV: { code: 'CPV', name: 'Cape Verde', flag: 'cv', group: 'H', confederation: 'CAF', fifaRank: 68, coach: 'Bubista', color: '#003893', kitColor: '#003893', lat: 16.5, lng: -24.0, qualified: true, description: 'The Blue Sharks making waves in African football' },
  KSA: { code: 'KSA', name: 'Saudi Arabia', flag: 'sa', group: 'H', confederation: 'AFC', fifaRank: 56, coach: 'Herve Renard', color: '#006C35', kitColor: '#006C35', lat: 23.9, lng: 45.1, qualified: true, description: 'Green Falcons, famous for beating Argentina in 2022' },
  URU: { code: 'URU', name: 'Uruguay', flag: 'uy', group: 'H', confederation: 'CONMEBOL', fifaRank: 17, coach: 'Marcelo Bielsa', color: '#75AADB', kitColor: '#75AADB', lat: -32.5, lng: -55.8, qualified: true, description: 'Two-time World Champions with Bielsa\'s intense style' },

  // GROUP I
  FRA: { code: 'FRA', name: 'France', flag: 'fr', group: 'I', confederation: 'UEFA', fifaRank: 2, coach: 'Didier Deschamps', color: '#003189', kitColor: '#003189', lat: 46.2, lng: 2.2, qualified: true, description: 'Les Bleus — defending runners-up, seeking their third title' },
  IRQ: { code: 'IRQ', name: 'Iraq', flag: 'iq', group: 'I', confederation: 'AFC', fifaRank: 63, coach: 'Jesús Casas', color: '#007A3D', kitColor: '#007A3D', lat: 33.2, lng: 43.7, qualified: true, description: 'Lions of Mesopotamia making a long-awaited World Cup return' },
  NOR: { code: 'NOR', name: 'Norway', flag: 'no', group: 'I', confederation: 'UEFA', fifaRank: 31, coach: 'Ståle Solbakken', color: '#EF2B2D', kitColor: '#FFFFFF', lat: 60.5, lng: 8.5, qualified: true, description: 'The Haaland era begins — Norway\'s most exciting generation ever' },
  SEN: { code: 'SEN', name: 'Senegal', flag: 'sn', group: 'I', confederation: 'CAF', fifaRank: 20, coach: 'Aliou Cissé', color: '#00853F', kitColor: '#FFFFFF', lat: 14.5, lng: -14.5, qualified: true, description: 'Reigning African Champions with a squad full of Premier League stars' },

  // GROUP J
  ARG: { code: 'ARG', name: 'Argentina', flag: 'ar', group: 'J', confederation: 'CONMEBOL', fifaRank: 1, coach: 'Lionel Scaloni', color: '#74ACDF', kitColor: '#74ACDF', lat: -38.4, lng: -63.6, qualified: true, description: 'World Champions! Argentina defending their 2022 Qatar crown' },
  ALG: { code: 'ALG', name: 'Algeria', flag: 'dz', group: 'J', confederation: 'CAF', fifaRank: 57, coach: 'Djamel Belmadi', color: '#006233', kitColor: '#FFFFFF', lat: 28.0, lng: 1.7, qualified: true, description: 'The Desert Foxes, 2019 African Champions' },
  AUT: { code: 'AUT', name: 'Austria', flag: 'at', group: 'J', confederation: 'UEFA', fifaRank: 25, coach: 'Ralf Rangnick', color: '#EF3340', kitColor: '#FFFFFF', lat: 47.5, lng: 14.6, qualified: true, description: 'Under Rangnick\'s high-press system, Austria are dangerous' },
  JOR: { code: 'JOR', name: 'Jordan', flag: 'jo', group: 'J', confederation: 'AFC', fifaRank: 71, coach: 'Hussein Ammouta', color: '#007A3D', kitColor: '#FFFFFF', lat: 31.0, lng: 36.8, qualified: true, description: 'The Nashama making their historic first World Cup appearance' },

  // GROUP K
  POR: { code: 'POR', name: 'Portugal', flag: 'pt', group: 'K', confederation: 'UEFA', fifaRank: 9, coach: 'Roberto Martínez', color: '#006600', kitColor: '#EF3340', lat: 39.4, lng: -8.2, qualified: true, description: 'A Seleção — Ronaldo\'s last dance or new era with Félix & Co?' },
  COD: { code: 'COD', name: 'DR Congo', flag: 'cd', group: 'K', confederation: 'CAF', fifaRank: 50, coach: 'Sébastien Desabre', color: '#007FFF', kitColor: '#CE1126', lat: -4.0, lng: 21.8, qualified: true, description: 'The Leopards — Africa\'s sleeping giant awakening' },
  UZB: { code: 'UZB', name: 'Uzbekistan', flag: 'uz', group: 'K', confederation: 'AFC', fifaRank: 64, coach: 'Srecko Katanec', color: '#1EB53A', kitColor: '#0099B5', lat: 41.4, lng: 64.6, qualified: true, description: 'Central Asian pioneers at their debut World Cup' },
  COL: { code: 'COL', name: 'Colombia', flag: 'co', group: 'K', confederation: 'CONMEBOL', fifaRank: 10, coach: 'Néstor Lorenzo', color: '#FCD116', kitColor: '#FCD116', lat: 4.6, lng: -74.3, qualified: true, description: '2024 Copa América runners-up, Colombia back with world-class talent' },

  // GROUP L
  ENG: { code: 'ENG', name: 'England', flag: 'gb-eng', group: 'L', confederation: 'UEFA', fifaRank: 5, coach: 'Lee Carsley', color: '#FFFFFF', kitColor: '#003399', lat: 52.4, lng: -1.7, qualified: true, description: '1966 Champions, 58 years of hurt — can England finally win again?' },
  CRO: { code: 'CRO', name: 'Croatia', flag: 'hr', group: 'L', confederation: 'UEFA', fifaRank: 10, coach: 'Zlatko Dalić', color: '#FF0000', kitColor: '#FFFFFF', lat: 45.1, lng: 15.2, qualified: true, description: '2018 Runners-up and 2022 Bronze — Croatia punch above their weight' },
  GHA: { code: 'GHA', name: 'Ghana', flag: 'gh', group: 'L', confederation: 'CAF', fifaRank: 61, coach: 'Otto Addo', color: '#006B3F', kitColor: '#FFFFFF', lat: 7.9, lng: -1.0, qualified: true, description: 'The Black Stars, remembers by the handball that broke hearts in 2010' },
  PAN: { code: 'PAN', name: 'Panama', flag: 'pa', group: 'L', confederation: 'CONCACAF', fifaRank: 49, coach: 'Thomas Christiansen', color: '#BD2022', kitColor: '#BD2022', lat: 8.5, lng: -80.8, qualified: true, description: 'Los Canaleros — Central America\'s feisty qualifiers' },
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

export const getTeamByCode = (code) => TEAMS[code];
export const getGroupTeams = (group) => GROUPS[group].map(code => TEAMS[code]);
export const getAllTeams = () => Object.values(TEAMS);
export const getTeamsByGroup = () => Object.entries(GROUPS).map(([group, codes]) => ({
  group,
  teams: codes.map(code => TEAMS[code])
}));
