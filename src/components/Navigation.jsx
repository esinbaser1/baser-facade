import { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const Navigation = () => {
    const { auth } = useContext(AuthContext);

    const role = auth.role;
    const isLoged = !!auth.token; //renverra true si auth.token contient une valeur et false si auth.token est une valeur null, undefined, une chaîne vide, etc.

    return (
        <header>
            <nav>
                <NavLink to="/">Accueil</NavLink>
                <NavLink to="/nosServices">Nos Services</NavLink>
                <NavLink to="/nosRealisations">Nos Réalisations</NavLink>
                <NavLink to="/contactezNous">Contactez-nous</NavLink>

                { role === 'admin' && <NavLink to="/admin">Admin</NavLink> }
                { isLoged && <NavLink to="/logout">Logout</NavLink> }
            </nav>
        </header>
    );
};

export default Navigation;
