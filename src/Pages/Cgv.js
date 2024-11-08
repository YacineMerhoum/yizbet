import React from "react"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import Seo from "../Components/Seo"

const Cgv = () => {
  return (
    <>
      <Seo
        title="Yizbet -CGV Conditions Générales de vente"
        description="Lisez les conditions générales de vente de Yizbet pour comprendre nos règles et garantir une expérience utilisateur optimale sur notre plateforme de pronostics sportifs."
        keywords="Yizbet, CGV, conditions générales de vente, règles, pronostics sportifs"
        url="https://www.yizbet.com/cgv"
      />

      <Navbar />
      <div className="section1">
        <div className="">
          <h3
            className="text-center fontArchivoBold"
            style={{ color: "white", fontWeight: "bold" }}
          >
            <em>Conditions Générales de Vente (CGV) de Yizbet </em>

            <span></span>
          </h3>
          <p
            className="text-white text-center mb-5 container mt-5"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            <span className="text-center mb-4">1. Objet</span>
            <br />
            Les présentes Conditions Générales de Vente (ci-après "CGV")
            s'appliquent à toutes les ventes de tokens réalisées via le site web
            de Yizbet. Ces conditions visent à
            définir les relations contractuelles entre Yizbet et le client,
            ainsi que les conditions applicables à tout achat effectué par le
            biais du site internet de Yizbet.
          </p>
          <p
            className="text-white text-center mb-5 container mt-5"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            <span className="text-center mb-4">2. Acceptation des CGV</span>
            <br />
            L’acquisition de tokens à travers ce site implique une acceptation
            sans réserve par le client des présentes conditions de vente. Ces
            conditions de vente prévaudront sur tout autre document général ou
            particulier non expressément agréé par Yizbet.
          </p>
          <p
            className="text-white text-center mb-5 container mt-5"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            <span className="text-center mb-4">3. Tokens proposés</span>
            <br />
            Yizbet offre les tokens selon les tarifs suivants : 10 euros pour 10
            tokens, 20 euros pour 20 tokens, et 30 euros pour 30 tokens. Les
            tokens sont utilisables sur le site pour accéder à des services
            spécifiques définis par Yizbet.
          </p>
          <p
            className="text-white text-center mb-5 container mt-5"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            <span className="text-center mb-4">4. Tarifs</span>
            <br />
            Les prix des tokens sont indiqués en Euros (€) et sont ceux en
            vigueur au moment de la validation de la commande par le client.
            Yizbet se réserve le droit de modifier ses prix à tout moment, sans
            préavis.
          </p>
          <p
            className="text-white text-center mb-5 container mt-5"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            <span className="text-center mb-4">5. Commandes</span>
            <br />
            Les commandes sont exclusivement réalisées en ligne sur Yizbet. Le
            processus de commande comprend une redirection automatique vers
            Stripe pour le paiement sécurisé par carte Visa ou Mastercard. Le
            client n'a pas besoin de posséder un compte Stripe pour effectuer le
            paiement.
          </p>
          <p
            className="text-white text-center mb-5 container mt-5"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            <span className="text-center mb-4">6. Modalités de paiement</span>
            <br />
            Le paiement des commandes s'effectue par l'intermédiaire de Stripe,
            utilisant une carte de crédit (Visa ou Mastercard). Le paiement est
            exigible immédiatement à la commande.
          </p>
          <p
            className="text-white text-center mb-5 container mt-5"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            <span className="text-center mb-4">7. Non-remboursement</span>
            <br />
            En raison de la nature numérique des tokens, aucun remboursement ne
            sera possible une fois qu'ils sont achetés et crédités au compte du
            client.
          </p>
          <p
            className="text-white text-center mb-5 container mt-5"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            <span className="text-center mb-4">
              8. Propriété intellectuelle
            </span>
            <br />
            Tous les éléments du site Yizbet sont et restent la propriété
            intellectuelle et exclusive de Yizbet. Personne n'est autorisé à
            reproduire, exploiter, ou utiliser à quelque titre que ce soit, même
            partiellement, des éléments du site qu'ils soient sous forme de
            photo, logo, visuel ou texte.
          </p>
          <p
            className="text-white text-center mb-5 container mt-5"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            <span className="text-center mb-4">9. Données personnelles</span>
            <br />
            Yizbet s'engage à préserver la confidentialité des informations
            fournies par l'acheteur qui pourront être utilisées uniquement pour
            l'exécution de sa commande.
          </p>
          <p
            className="text-white text-center mb-5 container mt-5"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            <span className="text-center mb-4">
              10. Droit applicable et juridiction compétente
            </span>
            <br />
            Les présentes conditions de vente à distance sont soumises à la loi
            française. En cas de litige, compétence est attribuée aux tribunaux
            compétents de France, nonobstant pluralité de défendeurs ou appel en
            garantie.
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Cgv
