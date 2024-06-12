import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../slices/footballSlice'; 
import traduction from '../traductions/traductions';

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
        {matches.map((match, index) => {
          const homeTeam = traduction[match.homeTeam.name] || { nom: match.homeTeam.name, image: "" };
          const awayTeam = traduction[match.awayTeam.name] || { nom: match.awayTeam.name, image: "" };

          return (
            <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <img src={homeTeam.image}  style={{ width: '60px', height: '60px', marginRight: '10px' }} />
              {homeTeam.nom} vs 
              <img src={awayTeam.image} style={{ width: '60px', height: '60px', marginRight: '10px', marginLeft: '10px' }} />
              {awayTeam.nom}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FootballResults;
