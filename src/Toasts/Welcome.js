import React, { useState, useEffect } from 'react'
import Toast from 'react-bootstrap/Toast'
import Logo from '../images/premierlogo.png'
import '../index.css'
import { getUser } from '../slices/userSlice'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

function Welcome() {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
    }, 13000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setFadeOut(true)
  }

  const dispatch = useDispatch()
  const [user, setUser] = useState(null)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      console.log(currentUser)
      if (currentUser) {
        dispatch(getUser(currentUser.uid))
      }
    })

    return () => unsubscribe()
  }, [dispatch])

  return (
    <>
    { user && (
    <div className={`custom-toast-container ${fadeOut ? 'outAnimation' : ''}`}>
      <Toast className="custom-toast" onClose={handleClose} show={!fadeOut}>
        <Toast.Header>
          <img src={Logo} style={{ height: "30px", marginRight: "10px" }} alt="logo" />
          <strong className="me-auto">Notification</strong>
          <small>Just now</small>
        </Toast.Header>
        <Toast.Body>
        Bienvenue <span style={{ color: "#FBEC5D"}}>{user.displayName} </span> sur Yizbet ! 🙂 <br />
        Votre plateforme de pronostics pour paris sportifs en ligne !<br /><br />
        Accédez aux meilleurs pronostics du jour dans la rubrique 
        <Link to={"/games-exotics"} style={{ textDecoration:"none" , color:"#FBEC5D" , fontWeight:"bold"}}> Matchs exotiques.</Link>
       
        </Toast.Body>
      </Toast>
    </div>
    )}
    </>
  )
}

export default Welcome