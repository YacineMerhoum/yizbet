import Carousel from 'react-bootstrap/Carousel';
import { fetchHongrieSuisse , fetchBetHongrieSuisse , fetchMatch4 , fetchOddsMatch4 } from "../slices/matchSlice"
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from "react";
import imgTeam2 from "../images/germany.webp"
import imgTeam from "../images/england.jpeg"
import LogoEuro24 from "../images/LogoCompetition/Euro2024.jpg"
import Button from "react-bootstrap/Button";
import traduction from "../traductions/traductionsEuro";

function DarkVariantExample() {
  const dispatch = useDispatch()
  const oddsMatch4 = useSelector((state) => state.match.oddsMatch4)
  const match4 = useSelector((state) => state.match.match4)
  const matchHongrieSuisse = useSelector((state) => state.match.hongrieSuisse)
  const status = useSelector((state) => state.match.status);
  const error = useSelector((state) => state.match.error);
  const betHongrieSuise = useSelector((state) => state.match.betHongrieSuisse)
 
  useEffect(() => {
    dispatch(fetchHongrieSuisse())
    dispatch(fetchBetHongrieSuisse())
    dispatch(fetchMatch4())
    dispatch(fetchOddsMatch4())
  }, [dispatch]);

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  if (status === "failed") {
    return <div>Désolé il ya un bug : {error}</div>;
  }

  if (!matchHongrieSuisse || !match4 ) {
    return null;
  }


  const date = new Date(matchHongrieSuisse.utcDate);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = date.toLocaleString("fr-FR", options);

  // Convertir la date pour le match du Portugal
  const datePortugal = new Date(matchHongrieSuisse.utcDate);
  const formattedDatePortugal = datePortugal.toLocaleString("fr-FR", options);
  

  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={imgTeam2}
          alt="First slide"
          style={{ objectFit: "cover", height: "400px" }}
        />
        <Carousel.Caption>
          <div className="carouselBg">
            <img className="flagMenu" src={matchHongrieSuisse.homeTeam.crest} />
            <img className="flagMenu" src={matchHongrieSuisse.awayTeam.crest} />

            <h2>
              {traduction[matchHongrieSuisse.homeTeam.name]}{" "}
              <span className="me-2">vs</span>
              {traduction[matchHongrieSuisse.awayTeam.name]}
            </h2>
            <img className="LogoCompet" src={LogoEuro24} />
            <h1 className='text-danger'> {matchHongrieSuisse.score.fullTime.home} {matchHongrieSuisse.score.fullTime.away} </h1>
            <p>{matchHongrieSuisse.venue}</p>
            <p>
              <em className='dateGame'>{formattedDate}</em>
            </p>
            <Button variant="light" className="m-1 btn_betOdds">
            {/* {betHongrieSuise.awayTeamOdds}
            </Button>
            <Button variant="light" className="m-1 btn_betOdds">
            {betHongrieSuise.drawOdds}
            </Button>
            <Button variant="light" className="m-1 btn_betOdds">
            {betHongrieSuise.homeTeamOdds} */}
            </Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={imgTeam}
          alt="Third slide"
          style={{ objectFit: "cover", height: "400px" }}
        />
            <Carousel.Caption>
          <div className="carouselBg">
            <img className="flagMenu" src={match4.homeTeam.crest} />
            <img className="flagMenu" src={match4.awayTeam.crest} />

            <h2>
              {traduction[match4.homeTeam.name]}{" "}
              <span className="me-2">vs</span>
              {traduction[match4.awayTeam.name]}
            </h2>
            <img className="LogoCompet" src={LogoEuro24} />
            <h1 className='text-danger'> {match4.score.fullTime.home} {match4.score.fullTime.away} </h1>
            <p>{match4.venue}</p>
            <p>
              <em className='dateGame'>{formattedDate}</em>
            </p>
            <Button variant="light" className="m-1 btn_betOdds">
            {oddsMatch4.homeTeamOdds}
            </Button>
            <Button variant="light" className="m-1 btn_betOdds">
            {oddsMatch4.drawOdds}
            </Button>
            <Button variant="light" className="m-1 btn_betOdds">
            {oddsMatch4.awayTeamOdds}
            </Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;