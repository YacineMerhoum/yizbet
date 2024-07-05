import React, { useEffect } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import Button from 'react-bootstrap/Button';
import Skeleton from "react-loading-skeleton";
import Navbar from "../Components/Navbar";
import Section from '../Components/Section';
import SectionPub from '../Components/SectionPub';
import Footer from '../Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { oddsMatchs } from "../slices/matchSlice";

const GamesExotics = () => {
  const listGameDay = useSelector((state) => state.match.betGames);
  const dispatch = useDispatch();

  const [matchOneRef, isMatchOneVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [matchTwoRef, isMatchTwoVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [matchThreeRef, isMatchThreeVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [matchFourRef, isMatchFourVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [matchFiveRef, isMatchFiveVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [matchSixRef, isMatchSixVisible] = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    dispatch(oddsMatchs());
    window.scrollTo(0, 0);
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

  const matchOne = 0;
  const matchTwo = 1;
  const match3 = 2;
  const match4 = 3;
  const match5 = 4;
  const match6 = 5;

  return (
    <>
      <Navbar />
      <div className=''>
        <div className="text-section1"></div>
        <div className="text-center section1">
          <h3 className="text-white text-center mb-5 text-warning">
            <em>Les MATCHS éxotiques du jour </em><span>🤑</span>
          </h3>
          <p className="text-white text-center mb-5 container" style={{ fontWeight: "bold", fontSize: "18px" }}>
            Les règles du jeu sont simples : voici une sélection de matchs du jour, sélectionnez le match qui vous intéresse et vous aurez le pronostic idéal adéquat ; attention, nos pronostics ne sont pas des valeurs sûres donc dosez vos mises de jeu, nous rappelons que les jeux d'argent sont dangereux.
          </p>
          <p className="text-white text-center mb-5 container" style={{ fontWeight: "bold", fontSize: "18px" }}>
          Les matchs exotiques sont les plus lointains du monde, offrant des cotes parmi les plus folles ; de l'Islande à la Colombie en passant par le championnat coréen (du Sud, bien sûr 😅), profitez d'un large choix de sélections pour satisfaire toutes vos envies de paris sportifs.
          </p>
          <div className="row justify-content-center">
            <div
              className="col-12 col-md-6 mt-4"
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
              className="col-12 col-md-6 mt-4"
              ref={matchThreeRef}
              style={{ transition: 'opacity 1.5s', opacity: isMatchThreeVisible ? 1 : 0 }}
            >
              <p className="gamesDay text-center">{listGameDay.data[match3].sport_title}</p>
              <p className="gamesDay">
                {listGameDay.data[match3].home_team} vs {listGameDay.data[match3].away_team}
                <button className="ms-5 m-1 btnOdsSkew">{listGameDay.data[match3].bookmakers[0].markets[0].outcomes[1].price}</button>
                <button className="m-1 btnOdsSkew">{listGameDay.data[match3].bookmakers[0].markets[0].outcomes[2].price}</button>
                <button className="m-1 btnOdsSkew">{listGameDay.data[match3].bookmakers[0].markets[0].outcomes[0].price}</button>
              </p>
            </div>
            <div
              className="col-12 col-md-6 mt-4"
              ref={matchFiveRef}
              style={{ transition: 'opacity 1.5s', opacity: isMatchFiveVisible ? 1 : 0 }}
            >
              <p className="gamesDay text-center">{listGameDay.data[match5].sport_title}</p>
              <p className="gamesDay">
                {listGameDay.data[match5].home_team} vs {listGameDay.data[match5].away_team}
                <button className="ms-5 m-1 btnOdsSkew">{listGameDay.data[match5].bookmakers[0].markets[0].outcomes[1].price}</button>
                <button className="m-1 btnOdsSkew">{listGameDay.data[match5].bookmakers[0].markets[0].outcomes[2].price}</button>
                <button className="m-1 btnOdsSkew">{listGameDay.data[match5].bookmakers[0].markets[0].outcomes[0].price}</button>
              </p>
            </div>

            {/* SEPARATION DES DEUX COL */}
            <div
              className="col-12 col-md-6 mt-4"
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
            <div
              className="col-12 col-md-6 mt-4"
              ref={matchFourRef}
              style={{ transition: 'opacity 1.5s', opacity: isMatchFourVisible ? 1 : 0 }}
            >
              <p className="gamesDay text-center">{listGameDay.data[match4].sport_title}</p>
              <p className="gamesDay">
                {listGameDay.data[match4].home_team} vs {listGameDay.data[match4].away_team}
                <button className="ms-5 m-1 btnOdsSkew">{listGameDay.data[match4].bookmakers[0].markets[0].outcomes[1].price}</button>
                <button className="m-1 btnOdsSkew">{listGameDay.data[match4].bookmakers[0].markets[0].outcomes[2].price}</button>
                <button className="m-1 btnOdsSkew">{listGameDay.data[match4].bookmakers[0].markets[0].outcomes[0].price}</button>
              </p>
            </div>
            <div
              className="col-12 col-md-6 mt-4"
              ref={matchSixRef}
              style={{ transition: 'opacity 1.5s', opacity: isMatchSixVisible ? 1 : 0 }}
            >
              <p className="gamesDay text-center">{listGameDay.data[match6].sport_title}</p>
              <p className="gamesDay">
                {listGameDay.data[match6].home_team} vs {listGameDay.data[match6].away_team}
                <button className="ms-5 m-1 btnOdsSkew">{listGameDay.data[match6].bookmakers[0].markets[0].outcomes[1].price}</button>
                <button className="m-1 btnOdsSkew">{listGameDay.data[match6].bookmakers[0].markets[0].outcomes[2].price}</button>
                <button className="m-1 btnOdsSkew">{listGameDay.data[match6].bookmakers[0].markets[0].outcomes[0].price}</button>
              </p>
            </div>
          </div>
          <Button className="m-5 btnWatchAllGame" variant="secondary" size="lg"
            style={{ fontWeight: "bold", color: "#ffed00" }}>
            <em>Voir les MATCHS éxotiques du jour </em><span> 🤑</span>
          </Button>
        </div>
      </div>

      <SectionPub />
      <Footer />
    </>
  )
}

export default GamesExotics;
