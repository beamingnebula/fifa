import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search teams, matches, stadiums...', autoFocus = false, readOnly = false, onClick }) {
  return (
    <div className="search-wrapper" onClick={onClick}>
      <div className="search-bar">
        <Search className="search-icon" />
        <input
          type="search"
          className="search-input"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          readOnly={readOnly}
          aria-label="Search"
        />
        {value && !readOnly && (
          <button className="search-clear" onClick={() => onChange?.('')} aria-label="Clear search">
            <X size={12} />
          </button>
        )}
      </div>
    </div>
  );
}
