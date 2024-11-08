import React from 'react'
import jeuxDanger from '../images/Autres/jeuxgouv.png'
import LogoYizbet from "../images/premierlogo.png"
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import logoStripe from '../images/Autres/stripe.png'
import prevention from "../images/Autres/prévention1.png"
import { Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

const Footer = () => {
  const [user] = useAuthState(auth);
  const [logoVisible , setLogoVisible] = useIntersectionObserver({ threshold: 0.5 })

  function scrollToTop() {
    window.scrollTo(0, 0)
  }

  return (
    <>
      <a target='_blank' href='https://joueurs-info-service.fr/'><img className='jeuxDanger' src={jeuxDanger} /></a>
      
      <div className='text-center sectionCopyright' style={{ backgroundColor: "000814" }}>
        <div className='text-center mt-2'>
          <p className='fontFooter1'>🔞 Jeux de hasard et d'argent interdits aux mineurs</p>
        </div>
        <div className='footer-links text-center fontFooter mt-4 mb-2' style={{ fontSize: "15px" }}>
          <Link onClick={scrollToTop} style={{ textDecoration: "none" , color: "white"}} to='/reglement' className='footer-link'> Règlement</Link> | 
          <Link onClick={scrollToTop} style={{ textDecoration: "none" , color: "white"}} to='/conditions' className='footer-link'> CGU</Link> | 
          <Link onClick={scrollToTop} style={{ textDecoration: "none" , color: "white"}} to='/cgv' className='footer-link'> CGV</Link> | 
          <Link onClick={scrollToTop} style={{ textDecoration: "none" , color: "white"}} to='/about-us' className='footer-link'> À propos de nous</Link> 
          

          {!user && (
            <>
              | <Link onClick={scrollToTop} style={{ textDecoration: "none" , color: "white"}} to='/register' className='footer-link'> Inscription</Link> | 
              <Link onClick={scrollToTop} style={{ textDecoration: "none" , color: "white"}} to='/login' className='footer-link'> Connexion</Link>
            </>
          )}
        </div>
        
        <img ref={logoVisible} src={LogoYizbet} className='mt-2'
          style={{ height: "100px", transition: 'opacity 4.5s', opacity: logoVisible ? 1 : 0 }} 
        />
        
        <p className='fontFooter'>Copyright 2024 Yizbet.
        <br />Tous droits réservés. Yizbet est une marque déposée. 
        <br />Yizbet n’est pas affilié ou lié à des équipes sportives, organisateurs d’évènements ou à des joueurs s’affichant sur ses sites web.</p> 
        
        <div className='partenaries mt-2 mb-3'>
          <img src={logoStripe} alt='Stripe' style={{ height: "100px", transition: 'opacity 2.5s', opacity: logoVisible ? 1 : 0 }} />
        </div>
        
        <img src={prevention} style={{ height: "15%" }} />
      </div>
    </>
  )
}

export default Footer
