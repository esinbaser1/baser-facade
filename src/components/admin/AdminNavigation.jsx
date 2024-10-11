import { NavLink } from "react-router-dom";

const AdminNavigation = () => {
    return (
        <div className="admin-navigation">
            <NavLink to="/gestionContenu" className={({ isActive }) => isActive ? "active" : ""}>Gestion du contenu</NavLink>
            <NavLink to="/gestionImage" className={({ isActive }) => isActive ? "active" : ""}>Gestion des images</NavLink>
            <NavLink to="/gestionReseauSocial" className={({ isActive }) => isActive ? "active" : ""}>Gestion des réseaux sociaux</NavLink>
            <NavLink to="/gestionInformationContact" className={({ isActive }) => isActive ? "active" : ""}>Gestion des informations de contact</NavLink>
            <NavLink to="/gestionContact" className={({ isActive }) => isActive ? "active" : ""}>Messages reçus</NavLink>
        </div>
    );
};

export default AdminNavigation;
