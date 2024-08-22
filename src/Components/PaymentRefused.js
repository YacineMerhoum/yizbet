import React, { useEffect, useState } from "react";
import Logo from "../images/premierlogo.png";
import LogoToken from "../images/Autres/coin.png";
import "../PaymentAccepted.css";
import { useNavigate } from "react-router-dom";

const PaymentRefused = () => {
  const [opacity, setOpacity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpacity(0);
    }, 2800);

    const redirectTimeout = setTimeout(() => {
      navigate("/tokens");
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
        😤❌
        </p>
        <p className="payment-message">Oh non..!</p>
        <p className="payment-tokens">Le paiement a échoué, veuillez réessayer
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

export default PaymentRefused;
