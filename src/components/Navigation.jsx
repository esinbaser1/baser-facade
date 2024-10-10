import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/loginApi";

const Navigation = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour gérer l'ouverture du menu burger

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      console.log("Réponse du serveur lors de la déconnexion:", response);
      logout(); // Supprime les informations d'authentification du contexte et du localStorage
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Inverse l'état d'ouverture du menu
  };

  return (
    <header className="navigation">
      <NavLink to="/" className="logo">
        Baser
      </NavLink>

      <button className="burger-menu" onClick={toggleMenu}>
        &#9776;
      </button>

      <nav className={isMenuOpen ? "open" : ""}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Accueil
        </NavLink>
        <NavLink
          to="/nosServices"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Nos Services
        </NavLink>
        <NavLink
          to="/nosRealisations"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Nos Réalisations
        </NavLink>
        <NavLink
          to="/contactezNous"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Contactez-nous
        </NavLink>

        {auth.role === "admin" && (
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Admin
          </NavLink>
        )}

        {auth.token ? (
          <button onClick={handleLogout} aria-label="Déconnexion">
            Déconnexion
          </button>
        ) : null}
      </nav>
    </header>
  );
};

export default Navigation;
