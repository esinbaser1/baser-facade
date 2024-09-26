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
    userId: getLocalStorageItem("userId"), 
  });

  const login = (token, role, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId); 
    setAuth({ token, role, userId });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setAuth({ token: null, role: null, userId: null });
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
