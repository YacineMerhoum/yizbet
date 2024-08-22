import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Logo from '../images/premierlogo.png';
import '../index.css';

function PaymentBet({ onConfirm }) {
  const [fadeOut, setFadeOut] = useState(false);



  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    onConfirm(true);
    setFadeOut(true);
  };

  return (
    <div className={`custom-toast-container ${fadeOut ? 'outAnimation' : ''}`}>
      <Toast className="custom-toast">
        <Toast.Header>
          <img src={Logo} style={{ height: "30px", marginRight: "10px" }} alt="logo" />
          <strong className="me-auto">Notification</strong>
          <small>Just now</small>
        </Toast.Header>
        <Toast.Body>
          Accéder au pronostic de ce match vous coûtera 10 tokens. Êtes-vous sûr de vouloir continuer ?
          <Button variant="link" onClick={handleConfirm} >Oui</Button>
        </Toast.Body>
      </Toast>
    </div>
  );
}

export default PaymentBet;
