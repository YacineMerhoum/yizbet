import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import imgBan from "../images/ImagesYizbet/mybettest.png";
import Footer from "../Components/Footer";
import axios from "axios";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Skeleton from "react-loading-skeleton";

const MyBet = () => {
  const [user, loading] = useAuthState(auth);
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [loadingPredictions, setLoadingPredictions] = useState(true);

  useEffect(() => {
    const fetchUserPredictions = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:3008/api/userpredictions/${userId}`);
        setPredictions(response.data);
        setLoadingPredictions(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des prédictions:", err);
        setError(err);
        setLoadingPredictions(false);
      }
    };

    if (user) {
      fetchUserPredictions(user.uid);
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <img src={imgBan} style={{ width: "100%" }} />
      <div className="section1">
        <h3
          className="text-center fontArchivoBold "
          style={{ color: "white", fontWeight: "bold", fontSize: "40px" }}
        >
          <em>Mes historiques d'achats</em>
        </h3>
        <p
          className="text-white text-center mb-5 container mt-5"
          style={{ fontWeight: "bold", fontSize: "28px" }}
        >
          Voici vos historiques : achetez vos pronostics, conservez-les ici, et accédez à Mybet en illimité pour consulter vos achats.
          Restez prudent sur vos mises pour une expérience de jeu responsable.⚠️
        </p>

        <div className="container">
          {loadingPredictions ? (
            <Skeleton count={5} height={30} />
          ) : error ? (
            <p className="text-danger">Erreur lors de la récupération de vos historiques d'achats.</p>
          ) : predictions.length > 0 ? (
            predictions.map((prediction) => (
              <div key={prediction.id} className="mb-3 p-3" style={{ background: "#fff", borderRadius: "10px" }}>
                <h5>{prediction.prediction}</h5>
                <p>Tokens utilisés : {prediction.tokens_used}</p>
                <p>Date d'achat : {new Date(prediction.prediction_date).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="text-white">Vous n'avez encore acheté aucun pronostic.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyBet;
