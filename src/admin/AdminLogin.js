import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/premierlogo.png";

const AdminLogin = () => {
  const [pseudo, setPseudo] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();

    if (pseudo === "admin" && password === "yacine") {
      navigate("/admin-dashboard");
    } else {
      setError("Pseudo ou mot de passe incorrect");
    }
  };

  return (
    <div className="container fontArchivoBold d-flex flex-column align-items-center justify-content-center vh-100">
      <img src={logo} style={{ height: "90px" }} alt="logo" />
      <h2 className="text-white text-center">Connexion Administrateur</h2>
      <form onSubmit={handleLogin} className="w-50">
        <div className="form-group text-center">
          <label className="text-white">Administrateur</label>
          <input
            type="text"
            className="form-control mx-auto"
            style={{ width: "80%" }}
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
        </div>
        <div className="form-group mt-4 text-center">
          <label className="text-white">Mot de passe</label>
          <input
            type="password"
            className="form-control mx-auto"
            style={{ width: "80%" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <p style={{ color: "red" }} className="text-center">
            {error}
          </p>
        )}
        <div className="text-center">
          <button type="submit" className="btn btn-primary mt-3">
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
