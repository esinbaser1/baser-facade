import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  // Vérification du rôle et du token
  if (!auth.token || auth.role !== "admin") {
    return <Navigate to="/"/>;
  }
  return children;
};

// Validation des props avec PropTypes
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;