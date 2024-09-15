import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
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
        {auth.token && <button onClick={handleLogout} aria-label="Déconnexion">Logout</button>}
      </nav>
    </header>
  );
};

export default Navigation;
