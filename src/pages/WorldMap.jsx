import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import FlagIcon from '../components/FlagIcon';
import { getAllTeams, GROUPS } from '../data/teams';

const MAP_MODES = ['Nations', 'Groups', 'Knockout'];

const GROUP_COLORS = {
  A: '#C8102E', B: '#4F46E5', C: '#059669', D: '#D97706',
  E: '#DC2626', F: '#7C3AED', G: '#2563EB', H: '#065F46',
  I: '#92400E', J: '#1D4ED8', K: '#B45309', L: '#6D28D9',
};

// Approximate world map SVG projection coordinates for each team's capital
// Using a simplified equirectangular projection on a 800x400 viewBox
const projectLatLng = (lat, lng) => {
  const x = ((lng + 180) / 360) * 800;
  const y = ((90 - lat) / 180) * 400;
  return [x, y];
};

export default function WorldMap({ onBack, onTeamSelect }) {
  const [mode, setMode] = useState('Nations');
  const [selected, setSelected] = useState(null);
  const [viewBox, setViewBox] = useState('0 0 800 400');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const teams = getAllTeams().filter(t => t.lat && t.lng);

  const handleZoomIn = () => {
    setZoom(z => Math.min(z * 1.5, 6));
  };
  const handleZoomOut = () => {
    setZoom(z => Math.max(z / 1.5, 1));
  };
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar title="World Map" onBack={onBack} />

      {/* Mode Tabs */}
      <div style={{ padding: '8px 16px', display: 'flex', gap: 6 }}>
        {MAP_MODES.map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              flex: 1, padding: '8px 4px',
              border: '2px solid',
              borderColor: mode === m ? 'var(--fifa-red)' : 'var(--border-color)',
              borderRadius: 24,
              background: mode === m ? 'var(--fifa-red)' : 'transparent',
              color: mode === m ? 'white' : 'var(--text-secondary)',
              fontWeight: 700, fontSize: 12,
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Group Legend */}
      {mode === 'Groups' && (
        <div style={{
          padding: '4px 16px',
          overflowX: 'auto',
          display: 'flex',
          gap: 6,
          scrollbarWidth: 'none',
          flexWrap: 'wrap',
        }}>
          {Object.entries(GROUPS).map(([group]) => (
            <div key={group} style={{
              display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0,
              background: GROUP_COLORS[group] + '20',
              border: `1.5px solid ${GROUP_COLORS[group]}50`,
              borderRadius: 20, padding: '3px 8px',
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: GROUP_COLORS[group] }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: GROUP_COLORS[group] }}>G{group}</span>
            </div>
          ))}
        </div>
      )}

      {/* Interactive SVG Map */}
      <div style={{
        margin: '8px 16px',
        background: 'var(--bg-card)',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--border-subtle)',
        position: 'relative',
        height: 280,
      }}>
        <svg
          viewBox="0 0 800 400"
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            transformOrigin: 'center center',
            transition: 'transform 0.3s',
          }}
        >
          {/* Ocean background */}
          <rect x="0" y="0" width="800" height="400" fill={
            document.documentElement.getAttribute('data-theme') === 'dark' ? '#0D1B2A' : '#DBEAFE'
          } />

          {/* Simplified continent shapes */}
          {/* North America */}
          <path d="M 95 60 Q 120 55 145 60 Q 175 70 185 85 Q 195 100 190 115 Q 185 130 175 145 Q 160 165 150 175 Q 135 185 125 190 Q 110 195 100 185 Q 85 175 80 160 Q 72 140 75 120 Q 78 95 85 80 Z" fill="#94A3B8" opacity="0.7" />
          {/* Greenland */}
          <ellipse cx="160" cy="40" rx="25" ry="20" fill="#94A3B8" opacity="0.6" />
          {/* Central America */}
          <path d="M 150 175 Q 155 185 158 195 Q 155 205 150 210 Q 145 215 140 210 Q 135 200 138 190 Q 140 182 145 178 Z" fill="#94A3B8" opacity="0.7" />
          {/* South America */}
          <path d="M 200 185 Q 225 175 240 190 Q 255 210 255 230 Q 258 255 250 275 Q 240 295 225 308 Q 210 318 200 312 Q 185 305 180 285 Q 175 265 178 245 Q 180 220 190 205 Z" fill="#94A3B8" opacity="0.7" />
          {/* Europe */}
          <path d="M 380 60 Q 410 55 430 65 Q 445 75 440 90 Q 435 105 420 110 Q 405 115 390 108 Q 375 100 373 88 Q 372 74 378 65 Z" fill="#94A3B8" opacity="0.7" />
          {/* Scandinavia */}
          <path d="M 395 35 Q 408 30 418 38 Q 422 48 415 55 Q 405 58 398 50 Q 393 43 395 35 Z" fill="#94A3B8" opacity="0.6" />
          {/* Africa */}
          <path d="M 395 120 Q 425 112 445 125 Q 460 140 462 165 Q 464 190 458 215 Q 450 238 435 255 Q 418 268 400 265 Q 382 260 372 240 Q 362 218 364 195 Q 365 170 372 148 Q 378 130 390 122 Z" fill="#94A3B8" opacity="0.7" />
          {/* Middle East */}
          <path d="M 455 100 Q 480 92 500 102 Q 515 115 510 130 Q 505 145 488 148 Q 470 150 460 138 Q 450 125 452 112 Z" fill="#94A3B8" opacity="0.7" />
          {/* Asia */}
          <path d="M 490 40 Q 540 30 590 45 Q 640 60 670 70 Q 695 82 700 100 Q 705 120 695 140 Q 680 158 655 165 Q 630 170 605 160 Q 580 148 560 135 Q 535 118 515 102 Q 495 85 490 68 Z" fill="#94A3B8" opacity="0.7" />
          {/* South Asia */}
          <path d="M 555 145 Q 575 138 590 148 Q 600 160 595 175 Q 588 188 575 190 Q 562 190 555 178 Q 548 165 550 153 Z" fill="#94A3B8" opacity="0.7" />
          {/* Southeast Asia */}
          <path d="M 635 145 Q 655 138 670 148 Q 680 160 675 175 Q 665 185 650 182 Q 638 175 635 162 Z" fill="#94A3B8" opacity="0.6" />
          {/* Japan */}
          <ellipse cx="698" cy="115" rx="10" ry="20" fill="#94A3B8" opacity="0.7" />
          {/* Korea */}
          <ellipse cx="680" cy="120" rx="8" ry="14" fill="#94A3B8" opacity="0.7" />
          {/* Australia */}
          <ellipse cx="680" cy="290" rx="45" ry="35" fill="#94A3B8" opacity="0.7" />
          {/* New Zealand */}
          <ellipse cx="740" cy="320" rx="10" ry="18" fill="#94A3B8" opacity="0.6" />

          {/* Team Markers */}
          {teams.map(team => {
            const [x, y] = projectLatLng(team.lat, team.lng);
            const color = mode === 'Groups'
              ? (GROUP_COLORS[team.group] || '#C8102E')
              : '#C8102E';
            const isSelected = selected?.code === team.code;

            return (
              <g
                key={team.code}
                onClick={() => setSelected(team)}
                style={{ cursor: 'pointer' }}
              >
                {/* Outer pulse */}
                <circle
                  cx={x} cy={y}
                  r={isSelected ? 14 : 9}
                  fill={color}
                  fillOpacity={0.2}
                  style={{
                    animation: isSelected ? 'none' : 'mapPulse 2s ease-in-out infinite',
                    animationDelay: `${(teams.indexOf(team) % 5) * 0.4}s`,
                  }}
                />
                {/* Main dot */}
                <circle
                  cx={x} cy={y}
                  r={isSelected ? 7 : 4.5}
                  fill={color}
                  stroke="white"
                  strokeWidth={isSelected ? 2 : 1.5}
                />
                {/* Team code for selected */}
                {isSelected && (
                  <text
                    x={x} y={y - 11}
                    textAnchor="middle"
                    fontSize="7"
                    fontWeight="800"
                    fill={color}
                    fontFamily="Inter, sans-serif"
                  >
                    {team.code}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Zoom Controls */}
        <div style={{
          position: 'absolute', bottom: 8, right: 8,
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {[['+', handleZoomIn], ['−', handleZoomOut], ['↺', handleReset]].map(([label, action]) => (
            <button
              key={label}
              onClick={action}
              style={{
                width: 32, height: 32,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                fontSize: 16, fontWeight: 700,
                cursor: 'pointer',
                color: 'var(--text-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Nations count */}
        <div style={{
          position: 'absolute', top: 8, left: 8,
          background: 'var(--bg-overlay)',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 20, padding: '3px 10px',
          fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)',
        }}>
          ⚽ {teams.length} Nations
        </div>
      </div>

      {/* Selected Team Info */}
      {selected ? (
        <>
          <div className="bottom-sheet-overlay" onClick={() => setSelected(null)} />
          <div className="bottom-sheet">
            <div className="sheet-handle" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <FlagIcon code={selected.flag} size="xl" style={{ borderRadius: 10 }} />
              <div>
                <div style={{ fontSize: 20, fontWeight: 800 }}>{selected.name}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                  <span className="team-group-badge">Group {selected.group}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>#{selected.fifaRank} FIFA</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{selected.confederation}</span>
                </div>
              </div>
            </div>
            <div className="info-card" style={{ marginLeft: 0, marginRight: 0, marginBottom: 12 }}>
              {[
                { label: 'Coach',     value: selected.coach },
                { label: 'Group',     value: `Group ${selected.group}` },
                { label: 'FIFA Rank', value: `#${selected.fifaRank}` },
              ].map(({ label, value }) => (
                <div key={label} className="info-row">
                  <span className="info-label">{label}</span>
                  <span className="info-value">{value || '—'}</span>
                </div>
              ))}
            </div>
            {selected.description && (
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
                {selected.description}
              </p>
            )}
            <button
              onClick={() => { setSelected(null); onTeamSelect?.(selected); }}
              style={{
                width: '100%', padding: '14px',
                background: 'var(--gradient-red)',
                border: 'none', borderRadius: 14,
                color: 'white', fontSize: 14, fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              View Full Team Profile →
            </button>
          </div>
        </>
      ) : null}

      {/* Tap instruction when no selection */}
      {!selected && (
        <div style={{ padding: '8px 16px', fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', fontStyle: 'italic' }}>
          Tap any marker to view team profile
        </div>
      )}

      {/* All Teams Grid below the map */}
      <div style={{ padding: '12px 16px 4px' }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>All {teams.length} Qualified Nations</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '0 16px 24px' }}>
        {teams.map(team => {
          const color = mode === 'Groups' ? GROUP_COLORS[team.group] : '#C8102E';
          return (
            <div
              key={team.code}
              onClick={() => setSelected(team)}
              style={{
                background: 'var(--bg-card)',
                borderRadius: 12,
                padding: '10px 8px',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 6,
                cursor: 'pointer',
                border: `2px solid ${selected?.code === team.code ? color : 'var(--border-subtle)'}`,
                transition: 'all 0.2s',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <FlagIcon code={team.flag} size="sm" />
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center', lineHeight: 1.2 }}>
                {team.name.length > 10 ? team.code : team.name}
              </span>
              <span style={{
                fontSize: 9, fontWeight: 700, color, background: color + '15',
                padding: '1px 6px', borderRadius: 10,
              }}>G{team.group}</span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes mapPulse {
          0%, 100% { r: 9; fill-opacity: 0.2; }
          50% { r: 13; fill-opacity: 0.08; }
        }
      `}</style>
    </div>
  );
}
