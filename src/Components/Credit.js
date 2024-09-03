import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Credit = ({ onLoaded }) => {
  const [lastPaymentAmount, setLastPaymentAmount] = useState(0)
  const user = useSelector(state => state.user.user)

  useEffect(() => {
    const fetchLastPayment = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/last-payment/${user.id}`)
        setLastPaymentAmount(response.data.amount);
        onLoaded()
        console.log(response, "Dernier paiement récupéré")
      } catch (error) {
        console.error('Erreur lors de la récupération du dernier paiement:', error)
      }
    };

    if (user && user.id) {
      fetchLastPayment()
    }
  }, [user, onLoaded])

  return <>{lastPaymentAmount / 100}</>;
};
export default Credit

