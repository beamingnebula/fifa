import React from 'react';
import TopBar from '../components/TopBar';
import FlagIcon from '../components/FlagIcon';
import { getAllTeams } from '../data/teams';
import { Moon, Sun, Bell, Heart, Globe, Database, ChevronRight, Shield } from 'lucide-react';
import { TIMEZONE_OPTIONS, getBrowserTimezoneOffset, getTimezoneAbbr } from '../utils/timeUtils';
import { useFixtures } from '../context/FixturesContext';

function Toggle({ value, onChange }) {
  return (
    <button className={`toggle ${value ? 'on' : ''}`} onClick={() => onChange(!value)} aria-label="Toggle">
      <div className="toggle-thumb" />
    </button>
  );
}

export default function Settings({ onBack, settings, onSettingsChange }) {
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
    <div>
      <TopBar title="Settings" onBack={onBack} />

      {/* App Version Banner */}
      <div style={{
        margin: '12px 16px',
        background: 'var(--gradient-hero)',
        borderRadius: 20,
        padding: '20px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        color: 'white',
      }}>
        <div style={{ fontSize: 36 }}>🏆</div>
        <div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, letterSpacing: 1 }}>FIFA World Cup 2026™</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Premium Companion App · v1.0</div>
        </div>
      </div>

      {/* Appearance */}
      <div style={{ padding: '8px 16px 4px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)' }}>
        Appearance
      </div>
      <div className="settings-group">
        <div className="settings-row">
          <div className="settings-icon" style={{ background: darkMode ? 'rgba(99,102,241,0.1)' : 'rgba(245,166,35,0.1)', color: darkMode ? '#6366F1' : '#D97706' }}>
            {darkMode ? <Moon size={18} /> : <Sun size={18} />}
          </div>
          <div className="settings-label-group">
            <div className="settings-label">Dark Mode</div>
            <div className="settings-sub">{darkMode ? 'Dark theme active' : 'Light theme active'}</div>
          </div>
          <Toggle value={darkMode} onChange={(v) => update('darkMode', v)} />
        </div>
      </div>

      {/* Timezone */}
      <div style={{ padding: '8px 16px 4px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)' }}>
        Time Zone
      </div>
      <div className="settings-group">
        <div style={{ padding: '4px 0' }}>
          {displayTimezones.map(tz => (
            <div
              key={tz.label}
              className="settings-row"
              onClick={() => update('timezone', tz.offset)}
              style={{ paddingRight: 16 }}
            >
              <div className="settings-icon" style={{
                background: timezone === tz.offset ? 'rgba(200,16,46,0.1)' : 'var(--bg-primary)',
                color: timezone === tz.offset ? 'var(--fifa-red)' : 'var(--text-muted)',
              }}>
                <Globe size={18} />
              </div>
              <div className="settings-label-group">
                <div className="settings-label" style={{ fontSize: 13, color: timezone === tz.offset ? 'var(--fifa-red)' : 'var(--text-primary)' }}>
                  {tz.abbr}
                </div>
                <div className="settings-sub">{tz.label}</div>
              </div>
              {timezone === tz.offset && (
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--fifa-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontSize: 12 }}>✓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div style={{ padding: '8px 16px 4px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)' }}>
        Notifications
      </div>
      <div className="settings-group">
        {[
          { key: 'notifications',   icon: Bell,   label: 'All Notifications', sub: 'Enable push notifications' },
          { key: 'matchReminders',  icon: Bell,   label: 'Match Reminders',   sub: '15 min before kickoff' },
          { key: 'goalAlerts',      icon: Shield, label: 'Goal Alerts',       sub: 'Get notified on goals' },
        ].map(({ key, icon: Icon, label, sub }) => (
          <div key={key} className="settings-row">
            <div className="settings-icon">
              <Icon size={18} />
            </div>
            <div className="settings-label-group">
              <div className="settings-label">{label}</div>
              <div className="settings-sub">{sub}</div>
            </div>
            <Toggle value={settings[key] ?? true} onChange={(v) => update(key, v)} />
          </div>
        ))}
      </div>

      {/* Favorite Teams */}
      <div style={{ padding: '8px 16px 4px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)' }}>
        Favorite Teams
      </div>
      <div className="settings-group">
        <div style={{ padding: '12px 16px' }}>
          {favorites.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', padding: '8px 0' }}>
              No favorites yet — tap ⭐ on any team
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {favorites.map(code => {
                const team = getAllTeams().find(t => t.code === code);
                return team ? (
                  <div key={code} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: 'var(--bg-primary)', borderRadius: 20,
                    padding: '6px 12px 6px 8px',
                    border: '1px solid var(--border-color)',
                  }}>
                    <FlagIcon code={team.flag} size="sm" />
                    <span style={{ fontSize: 12, fontWeight: 700 }}>{team.name}</span>
                    <button
                      onClick={() => update('favorites', favorites.filter(f => f !== code))}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0, lineHeight: 1, fontSize: 14 }}
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

      {/* Cache */}
      <div style={{ padding: '8px 16px 4px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)' }}>
        Data
      </div>
      <div className="settings-group">
        <div
          className="settings-row"
          onClick={() => { localStorage.clear(); window.location.reload(); }}
        >
          <div className="settings-icon" style={{ background: 'rgba(220,38,38,0.08)', color: '#DC2626' }}>
            <Database size={18} />
          </div>
          <div className="settings-label-group">
            <div className="settings-label" style={{ color: '#DC2626' }}>Clear Cache</div>
            <div className="settings-sub">Reset all stored data</div>
          </div>
          <ChevronRight size={16} color="var(--text-muted)" />
        </div>
      </div>

      {/* Simulation Tools */}
      <div style={{ padding: '8px 16px 4px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)' }}>
        Notification Simulator
      </div>
      <div className="settings-group">
        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            Trigger mock alerts to test the toast layout and native system alerts.
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => simulateEvent('KICKOFF')}
              style={{
                flex: 1, padding: '10px', borderRadius: 12, border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              🚀 Kickoff
            </button>
            <button
              onClick={() => simulateEvent('GOAL')}
              style={{
                flex: 1, padding: '10px', borderRadius: 12, border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              ⚽ Goal Alert
            </button>
            <button
              onClick={() => simulateEvent('FULL_TIME')}
              style={{
                flex: 1, padding: '10px', borderRadius: 12, border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              🏁 Full-Time
            </button>
          </div>
        </div>
      </div>

      {/* Credits */}
      <div style={{ padding: '8px 16px 4px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)' }}>
        Credits
      </div>
      <div className="settings-group">
        <a
          href="https://github.com/beamingnebula"
          target="_blank"
          rel="noopener noreferrer"
          className="settings-row"
          style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%' }}
        >
          <div className="settings-icon" style={{ background: 'rgba(99,102,241,0.1)', color: '#6366F1' }}>
            <Heart size={18} fill="#6366F1" />
          </div>
          <div className="settings-label-group" style={{ flex: 1 }}>
            <div className="settings-label">Developed by beamingnebula</div>
            <div className="settings-sub">Follow on GitHub @beamingnebula</div>
          </div>
          <ChevronRight size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
        </a>
      </div>

      <div style={{ padding: '24px 16px', textAlign: 'center', fontSize: 11, color: 'var(--text-muted)' }}>
        FIFA World Cup 2026™ Companion App<br />
        Tournament: June 11 – July 19, 2026<br />
        Canada · Mexico · United States
      </div>
    </div>
  );
}
