import { NavLink } from "react-router-dom";

const AdminNavigation = () => {
    return (
        <div>
            <NavLink to="/gestionContenu">Gestion du contenu</NavLink>
            <NavLink to="/gestionImage">Gestion des images</NavLink>
            <NavLink to="/gestionReseauSocial">Gestion des réseaux sociaux</NavLink>
            <NavLink to="">Gestion des informations de contact</NavLink>
            <NavLink to="">Messages reçus</NavLink>
            <NavLink to="">Paramètres du site</NavLink>
        </div>
    );
};

export default AdminNavigation;