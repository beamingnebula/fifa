import { MapPin, Clock } from 'lucide-react';
import FlagIcon from './FlagIcon';
import { formatDateTime, formatKickoff, formatDate, getTimezoneAbbr } from '../utils/timeUtils';
import { getMatchStatus, getVenueById, getStageName } from '../utils/matchUtils';
import { TEAMS } from '../data/teams';
import MatchClock from './MatchClock';

const STAGE_BADGE = {
  GROUP: 'badge-group',
  R32:   'badge-r32',
  R16:   'badge-r16',
  QF:    'badge-qf',
  SF:    'badge-sf',
  FINAL: 'badge-final',
  TPM:   'badge-sf',
};

export default function MatchCard({ match, onClick, featured = false, timezoneOffset = 6 }) {
  const status = getMatchStatus(match);
  const isLive = status === 'LIVE';
  const isFT = status === 'FT';
  const isUpcoming = status === 'UPCOMING';

  const homeTeam = TEAMS[match.home] || { name: match.home, flag: 'un' };
  const awayTeam = TEAMS[match.away] || { name: match.away, flag: 'un' };
  const venue = getVenueById(match.venue);

  const cardClass = `match-card${featured ? ' featured' : ''}${isLive ? ' live' : ''}`;

  return (
    <div className={cardClass} onClick={() => onClick?.(match)} role="button" tabIndex={0}>
      {/* Stage Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span className={`match-stage-badge ${isLive ? 'badge-live' : STAGE_BADGE[match.stage] || 'badge-group'}`}>
          {isLive && <span className="live-dot" />}
          {isLive ? (
            <>LIVE • <MatchClock utcDate={match.utcDate} status={status} /></>
          ) : match.group ? `Group ${match.group}` : getStageName(match.stage)}
        </span>
        {isFT && (
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Full Time
          </span>
        )}
        {isUpcoming && (
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>
            {formatDate(match.utcDate, timezoneOffset)}
          </span>
        )}
      </div>

      {/* Teams & Score */}
      <div className="match-teams-row">
        {/* Home Team */}
        <div className="match-team">
          <FlagIcon code={homeTeam.flag} size="md" />
          <span className="match-team-name" style={{ color: featured ? 'rgba(255,255,255,0.9)' : undefined }}>
            {homeTeam.name}
          </span>
        </div>

        {/* Score / VS */}
        <div className="match-vs-block">
          {isFT || isLive ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className={`match-score${isLive ? '' : ''}`} style={{ color: featured ? 'white' : undefined }}>
                {match.homeScore} - {match.awayScore}
              </span>
              {isLive && (
                <div style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: featured ? 'rgba(255, 215, 0, 0.9)' : 'var(--fifa-red)',
                  marginTop: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3
                }}>
                  <MatchClock utcDate={match.utcDate} status={status} />
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div className="match-score upcoming" style={{ color: featured ? 'rgba(255,255,255,0.7)' : undefined }}>
                {formatKickoff(match.utcDate, timezoneOffset)}
              </div>
              <div style={{ fontSize: 10, color: featured ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)', fontWeight: 600 }}>
                {getTimezoneAbbr(timezoneOffset)}
              </div>
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className="match-team">
          <FlagIcon code={awayTeam.flag} size="md" />
          <span className="match-team-name" style={{ color: featured ? 'rgba(255,255,255,0.9)' : undefined }}>
            {awayTeam.name}
          </span>
        </div>
      </div>

      {/* Venue & Time */}
      <div className="match-time-info" style={{ borderTopColor: featured ? 'rgba(255,255,255,0.15)' : undefined }}>
        {venue && (
          <span style={{ color: featured ? 'rgba(255,255,255,0.6)' : undefined }}>
            <MapPin size={11} />
            {venue.city}
          </span>
        )}
        <span style={{ color: featured ? 'rgba(255,255,255,0.6)' : undefined }}>
          <Clock size={11} />
          {isUpcoming ? formatDateTime(match.utcDate, timezoneOffset) : isFT ? 'Finished' : 'In Progress'}
        </span>
      </div>
    </div>
  );
}
