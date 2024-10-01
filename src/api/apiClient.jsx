import axios from "axios";
import { URL } from './urlServer';

// Créer une instance d'Axios
const apiClient = axios.create({
  baseURL: URL,
});

// Intercepteur pour ajouter automatiquement le token JWT à toutes les requêtes
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Ajouter le token JWT si présent
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Si l'utilisateur n'a pas explicitement défini un autre Content-Type (comme multipart/form-data)
    // alors on utilise par défaut "application/json"
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fonction pour configurer l'intercepteur avec la fonction de déconnexion
export const setupInterceptors = (logout) => {
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      // Si le token est expiré, déconnecter l'utilisateur
      if (error.response && error.response.status === 401) {
        logout(); // Appel à la fonction logout passée depuis AuthContext
      }
      return Promise.reject(error);
    }
  );
};

export default apiClient;
