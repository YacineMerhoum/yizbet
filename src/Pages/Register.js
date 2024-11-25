import React, { useState, useEffect } from "react"
import { auth, signInWithGooglePopup } from "../firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { Button, Form, Spinner } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import LogoYizBet from "../images/premierlogo.png"
import Welcome from "../images/Autres/welcome.png"
import axios from "axios";
import googleLogo from "../images/Autres/Google.png"
import prevention from "../images/Autres/prevention2.png"
import "../GoogleButton.css"
import "../responsive.css"
import Seo from "../Components/Seo"


const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pseudo, setPseudo] = useState("")
  const [dob, setDob] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPrevention, setShowPrevention] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)
  

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => {
        setShowPrevention(false)
      }, 1500)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!isTermsAccepted) {
      setError('Vous devez lire et accepter les conditions d\'utilisation.');
      return
    }
  
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    if (age < 18) {
      setError("Vous devez avoir au moins 18 ans pour vous inscrire.")
      return
    }
    if (!pseudo) {
      setError("Le pseudo est obligatoire.");
      return
    } else if (pseudo.length <= 3) {
      setError("Le pseudo doit contenir au moins 3 caractères.");
      return
    
    } else if (/^\d+$/.test(pseudo)) {
      setError("Le pseudo ne peut pas être uniquement composé de chiffres.")
      return

    // PROTECTON ANTI HTML SCRIPT
    } else if (!/^[a-zA-Z0-9-_]+$/.test(pseudo)) {
      setError("Le pseudo ne doit contenir que des lettres, chiffres, tirets ou underscores.")
      return
    // PROTECTON ANTI HTML SCRIPT
    }
    

    if (!password) {
      setError("Veuillez écrire un mot de passe. Le mot de passe doit contenir au minimum 6 caractères.")
      return
    } else if (!/^[a-zA-Z0-9-_]+$/.test(password)) {
      setError("Pour des raisons de sécurité , le mot de passe ne doit contenir que des lettres, chiffres, tirets ou underscores.")
      return
    }

    if (!email) {
      setError("Veuillez écrire un mail.")
      return
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError("Veuillez entrer une adresse email valide.")
      return
    }

    if (!dob) {
      setError("Veuillez indiquer votre date de naissance")
      return
    }
    
    setLoading(true)


    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user

      await updateProfile(user, { displayName: pseudo })

      await axios.post(
        `${API_URL}/register`,
        {
          email,
          password,
          pseudo,
          dob,
          uid: user.uid,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      navigate("/", { state: { showToastWelcome: true } })
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Cet e-mail est déjà utilisé. Veuillez en choisir un autre.")
      } else {
        setError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const logGoogleUser = async () => {
    if (!dob) {
      setError("Veuillez indiquer votre date de naissance pour vous inscrire avec Google")
      return
    }
    if (!isTermsAccepted) {
      setError('Vous devez lire et accepter les conditions d\'utilisation pour vous inscrire avec Google');
      return
    }
    
    setLoading(true)
    try {
      const response = await signInWithGooglePopup()
      await axios.post(`${API_URL}/register`, {
        email: response.user.email,
        pseudo: response.user.displayName,
        uid: response.user.uid,
        dob,
        google: true,
      })
     
      

      navigate("/", { state: { showToastWelcome: true } })
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Seo
        title="Yizbet - S'inscrire , Rejoignez Yizbet"
        description="Créez un compte sur Yizbet et commencez à parier sur vos événements sportifs préférés. Rejoignez notre communauté de parieurs et profitez d'offres exclusives."
        keywords="Yizbet, s'inscrire, créer un compte, paris sportifs, rejoindre Yizbet"
        url="https://www.yizbet.com/register"
        image="https://www.yizbet.com/images/register-banner.jpg"
      />

      <div
        className="container-fluid register-container"
        style={{ backgroundColor: "000814", height: "100vh" }}
      >
        {showPrevention && (
          <div
            className={`prevention-overlay ${fadeOut ? "fade-out-blur" : ""}`}
          >
            <img src={prevention} className="prevention" alt="Prevention" />
          </div>
        )}
        <div className="row h-100">
          <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center text-white">
            <Link to="/" className="logoEntrance mb-3">
              <img
                className="sizeImg animated-logo"
                src={LogoYizBet}
                alt="Logo YizBet"
              />
            </Link>
            <img
              src={Welcome}
              className="sizeImg sizeImg2 welcomeEntrance mb-3 animated-logo"
              alt="Welcome"
            />
            <h5 className="text-center noChildren mx-4 fontArchivoBold ">
              L'utilisation de Yizbet est strictement interdite aux mineurs en
              raison de l'interdiction des jeux d'argent pour les personnes
              mineures.
            </h5>
            <p style={{ fontSize: "30px" }}>🔞</p>
            <button
              onClick={logGoogleUser}
              className="custom-google-button mt-3 mb-3"
              disabled={loading}
            >
              <img
                src={googleLogo}
                style={{ height: "30px", width: "30px" }}
                alt="Google Logo"
                className="google-logo"
              />
              <span>S'inscrire avec Google</span>
            </button>
          </div>
          <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center ">
            <Form className="w-75 " onSubmit={handleRegister}>
              <Form.Group
                className="mb-4 text-center "
                controlId="formBasicPseudo"
              >
                <Form.Label
                  className="fontArchivoBold "
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "25px",
                    fontStyle: "italic",
                  }}
                >
                  Pseudo
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez votre pseudo"
                  className="inputs2"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group
                className="mb-4 text-center"
                controlId="formBasicEmail"
              >
                <Form.Label
                  className="fontArchivoBold"
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "25px",
                    fontStyle: "italic",
                  }}
                >
                  Adresse e-mail
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Entrez votre e-mail"
                  className="inputs2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group
                className="mb-4 text-center"
                controlId="formBasicPassword"
              >
                <Form.Label
                  className="fontArchivoBold"
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "25px",
                    fontStyle: "italic",
                  }}
                >
                  Mot de passe
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  className="inputs2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group className="mb-4 text-center" controlId="formBasicDOB">
                <Form.Label
                  className="fontArchivoBold"
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "25px",
                    fontStyle: "italic",
                  }}
                >
                  Date de naissance
                </Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Entrez votre date de naissance"
                  className="inputs2"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group
                className="mb-4 text-center"
                controlId="formTermsAccepted"
              >
                <Form.Check
                  type="checkbox"
                  id="termsAccepted"
                  label={(
                    <span className='text-white'>
                      Merci de lire et accepter les{' '}
                      <Link to="/conditions" target="_blank" style={{ color: '#FBEC5D', textDecoration:"none" }}>CGU</Link>,{' '}
                      <Link to="/cgv" target="_blank" style={{ color: '#FBEC5D', textDecoration:"none" }}>CGV</Link>, et le{' '}
                      <Link to="/reglement" target="_blank" style={{ color: '#FBEC5D', textDecoration:"none" }}>règlement</Link>.
                    </span>
                  )}
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "25px",
                    fontStyle: "italic",
                  }}
                  className="text-white inputs2 fontArchivoBold"
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                  disabled={loading}
                />
              </Form.Group>

              {error && <p className="inputs2 animError" style={{ color: "red",  fontWeight: "bold",
                    fontSize: "20px",
                    fontStyle: "italic", }}>{error}</p>}
              <div className="d-flex justify-content-center">
                <Button
                  type="submit"
                  className="mt-2 text-center fontStrong bgButtonLogin btnLogin"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "S'inscrire"
                  )}
                </Button>
              </div>
              <p
                className="mt-3 text-white fw-bold fst-italic haveAccount text-center"
                style={{ fontSize: "25px" }}
              >
                Déjà un compte ?{" "}
                <Link to="/login" style={{ color: "lightblue" }}>
                  Se connecter
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
