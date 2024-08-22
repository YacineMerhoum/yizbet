import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Credit = ({ userId }) => {
    const [currentBalance, setCurrentBalance] = useState(0);
  
    useEffect(() => {
      const fetchCurrentBalance = async () => {
        try {
          const response = await axios.get(`http://localhost:3008/current-balance/${userId}`);
          console.log("Réponse de l'API:", response.data);
          setCurrentBalance(response.data.currentBalance);
        } catch (error) {
          console.error('Erreur lors de la récupération du crédit actuel:', error);
        }
      };
    
      fetchCurrentBalance();
    }, [userId]);
  
    return <>{currentBalance}</>;
  };
  

export default Credit;
