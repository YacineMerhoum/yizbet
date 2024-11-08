import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const Balance = ({ userId }) => {
  const [currentBalance, setCurrentBalance] = useState(0)

  useEffect(() => {
    const fetchCurrentBalance = async () => {
      try {
        const response = await axios.get(`${API_URL}/current-balance/${userId}`)
        setCurrentBalance(response.data.currentBalance)
      } catch (error) {
        console.error('Erreur lors de la récupération du crédit actuel:', error)
      }
    }
    
    fetchCurrentBalance()

    const intervalId = setInterval(fetchCurrentBalance, 4000)

    return () => clearInterval(intervalId)
  }, [userId])

  return <>{currentBalance}</>
}

export default Balance
