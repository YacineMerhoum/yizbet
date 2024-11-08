import React from "react";
import Navbar from "../Components/Navbar";
import YbPub from "../images/Autres/YIZBET.png";
import image from "../images/Autres/imgpub1.png";
import Footer from "../Components/Footer";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import imgBan from "../images/ImagesYizbet/banierematch2.png";
import Seo from "../Components/Seo";

const About = () => {
  const [bannerRef, bannerVisible] = useIntersectionObserver({
    threshold: 0.5,
  });
  const [imageRef1, imageVisible1] = useIntersectionObserver({
    threshold: 0.5,
  });
  const [imageRef2, imageVisible2] = useIntersectionObserver({
    threshold: 0.5,
  });

  return (
    <>
      <Seo
        title="Yizbet - À Propos de Nous"
        description="Découvrez l'histoire de Yizbet, notre mission, et comment nous aidons nos utilisateurs à maximiser leurs gains grâce à des pronostics sportifs de qualité."
        keywords="Yizbet, à propos, mission, pronostics sportifs"
        url="https://www.yizbet.com/about-us"
      />

      <Navbar />
      <img
        ref={bannerRef}
        src={imgBan}
        style={{
          width: "100%",
          transition: "opacity 1.5s",
          opacity: bannerVisible ? 1 : 0,
        }}
      />
      <div className="section1">
        <div className="">
          <h1
            className="text-center fontArchivoBold"
            style={{ color: "white", fontWeight: "bold" }}
          >
            <em>A propos de nous...</em>
          </h1>
          <h3
            className="text-center mt-5 fontArchivoBold"
            style={{ color: "white", fontWeight: "bold" }}
          >
            <em>Bienvenue chez Yizbet ! </em>
            <span> ⚽</span>
          </h3>

          <p
            className="text-white text-center mb-5 container mt-5"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            Je suis Yacine, passionné de football et créateur de Yizbet. J'ai eu
            le plaisir immense de concevoir ce site pour partager avec vous
            notre passion commune pour le football. Chez Yizbet, nous avons une
            mission simple mais ambitieuse : vous offrir la possibilité de
            vibrer devant un match comme si vous étiez déjà en pleine action.
            Nous croyons que le goût de la victoire commence bien avant le coup
            d'envoi, et nous sommes ici pour vous aider à le savourer.
          </p>
          <h3
            className="text-center mt-5 fontArchivoBold"
            style={{ color: "white", fontWeight: "bold" }}
          >
            <em>Notre Expertise</em>
            <span> 😎</span>
          </h3>
          <p
            className="text-white text-center mb-5 container mt-5"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            Chez Yizbet, nous sommes entourés de véritables experts en football.
            Notre équipe se compose de professionnels expérimentés qui ont le
            don de prédire les scénarios les plus inattendus des rencontres.
            Grâce à une analyse minutieuse de chaque match, nous vous proposons
            des pronostics soigneusement sélectionnés pour maximiser vos chances
            de succès.
          </p>
          <h3
            className="text-center mt-5 fontArchivoBold"
            style={{ color: "white", fontWeight: "bold" }}
          >
            <em>Notre Passion</em>
            <span> 😍</span>
          </h3>
          <p
            className="text-white text-center mb-5 container mt-5"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            Nous ne sommes pas seulement des experts, nous sommes aussi de
            fervents amateurs de football. Notre passion pour le sport se
            reflète dans chaque prédiction que nous vous offrons. Nous avons
            tous cette soif de victoire et cet enthousiasme pour le jeu, et nous
            mettons tout en œuvre pour partager cette passion avec vous.
          </p>
          <h3
            className="text-center mt-5 fontArchivoBold"
            style={{ color: "white", fontWeight: "bold" }}
          >
            <em>Nos Valeurs</em>
            <span> 🤩</span>
          </h3>
          <p
            className="text-white text-center mb-5 container mt-5"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            Précision : Nous analysons chaque rencontre avec la plus grande
            rigueur pour vous offrir des pronostics fiables.
            <br />
            Passion : Nous sommes tous des fans de football, et notre amour pour
            le jeu se ressent dans notre travail.
            <br />
            Engagement : Nous nous dévouons à vous fournir les meilleures
            analyses pour que vous puissiez vivre pleinement chaque moment de la
            compétition..
          </p>
          <h3
            className="text-center mt-5 fontArchivoBold"
            style={{ color: "white", fontWeight: "bold" }}
          >
            <em>Rejoignez-nous</em>
            <span> 🤩</span>
          </h3>
          <p
            className="text-white text-center mb-5 container mt-5"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            Nous vous invitons à explorer nos pronostics et à vous joindre à
            notre communauté de passionnés. Pour toute question ou pour en
            savoir plus sur nos services , n'hésitez pas à nous écrire un mail :
            <span className="text-warning">
              {" "}
              yizbet.service.conso@gmail.com
            </span>{" "}
            . <br />
            Merci de faire partie de l'aventure Yizbet et de partager avec nous
            la joie du football !
          </p>
          <div className="d-flex flex-wrap justify-content-center m-5">
            <img
              src={YbPub}
              ref={imageRef1}
              className="mt-3 m-5 imgAbout"
              title="Rejoignez-nous"
              style={{
                width: "100%",
                maxWidth: "500px",
                borderRadius: "10%",
                transition: "opacity 1.5s",
                opacity: imageVisible1 ? 1 : 0,
              }}
            />
            <img
              src={image}
              ref={imageRef2}
              className="mt-3 m-5 imgAbout"
              title="Rejoignez-nous"
              style={{
                width: "100%",
                maxWidth: "500px",
                borderRadius: "10%",
                transition: "opacity 1.5s",
                opacity: imageVisible2 ? 1 : 0,
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
