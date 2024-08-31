import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Logo from '../images/premierlogo.png';
import '../index.css';

function PaymentBet({ onConfirm }) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
    }, 10000);

    return () => clearTimeout(timer)
  }, []);

  const handleConfirm = () => {
    onConfirm(true)
    setFadeOut(true)
  };

  const handleNoConfirm = () => {
    setFadeOut(true)
    setTimeout(() => {
      onConfirm(false)
    }, 400);
  };

  const handleClose = () => {
    setFadeOut(true)
    setTimeout(() => {
      onConfirm(false)
    }, 400);
  };

  return (
    <div className={`custom-toast-container2 ${fadeOut ? 'outAnimation' : ''}`}>
      <Toast className="custom-toast2" onClose={handleClose} show={!fadeOut}>
        <Toast.Header closeButton>
          <img src={Logo} style={{ height: "30px", marginRight: "10px" }} alt="logo" />
          <strong className="me-auto">Notification</strong>
          <small>Just now</small>
        </Toast.Header>
        <Toast.Body>
          Accéder au pronostic de ce match vous coûtera 10 tokens. Êtes-vous sûr de vouloir continuer ?
          <div className="container text-center mt-4 mb-3">
            <div className="row justify-content-evenly">
              <div className="col-4">
                <Button
                  className='buttonYes'
                  style={{ color: "white", fontSize: "20px", textDecoration: "none", border: "solid 3px #FBEC5D" }}
                  variant="link"
                  onClick={handleConfirm}
                >
                  Oui
                </Button>
              </div>
              <div className="col-4">
                <Button
                  className='buttonNo'
                  style={{ color: "white", fontSize: "20px", textDecoration: "none", border: "solid 3px red" }}
                  variant="link"
                  onClick={handleNoConfirm}
                >
                  Non
                </Button>
              </div>
            </div>
          </div>
        </Toast.Body>
      </Toast>
    </div>
  );
}

export default PaymentBet;
