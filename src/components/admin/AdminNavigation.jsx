import { NavLink } from "react-router-dom";

const AdminNavigation = () => {
    return (
        <div>
            <NavLink to="">Gestion du contenu</NavLink>
            <NavLink to="">Gestion des images</NavLink>
            <NavLink to="">Gestion des réseaux sociaux</NavLink>
            <NavLink to="">Gestion des informations de contact</NavLink>
            <NavLink to="">Messages reçus</NavLink>
            <NavLink to="">Paramètres du site</NavLink>
        </div>
    );
};

export default AdminNavigation;