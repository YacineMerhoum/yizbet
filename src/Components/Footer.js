import React  from 'react'
import jeuxDanger from '../images/Autres/jeuxgouv.png'
import LogoYizbet from "../images/premierlogo.png"
import useIntersectionObserver from '../hooks/useIntersectionObserver'

const Footer = () => {
  const [logoVisible , setLogoVisible] = useIntersectionObserver({ threshold: 0.5 })

  return (
    <>
    
        <img className='jeuxDanger' src={jeuxDanger}/>
    
    <div className='text-center sectionCopyright' style={{ backgroundColor: "#212529"}}>
      <img ref={logoVisible} src={LogoYizbet} className='mt-2'
       style={ {height: "100px" , transition: 'opacity 4.5s', opacity: setLogoVisible ? 1 : 0 }} />
      <p className=''>Copyright 2024 Yizbet.
      <br />Tous droits réservés. Yizbet est une marque déposée. 
      <br />Yizbet n’est pas affilié ou lié à des équipes sportives, organisateurs d’évènements ou à des joueurs s’affichant sur ses sites web.</p>
   </div>
    </>
  )
}

export default Footer