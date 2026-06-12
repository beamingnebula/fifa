import React from 'react';
import { ChevronLeft } from 'lucide-react';

export default function TopBar({ title, onBack, rightAction }) {
  return (
    <div className="top-bar">
      {onBack ? (
        <button className="back-btn" onClick={onBack} aria-label="Go back">
          <ChevronLeft size={20} />
        </button>
      ) : (
        <div style={{ width: 36 }} />
      )}
      <h1 className="top-bar-title">{title}</h1>
      {rightAction ? rightAction : <div style={{ width: 36 }} />}
    </div>
  );
}
