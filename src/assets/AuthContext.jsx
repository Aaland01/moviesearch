import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthWrapper = ({children}) => {
  
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isloading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(" - Authenticated - ")
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuthenticated(true);
  }

  const logout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, login, logout }}>
      {!isloading && children}  
    </AuthContext.Provider>
  )
};
