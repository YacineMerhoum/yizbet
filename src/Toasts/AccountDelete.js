import { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import Logo from '../images/premierlogo.png';
import '../index.css';  

function AccountDelete() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 4000);

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
         Votre compte est supprimé 
        </Toast.Body>
      </Toast>
    </div>
  );
}

export default AccountDelete;