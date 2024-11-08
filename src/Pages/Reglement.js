import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Seo from "../Components/Seo";
import imgBan from "../images/ImagesYizbet/banLogoYizLight.png" 
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const Reglement = () => {
  const [bannerRef, bannerVisible] = useIntersectionObserver({ threshold: 0.5 })
  return (
    <>
            <Seo
        title="Yizbet - Règlement du site "
        description="Découvrez le règlement du site Yizbet, une plateforme de pronostics payants pour les paris sportifs. Jouez de manière responsable et consultez notre politique."
        keywords="Yizbet, pronostics, paris sportifs, règlement, jeu responsable, paris en ligne"

      />
      <Navbar />
      <img 
        ref={bannerRef} 
        src={imgBan} 
        style={{ width: "100%", transition: 'opacity 1.5s', opacity: bannerVisible ? 1 : 0 }}
      />

      <div className="section1">
        <h1
          className="text-center fontArchivoBold"
          style={{ color: "white", fontWeight: "bold" }}
        >
          <em>Règlement du site Yizbet</em>
        </h1>


        <h3
          className="text-center mt-5 fontArchivoBold"
          style={{ color: "white", fontWeight: "bold" }}
        >
          <em>1. Présentation du site Yizbet</em>
        </h3>
        <p
          className="text-white text-center mb-5 container mt-5"
          style={{ fontWeight: "bold", fontSize: "18px" }}
        >
          Yizbet est une plateforme de pronostics payants sur les paris
          sportifs. Notre équipe analyse les matchs et propose des prédictions
          basées sur des données publiques et notre expertise. Nous couvrons un
          large éventail de compétitions sportives dans le monde, en fonction
          des possibilités de paris disponibles. Les utilisateurs peuvent
          accéder aux prédictions en échange de 10 tokens par match, équivalents
          à 10 euros. Les tokens sont la devise utilisée sur Yizbet pour acheter
          des pronostics. Chaque prédiction concerne un match précis et
          représente notre opinion, fondée sur des données et des analyses
          préalables. Nous ne revendiquons aucune certitude sur les résultats
          futurs.
        </p>

        <h3
          className="text-center mt-5 fontArchivoBold"
          style={{ color: "white", fontWeight: "bold" }}
        >
          <em>2. Absence de garanties</em>
        </h3>
        <p
          className="text-white text-center mb-5 container mt-5"
          style={{ fontWeight: "bold", fontSize: "18px" }}
        >
          Il est important de noter que Yizbet n'a aucun contrôle sur les résultats
          des matchs sportifs, ni sur les performances des équipes ou des joueurs.
          Les prédictions proposées sont purement indicatives et ne constituent en
          aucun cas une certitude. Nous ne pouvons pas prévoir l'avenir et nous ne
          sommes pas responsables des pertes financières liées à l'utilisation de
          nos pronostics pour des paris.
        </p>

        {/* Responsabilité de l'utilisateur */}
        <h3
          className="text-center mt-5 fontArchivoBold"
          style={{ color: "white", fontWeight: "bold" }}
        >
          <em>3. Responsabilité de l'utilisateur</em>
        </h3>
        <p
          className="text-white text-center mb-5 container mt-5"
          style={{ fontWeight: "bold", fontSize: "18px" }}
        >
          Les utilisateurs de Yizbet doivent être conscients que les paris sportifs
          comportent des risques financiers. Nous encourageons tous nos utilisateurs
          à jouer de manière responsable et à ne pas parier plus qu'ils ne peuvent
          se permettre de perdre. Yizbet n'encourage pas les jeux d'argent excessifs
          et rappelle que les paris doivent être considérés comme une forme de
          divertissement. Nous n'offrons pas de services de paris en ligne directement
          et ne redirigeons aucun utilisateur vers des sites de paris sportifs.
        </p>

        {/* Protection des joueurs et jeu responsable */}
        <h3
          className="text-center mt-5 fontArchivoBold"
          style={{ color: "white", fontWeight: "bold" }}
        >
          <em>4. Protection des joueurs et jeu responsable</em>
        </h3>
        <p
          className="text-white text-center mb-5 container mt-5"
          style={{ fontWeight: "bold", fontSize: "18px" }}
        >
          Yizbet promeut activement une pratique responsable des paris sportifs. Nous
          encourageons nos utilisateurs à consulter des ressources d'aide en cas de
          comportement à risque lié aux jeux d'argent. Si vous estimez que vous avez
          besoin d'aide concernant la gestion de votre pratique de jeux d'argent, nous
          vous invitons à visiter <a href="https://joueurs-info-service.fr/" target="_blank"
           style={{color: '#FBEC5D', textDecoration: 'none'}}>Joueurs Info Service</a> pour obtenir du soutien et des conseils.
        </p>

        <h3
          className="text-center mt-5 fontArchivoBold"
          style={{ color: "white", fontWeight: "bold" }}
        >
          <em>5. Accès aux pronostics</em>
        </h3>
        <p
          className="text-white text-center mb-5 container mt-5"
          style={{ fontWeight: "bold", fontSize: "18px" }}
        >
          Pour accéder aux pronostics sur Yizbet, les utilisateurs doivent acheter des
          tokens. Chaque pronostic coûte 10 tokens par match, soit l'équivalent de 10 euros.
          Ces tokens sont non-remboursables une fois que le pronostic a été consulté par l'utilisateur.
          Les prédictions sont généralement disponibles pour 6 matchs différents par jour,
          et peuvent concerner n'importe quel championnat sportif dans le monde, en fonction des
          possibilités de paris disponibles.
        </p>
        <h3
          className="text-center mt-5 fontArchivoBold"
          style={{ color: "white", fontWeight: "bold" }}
        >
          <em>6. Absence d'affiliation avec les organismes sportifs</em>
        </h3>
        <p
          className="text-white text-center mb-5 container mt-5"
          style={{ fontWeight: "bold", fontSize: "18px" }}
        >
          Yizbet n'est pas affilié à des équipes sportives, ligues, fédérations, ou tout autre
          organisme sportif. Les informations présentes sur notre site ne sont pas endossées ni
          validées par des parties tierces. Nous n'avons pas de partenariat avec les organisateurs
          des événements sportifs que nous analysons.
        </p>
        <h3
          className="text-center mt-5 fontArchivoBold"
          style={{ color: "white", fontWeight: "bold" }}
        >
          <em>7. Propriété intellectuelle</em>
        </h3>
        <p
          className="text-white text-center mb-5 container mt-5"
          style={{ fontWeight: "bold", fontSize: "18px" }}
        >
          Tous les contenus, y compris les analyses, textes, graphiques, logos, images et pronostics
          disponibles sur Yizbet sont la propriété exclusive de Yizbet. Toute reproduction, distribution
          ou utilisation non autorisée de ces contenus est interdite sans l'accord écrit préalable de Yizbet.
        </p>
        <h3
          className="text-center mt-5 fontArchivoBold"
          style={{ color: "white", fontWeight: "bold" }}
        >
          <em>8. Utilisation des données personnelles</em>
        </h3>
        <p
          className="text-white text-center mb-5 container mt-5"
          style={{ fontWeight: "bold", fontSize: "18px" }}
        >
          Yizbet s'engage à protéger les données personnelles de ses utilisateurs en conformité
          avec les lois en vigueur. Les informations collectées lors de l'inscription ou de l'achat
          de tokens ne seront jamais partagées avec des tiers sans le consentement explicite de l'utilisateur.
        </p>


        <h3
          className="text-center mt-5 fontArchivoBold"
          style={{ color: "white", fontWeight: "bold" }}
        >
          <em>9. Modification du règlement</em>
        </h3>
        <p
          className="text-white text-center mb-5 container mt-5"
          style={{ fontWeight: "bold", fontSize: "18px" }}
        >
          Yizbet se réserve le droit de modifier à tout moment le présent règlement. Il est recommandé
          aux utilisateurs de consulter régulièrement cette page pour être informés des éventuels changements.
        </p>
      </div>

      <Footer />
    </>
  );
};

export default Reglement;
