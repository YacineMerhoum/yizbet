import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../images/premierlogo.png";

import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [matchOdds, setMatchOdds] = useState([])
  const [loading, setLoading] = useState(true)
  const [editPredictionId, setEditPredictionId] = useState(null)
  const [newPrediction, setNewPrediction] = useState("")

  useEffect(() => {
    fetchMatchOdds()
  }, []);

  const fetchMatchOdds = async () => {
    try {
      const response = await axios.get("http://localhost:3008/api/admin/match-odds");
      setMatchOdds(response.data)
      setLoading(false)
    } catch (err) {
      console.error("Erreur lors de la récupération des données:", err)
      setLoading(false);
    }
  };

  const handleEditPrediction = (id, currentPrediction) => {
    setEditPredictionId(id)
    setNewPrediction(currentPrediction)
  };

  const handleUpdatePrediction = async () => {
    try {
      await axios.put(`http://localhost:3008/api/admin/match-odds/${editPredictionId}`, {
        prediction: newPrediction,
      });
      setEditPredictionId(null)
      setNewPrediction("")
      fetchMatchOdds()
    } catch (err) {
      console.error("Erreur lors de la mise à jour du pronostic:", err);
    }
  };

  return (
    <div className="container text-white">
      <img src={logo} style={{ height: "90px"  }} alt="logo" />
      <h2 className="text-center fontArchivoBold">Admin Dashboard - Gestion des "Match Odds"</h2>
      <p className="text-center fontArchivoBold mt-2" style={{fontSize: "15px"}}>
      Explication du Dashboard : Après avoir récupéré les données et les avoir enregistrées dans un fichier JSON, 
      puis les avoir insérées dans la base de données, vous pouvez modifier ici les prédictions des matchs.
      </p>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="table mt-4">
          <thead>
            <tr className="fontArchivo text-center fst-italic ">
              <th>ID</th>
              <th>Sport Key</th>
              <th>Sport Title</th>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Prediction</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {matchOdds.map((match) => (
              <tr className="font"  key={match.id}>
                <td>{match.id}</td>
                <td>{match.sport_key}</td>
                <td>{match.sport_title}</td>
                <td>{match.home_team}</td>
                <td>{match.away_team}</td>
                <td>
                  {editPredictionId === match.id ? (
                    <input
                      type="text"
                      value={newPrediction}
                      onChange={(e) => setNewPrediction(e.target.value)}
                    />
                  ) : (
                    match.prediction
                  )}
                </td>
                <td>
                  {editPredictionId === match.id ? (
                    <button className="fontArchivo" style={{borderRadius:"10px", fontSize:"18px", color: "#FBEC5D" , backgroundColor:"#26428B" }}
                    onClick={handleUpdatePrediction}>Enregistrer</button>
                  ) : (
                    <button className="fontArchivo" style={{borderRadius:"10px", fontSize:"18px", color: "#FBEC5D" , backgroundColor:"#26428B" }}
                      onClick={() => handleEditPrediction(match.id, match.prediction)}
                    >
                      Modifier
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="d-flex justify-content-center mt-5">
     <Link to={"/"} className="fontArchivo mb-5" style={{color: "#FBEC5D" , textDecoration:"none" , fontSize:"25px" , backgroundColor:"#26428B" , borderRadius:"10px" }}>Retour au menu</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
