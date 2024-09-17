
import axios from 'axios';
import { URL } from './urlServer';

// Fonction pour obtenir les réseaux sociaux
export const fetchSocialNetworks = async (token) => {
  const response = await axios.get(`${URL}socialNetwork`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data; // Retourne les données de la réponse
};