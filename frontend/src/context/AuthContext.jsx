import decodeJWT from "@/lib/decodeJWT";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("access_token"),
  );

  const login = (token) => {
    localStorage.setItem("access_token", token);
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setAuthenticated(false);
  };

  const getUserId = () => {
    if (!authenticated) return null;
    const token = localStorage.getItem("access_token");
    const userId = decodeJWT(token).sub;
    return userId;
  };

  const getToken = () => {
    return localStorage.getItem("access_token");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, login, logout, getUserId, getToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
