import React, { useState, useEffect } from 'react'
import Toast from 'react-bootstrap/Toast'
import Logo from '../images/premierlogo.png'
import '../index.css'
import { Link } from 'react-router-dom'

function SuccessBet() {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
    }, 7000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setFadeOut(true)
  }

  return (
    <div className={`custom-toast-container ${fadeOut ? 'outAnimation' : ''}`}>
      <Toast className="custom-toast" onClose={handleClose} show={!fadeOut}>
        <Toast.Header>
          <img src={Logo} style={{ height: "30px", marginRight: "10px" }} alt="logo" />
          <strong className="me-auto">Notification</strong>
          <small>Just now</small>
        </Toast.Header>
        <Toast.Body>
        10 tokens ont été déduits. Votre pronostic est maintenant disponible,
        Consultez tous vos achats dans la rubrique 
        <Link to={"/mybet"} style={{ textDecoration: "none" }}>
          <span style={{ color: "#FFD60A" }}> MyBet</span>
        </Link>.
        </Toast.Body>
      </Toast>
    </div>
  )
}

export default SuccessBet
