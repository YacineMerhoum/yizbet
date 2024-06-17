import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMatchDay } from "../slices/sectionSlice";
import traductions from "../traductions/traductionsEuro";

const Section = () => {
  const listGameDay = useSelector((state) => state.matchDay.matchDayOdds);
  const status = useSelector((state) => state.match.status);
  const error = useSelector((state) => state.match.error);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchMatchDay());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  if (status === "failed") {
    return <div>Désolé il ya un bug : {error}</div>;
  }

  if (!fetchMatchDay  ) {
    return null;
  }



  let awayTeam = "Loading...";
  let homeTeam = "Loading...";
  let awayTeam2 = "Loading...";
  let homeTeam2 = "Loading...";
  let awayTeam3 = "Loading...";
  let homeTeam3 = "Loading...";

  if (listGameDay && listGameDay.matches && listGameDay.matches.length > 0) {
    awayTeam = listGameDay.matches[0].awayTeam.name;
    homeTeam = listGameDay.matches[0].homeTeam.name;

    if (listGameDay.matches.length > 1) {
      awayTeam2 = listGameDay.matches[1].awayTeam.name;
      homeTeam2 = listGameDay.matches[1].homeTeam.name;
    }
    if (listGameDay.matches.length > 2) {
      awayTeam3 = listGameDay.matches[2].awayTeam.name;
      homeTeam3 = listGameDay.matches[2].homeTeam.name;
    }
  }
  

  return (
    <>
      <div className="text- section1">
        <h3 className="text-white text-center">Matchs du jour</h3>
      </div>
      <div className=" text-center section1">
        <div className="row justify-content-between ">
          <div className="col">
            <p className="text-white gamesDay">
              {listGameDay.matches[0].score.fullTime.home} - {listGameDay.matches[0].score.fullTime.away }
               <i class="ms-2 fa-solid fa-circle fa-fade fa-sm" style={{color: "#e01b24"}}></i></p>
            <p className="gamesDay">
              {traductions[homeTeam]} vs {traductions[awayTeam]}
              <button className="ms-5 m-1 btnOdsSkew">2.50</button>
              <button className="m-1 btnOdsSkew">2.50</button>
              <button className="m-1 btnOdsSkew">2.50</button>
            </p>
          </div>
          <div className="col">
          <p className="text-white gamesDay">
              {listGameDay.matches[1].score.fullTime.home} - {listGameDay.matches[2].score.fullTime.away }
               <i class="ms-2 fa-solid fa-circle fa-fade fa-sm" style={{color: "#e01b24"}}></i></p>
            <p className="gamesDay">
              {traductions[homeTeam2]} vs {traductions[awayTeam2]}
              <button className="ms-5 m-1 btnOdsSkew">2.50</button>
              <button className="m-1 btnOdsSkew">2.50</button>
              <button className="m-1 btnOdsSkew">2.50</button>
            </p>
          </div>
          <div className="col">
            DE ICI 
          <p className="text-white gamesDay">
              {listGameDay.matches[2].score.fullTime.home} - {listGameDay.matches[2].score.fullTime.away }
               <i class="ms-2 fa-solid fa-circle fa-fade fa-sm" style={{color: "#e01b24"}}></i></p>
               A ICI 
            <p className="gamesDay">
              {traductions[homeTeam3]} vs {traductions[awayTeam3]}
              <button className="ms-5 m-1 btnOdsSkew">2.50</button>
              <button className="m-1 btnOdsSkew">2.50</button>
              <button className="m-1 btnOdsSkew">2.50</button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section;
