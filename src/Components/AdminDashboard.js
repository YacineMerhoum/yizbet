import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../images/premierlogo.png"

const AdminDashboard = () => {
  const [predictions, setPredictions] = useState([]);
  const [newPrediction, setNewPrediction] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const response = await axios.get("http://localhost:3008/api/admin/userpredictions");
      setPredictions(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors de la récupération des prédictions:", err);
      setLoading(false);
    }
  };

  const handleAddPrediction = async () => {
    try {
      await axios.post("http://localhost:3008/api/admin/add-prediction", {
        prediction: newPrediction,
      });
      setNewPrediction("");
      fetchPredictions();
    } catch (err) {
      console.error("Erreur lors de l'ajout du pronostic:", err);
    }
  };

  return (
    <div className="container text-white">
        <img src={logo}  style={{ height: "90px"}}/>
      <h2>Admin Dashboard - Gestion des Pronostics</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul>
          {predictions.map((pred) => (
            <li key={pred.id}>
              {pred.prediction} (Match ID: {pred.match_id})
            </li>
          ))}
        </ul>
      )}
      <div>
        <h3>Ajouter un nouveau pronostic</h3>
        <input
          type="text"
          value={newPrediction}
          onChange={(e) => setNewPrediction(e.target.value)}
          placeholder="Nouveau pronostic"
        />
        <button onClick={handleAddPrediction}>Ajouter</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
