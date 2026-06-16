import React from 'react';
import TopBar from '../components/TopBar';
import FlagIcon from '../components/FlagIcon';
import { getAllTeams } from '../data/teams';
import { Moon, Sun, Bell, Heart, Globe, Database, ChevronRight, Shield, PlayCircle, Map, Trash2, Award } from 'lucide-react';
import { TIMEZONE_OPTIONS, getBrowserTimezoneOffset, getTimezoneAbbr } from '../utils/timeUtils';
import { useFixtures } from '../context/FixturesContext';

function Toggle({ value, onChange }) {
  return (
    <button 
      className={`toggle ${value ? 'on' : ''}`} 
      onClick={() => onChange(!value)} 
      aria-label="Toggle"
      style={{
        width: 51,
        height: 31,
        borderRadius: 16,
        background: value ? '#34C759' : 'var(--border-color)',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.2s ease-out',
        flexShrink: 0,
        outline: 'none'
      }}
    >
      <div 
        className="toggle-thumb" 
        style={{
          position: 'absolute',
          top: 2,
          left: 2,
          width: 27,
          height: 27,
          borderRadius: '50%',
          background: 'white',
          boxShadow: '0 3px 8px rgba(0,0,0,0.15), 0 1px 1px rgba(0,0,0,0.02)',
          transition: 'transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
          transform: value ? 'translateX(20px)' : 'translateX(0)'
        }}
      />
    </button>
  );
}

export default function Settings({ onBack, settings, onSettingsChange, onNavigate }) {
  const { simulateEvent } = useFixtures();
  const {
    darkMode = false,
    timezone = 6,
    favorites = [],
    notifications = true,
    matchReminders = true,
    goalAlerts = true,
  } = settings;

  const update = (key, value) => {
    onSettingsChange({ ...settings, [key]: value });
    if (key === 'notifications' && value === true && 'Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          try {
            new Notification('Notifications Enabled!', {
              body: 'You will now receive kickoff and goal alerts.',
              icon: '/trophy.svg'
            });
          } catch (e) {}
        }
      });
    }
  };

  const localOffset = getBrowserTimezoneOffset();
  const localAbbr = getTimezoneAbbr(localOffset);

  const displayTimezones = React.useMemo(() => {
    const localOption = {
      label: `Auto-detect (Detected: ${localAbbr}, UTC${localOffset >= 0 ? '+' : ''}${localOffset})`,
      offset: localOffset,
      abbr: `Auto (${localAbbr})`
    };
    return [localOption, ...TIMEZONE_OPTIONS];
  }, [localOffset, localAbbr]);

  const selectedTz = displayTimezones.find(t => t.offset === timezone) || displayTimezones[0];

  return (
    <div style={{ paddingBottom: 40 }}>
      <TopBar title="Settings" onBack={onBack} />

      {/* App Version Banner */}
      <div style={{
        margin: '16px 16px 8px',
        background: 'var(--gradient-hero)',
        borderRadius: 20,
        padding: '24px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        color: 'white',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background circle */}
        <div style={{
          position: 'absolute',
          right: '-20px',
          bottom: '-20px',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          pointerEvents: 'none'
        }} />
        
        <div style={{ 
          fontSize: 42, 
          background: 'rgba(255,255,255,0.12)', 
          width: 68, 
          height: 68, 
          borderRadius: 16, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: '1px solid rgba(255,255,255,0.15)'
        }}>🏆</div>
        <div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, letterSpacing: 1 }}>FIFA World Cup 2026™</div>
          <div style={{ fontSize: 13, opacity: 0.8, fontWeight: 500, marginTop: 2 }}>Premium Companion App</div>
          <div style={{ fontSize: 11, opacity: 0.5, marginTop: 4, letterSpacing: 0.5 }}>VERSION 1.2 · TELEMETRY ACTIVE</div>
        </div>
      </div>

      {/* Explore Features (Visible on mobile viewports to navigate to Map & Videos) */}
      {onNavigate && (
        <div className="explore-section-wrapper" style={{ margin: '20px 16px 8px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', marginBottom: 8, paddingLeft: 4 }}>
            Explore Features
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            <div 
              onClick={() => onNavigate('worldmap')}
              className="explore-card animate-fade-in"
              style={{
                background: 'var(--bg-secondary)',
                border: '0.5px solid var(--border-subtle)',
                borderRadius: 16,
                padding: '16px 14px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                boxShadow: 'var(--shadow-sm)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{ 
                width: 32, 
                height: 32, 
                borderRadius: 8, 
                background: 'linear-gradient(135deg, #30D158, #34C759)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'white' 
              }}>
                <Map size={18} strokeWidth={2.2} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>World Map</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.3 }}>Interactive host cities & stadiums</div>
              </div>
            </div>
            
            <div 
              onClick={() => onNavigate('highlights')}
              className="explore-card animate-fade-in"
              style={{
                background: 'var(--bg-secondary)',
                border: '0.5px solid var(--border-subtle)',
                borderRadius: 16,
                padding: '16px 14px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                boxShadow: 'var(--shadow-sm)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{ 
                width: 32, 
                height: 32, 
                borderRadius: 8, 
                background: 'linear-gradient(135deg, #FF9500, #FFCC00)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'white' 
              }}>
                <PlayCircle size={18} strokeWidth={2.2} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Videos & Clips</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.3 }}>Match highlights & tournament clips</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appearance */}
      <div style={{ padding: '20px 16px 6px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', paddingLeft: 20 }}>
        Appearance
      </div>
      <div className="settings-group" style={{ margin: '0 16px', borderRadius: 12, background: 'var(--bg-secondary)', border: '0.5px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div className="settings-row" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px' }}>
          <div className="settings-icon" style={{ 
            background: darkMode ? 'linear-gradient(135deg, #5856D6, #AF52DE)' : 'linear-gradient(135deg, #FF9500, #FFCC00)', 
            color: 'white',
            width: 28, height: 28, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {darkMode ? <Moon size={16} fill="white" /> : <Sun size={16} fill="white" />}
          </div>
          <div className="settings-label-group" style={{ flex: 1 }}>
            <div className="settings-label" style={{ fontSize: 14, fontWeight: 500 }}>Dark Mode</div>
          </div>
          <Toggle value={darkMode} onChange={(v) => update('darkMode', v)} />
        </div>
      </div>

      {/* Timezone */}
      <div style={{ padding: '20px 16px 6px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', paddingLeft: 20 }}>
        Time Zone
      </div>
      <div className="settings-group" style={{ margin: '0 16px', borderRadius: 12, background: 'var(--bg-secondary)', border: '0.5px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div style={{ padding: '4px 0' }}>
          {displayTimezones.map((tz, index) => (
            <div
              key={tz.label}
              className="settings-row"
              onClick={() => update('timezone', tz.offset)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 14, 
                padding: '10px 16px',
                borderBottom: index !== displayTimezones.length - 1 ? '0.5px solid var(--border-color)' : 'none',
                cursor: 'pointer'
              }}
            >
              <div className="settings-icon" style={{
                background: timezone === tz.offset ? 'linear-gradient(135deg, #007AFF, #5AC8FA)' : 'var(--bg-primary)',
                color: timezone === tz.offset ? 'white' : 'var(--text-muted)',
                width: 28, height: 28, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s'
              }}>
                <Globe size={16} />
              </div>
              <div className="settings-label-group" style={{ flex: 1 }}>
                <div className="settings-label" style={{ fontSize: 13, fontWeight: timezone === tz.offset ? '600' : '400', color: timezone === tz.offset ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                  {tz.abbr}
                </div>
                <div className="settings-sub" style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>{tz.label}</div>
              </div>
              {timezone === tz.offset && (
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#34C759', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>✓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div style={{ padding: '20px 16px 6px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', paddingLeft: 20 }}>
        Notifications
      </div>
      <div className="settings-group" style={{ margin: '0 16px', borderRadius: 12, background: 'var(--bg-secondary)', border: '0.5px solid var(--border-subtle)', overflow: 'hidden' }}>
        {[
          { key: 'notifications',   icon: Bell,   bg: 'linear-gradient(135deg, #FF3B30, #FF453A)', label: 'All Notifications', sub: 'Enable push alerts' },
          { key: 'matchReminders',  icon: ClockIcon,  bg: 'linear-gradient(135deg, #5856D6, #007AFF)', label: 'Match Reminders',   sub: '15 min before kickoff' },
          { key: 'goalAlerts',      icon: Shield, bg: 'linear-gradient(135deg, #30D158, #34C759)', label: 'Goal Alerts',       sub: 'Real-time telemetry' },
        ].map(({ key, icon: Icon, bg, label, sub }, index) => (
          <div 
            key={key} 
            className="settings-row"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 14, 
              padding: '12px 16px',
              borderBottom: index !== 2 ? '0.5px solid var(--border-color)' : 'none'
            }}
          >
            <div className="settings-icon" style={{
              background: bg,
              color: 'white',
              width: 28, height: 28, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Icon size={16} />
            </div>
            <div className="settings-label-group" style={{ flex: 1 }}>
              <div className="settings-label" style={{ fontSize: 14, fontWeight: 500 }}>{label}</div>
              <div className="settings-sub" style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>{sub}</div>
            </div>
            <Toggle value={settings[key] ?? true} onChange={(v) => update(key, v)} />
          </div>
        ))}
      </div>

      {/* Favorite Teams */}
      <div style={{ padding: '20px 16px 6px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', paddingLeft: 20 }}>
        Favorite Teams
      </div>
      <div className="settings-group" style={{ margin: '0 16px', borderRadius: 12, background: 'var(--bg-secondary)', border: '0.5px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px' }}>
          {favorites.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', padding: '10px 0' }}>
              No favorites yet — tap ⭐ on any team row
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {favorites.map(code => {
                const team = getAllTeams().find(t => t.code === code);
                return team ? (
                  <div key={code} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: 'var(--bg-primary)', borderRadius: 20,
                    padding: '6px 12px 6px 8px',
                    border: '0.5px solid var(--border-color)',
                  }}>
                    <FlagIcon code={team.flag} size="sm" />
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{team.name}</span>
                    <button
                      onClick={() => update('favorites', favorites.filter(f => f !== code))}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0, paddingLeft: 4, lineHeight: 1, fontSize: 14, display: 'flex', alignItems: 'center' }}
                      aria-label={`Remove ${team.name}`}
                    >
                      ×
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>

      {/* Cache / Reset */}
      <div style={{ padding: '20px 16px 6px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', paddingLeft: 20 }}>
        Data Management
      </div>
      <div className="settings-group" style={{ margin: '0 16px', borderRadius: 12, background: 'var(--bg-secondary)', border: '0.5px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div
          className="settings-row"
          onClick={() => { if(confirm('Reset all application settings and favorites?')) { localStorage.clear(); window.location.reload(); } }}
          style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', cursor: 'pointer' }}
        >
          <div className="settings-icon" style={{ background: 'linear-gradient(135deg, #FF3B30, #FF9500)', color: 'white', width: 28, height: 28, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Database size={16} />
          </div>
          <div className="settings-label-group" style={{ flex: 1 }}>
            <div className="settings-label" style={{ color: '#FF3B30', fontSize: 14, fontWeight: 500 }}>Reset Cache</div>
            <div className="settings-sub" style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>Clear storage and reload data</div>
          </div>
          <ChevronRight size={16} color="var(--text-muted)" />
        </div>
      </div>

      {/* Notification Simulator */}
      <div style={{ padding: '20px 16px 6px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', paddingLeft: 20 }}>
        Notification Simulator
      </div>
      <div className="settings-group" style={{ margin: '0 16px', borderRadius: 12, background: 'var(--bg-secondary)', border: '0.5px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            Manually trigger mockup notifications to test toast container alerts.
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { type: 'KICKOFF', label: '🚀 Kickoff' },
              { type: 'GOAL', label: '⚽ Goal' },
              { type: 'FULL_TIME', label: '🏁 FT' }
            ].map(({ type, label }) => (
              <button
                key={type}
                onClick={() => simulateEvent(type)}
                style={{
                  flex: 1,
                  padding: '9px 0',
                  borderRadius: 8,
                  border: '0.5px solid var(--border-color)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.1s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--border-subtle)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-primary)'}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Credits */}
      <div style={{ padding: '20px 16px 6px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', paddingLeft: 20 }}>
        Credits
      </div>
      <div className="settings-group" style={{ margin: '0 16px', borderRadius: 12, background: 'var(--bg-secondary)', border: '0.5px solid var(--border-subtle)', overflow: 'hidden' }}>
        <a
          href="https://github.com/beamingnebula"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', width: '100%' }}
        >
          <div className="settings-icon" style={{ background: 'linear-gradient(135deg, #FF2D55, #FF5E7E)', color: 'white', width: 28, height: 28, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={16} fill="white" />
          </div>
          <div className="settings-label-group" style={{ flex: 1 }}>
            <div className="settings-label" style={{ fontSize: 14, fontWeight: 500 }}>Developed by beamingnebula</div>
            <div className="settings-sub" style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>Follow on GitHub @beamingnebula</div>
          </div>
          <ChevronRight size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
        </a>
      </div>

      <div style={{ padding: '32px 16px 12px', textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.6 }}>
        FIFA World Cup 2026™ Companion App<br />
        Tournament: June 11 – July 19, 2026<br />
        Canada · Mexico · United States
      </div>
    </div>
  );
}

// Simple clock icon replacement component since lucide-react clock isn't imported
function ClockIcon({ size }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
}
