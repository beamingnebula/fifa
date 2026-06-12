import React from 'react';

export function SkeletonMatchCard() {
  return (
    <div className="skeleton-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div className="skeleton" style={{ width: 70, height: 18, borderRadius: 20 }} />
        <div className="skeleton" style={{ width: 50, height: 14 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
          <div className="skeleton" style={{ width: 40, height: 28, borderRadius: 4 }} />
          <div className="skeleton" style={{ width: 60, height: 12 }} />
        </div>
        <div className="skeleton" style={{ width: 64, height: 36, borderRadius: 6 }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
          <div className="skeleton" style={{ width: 40, height: 28, borderRadius: 4 }} />
          <div className="skeleton" style={{ width: 60, height: 12 }} />
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 8, display: 'flex', gap: 12 }}>
        <div className="skeleton" style={{ width: 80, height: 12 }} />
        <div className="skeleton" style={{ width: 100, height: 12 }} />
      </div>
    </div>
  );
}

export function SkeletonTeamCard() {
  return (
    <div className="team-card" style={{ cursor: 'default' }}>
      <div className="skeleton" style={{ width: 44, height: 44, borderRadius: '50%' }} />
      <div className="skeleton" style={{ width: 70, height: 14 }} />
      <div className="skeleton" style={{ width: 50, height: 18, borderRadius: 20 }} />
    </div>
  );
}

export function SkeletonHighlightCard() {
  return (
    <div className="highlight-card" style={{ cursor: 'default' }}>
      <div className="skeleton" style={{ width: '100%', height: 180 }} />
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="skeleton" style={{ width: '80%', height: 16 }} />
        <div className="skeleton" style={{ width: '50%', height: 12 }} />
      </div>
    </div>
  );
}

export default function SkeletonLoader({ type = 'match', count = 3 }) {
  const Component = type === 'team' ? SkeletonTeamCard
    : type === 'highlight' ? SkeletonHighlightCard
    : SkeletonMatchCard;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Component key={i} />
      ))}
    </>
  );
}
