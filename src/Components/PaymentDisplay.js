import React, { useEffect, useState } from "react";
import Logo from "../images/premierlogo.png";
import LogoToken from "../images/Autres/coin.png";
import Credit from "./Credit";
import "../PaymentAccepted.css";
import { useNavigate } from "react-router-dom";

const PaymentDisplay = () => {
  const [opacity, setOpacity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpacity(0);
    }, 2800);

    const redirectTimeout = setTimeout(() => {
      navigate("/");
    }, 3200);

    return () => {
      clearTimeout(timeout);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <div
      className="payment-display-container"
      style={{ opacity: opacity }}
    >
      <div className="payment-display-content">
        <img src={Logo} alt="Logo" className="payment-logo" />
        <p className="" style={{ fontSize: "40px" }}>
          🔥 💸 🤑
        </p>
        <p className="payment-message">Félicitations !</p>
        <p className="payment-tokens test">
          Vous venez d'obtenir <Credit /> tokens !
        </p>
        <img
          src={LogoToken}
          alt="Token"
          className="payment-logo token"
          style={{}}
        />
      </div>
    </div>
  );
};

export default PaymentDisplay;
