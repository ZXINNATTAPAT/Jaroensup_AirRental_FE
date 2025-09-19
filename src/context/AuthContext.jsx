// AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const token = cookies.get("authToken");
  const [user, setUser] = useState({ id: "", role: "" });

  useEffect(() => {
    if (token) {
      const decodeToken = jwtDecode(token);
      setUser({ id: decodeToken.id, role: decodeToken.role });
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
