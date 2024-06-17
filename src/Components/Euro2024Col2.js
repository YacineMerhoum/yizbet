import React from "react";
import LogoEuro24 from "../images/LogoCompetition/Euro2024.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { bestScored } from "../slices/footballSlice";
import traduction from "../traductions/traductionsEuro"

const Euro2024Col2 = () => {
  const bestScoredData = useSelector((state) => state.football.bestScored);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(bestScored());
  }, [dispatch]);

  if (!bestScoredData || !Array.isArray(bestScoredData.scorers)) {
    return <p>Loading...</p>;

}
console.log(bestScoredData.scorers);
  const firstScorer = bestScoredData.scorers[0];

  return (
    <div className="text-center textScored">
      <img src={LogoEuro24} alt="Logo Euro 2024" />
      <h1 className="mt-2 ms-2">Meilleur buteur</h1>
      {firstScorer ? (
        <div>
          <h5>{firstScorer.player.name}</h5>
          <p>{traduction[firstScorer.team.name]}</p>
          <img style={{ objectFit: "cover", height: "50px" }} src={firstScorer.team.crest} />
          <p>Buts: {firstScorer.goals}</p>
        </div>
      ) : (
        <p>Aucun buteur disponible.</p>
      )}
    </div>
  );
};

export default Euro2024Col2;
