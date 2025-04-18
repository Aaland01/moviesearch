import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthWrapper = ({children}) => {
  
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isloading, setLoading] = useState(true)

  useEffect(() => {
    const bearerToken = localStorage.getItem("bearerToken");
    // THEN CHECK FOR REFRESH
    if (bearerToken) {
      console.log(" - BearerToken exists - ")
      setAuthenticated(true);
    } else {
      console.error("Token not gotten:", bearerToken)
    }
    setLoading(false);
  }, []);

  /**
   * 
   * @param {String} bearerToken 
   * @param {String} refreshToken 
   * Stores (DANGEROUS) tokens in localstorage and updates authenticated context
   */
  const login = (bearerToken, refreshToken) => {
    localStorage.setItem("bearerToken", bearerToken);
    localStorage.setItem("refreshToken", refreshToken);
    setAuthenticated(true);
  }

  /**
   * Removes tokens from local storage and updates authenticated context
   */
  const logout = () => {
    localStorage.removeItem("bearerToken");
    localStorage.removeItem("refreshToken");
    setAuthenticated(false);
    console.log("[AUTHcon] Logged out")
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, login, logout }}>
      {!isloading && children}  
    </AuthContext.Provider>
  )
};
