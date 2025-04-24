import { createContext, useContext, useEffect, useRef, useState } from "react";
import { API_URL } from "../Moviesearch";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthWrapper = ({children}) => {
  
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isloading, setLoading] = useState(true)
  // For displaying email
  const [user, setUser] = useState("")

  const hasCheckedForTokens = useRef(false);

  useEffect(() => {

    const tokensCheck = async () => {
      if (hasCheckedForTokens.current) return;
      hasCheckedForTokens.current = true;

      const storedBearerToken = localStorage.getItem("bearerToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");
      
      if (storedBearerToken && storedRefreshToken) {
        console.log("Bearer token found");
        setUser(localStorage.getItem("email"))
        const refreshSuccess = await attemptRefresh();
        if (!refreshSuccess) {
          console.log("Initial refresh failed");
          logout();
        } else {
          console.log("User refreshed");
        }
        
      } else {
        console.log("Missing tokens - Not authenticated")
        logout();
      }
      setLoading(false);
    }
    
    tokensCheck();
  }, []);

  /**
   * 
   * @param {String} bearerToken 
   * @param {String} refreshToken 
   * Stores (DANGEROUS) tokens in localstorage and updates authenticated context
   */
  const login = (bearerToken, refreshToken, email) => {
    console.log("[AUTH] LOGIN - Setting new tokens");
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
    console.log("[AUTH] LOGOUT - Clearing tokens");
    localStorage.removeItem("bearerToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("email");
    setAuthenticated(false);
    setUser("");
  };

  /**
   * Will see if there is a refreshtoken stored, and then attempt to use it to refresh bearertoken
   * @returns true if re-authenticated, false otherwise
   */
  const attemptRefresh = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken")
      const refreshURL = `${API_URL}/user/refresh`
      const requestOptions = {
        method:"POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          refreshToken: refreshToken
        })
      }
      if ( refreshToken ) {
        const response = await fetch(refreshURL,requestOptions)
        const json = await response.json()
        if (json.error) {
          throw new Error(json.message)
        }
        const newBearer = json.bearerToken.token;
        const newRefresh = json.refreshToken.token;
        const email = localStorage.getItem("email")
        login(newBearer, newRefresh, email)
        return true;
      } else {
        console.warn("Else triggered, refreshToken is null");
        return false;
      }
    } catch (error) {
      console.error("Attemptrefresh failed:", error.message)
      return false;
    }    
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, login, logout, attemptRefresh, user }}>
      {!isloading && children}  
    </AuthContext.Provider>
  )
};
