import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMatchDetails, oddsMatchs } from "../slices/matchSlice"
import Carousel from "react-bootstrap/Carousel"
import Button from "react-bootstrap/Button"
import traduction from "../traductions/traductions"
import channel1 from "../images/TV/dazn.png"
import channel2 from "../images/TV/dazn.png"
import Team1Img from "../images/Ligue1/rennes.webp"
import Match2img from "../images/Ligue1/lyon.webp"
import LogoCompet from "../images/LogoCompetition/ligue1.png"
import Vs from "../images/Autres/VS.png"


function DarkVariantExample() {
  const dispatch = useDispatch()
  const matchDetails = useSelector((state) => state.match.matchDetails)
  const matchOdds = useSelector((state) => state.match.betGames)
  
  if (matchOdds) {
    console.log(matchOdds.data[4].bookmakers[0].markets[0].outcomes)

    }


  useEffect(() => {
    dispatch(fetchMatchDetails())
    dispatch(oddsMatchs())
  }, [dispatch])

  useEffect(() => {
    if (matchDetails) {
      console.log(matchDetails.data.matches[13].homeTeam.crest, "hey je suis de retour en mieux !")
      console.log(matchDetails.data.matches[13].awayTeam.crest, "hey je suis de retour en mieux !")
    }
  }, [matchDetails])


  if (!matchDetails || !matchOdds ) {
    return null;
  }

  const gameOne = 104
  const gameTwo = 103

    // MATCH 1
    const homeTeamOdd1 = matchOdds.data[1].bookmakers[0].markets[0].outcomes[0].price
    const DrawGamemOdd1 = matchOdds.data[1].bookmakers[0].markets[0].outcomes[2].price
    const awayTeamOdd1 = matchOdds.data[1].bookmakers[0].markets[0].outcomes[1].price
 
   //  MATCH 2
    const homeTeamOdd2 = matchOdds.data[2].bookmakers[0].markets[0].outcomes[0].price
    const DrawGamemOdd2 = matchOdds.data[2].bookmakers[0].markets[0].outcomes[2].price
    const awayTeamOdd2 = matchOdds.data[2].bookmakers[0].markets[0].outcomes[1].price
 

  const currentDate = new Date();
  const matchDate = new Date(matchDetails.data.matches[gameOne].utcDate)
  const isToday = currentDate.getDate() === matchDate.getDate();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }
  const formattedDate = matchDate.toLocaleString("fr-FR", options)

  const datePortugal = new Date(matchDetails.data.matches[gameTwo].utcDate)
  const formattedDates = datePortugal.toLocaleString("fr-FR", options)

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

            <h2 className="fontArchivoBold">
              {traduction[matchDetails.data.matches[gameOne].homeTeam.name]}
              <img className="me-2" src={Vs} alt="Versus"  style={{ height:"50px"}} />
              {traduction[matchDetails.data.matches[gameOne].awayTeam.name]}
            </h2>
            <img className="LogoCompet" src={LogoCompet} alt="Competition Logo" />
            <p className="venueGame">{matchDetails.data.matches[gameOne].venue}</p>
            <p>
              <em className="dateGame">{isToday ? 'Ce soir' : formattedDate}</em>
              <img className="ms-2" style={{ height: "35px" }} src={channel1} alt="Channel Logo" />
            </p>
            <Button  className="m-1 fontStrong bgButtonLogin oddsMenuSize">
            {homeTeamOdd1}
            </Button>
            <Button  className="m-1 fontStrong bgButtonLogin oddsMenuSize">
            {DrawGamemOdd1}
            </Button>
            <Button  className="m-1 fontStrong bgButtonLogin oddsMenuSize">
            {awayTeamOdd1}
            </Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Match2img}
          alt="Second slide"
          style={{ objectFit: "cover", height: "400px" }}
        />
        <Carousel.Caption>
          <div className="carouselBg">
            <img className="flagMenu" src={matchDetails.data.matches[gameTwo].homeTeam.crest} alt="Home Team Crest" />
            <img className="flagMenu" src={matchDetails.data.matches[gameTwo].awayTeam.crest} alt="Away Team Crest" />

            <h2 className="fontArchivoBold">
              {traduction[matchDetails.data.matches[gameTwo].homeTeam.name]}{" "}
              <img className="me-2" src={Vs} alt="Versus"  style={{ height:"50px"}} />
              {traduction[matchDetails.data.matches[gameTwo].awayTeam.name]}
            </h2>
            <img className="LogoCompet" src={LogoCompet} alt="Competition Logo" />
            <p>{matchDetails.data.matches[gameTwo].venue}</p>
            <p>
            <em className="dateGame">{isToday ? 'Ce soir' : formattedDates}</em>
              <img className="ms-2" style={{ height: "35px" }} src={channel2} alt="Channel Logo" />
            </p>
            <Button  className="m-1 fontStrong bgButtonLogin oddsMenuSize">
            {homeTeamOdd2}
            </Button>
            <Button  className="m-1 fontStrong bgButtonLogin oddsMenuSize">
            {DrawGamemOdd2}
            </Button>
            <Button  className="m-1 fontStrong bgButtonLogin oddsMenuSize">
            {awayTeamOdd2}
            </Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default DarkVariantExample
