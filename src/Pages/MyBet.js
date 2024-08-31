import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import imgBan from "../images/ImagesYizbet/mybettest.png";
import Footer from "../Components/Footer";
import axios from "axios";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Skeleton from "react-loading-skeleton";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate } from "react-router-dom";
import AccountDelete from "../Toasts/AccountDelete";
import Seo from "../Components/Seo";

const MyBet = () => {
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()
  const [predictions, setPredictions] = useState([])
  const [error, setError] = useState(null)
  const [loadingPredictions, setLoadingPredictions] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const predictionsPerPage = 4
  const [showDeleteToast, setShowDeleteToast] = useState(false)

  useEffect(() => {
    const fetchUserPredictions = async (firebaseUid) => {
      try {
        const userIdResponse = await axios.get(
          `http://localhost:3008/user/${firebaseUid}`
        );
        const internalUserId = userIdResponse.data.id
        const predictionsResponse = await axios.get(
          `http://localhost:3008/api/userpredictions/${internalUserId}`
        );
        setPredictions(predictionsResponse.data)
        setLoadingPredictions(false)
      } catch (err) {
        console.error("Erreur lors de la récupération des prédictions:", err);
        setError(err)
        setLoadingPredictions(false)
      }
    };

    if (user) {
      fetchUserPredictions(user.uid)
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate])

  const handleDeleteAccount = async () => {
    if (user) {
      try {
        const userIdResponse = await axios.get(
          `http://localhost:3008/user/${user.uid}`
        );
        const internalUserId = userIdResponse.data.id;
  
        // Supprimer les données de l'utilisateur dans la base de données
        await axios.delete(
          `http://localhost:3008/api/delete-account/${internalUserId}`
        );
  
        // Supprimer l'utilisateur de Firebase Authentication
        await auth.currentUser.delete();
  
        // Rediriger vers la page d'accueil avec un état indiquant que le toast doit être affiché
        navigate("/", { state: { showDeleteToast: true } });
      } catch (err) {
        console.error("Erreur lors de la suppression du compte:", err);
  
        if (err.code === "auth/requires-recent-login") {
          alert("Veuillez vous reconnecter pour supprimer votre compte.");
        } else {
          alert("Erreur lors de la suppression du compte. Veuillez réessayer.");
        }
      }
    }
  };
  

  const indexOfLastPrediction = currentPage * predictionsPerPage;
  const indexOfFirstPrediction = indexOfLastPrediction - predictionsPerPage;
  const currentPredictions = predictions.slice(
    indexOfFirstPrediction,
    indexOfLastPrediction
  );

  const totalPages = Math.ceil(predictions.length / predictionsPerPage);

  return (
    <>
      <Seo 
        title="Yizbet - Mon compte MyBet"
        description="Gérez vos paris sportifs sur Yizbet. Consultez l'historique de vos paris et planifiez vos prochains gains."
        keywords="mes paris, Yizbet, paris sportifs, gestion des paris"
        url="https://www.yizbet.com/mybet"
        image="https://www.yizbet.com/images/mybet-banner.jpg"
      />
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
          Voici vos historiques : achetez vos pronostics, conservez-les ici, et
          accédez à Mybet en illimité pour consulter vos achats. Restez prudent
          sur vos mises pour une expérience de jeu responsable.⚠️
        </p>
        <div className="deleteAcount">
          <div className="container text-center">
            <p
              className="text-white"
              style={{ fontWeight: "bold", fontSize: "18px" }}
            >
              Vous pouvez supprimer votre compte ici. Toute action est
              définitive, et vos tokens seront également supprimés.
            </p>

            <div className="d-flex justify-content-center">
              <button
                onClick={handleDeleteAccount}
                className="btn btn-danger mb-3 fontStrong"
              >
                Supprimer compte
              </button>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          {loadingPredictions ? (
            <Skeleton count={5} height={30} />
          ) : error ? (
            <p className="text-danger cardBet">
              Erreur lors de la récupération de vos historiques d'achats.
            </p>
          ) : currentPredictions.length > 0 ? (
            <>
              {currentPredictions.map((prediction) => (
                <div key={prediction.id} className="mb-3 p-3 cardBet">
                  <h5>{prediction.prediction}</h5>
                  <p>Tokens utilisés : {prediction.tokens_used / 100}</p>
                  <p>
                    Date d'achat :{" "}
                    {new Date(prediction.prediction_date).toLocaleString(
                      "fr-FR",
                      {
                        timeZone: "Europe/Paris",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      }
                    )}
                  </p>
                </div>
              ))}
              <Pagination className="justify-content-center">
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </>
          ) : (
            <p
              className="text-center"
              style={{
                fontWeight: "bold",
                color: "#26428B",
                fontSize: "30px",
              }}
            >
              Vous n'avez encore acheté aucun pronostic.
            </p>
          )}
        </div>
      </div>
      {showDeleteToast && <AccountDelete />}
      <Footer />
    </>
  );
};

export default MyBet;
