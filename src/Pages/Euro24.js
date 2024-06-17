import React from "react";
import FootballResults from "../Components/FootballResults";
import Navbar from "../Components/Navbar";
import Euro2024Col2 from "../Components/Euro2024Col2";

import { useSelector , useDispatch } from "react-redux";


const Euro24 = () => {

  return (
    <>
      <Navbar />
      <div className="text-center">
        <h1>Classements</h1>
      </div>
      <div className="container text-center mt-5">
        <div className="row justify-content-between">
          <div className="col-6"><FootballResults /></div>
          <div className="col-6"><Euro2024Col2 /></div>
        </div>
      </div>
     

     
    </>
  );
};

export default Euro24;
