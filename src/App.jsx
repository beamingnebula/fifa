import React, { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Fixtures from './pages/Fixtures';
import Teams from './pages/Teams';
import TeamDetail from './pages/TeamDetail';
import MatchCenter from './pages/MatchCenter';
import MatchDetail from './pages/MatchDetail';
import Highlights from './pages/Highlights';
import WorldMap from './pages/WorldMap';
import Settings from './pages/Settings';
import MatchesPlayed from './pages/MatchesPlayed';
import MatchesRemaining from './pages/MatchesRemaining';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getMatchStatus } from './utils/matchUtils';
import { useFixtures } from './context/FixturesContext';
import { getBrowserTimezoneOffset } from './utils/timeUtils';

const MAIN_TABS = ['home', 'fixtures', 'teams', 'matches', 'highlights', 'worldmap', 'settings'];

export default function App() {
  const { fixtures, toasts = [], dismissToast } = useFixtures();
  const [settings, setSettings] = useLocalStorage('fifa_settings', {
    darkMode: false,
    timezone: getBrowserTimezoneOffset(), // Automatically detected local timezone
    favorites: [],
    notifications: true,
    matchReminders: true,
    goalAlerts: true,
  });

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [pwaDismissed, setPwaDismissed] = useLocalStorage('fifa_pwa_dismissed', false);

  useEffect(() => {
    const handleInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    setDeferredPrompt(null);
  };

  const [activeTab, setActiveTab] = useState('home');
  const [stack, setStack] = useState([]); // navigation stack
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [fixturesSearch, setFixturesSearch] = useState('');
  const [fixturesFocusSearch, setFixturesFocusSearch] = useState(false);

  const liveCount = fixtures.filter(f => getMatchStatus(f) === 'LIVE').length;

  // Apply dark mode
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.darkMode ? 'dark' : 'light');
  }, [settings.darkMode]);

  // Navigation helpers
  const navigate = (tab, data = null) => {
    if (tab === 'match-detail') {
      setSelectedMatch(data);
      setStack(prev => [...prev, { type: 'match-detail' }]);
      return;
    }
    if (tab === 'team-detail') {
      setSelectedTeam(data);
      setStack(prev => [...prev, { type: 'team-detail' }]);
      return;
    }
    if (tab === 'matches-played') {
      setStack(prev => [...prev, { type: 'matches-played' }]);
      return;
    }
    if (tab === 'matches-remaining') {
      setStack(prev => [...prev, { type: 'matches-remaining' }]);
      return;
    }
    if (MAIN_TABS.includes(tab)) {
      setActiveTab(tab);
      setStack([]);
      setSelectedMatch(null);
      setSelectedTeam(null);
      if (tab === 'fixtures') {
        setFixturesSearch(data?.search || '');
        setFixturesFocusSearch(!!data?.focusSearch);
      } else {
        setFixturesSearch('');
        setFixturesFocusSearch(false);
      }
    }
  };

  const goBack = () => {
    if (stack.length > 0) {
      setStack(prev => prev.slice(0, -1));
      const prev = stack[stack.length - 1];
      if (prev?.type === 'match-detail') setSelectedMatch(null);
      if (prev?.type === 'team-detail') setSelectedTeam(null);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setStack([]);
    setSelectedMatch(null);
    setSelectedTeam(null);
    setFixturesSearch('');
    setFixturesFocusSearch(false);
  };

  const handleFavorite = (code) => {
    const favs = settings.favorites || [];
    const newFavs = favs.includes(code) ? favs.filter(f => f !== code) : [...favs, code];
    setSettings({ ...settings, favorites: newFavs });
  };

  // Determine current view
  const currentStack = stack[stack.length - 1];

  const renderContent = () => {
    // Detail pages (on stack)
    if (currentStack?.type === 'match-detail' && selectedMatch) {
      return (
        <MatchDetail
          match={selectedMatch}
          onBack={goBack}
          timezoneOffset={settings.timezone}
        />
      );
    }
    if (currentStack?.type === 'team-detail' && selectedTeam) {
      return (
        <TeamDetail
          team={selectedTeam}
          onBack={goBack}
          onMatchClick={(m) => navigate('match-detail', m)}
          isFavorite={settings.favorites?.includes(selectedTeam.code)}
          onFavorite={handleFavorite}
          timezoneOffset={settings.timezone}
        />
      );
    }
    if (currentStack?.type === 'matches-played') {
      return (
        <MatchesPlayed
          onBack={goBack}
          onMatchClick={(m) => navigate('match-detail', m)}
          timezoneOffset={settings.timezone}
        />
      );
    }
    if (currentStack?.type === 'matches-remaining') {
      return (
        <MatchesRemaining
          onBack={goBack}
          onMatchClick={(m) => navigate('match-detail', m)}
          timezoneOffset={settings.timezone}
        />
      );
    }

    // Main tabs
    switch (activeTab) {
      case 'home':
        return (
          <Home
            onNavigate={navigate}
            timezoneOffset={settings.timezone}
            favorites={settings.favorites || []}
          />
        );
      case 'fixtures':
        return (
          <Fixtures
            onBack={null}
            onMatchClick={(m) => navigate('match-detail', m)}
            timezoneOffset={settings.timezone}
            initialSearch={fixturesSearch}
            autoFocusSearch={fixturesFocusSearch}
          />
        );
      case 'teams':
        return (
          <Teams
            onBack={null}
            onTeamClick={(t) => navigate('team-detail', t)}
            favorites={settings.favorites || []}
            onFavorite={handleFavorite}
          />
        );
      case 'matches':
        return (
          <MatchCenter
            onBack={null}
            onMatchClick={(m) => navigate('match-detail', m)}
            timezoneOffset={settings.timezone}
          />
        );
      case 'highlights':
        return <Highlights onBack={null} />;
      case 'worldmap':
        return (
          <WorldMap
            onBack={null}
            onTeamSelect={(t) => navigate('team-detail', t)}
          />
        );
      case 'settings':
        return (
          <Settings
            onBack={null}
            settings={settings}
            onSettingsChange={setSettings}
          />
        );
      default:
        return null;
    }
  };

  const showBottomNav = !currentStack; // hide bottom nav on detail pages

  return (
    <div className="app-layout">
      <div className="page-content" style={{ paddingBottom: showBottomNav ? 'var(--nav-height)' : 0 }}>
        {renderContent()}
      </div>

      {deferredPrompt && !pwaDismissed && (
        <div style={{
          position: 'fixed',
          bottom: showBottomNav ? 'calc(var(--nav-height) + 16px)' : '16px',
          left: 16, right: 16,
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 20,
          padding: '14px 18px',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          zIndex: 9999,
          animation: 'slideUp 0.3s ease-out',
        }}>
          <img
            src="/trophy-192.png"
            alt="FIFA 2026 App Logo"
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              objectFit: 'contain',
              flexShrink: 0
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>Install World Cup App</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Get live scores directly on your home screen</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={() => setPwaDismissed(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: 11,
                fontWeight: 600,
                padding: '6px 10px',
                cursor: 'pointer'
              }}
            >
              Later
            </button>
            <button
              onClick={handleInstallClick}
              style={{
                background: 'var(--fifa-red)',
                border: 'none',
                borderRadius: 16,
                color: 'white',
                fontSize: 11,
                fontWeight: 700,
                padding: '6px 14px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(200, 16, 46, 0.3)'
              }}
            >
              Install
            </button>
          </div>
        </div>
      )}

      {showBottomNav && (
        <BottomNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
          liveCount={liveCount}
        />
      )}

      {/* Toast Notification Container */}
      <div style={{
        position: 'fixed',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        width: 'calc(100% - 32px)',
        maxWidth: 400,
        pointerEvents: 'none',
      }}>
        {toasts.map(toast => (
          <div
            key={toast.id}
            onClick={() => {
              dismissToast(toast.id);
              if (toast.match) navigate('match-detail', toast.match);
            }}
            className="toast-item"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16,
              padding: '12px 16px',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
              pointerEvents: 'auto',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              left: 0, top: 0, bottom: 0,
              width: 4,
              background: toast.type === 'GOAL' ? 'var(--fifa-red)' : toast.type === 'KICKOFF' ? 'var(--fifa-gold)' : 'var(--text-secondary)',
            }} />
            
            <div style={{ flex: 1, paddingLeft: 6 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>{toast.title}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{toast.body}</div>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                dismissToast(toast.id);
              }}
              style={{
                background: 'none', border: 'none', color: 'var(--text-muted)',
                cursor: 'pointer', fontSize: 16, fontWeight: 700, padding: 4
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
