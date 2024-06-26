import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import LogoYizBet from '../images/premierlogo.png'


function BasicExample() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/"><img  src={LogoYizBet} className='logoYizBet' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navbarMobile">
            <Nav.Link href="/" className='fontStrong'>Home</Nav.Link>
            <Nav.Link href="/euro24" className='fontStrong'>Euro 2024</Nav.Link>
            <NavDropdown title="Dropdown" className='fontStrong' id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="d-flex loginResp">
            <Button variant="outline-light" className="me-2 fontStrong btnLogin">S'inscrire</Button>
            <Button variant="outline-light" className='fontStrong btnLogin btn2'>Se connecter</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
