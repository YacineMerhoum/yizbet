import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMatchDetails, fetchMatchPortugal , fetchBetEuro , fetchBetPorTche } from "../slices/matchSlice";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import traduction from "../traductions/traductionsEuro";

import FranceImg from "../images/france.jpg";
import PortugalImg from "../images/equipePortugal.jpg";
import LogoEuro24 from "../images/LogoCompetition/Euro2024.jpg";

function DarkVariantExample() {
  const dispatch = useDispatch();
  const matchDetails = useSelector((state) => state.match.matchDetails);
  const betEuro = useSelector((state) => state.match.betEuro)
  const BetPorTche = useSelector((state) => state.match.BetPorTche)
  const matchDetailsPortugal = useSelector((state) => state.match.matchDetailsPortugal); // Ajoute cette ligne pour récupérer les détails du match du Portugal
  
  const status = useSelector((state) => state.match.status);
  const error = useSelector((state) => state.match.error);

console.log(betEuro);

  useEffect(() => {
    dispatch(fetchMatchDetails())
    dispatch(fetchMatchPortugal())
    dispatch(fetchBetEuro())
    dispatch(fetchBetPorTche())
  }, [dispatch]);

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  if (status === "failed") {
    return <div>Désolé il ya un bug : {error}</div>;
  }

  if (!matchDetails || !matchDetailsPortugal ) {
    return null;
  }

  // CONVERTIR LA DATE EN FR
  const date = new Date(matchDetails.utcDate);
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
  const datePortugal = new Date(matchDetailsPortugal.utcDate);
  const formattedDatePortugal = datePortugal.toLocaleString("fr-FR", options);




  return (
    <Carousel data-bs-theme="dark">
      {/* 1er match  */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={FranceImg}
          alt="First slide"
          style={{ objectFit: "cover", height: "400px" }}
        />
        <Carousel.Caption>
          <div className="carouselBg">
            <img className="flagMenu" src={matchDetails.homeTeam.crest} />
            <img className="flagMenu" src={matchDetails.awayTeam.crest} />

            <h2>
              {traduction[matchDetails.homeTeam.name]}{" "}
              <span className="me-2">vs</span>
              {traduction[matchDetails.awayTeam.name]}
            </h2>
            <img className="LogoCompet" src={LogoEuro24} />
            <p>{matchDetails.venue}</p>
            <p>
              <em>{formattedDate}</em>
            </p>
            <Button variant="light" className="m-1 btn_betOdds">
            {betEuro.homeTeamOdds}
            </Button>
            <Button variant="light" className="m-1 btn_betOdds">
            {betEuro.drawOdds}
            </Button>
            <Button variant="light" className="m-1 btn_betOdds">
            {betEuro.awayTeamOdds}
            </Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={PortugalImg}
          alt="Second slide"
          style={{ objectFit: "cover", height: "400px" }}
        />
        <Carousel.Caption>
          <div className="carouselBg">
            <img
              className="flagMenu"
              src={matchDetailsPortugal.homeTeam.crest}
            />
            <img
              className="flagMenu"
              src={matchDetailsPortugal.awayTeam.crest}
            />

            <h2>
              {traduction[matchDetailsPortugal.homeTeam.name]}{" "}
              <span className="me-2">vs</span>
              {traduction[matchDetailsPortugal.awayTeam.name]}
            </h2>
            <img className="LogoCompet" src={LogoEuro24} />
            <p>{matchDetailsPortugal.venue}</p>
            <p>
              <em>{formattedDatePortugal}</em>
            </p>
            <Button variant="light" className="m-1 btn_betOdds">
            {BetPorTche.awayTeamOdds}
            </Button>
            <Button variant="light" className="m-1 btn_betOdds">
            {BetPorTche.drawOdds}
            </Button>
            <Button variant="light" className="m-1 btn_betOdds">
            {BetPorTche.homeTeamOdds}
            </Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=e5e5e5"
          alt="Third slide"
          style={{ objectFit: "cover", height: "400px" }}
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
}

export default DarkVariantExample;
