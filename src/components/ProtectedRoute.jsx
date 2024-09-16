import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => { // children représente tout ce qui est contenu à l'intérieur du composant ProtectedRoute quand il est utilisé, fait référence aux composants que je passes à l'intérieur de ProtectedRoute 
  const { auth } = useContext(AuthContext);

  // Vérification du rôle et du token
  if (!auth.token || auth.role !== "admin") {
    return <Navigate to="/"/>;
  }
  return children;
};

// Validation des props avec PropTypes
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;