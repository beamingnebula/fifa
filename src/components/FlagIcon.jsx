import React from 'react';

export default function FlagIcon({ code, size = 'md', circle = false, style = {} }) {
  const sizes = { sm: 'flag-sm', md: 'flag-md', lg: 'flag-lg', xl: 'flag-xl' };
  const cls = circle ? 'flag-circle' : `flag-icon ${sizes[size] || sizes.md}`;

  // Handle special codes for UK nations
  const flagCode = code?.toLowerCase()
    .replace('gb-sct', 'gb-sct')
    .replace('gb-eng', 'gb-eng')
    .replace('gb-wls', 'gb-wls');

  // flagcdn.com supports 2-letter ISO codes and some special ones
  const src = `https://flagcdn.com/w80/${flagCode}.png`;
  const fallback = `https://flagcdn.com/w80/un.png`;

  return (
    <img
      className={cls}
      src={src}
      alt={code}
      style={style}
      onError={(e) => { e.target.src = fallback; }}
      loading="lazy"
    />
  );
}
