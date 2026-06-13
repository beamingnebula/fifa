import React from 'react';
import { Home, Calendar, Users, Play, Map, Settings, Activity } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home',       label: 'Home',     icon: Home },
  { id: 'fixtures',   label: 'Fixtures', icon: Calendar },
  { id: 'teams',      label: 'Teams',    icon: Users },
  { id: 'matches',    label: 'Live',     icon: Activity },
  { id: 'highlights', label: 'Videos',   icon: Play },
  { id: 'worldmap',   label: 'Map',      icon: Map },
  { id: 'settings',   label: 'More',     icon: Settings },
];

export default function SidebarNav({ activeTab, onTabChange, liveCount = 0 }) {
  return (
    <aside className="sidebar-nav">
      <div className="sidebar-brand">
        <span className="brand-logo">⚽</span>
        <span className="brand-text">FIFAX 2026</span>
      </div>
      <div className="sidebar-menu">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`sidebar-item ${activeTab === id ? 'active' : ''}`}
            onClick={() => onTabChange(id)}
            aria-label={label}
          >
            <Icon size={20} strokeWidth={activeTab === id ? 2.5 : 1.8} />
            <span className="sidebar-label">{label}</span>
            {id === 'matches' && liveCount > 0 && (
              <span className="sidebar-badge">{liveCount}</span>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
}
