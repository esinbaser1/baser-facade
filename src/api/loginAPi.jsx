import axios from 'axios';
import { URL } from './urlServer';

// Composant qui permet d'envoyer des requêtes API de connexion au serveur

export const loginUser = async ({ email, password }) => {
    const response = await axios.post(`${URL}login`, {
        email,
        password,
    });
    return response.data; // une fois la réponse reçue, la fonction retourne les données de la réponse
};

