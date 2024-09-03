import React, { useState } from 'react';
import { auth, signInWithGooglePopup } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button, Form } from 'react-bootstrap';
import LogoYizBet from '../images/premierlogo.png';
import { Link, useNavigate } from 'react-router-dom';
import googleLogo from "../images/Autres/Google.png";
import Seo from "../Components/Seo"
import "../GoogleButton.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Réinitialiser l'erreur
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/" , { state :{showWelcomeBack: true}  });
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError("Utilisateur non trouvé. Veuillez vérifier votre email ou créer un nouveau compte.");
      } else if (error.code === 'auth/wrong-password') {
        setError("Mot de passe incorrect. Veuillez réessayer.");
      } else {
        setError(error.message);
      }
    }
  };

  const logGoogleUser = async () => {
    try {
      const response = await signInWithGooglePopup();
      if (response.user) {
        navigate("/" , { state :{showWelcomeBack: true}  });
      } else {
        setError("Erreur lors de la connexion avec Google.");
      }
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        setError("Un compte existe déjà avec cette adresse email mais avec des informations d'identification différentes.");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <Seo 
        title="Yizbet - Connexion"
        description="Connectez-vous à Yizbet pour accéder à vos pronostics et parier sur vos événements sportifs préférés."
        keywords="connexion, Yizbet, paris sportifs, login"
        url="https://www.yizbet.com/login"
        image="https://www.yizbet.com/images/login-banner.jpg"
      />
    <div className='d-flex flex-column align-items-center' style={{ backgroundColor: "000814", height: "100vh", width: "100%" }}>
      <Link to="/" className='logoEntrance' style={{ height: "22%", marginTop: "0px" }}>
        <img src={LogoYizBet} className='logoResponsive' alt="Logo" />
      </Link>
      <h5 className='text-center noChildren fontArchivo' style={{ color: "white", marginLeft:"30%", marginRight: "30%", marginTop:"5%" }}>
        L'utilisation de Yizbet est strictement interdite aux mineurs en raison de
        l'interdiction des jeux d'argent pour les personnes mineures.
      </h5>

      <div className='mt-5'>
        <button onClick={logGoogleUser} className="custom-google-button">
          <img src={googleLogo} style={{ height: "30px", width: "30px" }} alt="Google Logo" className="google-logo" />
          <span>Se connecter avec Google</span>
        </button>
      </div>
      <Form className='w-50 mt-5' onSubmit={handleLogin}>
        <Form.Group style={{ width: "45%", textAlign: 'center'}} className='mb-3 mx-auto' controlId='formBasicEmail'>
          <Form.Label className='fontArchivo'  style={{ color: 'white', fontWeight: "bold" , fontSize:"25px" , fontStyle:"italic" }}>Adresse e-mail</Form.Label>
          <Form.Control
            type='email'
            className='inputs'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group style={{ width: "45%", textAlign: 'center'}} className='mb-3 mx-auto' controlId='formBasicPassword'>
          <Form.Label  className='fontArchivo'  style={{ color: 'white', fontWeight: "bold" , fontSize:"25px" , fontStyle:"italic" }}>Mot de passe</Form.Label>
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
      <h5 className='text-center fw-bold fst-italic ' 
        style={{ color: "white", marginLeft:"30%", marginRight: "30%", marginTop:"3%", fontSize: "25px" }}>
        Vous n'avez pas de compte ? Inscrivez vous <Link style={{ textDecoration :"none" }} to={"/register"}>ici 🔥</Link>
      </h5>
    </div>
    </>
  );
};

export default Login;
