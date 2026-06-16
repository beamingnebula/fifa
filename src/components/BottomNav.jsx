import { Home, Calendar, Users, Settings, Activity } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home',       label: 'Home',     icon: Home },
  { id: 'fixtures',   label: 'Fixtures', icon: Calendar },
  { id: 'matches',    label: 'Live',     icon: Activity },
  { id: 'teams',      label: 'Teams',    icon: Users },
  { id: 'settings',   label: 'More',     icon: Settings },
];

export default function BottomNav({ activeTab, onTabChange, liveCount = 0 }) {
  return (
    <nav className="bottom-nav">
      <div className="nav-items">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`nav-item ${activeTab === id ? 'active' : ''}`}
            onClick={() => onTabChange(id)}
            aria-label={label}
          >
            {id === 'matches' && liveCount > 0 && (
              <span className="nav-badge">{liveCount}</span>
            )}
            <Icon size={20} strokeWidth={activeTab === id ? 2.2 : 1.8} />
            <span className="nav-label">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
