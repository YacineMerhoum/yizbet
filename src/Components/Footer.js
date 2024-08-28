import React  from 'react'
import jeuxDanger from '../images/Autres/jeuxgouv.png'
import LogoYizbet from "../images/premierlogo.png"
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import logoStripe from '../images/Autres/stripe.png'

const Footer = () => {
  const [logoVisible , setLogoVisible] = useIntersectionObserver({ threshold: 0.5 })

  return (
    <>
      <a target='_blank'  href='https://joueurs-info-service.fr/'><img className='jeuxDanger' src={jeuxDanger}/></a>
        
    
    <div className='text-center sectionCopyright' style={{ backgroundColor: "000814"}}>
      <img ref={logoVisible} src={LogoYizbet} className='mt-2'
       style={ {height: "100px" , transition: 'opacity 4.5s', opacity: setLogoVisible ? 1 : 0 }} />
      <p className=''>Copyright 2024 Yizbet.
      <br />Tous droits réservés. Yizbet est une marque déposée. 
      <br />Yizbet n’est pas affilié ou lié à des équipes sportives, organisateurs d’évènements ou à des joueurs s’affichant sur ses sites web.</p> 
      <div className='partenaries mt-5'>
        <img src={logoStripe} alt='Stripe' style={{ height: "100px" , transition: 'opacity 2.5s', opacity: setLogoVisible ? 1 : 0 }} />
      </div>
   </div>
    </>
  )
}

export default Footer