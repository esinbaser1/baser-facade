import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { logoutUser } from "../api/loginApi";


const Navigation = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const mutation = useMutation(logoutUser, {
    onSuccess: () => {
      logout();
      navigate("/");
    }
  });

  const handleLogout = () => {
    mutation.mutate(auth.token); // Déclenche la mutation avec le token de l'utilisateur
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
            disabled={mutation.isLoading}  // Désactive le bouton si la déconnexion est en cours
          >
            {mutation.isLoading ? "Déconnexion..." : "Déconnexion"}
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
