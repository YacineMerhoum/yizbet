import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import Logo from '../images/premierlogo.png';
import '../index.css';

function SuccessBet() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`custom-toast-container ${fadeOut ? 'outAnimation' : ''}`}>
      <Toast className="custom-toast">
        <Toast.Header>
          <img src={Logo} style={{ height: "30px", marginRight: "10px" }} alt="logo" />
          <strong className="me-auto">Notification</strong>
          <small>Just now</small>
        </Toast.Header>
        <Toast.Body>
          10 tokens ont été déduits. Votre pronostic est maintenant disponible, vous l'avez également reçu par mail.
        </Toast.Body>
      </Toast>
    </div>
  );
}

export default SuccessBet;
