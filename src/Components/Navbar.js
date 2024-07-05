import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import LogoYizBet from '../images/premierlogo.png';
import Coin from '../images/Autres/coin.png'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function BasicExample() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');  
    } catch (error) {
      console.error("Erreur lors de la déconnexion : ", error);
    }
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/"><img src={LogoYizBet} className='logoYizBet' alt="Logo YizBet" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navbarMobile">
            <Nav.Link href="/" className='fontStrong'>Home</Nav.Link>
            <Nav.Link href="/euro24" className='fontStrong'>Euro 2024</Nav.Link>
            <Nav.Link href="/games-exotics" className='fontStrong'>Matchs Exotiques</Nav.Link>
            <NavDropdown title="Dropdown" className='fontStrong' id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="d-flex align-items-center loginResp">
            {!user ? (
              <>
                <Button variant="outline-light" className="me-2 fontStrong btnLogin" as={Link} to="/register">S'inscrire</Button>
                <Button variant="outline-light" className='fontStrong btnLogin btn2' as={Link} to="/login">Se connecter</Button>
              </>
            ) : (
              <>
                <span className="text-white me-2"><em style={{ fontWeight: "bold" , fontSize:"20px"  }}>{user.displayName}</em></span>
               <img src={Coin} style={{marginRight:"20px"}} className='coin' />
                <Button variant="outline-light" className='fontStrong btnLogin' onClick={handleLogout}>Déconnexion</Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
