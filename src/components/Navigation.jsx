import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/loginApi";

const Navigation = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      console.log("Réponse du serveur lors de la déconnexion:", response);
      logout(); // Supprimer les informations d'authentification du contexte et du localStorage
      navigate("/"); // Rediriger vers la page d'accueil après la déconnexion
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };
  

  return (
    <header>
      <nav>
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/nosServices">Nos Services</NavLink>
        <NavLink to="/nosRealisations">Nos Réalisations</NavLink>
        <NavLink to="/contactezNous">Contactez-nous</NavLink>

        {/* Afficher le lien admin seulement si l'utilisateur est admin */}
        {auth.role === "admin" && <NavLink to="/admin">Admin</NavLink>}

        {/* Afficher le bouton de déconnexion seulement si l'utilisateur est connecté */}
        {auth.token && (
          <button
            onClick={handleLogout}
            aria-label="Déconnexion"
          >
            Déconnexion
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
