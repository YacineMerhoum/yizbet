import React, { useState } from 'react';
import { auth , signInWithGooglePopup } from '../firebase';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { Button, Form } from 'react-bootstrap';
import LogoYizBet from '../images/premierlogo.png';
import { Link, redirect, useNavigate } from 'react-router-dom';
import googleLogo from "../images/Autres/Google.png"
import "../GoogleButton.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (error) {
      setError(error.message);
    }
  };

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    navigate("/")
    console.log(response);
}
  

  return (
    <div className='d-flex flex-column align-items-center' style={{ backgroundColor: "black", height: "100vh", width: "100%" }}>
      <Link to="/" className='logoEntrance' style={{ height: "22%", marginTop: "50px" }}>
      <img src={LogoYizBet} className='logoResponsive'  alt="Logo"/>
      </Link>
      <h5 className='text-center noChildren' style={{ color: "white" , marginLeft:"30%" , marginRight: "30%" , marginTop:"5%"}}>
        L'utilisation de Yizbet est strictement interdite aux mineurs en raison de 
        l'interdiction des jeux d'argent pour les personnes mineures.</h5>


        <div className=''>
        <button onClick={logGoogleUser} className="custom-google-button">
      <img src={googleLogo} style={{ height: "30px" , width: "30px"}}  alt="Google Logo" className="google-logo" />
      <span>Se connecter avec Google</span>
        </button>
        </div>
      <Form className='w-50 mt-5' onSubmit={handleLogin}>
        <Form.Group style={{ width: "45%", textAlign: 'center'}} className='mb-3 mx-auto' controlId='formBasicEmail'>
          <Form.Label style={{ color: 'white' , fontWeight: "bold", textAlign: "center" }}>Adresse e-mail</Form.Label>
          <Form.Control
            type='email'
            className='inputs'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group style={{ width: "45%" , textAlign: 'center'}} className='mb-3 mx-auto' controlId='formBasicPassword'>
          <Form.Label style={{ color: 'white', fontWeight: "bold" }}>Mot de passe</Form.Label>
          <Form.Control
            type='password'
            className='inputs'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className='buttonLogin'>
        <Button className='' variant='warning' type='submit'>
          Se connecter
        </Button>
        </div>
      </Form>
      <h5 className='text-center' 
      style={{ color: "white" , marginLeft:"30%" , marginRight: "30%" , marginTop:"3%" , fontSize: "25px"}}>
        Vous n'avez pas de compte ? Inscrivez vous <Link style={{ textDecoration :"none" }}to={"/register"}>ici 🔥</Link></h5>
    </div>
  );
};

export default Login;
