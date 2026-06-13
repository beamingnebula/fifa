import React, { useState, useEffect, useRef, useMemo } from 'react';
import TopBar from '../components/TopBar';
import FlagIcon from '../components/FlagIcon';
import { getAllTeams, GROUPS } from '../data/teams';
import { useFixtures } from '../context/FixturesContext';

const MAP_MODES = ['Nations', 'Groups', 'Knockout'];

const GROUP_COLORS = {
  A: '#C8102E', B: '#4F46E5', C: '#059669', D: '#D97706',
  E: '#DC2626', F: '#7C3AED', G: '#2563EB', H: '#065F46',
  I: '#92400E', J: '#1D4ED8', K: '#B45309', L: '#6D28D9',
};

export default function WorldMap({ onBack, onTeamSelect, darkMode = false }) {
  const { fixtures } = useFixtures();
  const [mode, setMode] = useState('Nations');
  const [selected, setSelected] = useState(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersGroupRef = useRef(null);
  const tileLayerRef = useRef(null);

  const teams = getAllTeams().filter(t => t.lat && t.lng);

  const knockoutTeams = useMemo(() => {
    const set = new Set();
    fixtures.forEach(f => {
      if (f.stage !== 'GROUP') {
        if (f.home && f.home !== 'TBD' && f.home.length === 3) set.add(f.home);
        if (f.away && f.away !== 'TBD' && f.away.length === 3) set.add(f.away);
      }
    });
    return set;
  }, [fixtures]);

  // Load Leaflet CDN dynamically
  useEffect(() => {
    // Check if L is already in window
    if (window.L) {
      setLeafletLoaded(true);
      return;
    }

    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    cssLink.crossOrigin = '';
    document.head.appendChild(cssLink);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.async = true;
    script.onload = () => {
      setLeafletLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      // Clean up DOM tags on unmount
      if (document.head.contains(cssLink)) {
        document.head.removeChild(cssLink);
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Initialize Map Instance
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || mapInstanceRef.current) return;

    const L = window.L;
    
    // Set up Leaflet map container
    const map = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 2,
      minZoom: 1.5,
      maxZoom: 7,
      zoomControl: false, // Hide native control, we render custom premium buttons
      attributionControl: true,
    });

    mapInstanceRef.current = map;
    markersGroupRef.current = L.layerGroup().addTo(map);

    // Initial tile layer load
    const tileUrl = darkMode
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    tileLayerRef.current = L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Click map to clear selected state (respects marker clicks which stop propagation)
    map.on('click', () => {
      setSelected(null);
    });

  }, [leafletLoaded]);

  // Handle updates when mode, selected, or darkMode changes
  useEffect(() => {
    if (!leafletLoaded || !mapInstanceRef.current) return;

    const L = window.L;
    const map = mapInstanceRef.current;

    // Switch tiles if theme toggled
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }
    const tileUrl = darkMode
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    tileLayerRef.current = L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Clear and redraw markers
    const markersGroup = markersGroupRef.current;
    markersGroup.clearLayers();

    teams.forEach(team => {
      const isKnockoutTeam = knockoutTeams.has(team.code);
      let color = 'var(--fifa-red)';
      let opacity = 1;

      if (mode === 'Groups') {
        color = GROUP_COLORS[team.group] || 'var(--fifa-red)';
      } else if (mode === 'Knockout') {
        if (isKnockoutTeam) {
          color = 'var(--fifa-gold)';
        } else {
          color = '#5C6478';
          opacity = 0.35;
        }
      }

      const isSelected = selected?.code === team.code;
      const size = isSelected ? 24 : 12;

      // Custom HTML layout for marker using Leaflet divIcon
      const icon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            width: ${size}px; height: ${size}px;
            background: ${color};
            border: 2px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: ${opacity};
            position: relative;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            transition: all 0.2s ease-in-out;
          ">
            ${isSelected ? `<span style="font-size: 8px; font-weight: 800; color: white; font-family: Inter, sans-serif; line-height: 1;">${team.code}</span>` : ''}
            ${isSelected ? `
              <div style="
                position: absolute;
                inset: -6px;
                border-radius: 50%;
                background: ${color};
                opacity: 0.25;
                animation: mapPulse 2s ease-in-out infinite;
              "></div>
            ` : ''}
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      const marker = L.marker([team.lat, team.lng], { icon })
        .on('click', (e) => {
          L.DomEvent.stopPropagation(e); // prevent map click event from clearing selected
          setSelected(team);
          map.setView([team.lat, team.lng], Math.max(map.getZoom(), 4), { animate: true });
        })
        .addTo(markersGroup);
    });

  }, [leafletLoaded, mode, selected, darkMode, knockoutTeams]);

  // Center on team if clicked from grid
  const handleSelectFromGrid = (team) => {
    setSelected(team);
    if (leafletLoaded && mapInstanceRef.current) {
      mapInstanceRef.current.setView([team.lat, team.lng], 4, { animate: true });
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };
  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };
  const handleReset = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([20, 0], 2, { animate: true });
    }
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

      {/* Interactive OSM Map Container */}
      <div
        style={{
          margin: '8px 16px',
          background: 'var(--bg-card)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-subtle)',
          position: 'relative',
          height: 280,
          zIndex: 1,
        }}
      >
        {!leafletLoaded && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--bg-primary)', color: 'var(--text-muted)',
            fontSize: 14, fontWeight: 600,
          }}>
            Loading World Map...
          </div>
        )}

        <div
          ref={mapRef}
          style={{ width: '100%', height: '100%', zIndex: 1 }}
        />

        {/* Custom Zoom Overlay Controls */}
        <div style={{
          position: 'absolute', bottom: 8, right: 8,
          display: 'flex', flexDirection: 'column', gap: 4,
          zIndex: 5,
        }}>
          {[['+', handleZoomIn], ['−', handleZoomOut], ['↺', handleReset]].map(([lbl, action]) => (
            <button
              key={lbl}
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
                transition: 'all 0.2s',
              }}
            >
              {lbl}
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
          zIndex: 5,
        }}>
          ⚽ {teams.length} Nations
        </div>
      </div>

      {/* Selected Team Info Bottom Sheet */}
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
              onClick={() => handleSelectFromGrid(team)}
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
    </div>
  );
}
