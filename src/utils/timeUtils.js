// Time utilities — BST (UTC+6) conversion
// Bangladesh Standard Time = UTC+6

export const BST_OFFSET = 6; // hours

export const toBST = (utcDateStr) => {
  const d = new Date(utcDateStr);
  d.setHours(d.getHours() + BST_OFFSET);
  return d;
};

export const formatKickoff = (utcDateStr, timezoneOffset = BST_OFFSET) => {
  const d = new Date(utcDateStr);
  const localTime = new Date(d.getTime() + timezoneOffset * 60 * 60 * 1000);
  const hours = localTime.getUTCHours();
  const minutes = localTime.getUTCMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const formatDate = (utcDateStr, timezoneOffset = BST_OFFSET) => {
  const d = new Date(utcDateStr);
  const localDate = new Date(d.getTime() + timezoneOffset * 60 * 60 * 1000);
  return localDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });
};

export const formatFullDate = (utcDateStr, timezoneOffset = BST_OFFSET) => {
  const d = new Date(utcDateStr);
  const localDate = new Date(d.getTime() + timezoneOffset * 60 * 60 * 1000);
  return localDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

export const formatDateTime = (utcDateStr, timezoneOffset = BST_OFFSET) => {
  return `${formatDate(utcDateStr, timezoneOffset)} • ${formatKickoff(utcDateStr, timezoneOffset)}`;
};

export const getCountdown = (utcTargetStr) => {
  const now = Date.now();
  const target = new Date(utcTargetStr).getTime();
  let diff = Math.max(0, target - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * 1000 * 60;
  const seconds = Math.floor(diff / 1000);

  return { days, hours, minutes, seconds, total: target - now };
};

export const getRelativeTime = (utcDateStr) => {
  const now = Date.now();
  const then = new Date(utcDateStr).getTime();
  const diff = then - now;
  const abs = Math.abs(diff);

  if (abs < 60000) return 'Just now';
  if (abs < 3600000) {
    const m = Math.round(abs / 60000);
    return diff > 0 ? `In ${m}m` : `${m}m ago`;
  }
  if (abs < 86400000) {
    const h = Math.round(abs / 3600000);
    return diff > 0 ? `In ${h}h` : `${h}h ago`;
  }
  const d = Math.round(abs / 86400000);
  return diff > 0 ? `In ${d}d` : `${d}d ago`;
};

export const isToday = (utcDateStr, timezoneOffset = BST_OFFSET) => {
  const now = new Date();
  const localNow = new Date(now.getTime() + timezoneOffset * 60 * 60 * 1000);
  const d = new Date(utcDateStr);
  const localD = new Date(d.getTime() + timezoneOffset * 60 * 60 * 1000);
  return (
    localNow.getUTCFullYear() === localD.getUTCFullYear() &&
    localNow.getUTCMonth() === localD.getUTCMonth() &&
    localNow.getUTCDate() === localD.getUTCDate()
  );
};

export const isSameDay = (utcDateStr1, utcDateStr2, timezoneOffset = BST_OFFSET) => {
  const d1 = new Date(new Date(utcDateStr1).getTime() + timezoneOffset * 60 * 60 * 1000);
  const d2 = new Date(new Date(utcDateStr2).getTime() + timezoneOffset * 60 * 60 * 1000);
  return (
    d1.getUTCFullYear() === d2.getUTCFullYear() &&
    d1.getUTCMonth() === d2.getUTCMonth() &&
    d1.getUTCDate() === d2.getUTCDate()
  );
};

export const TIMEZONE_OPTIONS = [
  { label: 'BST — Bangladesh Standard Time (UTC+6)', offset: 6, abbr: 'BST' },
  { label: 'UTC — Universal Time (UTC+0)', offset: 0, abbr: 'UTC' },
  { label: 'EST — Eastern Standard Time (UTC-5)', offset: -5, abbr: 'EST' },
  { label: 'CST — Central Standard Time (UTC-6)', offset: -6, abbr: 'CST' },
  { label: 'MST — Mountain Standard Time (UTC-7)', offset: -7, abbr: 'MST' },
  { label: 'PST — Pacific Standard Time (UTC-8)', offset: -8, abbr: 'PST' },
  { label: 'IST — India Standard Time (UTC+5:30)', offset: 5.5, abbr: 'IST' },
  { label: 'GST — Gulf Standard Time (UTC+4)', offset: 4, abbr: 'GST' },
  { label: 'CET — Central European Time (UTC+1)', offset: 1, abbr: 'CET' },
  { label: 'GMT — Greenwich Mean Time (UTC+0)', offset: 0, abbr: 'GMT' },
  { label: 'JST — Japan Standard Time (UTC+9)', offset: 9, abbr: 'JST' },
  { label: 'AEST — Australian Eastern (UTC+10)', offset: 10, abbr: 'AEST' },
];

export const getBrowserTimezoneOffset = () => {
  // Return browser local offset in hours (e.g. -5.5 for IST, which has negative offset in offset/timezone terms)
  // getTimezoneOffset() returns positive values for west of GMT and negative values for east of GMT
  // So we negate it and divide by 60
  return -new Date().getTimezoneOffset() / 60;
};

export const getTimezoneAbbr = (offset) => {
  const match = TIMEZONE_OPTIONS.find(t => t.offset === offset);
  if (match) return match.abbr;
  
  // Custom offset labeling if not in defaults
  const sign = offset >= 0 ? '+' : '';
  const hrs = Math.floor(Math.abs(offset));
  const mins = Math.round((Math.abs(offset) - hrs) * 60);
  const minStr = mins > 0 ? `:${mins.toString().padStart(2, '0')}` : '';
  return `UTC${sign}${hrs}${minStr}`;
};

