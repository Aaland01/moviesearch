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
      console.log(refreshToken);
      if ( refreshToken ) {
        const response = await fetch(refreshURL,requestOptions)
        const json = await response.json()
        console.log("Response:",json);
        if (json.error) {
          throw new Error(json.message)
        }
        const newBearer = json.bearerToken.token;
        const newRefresh = json.refreshToken.token;
        const email = localStorage.getItem("email")
        login(newBearer, newRefresh, email)
        setLoading(false)
        return true;
      } else {
        console.warn("Else triggered, refreshToken is null");
        return false;
      }
    } catch (error) {
      console.error("Error retrieving refreshtoken:", error.message)
      return false;
    }    
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, login, logout, attemptRefresh, user }}>
      {!isloading && children}  
    </AuthContext.Provider>
  )
};
