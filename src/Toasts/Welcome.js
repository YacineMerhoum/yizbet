import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import Logo from '../images/premierlogo.png';
import '../index.css';
import { Link } from 'react-router-dom';

function Welcome() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setFadeOut(true);
  };

  return (
    <div className={`custom-toast-container ${fadeOut ? 'outAnimation' : ''}`}>
      <Toast className="custom-toast" onClose={handleClose} show={!fadeOut}>
        <Toast.Header>
          <img src={Logo} style={{ height: "30px", marginRight: "10px" }} alt="logo" />
          <strong className="me-auto">Notification</strong>
          <small>Just now</small>
        </Toast.Header>
        <Toast.Body>
        Bienvenue sur Yizbet, votre plateforme de pronostics pour paris sportifs en ligne !
        Accédez aux meilleurs pronostics du jour dans la rubrique 
        <Link to={"/games-exotics"} style={{ textDecoration:"none" , color:"#FBEC5D" , fontWeight:"bold"}}> Matchs exotiques.</Link>
       
        </Toast.Body>
      </Toast>
    </div>
  );
}

export default Welcome;