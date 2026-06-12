import React from 'react';
import FlagIcon from './FlagIcon';
import { TEAMS } from '../data/teams';
import { getGroupStandings } from '../utils/matchUtils';
import { GROUPS } from '../data/fixtures';
import { useFixtures } from '../context/FixturesContext';

export default function GroupTable({ group }) {
  const { getFixturesByGroup } = useFixtures();
  const groupCodes = GROUPS[group] || [];
  const groupFixtures = getFixturesByGroup(group);
  const standings = getGroupStandings(groupFixtures, groupCodes);

  return (
    <table className="group-table">
      <thead>
        <tr>
          <th style={{ paddingLeft: 8 }}>#&nbsp;&nbsp;Team</th>
          <th>P</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>GD</th>
          <th>Pts</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((row, idx) => {
          const team = TEAMS[row.code];
          return (
            <tr key={row.code}>
              <td>
                <div className="standing-team">
                  <span className={`standing-pos pos-${idx + 1}`}>{idx + 1}</span>
                  <FlagIcon code={team?.flag || 'un'} size="sm" />
                  <span style={{ fontSize: 12 }}>{team?.name || row.code}</span>
                </div>
              </td>
              <td>{row.played}</td>
              <td>{row.won}</td>
              <td>{row.drawn}</td>
              <td>{row.lost}</td>
              <td style={{ color: row.gd > 0 ? '#059669' : row.gd < 0 ? '#DC2626' : undefined }}>
                {row.gd > 0 ? '+' : ''}{row.gd}
              </td>
              <td style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{row.pts}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
