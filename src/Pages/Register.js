import React, { useState } from 'react';
import { auth , signInWithGooglePopup } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LogoYizBet from '../images/premierlogo.png';
import Welcome from '../images/Autres/welcome.png';
import axios from 'axios';
import googleLogo from "../images/Autres/Google.png"
import "../GoogleButton.css"

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [dob, setDob] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    console.log('Début de handleRegister');
  
    // Vérification de l'âge
    const today = new Date();
    const birthDate = new Date(dob);
    console.log(`Date de naissance: ${dob}`);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    console.log(`Âge calculé: ${age}`);
    if (age < 18) {
      setError('Vous devez être majeur pour vous inscrire.');
      console.log('Erreur: utilisateur mineur');
      return;
    }
  
    try {
      console.log('Tentative de création de l\'utilisateur');
      // Créer un nouvel utilisateur
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      
      const user = userCredential.user;
      console.log('Utilisateur créé:', user);
  
      // Mettre à jour le profil de l'utilisateur avec le pseudo
      await updateProfile(user, { displayName: pseudo });
      console.log('Profil mis à jour avec le pseudo:', pseudo);

      await axios.post('http://localhost:3007/register', {
        email,
        password,
        pseudo,
        dob,
        uid: user.uid,
      });
  
      navigate('/');  // Redirige vers la page d'accueil après l'inscription
      console.log('Redirection vers la page d\'accueil');
    } catch (error) {
      setError(error.message);
      console.log('Erreur:', error.message);
    }
  };
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response)
    await axios.post('http://localhost:3007/register', {
      email : response.user.email,
      pseudo : response.user.displayName,
      uid: response.user.uid,
      google:true
    });
    navigate("/")
    console.log(response);
}

  

  
  return (
    <div className='d-flex flex-column align-items-center divMobile' style={{ backgroundColor: "black", height: "100vh", width: "100%" }}>
      <Link to="/" className=' logoEntrance' style={{ height: "22%", marginTop: "5px" }}>
        <img className='sizeImg' src={LogoYizBet} alt="Logo YizBet" />
      </Link>
      <img src={Welcome} className="sizeImg sizeImg2 welcomeEntrance" alt="Welcome" />
      <h5 className='text-center noChildren' style={{ color: "white", marginLeft: "30%", marginRight: "30%", marginTop: "2%" }}>
        L'utilisation de Yizbet est strictement interdite aux mineurs en raison de 
        l'interdiction des jeux d'argent pour les personnes mineures.
      </h5>
      <div className=''>
        <button onClick={logGoogleUser} className="custom-google-button">
      <img src={googleLogo} style={{ height: "30px" , width: "30px"}}  alt="Google Logo" className="google-logo" />
      <span>S'inscrire avec Google</span>
        </button>
        </div>
      <Form className='w-50 mt-3' onSubmit={handleRegister} style={{ textAlign: 'center' }}>
        <Form.Group style={{ width: "35%"}} className='mb-3 mx-auto' controlId='formBasicPseudo'>
          <Form.Label style={{ color: 'white', fontWeight: "bold" }}>Pseudo</Form.Label>
          <Form.Control
            type='text'
            placeholder='Entrez votre pseudo'
            className='inputs'
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
        </Form.Group>
        <Form.Group style={{ width: "35%"}} className='mb-3 mx-auto' controlId='formBasicEmail'>
          <Form.Label style={{ color: 'white' , fontWeight: "bold" }}>Adresse e-mail</Form.Label>
          <Form.Control
            type='email'
            placeholder='Entrez votre e-mail'
            className='inputs'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group style={{ width: "35%"}} className='mb-3 mx-auto' controlId='formBasicPassword'>
          <Form.Label style={{ color: 'white', fontWeight: "bold" }}>Mot de passe</Form.Label>
          <Form.Control
            type='password'
            placeholder='Entrez votre mot de passe'
            className='inputs'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group style={{ width: "35%" }} className='mb-3 mx-auto' controlId='formBasicDOB'>
          <Form.Label style={{ color: 'white' , fontWeight: "bold"  }}>Date de naissance</Form.Label>
          <Form.Control
            type='date'
            placeholder='Entrez votre date de naissance'
            className='inputs'
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </Form.Group>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button variant='warning' type='submit' className='mt-2'>
          S'inscrire
        </Button>
        <p className="mt-3 text-white fw-bold fst-italic haveAccount" style={{ fontSize: "25px"}}>
  Déjà un compte ? <Link to="/login" style={{ color: 'lightblue' }}>Se connecter</Link>
</p>
      </Form>
    </div>
  );
};

export default Register;
