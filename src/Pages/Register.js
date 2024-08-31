import React, { useState, useEffect } from 'react';
import { auth, signInWithGooglePopup } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LogoYizBet from '../images/premierlogo.png';
import Welcome from '../images/Autres/welcome.png';
import axios from 'axios';
import googleLogo from "../images/Autres/Google.png";
import prevention from "../images/Autres/prevention2.png";
import "../GoogleButton.css";
import "../responsive.css";
import Seo from '../Components/Seo';

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [dob, setDob] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPrevention, setShowPrevention] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => {
        setShowPrevention(false)
      }, 2000)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    if (age < 18) {
      setError('Vous devez être majeur pour vous inscrire.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: pseudo });

      await axios.post('http://localhost:3008/register', {
        email,
        password,
        pseudo,
        dob,
        uid: user.uid,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Cet e-mail est déjà utilisé. Veuillez en choisir un autre.');
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  

  const logGoogleUser = async () => {
    setLoading(true);
    try {
      const response = await signInWithGooglePopup();
      await axios.post('http://localhost:3008/register', {
        email: response.user.email,
        pseudo: response.user.displayName,
        uid: response.user.uid,
        google: true
      });
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Seo 
  title="Yizbet - S'inscrire , Rejoignez Yizbet"
  description="Créez un compte sur Yizbet et commencez à parier sur vos événements sportifs préférés. Rejoignez notre communauté de parieurs et profitez d'offres exclusives."
  keywords="Yizbet, s'inscrire, créer un compte, paris sportifs, rejoindre Yizbet"
  url="https://www.yizbet.com/register"
  image="https://www.yizbet.com/images/register-banner.jpg"
/>

    <div className='container-fluid register-container' style={{ backgroundColor: "000814", height: "100vh" }}>
      
      {showPrevention && (
        <div className={`prevention-overlay ${fadeOut ? 'fade-out-blur' : ''}`}>
          <img src={prevention} className='prevention' alt="Prevention" />
        </div>
      )}
      <div className='row h-100'>
        <div className='col-lg-6 d-flex flex-column align-items-center justify-content-center text-white'>
          <Link to="/" className='logoEntrance mb-3'>
            <img className='sizeImg animated-logo' src={LogoYizBet} alt="Logo YizBet" />
          </Link>
          <img src={Welcome} className="sizeImg sizeImg2 welcomeEntrance mb-3 animated-logo" alt="Welcome" />
          <h5 className='text-center noChildren mx-4'>
            L'utilisation de Yizbet est strictement interdite aux mineurs en raison de 
            l'interdiction des jeux d'argent pour les personnes mineures.
          </h5>
          <p style={{ fontSize: "30px" }}>🔞</p>
          <button onClick={logGoogleUser} className="custom-google-button mt-3 mb-3" disabled={loading}>
            <img src={googleLogo} style={{ height: "30px", width: "30px" }} alt="Google Logo" className="google-logo" />
            <span>S'inscrire avec Google</span>
          </button>
        </div>
        <div className='col-lg-6 d-flex flex-column align-items-center justify-content-center'>
          <Form className='w-75' onSubmit={handleRegister}>
            <Form.Group className='mb-4 text-center' controlId='formBasicPseudo'>
              <Form.Label style={{ color: 'white', fontWeight: "bold" }}>Pseudo</Form.Label>
              <Form.Control
                type='text'
                placeholder='Entrez votre pseudo'
                className='inputs2'
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                disabled={loading}
              />
            </Form.Group>
            <Form.Group className='mb-4 text-center' controlId='formBasicEmail'>
              <Form.Label style={{ color: 'white', fontWeight: "bold" }}>Adresse e-mail</Form.Label>
              <Form.Control
                type='email'
                placeholder='Entrez votre e-mail'
                className='inputs2'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </Form.Group>
            <Form.Group className='mb-4 text-center' controlId='formBasicPassword'>
              <Form.Label style={{ color: 'white', fontWeight: "bold" }}>Mot de passe</Form.Label>
              <Form.Control
                type='password'
                placeholder='Entrez votre mot de passe'
                className='inputs2'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </Form.Group>
            <Form.Group className='mb-4 text-center' controlId='formBasicDOB'>
              <Form.Label style={{ color: 'white', fontWeight: "bold" }}>Date de naissance</Form.Label>
              <Form.Control
                type='date'
                placeholder='Entrez votre date de naissance'
                className='inputs2'
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                disabled={loading}
              />
            </Form.Group>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className='d-flex justify-content-center'>
              <Button type='submit' className='mt-2 text-center fontStrong bgButtonLogin btnLogin' disabled={loading}>
                {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "S'inscrire"}
              </Button>
            </div>
            <p className="mt-3 text-white fw-bold fst-italic haveAccount text-center" style={{ fontSize: "25px" }}>
              Déjà un compte ? <Link to="/login" style={{ color: 'lightblue' }}>Se connecter</Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
