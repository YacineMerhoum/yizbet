import React, { useState, useEffect } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import Button from 'react-bootstrap/Button';
import Skeleton from "react-loading-skeleton";
import Navbar from "../Components/Navbar";
import SectionPub from '../Components/SectionPub';
import Footer from '../Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { oddsMatchs } from "../slices/matchSlice";
import imgExoGame from "../images/Autres/matchexo2.png";
import axios from "axios";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getTotalBalance, deductTokens } from '../slices/balanceSlice';
import LoginIn from "../Toasts/LoginIn";
import PaymentBet from "../Toasts/PaymentBet";
import NoToken from "../Toasts/NoTokens";
import SuccessBet from "../Toasts/SuccessBet";

const GamesExotics = () => {
  const listGameDay = useSelector((state) => state.match.betGames);
  const totalBalance = useSelector((state) => state.balance.totalBalance);
  const dispatch = useDispatch();
  const [user, loading] = useAuthState(auth);

  const [showLoginToast, setShowLoginToast] = useState(false);
  const [showTokensOk, setShowTokensOk] = useState(false);
  const [showNoToken, setShowNoToken] = useState(false);
  const [showSuccessBet, setShowSuccessBet] = useState(false);
  const [matchData, setMatchData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);

  
  const [tempMatchIndex, setTempMatchIndex] = useState(null);

  const [matchOneRef, isMatchOneVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [matchTwoRef, isMatchTwoVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [matchThreeRef, isMatchThreeVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [matchFourRef, isMatchFourVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [matchFiveRef, isMatchFiveVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [matchSixRef, isMatchSixVisible] = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://localhost:3008/api/match-odds');
        console.log('Données récupérées:', response.data);
        setMatchData(response.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des pronos:', err);
        setError(err);
      }
    };

    fetchMatches();
    dispatch(oddsMatchs());
    window.scrollTo(0, 0);
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getTotalBalance(user.uid));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (matchData.length > 0) {
      console.log("Première donnée des pronostics de la BDD :", matchData[0]);
    }
  }, [matchData]);

  const handleConfirmPurchase = async (confirmed) => {
    if (confirmed) {  // Si l'utilisateur a confirmé l'achat
      const deductionResult = await dispatch(deductTokens({ userId: user.uid, amount: 1000 }));
  
      if (deductionResult.meta.requestStatus === 'fulfilled') {
        setShowTokensOk(false); // Cache le toast PaymentBet après confirmation
        setShowSuccessBet(true);  // Affiche le toast de réussite
        setTimeout(() => setShowSuccessBet(false), 6000);
        setSelectedMatch(tempMatchIndex);  // Affiche le pronostic du match après la déduction des tokens
      }
    }
  };
  
  const toggleMatchDetails = (matchIndex) => {
    if (!user) {
      setShowLoginToast(true);
      setTimeout(() => setShowLoginToast(false), 6000);
      return;
    }
  
    if (totalBalance < 10) {
      setShowNoToken(true);
      setTimeout(() => setShowNoToken(false), 6000);
      return;
    }
  
    if (totalBalance >= 10) {
      setSelectedMatch(null); // Réinitialise le match sélectionné pour masquer tout pronostic précédemment affiché
      setShowTokensOk(true); // Affiche le toast de confirmation d'achat
      setTempMatchIndex(matchIndex); // Stocke temporairement le match sélectionné pour une utilisation après confirmation
    }
  };

  if (!listGameDay) {
    return (
      <div className="text-center">
        <Skeleton height={20} width={200} />
        <Skeleton height={20} width={150} />
        <Skeleton height={20} width={100} />
      </div>
    );
  }

  console.log(totalBalance + " Je suis le total de la balance !");

  return (
    <>
      <Navbar />
      {showLoginToast && <LoginIn />}
      {showTokensOk && <PaymentBet onConfirm={handleConfirmPurchase} />} 
      {showNoToken && <NoToken />}
      {showSuccessBet && <SuccessBet />} 
      <div className=''>
        <div className="text-section1"></div>
        <div className="text-center section1">
          <h1 className="text-white text-center mb-4 text-warning fontArchivoBold mb-5">
            <em>Les MATCHS éxotiques du jour </em><span>🤑</span>
          </h1>
          <img className="container mb-5" src={imgExoGame} ref={matchOneRef}
            style={{ transition: 'opacity 1.5s', borderRadius: "44px", opacity: isMatchOneVisible ? 1 : 0 }} />
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
              onClick={() => toggleMatchDetails(0)}
            >
              <p className="gamesDay text-center">{listGameDay.data[0].sport_title}</p>
              <p className="gamesDay">
                {listGameDay.data[0].home_team} vs {listGameDay.data[0].away_team}
                <button className="ms-5 m-1 btnOdsSkew m-1 btnOdsSkew">{listGameDay.data[0].bookmakers[0].markets[0].outcomes[1].price}</button>
                <button className="m-1 btnOdsSkew">{listGameDay.data[0].bookmakers[0].markets[0].outcomes[2].price}</button>
                <button className="m-1 btnOdsSkew">{listGameDay.data[0].bookmakers[0].markets[0].outcomes[0].price}</button>
              </p>
              {selectedMatch === 0 && (
                <div className="additional-info">
                  <p>Pronostic : {matchData[3] && matchData[3].prediction}</p>
                </div>
              )}
            </div>

            <div
              className="col-12 col-md-6 mt-4"
              ref={matchTwoRef}
              style={{ transition: 'opacity 1.5s', opacity: isMatchTwoVisible ? 1 : 0 }}
              onClick={() => toggleMatchDetails(1)}
            >
              <p className="gamesDay text-center">{listGameDay.data[1].sport_title}</p>
              <p className="gamesDay">
                {listGameDay.data[1].home_team} vs {listGameDay.data[1].away_team}
                <button className="ms-5 m-1 btnOdsSkew m-1 btnOdsSkew">{listGameDay.data[1].bookmakers[0].markets[0].outcomes[1].price}</button>
                <button className="m-1 btnOdsSkew">{listGameDay.data[1].bookmakers[0].markets[0].outcomes[2].price}</button>
                <button className="m-1 btnOdsSkew">{listGameDay.data[1].bookmakers[0].markets[0].outcomes[0].price}</button>
              </p>
              {selectedMatch === 1 && (
                <div className="additional-info">
                  <p>Pronostic : {matchData[7] && matchData[7].prediction}</p>
                </div>
              )}
            </div>

            <div
              className="col-12 col-md-6 mt-4"
              ref={matchThreeRef}
              style={{ transition: 'opacity 1.5s', opacity: isMatchThreeVisible ? 1 : 0 }}
              onClick={() => toggleMatchDetails(2)}
            >
              <p className="gamesDay text-center">{listGameDay.data[2].sport_title}</p>
              <p className="gamesDay">
                {listGameDay.data[2].home_team} vs {listGameDay.data[2].away_team}
                <button className="ms-5 m-1 btnOdsSkew">{listGameDay.data[2].bookmakers[0].markets[0].outcomes[1].price}</button>
                <button className="m-1 btnOdsSkew">{listGameDay.data[2].bookmakers[0].markets[0].outcomes[2].price}</button>
                <button className="m-1 btnOdsSkew">{listGameDay.data[2].bookmakers[0].markets[0].outcomes[0].price}</button>
              </p>
              {selectedMatch === 2 && (
                <div className="additional-info">
                  <p>Pronostic : {matchData[6] && matchData[6].prediction}</p>
                </div>
              )}
            </div>

            <div
              className="col-12 col-md-6 mt-4"
              ref={matchFourRef}
              style={{ transition: 'opacity 1.5s', opacity: isMatchFourVisible ? 1 : 0 }}
              onClick={() => toggleMatchDetails(3)}
            >
              <p className="gamesDay text-center">{listGameDay.data[3].sport_title}</p>
              <p className="gamesDay">
                {listGameDay.data[3].home_team} vs {listGameDay.data[3].away_team}
                <button className="ms-5 m-1 btnOdsSkew">{listGameDay.data[3].bookmakers[0].markets[0].outcomes[0].price}</button>
                <button className="m-1 btnOdsSkew">{listGameDay.data[3].bookmakers[0].markets[0].outcomes[2].price}</button>
                <button className="m-1 btnOdsSkew">{listGameDay.data[3].bookmakers[0].markets[0].outcomes[1].price}</button>
              </p>
              {selectedMatch === 3 && (
                <div className="additional-info">
                  <p>Pronostic : {listGameDay.data[3].prediction}</p>
                </div>
              )}
            </div>

            <div
              className="col-12 col-md-6 mt-4"
              ref={matchFiveRef}
              style={{ transition: 'opacity 1.5s', opacity: isMatchFiveVisible ? 1 : 0 }}
              onClick={() => toggleMatchDetails(4)}
            >
              <p className="gamesDay text-center">{listGameDay.data[4].sport_title}</p>
              <p className="gamesDay">
                {listGameDay.data[4].home_team} vs {listGameDay.data[4].away_team}
                <button className="ms-5 m-1 btnOdsSkew">{listGameDay.data[4].bookmakers[0].markets[0].outcomes[0].price}</button>
                <button className="m-1 btnOdsSkew">{listGameDay.data[4].bookmakers[0].markets[0].outcomes[2].price}</button>
                <button className="m-1 btnOdsSkew">{listGameDay.data[4].bookmakers[0].markets[0].outcomes[1].price}</button>
              </p>
              {selectedMatch === 4 && (
                <div className="additional-info">
                  <p>Pronostic : {listGameDay.data[4].prediction}</p>
                </div>
              )}
            </div>

            <div
              className="col-12 col-md-6 mt-4"
              ref={matchSixRef}
              style={{ transition: 'opacity 1.5s', opacity: isMatchSixVisible ? 1 : 0 }}
              onClick={() => toggleMatchDetails(5)}
            >
              <p className="gamesDay text-center">{listGameDay.data[5].sport_title}</p>
              <p className="gamesDay">
                {listGameDay.data[5].home_team} vs {listGameDay.data[5].away_team}
                <button className="ms-5 m-1 btnOdsSkew">{listGameDay.data[5].bookmakers[0].markets[0].outcomes[0].price}</button>
                <button className="m-1 btnOdsSkew">{listGameDay.data[5].bookmakers[0].markets[0].outcomes[2].price}</button>
                <button className="m-1 btnOdsSkew">{listGameDay.data[5].bookmakers[0].markets[0].outcomes[1].price}</button>
              </p>
              {selectedMatch === 5 && (
                <div className="additional-info">
                  <p>Pronostic : {matchData[0] && matchData[0].prediction}</p>
                </div>
              )}
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
  );
}

export default GamesExotics;
