import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import SectionPub from "../Components/SectionPub";
import Footer from "../Components/Footer";
import { auth } from "../firebase";
import { getAuth } from "firebase/auth";
import logo from "../images/premierlogo.png"
import Seo from "../Components/Seo";

const Tokens = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login")
    }
  }, [user, loading, navigate]);

  const handleCheckout = async (priceId) => {
    try {
      const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error('User not authenticated');
      return;
    }

    const token = await user.getIdToken()

    
      const response = await fetch('http://localhost:3008/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <img className="logoLoading" src={logo} alt="Loading..." />
      </div>
    );
  }

  return (
    user && (
      <>
            <Seo 
        title="Yizbet Tokens - Achetez des Tokens pour vos Paris"
        description="Achetez des tokens Yizbet pour parier sur vos événements sportifs préférés. Gagnez plus avec nos offres spéciales et promotions."
        keywords="Yizbet, tokens, paris sportifs, acheter tokens, promotions"
        url="https://www.yizbet.com/tokens"
        image="https://www.yizbet.com/images/tokens-banner.jpg"
      />
        <Navbar />
        <div className="section1" style={{ backgroundColor: "000814"}}>
          <div className="">
            <h3 className="text-center fontArchivoBold " style={{ color: "white", fontWeight: "bold" }}>
              <em>Nos tarifs </em>
              <span>🔥</span>
            </h3>
            <p className="text-white text-center mb-5 container mt-5 fontArchivo" style={{ fontWeight: "bold", fontSize: "18px" }}>
              Les règles sont simples : <br /> nous vous proposons un pronostic de votre choix contre 10 tokens, la monnaie virtuelle de notre application. Les tokens s'échangent contre de l'argent réel 💸 (10€ = 10 tokens). Vous pouvez utiliser nos pronostics pour parier sur des bookmakers tels que Unibet, Betclic, FDJ, etc...
              <br />
              Cependant, nous vous conseillons de
               surveiller vos mises et rappelons que nous ne sommes pas responsables des résultats à venir, car nous ne pouvons pas prédire l'avenir. 
               Veuillez lire attentivement nos <Link to="/conditions"><span className="text-warning" style={{ textDecoration: "none" }}>conditions d'utilisation</span></Link> avant de vous lancer dans le jeu.
            </p>
          </div>
          <div className="">
            <h3 className="text-center fontArchivoBold mb-5" style={{ color: "white", fontWeight: "bold" }}>
              <em>Nos offres </em>
              <span>⚽</span>
            </h3>
            <p className="gamesDay text-center" style={{ fontSize: "40px" }}>10 Tokens = 10€
              <button className="ms-5 m-1 btnOdsSkew" onClick={() => handleCheckout('price_1PZaHIJ7Z5palmd7vKDj0MuA')}>10€</button>
            </p>
            <p className="gamesDay text-center" style={{ fontSize: "40px" }}>20 Tokens = 20€
              <button className="ms-5 m-1 btnOdsSkew" onClick={() => handleCheckout('price_1PZaM1J7Z5palmd7RBUwXkZf')}>20€</button>
            </p>
            <p className="gamesDay text-center" style={{ fontSize: "40px" }}>35 Tokens = 30€
              <button className="ms-5 m-1 btnOdsSkew" onClick={() => handleCheckout('price_1PZteEJ7Z5palmd71M8eFueu')}>30€</button>
              <span style={{ color: "orange" }}> 15% de remise 🤑 </span>
            </p>
          </div>
        </div>
        <SectionPub />
        <Footer />
      </>
    )
  );
};

export default Tokens;
