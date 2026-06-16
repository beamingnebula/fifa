import { ChevronLeft } from 'lucide-react';

export default function TopBar({ title, onBack, rightAction }) {
  return (
    <div className="top-bar" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ minWidth: 70, display: 'flex', justifyContent: 'flex-start', zIndex: 2 }}>
        {onBack && (
          <button 
            className="back-btn" 
            onClick={onBack} 
            aria-label="Go back"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2, 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text-accent)', 
              cursor: 'pointer', 
              fontSize: 16, 
              fontWeight: 500, 
              padding: 0,
              fontFamily: 'inherit',
              transition: 'opacity 0.1s ease-out'
            }}
          >
            <ChevronLeft size={24} style={{ strokeWidth: 2.4 }} />
            <span>Back</span>
          </button>
        )}
      </div>
      
      <h1 className="top-bar-title" style={{ position: 'absolute', left: 80, right: 80, textAlign: 'center', margin: 0, pointerEvents: 'none', zIndex: 1 }}>
        {title}
      </h1>
      
      <div style={{ minWidth: 70, display: 'flex', justifyContent: 'flex-end', zIndex: 2 }}>
        {rightAction ? rightAction : null}
      </div>
    </div>
  );
}
