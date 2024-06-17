// FootballResults.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStandings } from '../slices/footballSlice';
import traduction from "../traductions/traductionsEuro";

const FootballResults = () => {
  const dispatch = useDispatch();
  const standings = useSelector((state) => state.football.standings);
  const status = useSelector((state) => state.football.status);
  const error = useSelector((state) => state.football.error);

  useEffect(() => {
    dispatch(fetchStandings());
  }, [dispatch]);

  const formatGroup = (group) => {
    return group.replace('Group', traduction["Group"]);
  };

  if (status === 'loading') {
    return <div>{traduction["Loading"]}</div>;
  }

  if (status === 'failed') {
    return <div>{traduction["Error"]}: {error}</div>;
  }

  return (
    <div className='text-center standingCard'>
      
      {standings.map((standing, index) => (
        <div key={index}>
             <h2>{formatGroup(standing.group)}</h2>
          <table className='tableStanding'>
            <thead>
              <tr className='m-1'>
                <th>{traduction["Equipe"]}</th>
                <th>{traduction["Points"]}</th>
                <th>{traduction["Played"]}</th>
                <th>{traduction["Won"]}</th>
                <th>{traduction["Drawn"]}</th>
                <th>{traduction["Lost"]}</th>
                <th>{traduction["Goals For"]}</th>
                <th>{traduction["Goals Against"]}</th>
                <th>{traduction["Goal Difference"]}</th>
              </tr>
            </thead>
            <tbody>
              {standing.table.map((team) => (
                <tr key={team.team.id}>
                  <td><img className="crestTeam" src={team.team.crest} />{traduction[team.team.name]}</td>
                  <td>{team.points} </td>
                  <td>{team.playedGames} </td>
                  <td>{team.won}</td>
                  <td>{team.draw}</td>
                  <td>{team.lost}</td>
                  <td>{team.goalsFor}</td>
                  <td>{team.goalsAgainst}</td>
                  <td>{team.goalDifference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default FootballResults;
