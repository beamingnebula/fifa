import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search teams, matches, stadiums...', autoFocus = false }) {
  return (
    <div className="search-wrapper">
      <div className="search-bar">
        <Search className="search-icon" />
        <input
          type="search"
          className="search-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          aria-label="Search"
        />
        {value && (
          <button className="search-clear" onClick={() => onChange('')} aria-label="Clear search">
            <X size={12} />
          </button>
        )}
      </div>
    </div>
  );
}
