import React from 'react'
import FootballResults from '../Components/FootballResults'
import Navbar from '../Components/Navbar'

const Euro24 = () => {
  return (
    <>
    <Navbar />
    <div className='text-center'><h1>Bienvenue sur la page dédiée a Euro24</h1></div>
    
    <FootballResults />
    </>
  )
}

export default Euro24