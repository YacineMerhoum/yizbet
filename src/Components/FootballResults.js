import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../slices/footballSlice'; 

const FootballResults = () => {
  const dispatch = useDispatch();
  const competition = useSelector((state) => state.football.competition);
  const matches = useSelector((state) => state.football.matches);
  const status = useSelector((state) => state.football.status);
  const error = useSelector((state) => state.football.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMatches());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  } else if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Competition Name: {competition.name}</h2>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>
            {match.homeTeam.name} vs {match.awayTeam.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FootballResults;
