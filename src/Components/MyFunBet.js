import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { oddsMatchs } from "../slices/matchSlice";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const MyFunBet = () => {
  const listGameDay = useSelector((state) => state.match.betGames);
  const dispatch = useDispatch();

  // Deux hooks pour deux divs différentes
  const [matchOneRef, isMatchOneVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [matchTwoRef, isMatchTwoVisible] = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    dispatch(oddsMatchs());
  }, [dispatch]);

  if (!listGameDay) {
    return (
      <div className="text-center">
        <Skeleton height={20} width={200} />
        <Skeleton height={20} width={150} />
        <Skeleton height={20} width={100} />
      </div>
    );
  }
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  const matchOne = 4;
  const matchTwo = 5;

  return (
    <>
      <div className="text-section1"></div>
      <div className="text-center section1">
        <h3 className="text-white text-center mb-5 text-warning">
          <em>Les MATCHS éxotiques du jour </em><span>🤑</span>
        </h3>
        <div className="row justify-content-between">
          <div
            className="col-12 col-md-6"
            ref={matchOneRef}
            style={{ transition: 'opacity 1.5s', opacity: isMatchOneVisible ? 1 : 0 }}
          >
            <p className="gamesDay text-center">{listGameDay.data[matchOne].sport_title}</p>
            <p className="gamesDay">
              {listGameDay.data[matchOne].home_team} vs {listGameDay.data[matchOne].away_team}
              <button className="ms-5 m-1 btnOdsSkew">{listGameDay.data[matchOne].bookmakers[0].markets[0].outcomes[1].price}</button>
              <button className="m-1 btnOdsSkew">{listGameDay.data[matchOne].bookmakers[0].markets[0].outcomes[2].price}</button>
              <button className="m-1 btnOdsSkew">{listGameDay.data[matchOne].bookmakers[0].markets[0].outcomes[0].price}</button>
           </p>
          </div>
          <div
            className="col-12 col-md-6"
            ref={matchTwoRef}
            style={{ transition: 'opacity 1.5s', opacity: isMatchTwoVisible ? 1 : 0 }}
          >
            <p className="gamesDay text-center">{listGameDay.data[matchTwo].sport_title}</p>
            <p className="gamesDay">
              {listGameDay.data[matchTwo].home_team} vs {listGameDay.data[matchTwo].away_team}
              <button className="ms-5 m-1 btnOdsSkew">{listGameDay.data[matchTwo].bookmakers[0].markets[0].outcomes[1].price}</button>
              <button className="m-1 btnOdsSkew">{listGameDay.data[matchTwo].bookmakers[0].markets[0].outcomes[2].price}</button>
              <button className="m-1 btnOdsSkew">{listGameDay.data[matchTwo].bookmakers[0].markets[0].outcomes[0].price}</button>
            </p>
          </div>
        </div>
        <Link to="/games-exotics">
          <Button className="m-5 btnWatchAllGame" onClick={scrollToTop} variant="secondary" size="lg" style={{ fontWeight: "bold", color: "#ffed00" }}>
            <em>Voir les MATCHS éxotiques du jour </em><span> 🤑</span>
          </Button>
        </Link>
      </div>
    </>
  );
};

export default MyFunBet;
