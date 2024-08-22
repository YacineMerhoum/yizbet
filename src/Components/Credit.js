import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Credit = ({ userId }) => {
  const [currentCredit, setCurrentCredit] = useState(0)

  useEffect(() => {
    const fetchCurrentCredit = async () => {
      try {
        const response = await axios.get(`http://localhost:3008/current-credit/${userId}`)
        setCurrentCredit(response.data.currentCredit);
        console.log(response , "oeoeoeoeo");
      } catch (error) {
        console.error('Erreur lors de la récupération du crédit actuel:', error)
        
      }
    };

    fetchCurrentCredit();
  }, [userId]);

  return (
    
     <>{currentCredit}</> 
    
  );
};

export default Credit;
