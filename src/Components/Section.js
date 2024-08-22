import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchMatchDay } from "../slices/sectionSlice";
import traductions from "../traductions/traductionsEuro";


const Section = () => {
  const listGameDay = useSelector((state) => state.matchDay.matchDayOdds);
  const dispatch = useDispatch();




  console.log(listGameDay , "Hello je suis la pour aider !" );
  const test = listGameDay

  useEffect(() => {

    dispatch(fetchMatchDay());
  }, [dispatch]);

 

  if (!listGameDay || !listGameDay.matches) {
    return null;
  }

  let awayTeam = "Loading...";
  let homeTeam = "Loading...";
  let awayTeam2 = "Loading...";
  let homeTeam2 = "Loading...";

  if (listGameDay.matches.length > 0) {
    awayTeam = listGameDay.matches[0].awayTeam.name;
    homeTeam = listGameDay.matches[0].homeTeam.name;

    if (listGameDay.matches.length > 1) {
      awayTeam2 = listGameDay.matches[1].awayTeam.name;
      homeTeam2 = listGameDay.matches[1].homeTeam.name;
    }
  }

  return (
    <>
       
      <div className="text-section1"></div>
      <div className="text-center section1">
        <h3 className="text-white text-center mb-5 text-warning fontArchivoBold">
          <em>Les gros MATCHS du jour </em>🔥
        </h3>
        <div className="row justify-content-between">
          <div className="col-12 col-md-6">
            {listGameDay.matches[0] ? (
              <>
                {listGameDay.matches[1].hasStarted && (
                  <p className="text-white gamesDay">
                    {listGameDay.matches[1].score.fullTime.home} - {listGameDay.matches[1].score.fullTime.away}
                    <i className="ms-2 fa-solid fa-circle fa-fade fa-sm" style={{ color: "#e01b24" }}></i>
                  </p>
                )}
                <p className="gamesDay">
                  {traductions[homeTeam]} vs {traductions[awayTeam]}
                  <button className="ms-5 m-1 btnOdsSkew">2.50</button>
                  <button className="m-1 btnOdsSkew">2.50</button>
                  <button className="m-1 btnOdsSkew">2.50</button>
                </p>
              </>
            ) : (
              <>
                <Skeleton height={20} />
                <Skeleton height={20} width={150} />
                <Skeleton height={20} width={100} count={3} />
              </>
            )}
          </div>
          <div className="col-12 col-md-6">
            {listGameDay.matches[1] ? (
              <>
                {listGameDay.matches[0].hasStarted && (
                  <p className="text-white gamesDay">
                    {listGameDay.matches[0].score.fullTime.home} - {listGameDay.matches[0].score.fullTime.away}
                    <i className="ms-2 fa-solid fa-circle fa-fade fa-sm" style={{ color: "#e01b24" }}></i>
                  </p>
                )}
                <p className="gamesDay">
                  {traductions[homeTeam2]} vs {traductions[awayTeam2]}
                  <button className="ms-5 m-1 btnOdsSkew">2.50</button>
                  <button className="m-1 btnOdsSkew">2.50</button>
                  <button className="m-1 btnOdsSkew">2.50</button>
                </p>
              </>
            ) : (
              <>
                <Skeleton height={20} />
                <Skeleton height={20} width={150} />
                <Skeleton height={20} width={100} count={3} />
              </>
            )}
          </div>
        </div>
       
      </div>
   
    </>
  );
};

export default Section;
