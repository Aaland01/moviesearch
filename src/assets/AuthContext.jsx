import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthWrapper = ({children}) => {
  
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isloading, setLoading] = useState(true)
  // For displaying email
  const [user, setUser] = useState("")

  useEffect(() => {
    const bearerToken = localStorage.getItem("bearerToken");
    // THEN CHECK FOR REFRESH
    if (bearerToken) {
      setAuthenticated(true);
      setUser(localStorage.getItem("email"))
    } else {
      console.log("No Token found - Not authenticated")
    }
    setLoading(false);
  }, []);

  /**
   * 
   * @param {String} bearerToken 
   * @param {String} refreshToken 
   * Stores (DANGEROUS) tokens in localstorage and updates authenticated context
   */
  const login = (bearerToken, refreshToken, email) => {
    localStorage.setItem("bearerToken", bearerToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("email", email)
    setAuthenticated(true);
    setUser(email);
  }

  /**
   * Removes tokens from local storage and updates authenticated context
   */
  const logout = () => {
    localStorage.removeItem("bearerToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("email");
    setAuthenticated(false);
    setUser("");

  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, login, logout, user }}>
      {!isloading && children}  
    </AuthContext.Provider>
  )
};
