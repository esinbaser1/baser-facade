import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Créer le contexte
export const AuthContext = createContext();

// Fournisseur de contexte
export const AuthProvider = ({ children }) => {
  const getLocalStorageItem = (key) => {
    return localStorage.getItem(key) || "";
  };

  const [auth, setAuth] = useState({
    token: getLocalStorageItem("token"),
    role: getLocalStorageItem("role"),
  });

  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setAuth({ token, role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuth({ token: "", role: "" });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};