import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import LogoYizBet from '../images/ImagesYizbet/logoYizbetSvg.svg'
import LogoYizBetMobile from '../images/ImagesYizbet/iconemobiledef.svg'
import Coin from '../images/Autres/coin.png'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import Coins from "../images/Autres/coin.png"
import Balance from "./Balance"
import { useDispatch } from 'react-redux'
import { getUser } from '../slices/userSlice'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}

function BasicExample() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isMobile = useIsMobile()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      console.log(currentUser)
      if (currentUser) {
        dispatch(getUser(currentUser.uid))
      }
    });

    return () => unsubscribe()
  }, [dispatch])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/')
      console.log("Je suis déconnecté ..." + auth)
    } catch (error) {
      console.error("Erreur lors de la déconnexion : ", error)
    }
  }

  return (
    <Navbar className='bgNavbar' expand="lg" data-bs-theme="dark">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand as={Link} to="/" className="me-auto">
          {!isMobile ? (
            <img src={LogoYizBet} className='logoYizBet' alt="Logo YizBet" />
          ) : (
            <img src={LogoYizBetMobile} className='logoMobile' alt="Logo Mobile Yizbet" />
          )}
        </Navbar.Brand>

        {/* VERSION MOBILE BURGER  */}
        {isMobile && user && (
          <div className="d-flex align-items-center me-auto ms-3">
            <span className="text-white me-2 PseudoConnecte fontArchivo">
              <em style={{ fontWeight: "bold", fontSize: "20px" }}>{user.displayName}</em>
            </span>
            <img src={Coin} className='coin' alt="Coin" />
            <span className='text-white ms-1 fontArchivo' style={{ fontWeight: "bold", fontSize: "20px", marginRight: "15px" }}>
              <Balance userId={user.uid} />
            </span>
          </div>
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" className='fontStrong ms-2 me-2'>Accueil</Nav.Link>
            <Nav.Link as={Link} to="/games-exotics" className='fontStrong ms-2 me-2'>Matchs Exotiques</Nav.Link>
            <Nav.Link as={Link} to="/mybet" className='fontStrong ms-2 me-2'>MyBet</Nav.Link>
            <Nav.Link as={Link} to="/tokens" className='fontStrong ms-2 me-2'>
              Tokens <img style={{ height: "15px", marginLeft: "5px" }} src={Coins} alt="Coins" />
            </Nav.Link>
            <NavDropdown title="Autres" className='fontStrong ms-2 me-2' id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} className='autres' to="/reglement">Règlement</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} className='autres' to="/conditions">Conditions générales d'utilisation</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} className='autres' to="/cgv">Conditions Générales de Vente</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} className='autres' to="/about-us">A propos de nous</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Boutons de connexion/inscription ou informations utilisateur */}
          <div className="d-flex align-items-center loginResp">
            {user ? (
              <>
                {!isMobile && (
                  <>
                    <span className="text-white me-2 PseudoConnecte fontArchivo ">
                     <Link  to={'/mybet'} alt="Mon compte Mybet" style={{ textDecoration:"none" , color:"white"}}>
                     <em className='compte' style={{ fontWeight: "bold", fontSize: "20px"  }}>{user.displayName}</em></Link>
                    </span>
                    <img src={Coin} className='coin' alt="Coin" />
                    <span className='text-white ms-1 fontArchivo' style={{ fontWeight: "bold", fontSize: "20px", marginRight: "15px" }}>
                      <Balance userId={user.uid} />
                    </span>
                  </>
                )}
                <Button variant="outline-light" className='fontStrong bgButtonLogin btnLogin logout me-4' onClick={handleLogout}>
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline-light" className="me-2 fontStrong bgButtonLogin btnLogin" as={Link} to="/register">
                  S'inscrire
                </Button>
                <Button variant="outline-light" className="fontStrong bgButtonLogin btnLogin btn2" as={Link} to="/login">
                  Se connecter
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default BasicExample
