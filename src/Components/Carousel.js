import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMatchDetails, oddsMatchs } from "../slices/matchSlice";
import Carousel from "react-bootstrap/Carousel";
import traduction from "../traductions/traductionsEuro";
import channel1 from "../images/TV/m6.png";
import channel2 from "../images/TV/TF1-logo.png";
import Team1Img from "../images/Espagne.jpg";
import PortugalImg from "../images/france2.jpg";
import LogoEuro24 from "../images/LogoCompetition/Euro2024.jpg";
import Button from "react-bootstrap/Button";

function DarkVariantExample() {
  const dispatch = useDispatch();
  const matchDetails = useSelector((state) => state.match.matchDetails);
  const matchOdds = useSelector((state) => state.match.betGames)
  
  if (matchOdds) {
    console.log(matchOdds.data[4].bookmakers[0].markets[0].outcomes);

    }


  useEffect(() => {
    dispatch(fetchMatchDetails());
    dispatch(oddsMatchs());

  }, [dispatch]);

  useEffect(() => {
    if (matchDetails) {
      console.log(matchDetails.data.matches[13].homeTeam.crest, "hey je suis de retour en mieux !");
      console.log(matchDetails.data.matches[13].awayTeam.crest, "hey je suis de retour en mieux !");
    }
  }, [matchDetails]);


  if (!matchDetails || !matchOdds ) {
    return null;
  }

  const gameOne = 44
  const gameTwo = 45

  // MATCH 1
   const homeTeamOdd1 = matchOdds.data[4].bookmakers[0].markets[0].outcomes[0].price;
   const DrawGamemOdd1 = matchOdds.data[4].bookmakers[0].markets[0].outcomes[2].price;
   const awayTeamOdd1 = matchOdds.data[4].bookmakers[0].markets[0].outcomes[1].price;

  //  MATCH 2
   const homeTeamOdd2 = matchOdds.data[4].bookmakers[0].markets[0].outcomes[0].price;
   const DrawGamemOdd2 = matchOdds.data[4].bookmakers[0].markets[0].outcomes[2].price;
   const awayTeamOdd2 = matchOdds.data[4].bookmakers[0].markets[0].outcomes[1].price;

  const currentDate = new Date();
  const matchDate = new Date(matchDetails.data.matches[gameOne].utcDate);
  const isToday = currentDate.getDate() === matchDate.getDate();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = matchDate.toLocaleString("fr-FR", options);

  const dateFr = new Date(matchDetails.data.matches[gameOne].utcDate);
  const formattedDateGame = dateFr.toLocaleString("fr-FR", options);

  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Team1Img}
          alt="First slide"
          style={{ objectFit: "cover", height: "400px" }}
        />
        <Carousel.Caption>
          <div className="carouselBg">
            <img className="flagMenu" src={matchDetails.data.matches[gameOne].homeTeam.crest} alt="Home Team Crest" />
            <img className="flagMenu" src={matchDetails.data.matches[gameOne].awayTeam.crest} alt="Away Team Crest" />

            <h2>
              {traduction[matchDetails.data.matches[gameOne].homeTeam.name]}
              <span className="me-2"> vs </span>
              {traduction[matchDetails.data.matches[gameOne].awayTeam.name]}
            </h2>
            <img className="LogoCompet" src={LogoEuro24} alt="Competition Logo" />
            <p className="venueGame">{matchDetails.data.matches[gameOne].venue}</p>
            <p>
              <em className="dateGame">{isToday ? 'Ce soir' : formattedDate}</em>
              <img className="ms-2" style={{ height: "15px" }} src={channel2} alt="Channel Logo" />
            </p>
            <Button variant="light" className="m-1 btn_betOdds">
            {homeTeamOdd1}
            </Button>
            <Button variant="light" className="m-1 btn_betOdds">
            {DrawGamemOdd1}
            </Button>
            <Button variant="light" className="m-1 btn_betOdds">
            {awayTeamOdd1}
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
            <img className="flagMenu" src={matchDetails.data.matches[gameTwo].homeTeam.crest} alt="Home Team Crest" />
            <img className="flagMenu" src={matchDetails.data.matches[gameTwo].awayTeam.crest} alt="Away Team Crest" />

            <h2>
              {traduction[matchDetails.data.matches[gameTwo].homeTeam.name]}{" "}
              <span className="me-2">vs</span>
              {traduction[matchDetails.data.matches[gameTwo].awayTeam.name]}
            </h2>
            <img className="LogoCompet" src={LogoEuro24} alt="Competition Logo" />
            <p>{matchDetails.data.matches[gameTwo].venue}</p>
            <p>
            <em className="dateGame">{isToday ? 'Ce soir' : formattedDateGame}</em>
              <img className="ms-2" style={{ height: "15px" }} src={channel1} alt="Channel Logo" />

            </p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;
