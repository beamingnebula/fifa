import React from 'react';
import TopBar from '../components/TopBar';
import FlagIcon from '../components/FlagIcon';
import { HIGHLIGHTS, getYoutubeSearchUrl } from '../data/highlights';
import { TEAMS } from '../data/teams';
import { Play, ExternalLink, Eye } from 'lucide-react';
import { useFixtures } from '../context/FixturesContext';
import { getMatchStatus, getStageName } from '../utils/matchUtils';

const YT_RED = '#FF0000';

function HighlightCard({ item }) {
  const handleClick = () => {
    window.open(getYoutubeSearchUrl(item.youtubeQuery), '_blank');
  };

  return (
    <div className="highlight-card" onClick={handleClick}>
      {/* Thumbnail */}
      <div className="highlight-thumb" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Background gradient with team colors */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #0D0D1A 0%, #1a1a3e 50%, #C8102E 100%)',
        }} />

        {/* Team Flags */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-around', opacity: 0.4 }}>
          {item.teams.map(code => (
            <FlagIcon key={code} code={TEAMS[code]?.flag || 'un'} size="xl" style={{ borderRadius: 6 }} />
          ))}
        </div>

        {/* Score Display */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 40, color: 'white', letterSpacing: 4, lineHeight: 1, marginBottom: 4 }}>
            {item.score}
          </div>
          <div className="highlight-play-btn">
            <Play size={24} fill="var(--fifa-red)" color="var(--fifa-red)" style={{ marginLeft: 3 }} />
          </div>
        </div>

        {/* YouTube Badge */}
        <div className="highlight-yt-badge">
          <svg viewBox="0 0 28 20" width="20" height="14" fill="white">
            <path d="M27.4 3.1c-.3-1.2-1.2-2.1-2.4-2.4C22.9.2 14 .2 14 .2s-8.9 0-11 .5C1.8 1 .9 1.9.6 3.1 0 5.2 0 9.5 0 9.5s0 4.3.6 6.4c.3 1.2 1.2 2.1 2.4 2.4C5.1 18.8 14 18.8 14 18.8s8.9 0 11-.5c1.2-.3 2.1-1.2 2.4-2.4.6-2.1.6-6.4.6-6.4s0-4.3-.6-6.4zm-16.4 10.4V6l7.3 3.8-7.3 3.7z"/>
          </svg>
          YouTube
        </div>

        {/* Duration */}
        <div className="highlight-duration">{item.duration}</div>
      </div>

      {/* Info */}
      <div className="highlight-info">
        <div className="highlight-title">{item.title}</div>
        <div className="highlight-meta">
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {item.teams.map(code => (
              <FlagIcon key={code} code={TEAMS[code]?.flag || 'un'} size="sm" />
            ))}
          </div>
          <span>·</span>
          <span>{item.date}</span>
          <span>·</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Eye size={11} /> {item.views}
          </span>
        </div>
        <div style={{
          marginTop: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          background: YT_RED,
          borderRadius: 8,
          color: 'white',
          fontSize: 12,
          fontWeight: 700,
          justifyContent: 'center',
        }}>
          <Play size={14} fill="white" />
          Open in YouTube
          <ExternalLink size={12} />
        </div>
      </div>
    </div>
  );
}

export default function Highlights({ onBack }) {
  const { fixtures } = useFixtures();

  const completedHighlights = React.useMemo(() => {
    // 1. Get completed matches from fixtures (only after 11th June, i.e. starting 12th June)
    const completedMatches = fixtures.filter(f => 
      (getMatchStatus(f) === 'FT' || f.homeScore !== null) && 
      new Date(f.utcDate) >= new Date('2026-06-12T00:00:00Z')
    );

    // 2. Map completed matches to highlight entries
    const items = completedMatches.map(match => {
      // Find if we have static highlight data
      const staticHighlight = HIGHLIGHTS.find(h => h.matchId === match.id);
      if (staticHighlight) {
        return {
          ...staticHighlight,
          score: `${match.homeScore}-${match.awayScore}`
        };
      }

      // Otherwise dynamically create one!
      const homeName = TEAMS[match.home]?.name || match.home;
      const awayName = TEAMS[match.away]?.name || match.away;
      const stageName = match.group ? `Group ${match.group}` : getStageName(match.stage);

      return {
        id: `dynamic-h-${match.id}`,
        matchId: match.id,
        title: `${homeName} vs ${awayName} — ${stageName} Highlights`,
        teams: [match.home, match.away],
        score: `${match.homeScore}-${match.awayScore}`,
        date: match.utcDate.substring(0, 10),
        duration: '5:00',
        thumbnail: 'https://img.youtube.com/vi/default/maxresdefault.jpg',
        youtubeQuery: `${homeName} vs ${awayName} FIFA World Cup 2026 Highlights`,
        youtubeId: null,
        channel: 'FIFA',
        views: '1.2M',
      };
    });

    // Sort items by date descending
    return items.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [fixtures]);

  return (
    <div>
      <TopBar title="Highlights" onBack={onBack} />

      {/* Header Banner */}
      <div style={{
        margin: '8px 16px',
        background: 'linear-gradient(135deg, #FF0000, #CC0000)',
        borderRadius: 16,
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        color: 'white',
      }}>
        <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg viewBox="0 0 28 20" width="28" height="20" fill="white">
            <path d="M27.4 3.1c-.3-1.2-1.2-2.1-2.4-2.4C22.9.2 14 .2 14 .2s-8.9 0-11 .5C1.8 1 .9 1.9.6 3.1 0 5.2 0 9.5 0 9.5s0 4.3.6 6.4c.3 1.2 1.2 2.1 2.4 2.4C5.1 18.8 14 18.8 14 18.8s8.9 0 11-.5c1.2-.3 2.1-1.2 2.4-2.4.6-2.1.6-6.4.6-6.4s0-4.3-.6-6.4zm-16.4 10.4V6l7.3 3.8-7.3 3.7z"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800 }}>Official FIFA Highlights</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Tap any card to watch on YouTube</div>
        </div>
      </div>

      {/* Count */}
      <div style={{ padding: '4px 16px 8px', fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
        {completedHighlights.length} highlights available
      </div>

      {/* Highlight Cards */}
      {completedHighlights.map(item => (
        <HighlightCard key={item.id} item={item} />
      ))}

      <div style={{ height: 24 }} />
    </div>
  );
}
