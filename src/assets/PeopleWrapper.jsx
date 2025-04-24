import { useAuth } from "./AuthContext";
import { useLogin } from "./LoginContext";
import { useEffect } from "react";

const PeopleWrapper = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { toggleLogin, setMessage } = useLogin();

  useEffect(() => {
    if (!isAuthenticated) {
      setMessage("You need an account to access this content.")
      toggleLogin;
    }
  }, [isAuthenticated])

  return isAuthenticated ? children : null;
};

export default PeopleWrapper;
