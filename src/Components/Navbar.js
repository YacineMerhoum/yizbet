import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import LogoYizBet from '../images/premierlogo.png';
import Coin from '../images/Autres/coin.png';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Coins from "../images/Autres/coin.png";
import Credit from './Credit';
import Balance from "./Balance"
import { useDispatch } from 'react-redux';
import { getUser } from '../slices/userSlice';

function BasicExample() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      dispatch(getUser(currentUser.uid))
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
      console.log("Je suis déconnecté ..." + auth);
    } catch (error) {
      console.error("Erreur lors de la déconnexion : ", error);
    }
  };

  return (
    <Navbar className='bgNavbar'  data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/"><img src={LogoYizBet} className='logoYizBet' alt="Logo YizBet" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav text-light">
          <Nav className="me-auto navbarMobile" >
            <Nav.Link as={Link} to="/" className='fontStrong'>Home</Nav.Link>
            <Nav.Link as={Link} to="/games-exotics" className='fontStrong ms-2 me-2'>Matchs Exotiques</Nav.Link>
            <Nav.Link as={Link} to="/mybet" className='fontStrong ms-2 me-2'>MyBet</Nav.Link>
            <Nav.Link as={Link} to="/tokens" className='fontStrong ms-2 me-2'>Tokens
              <span ><img style={{ height: "15px", marginLeft: "5px" }} src={Coins} alt="Coins" /></span>
            </Nav.Link>
            <NavDropdown title="Autres" className='fontStrong ms-2 me-2' id="basic-nav-dropdown">
             
              <NavDropdown.Item as={Link} className='autres' to="/conditions">Conditions générales</NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} className='autres' to="/about-us">A propos de nous</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="d-flex align-items-center loginResp">
            {!user ? (
              <>
                <Button variant="outline-light" className="me-2 fontStrong bgButtonLogin btnLogin" as={Link} to="/register">S'inscrire</Button>
                <Button variant="outline-light" className='fontStrong bgButtonLogin btnLogin btn2' as={Link} to="/login">Se connecter</Button>
              </>
            ) : (
              <>
                <span className="text-white me-2"><em style={{ fontWeight: "bold", fontSize: "20px" }}>{user.displayName}</em></span>
                <img src={Coin} className='coin' alt="Coin" />
                <span className='text-white ms-1' style={{ fontWeight: "bold", fontSize: "20px", marginRight: "20px" }}>
                  
                  
                  <Balance userId={user.id} />
                  
                  
                  </span>
                <Button variant="outline-light" className='fontStrong bgButtonLogin btnLogin' onClick={handleLogout}>Déconnexion</Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
