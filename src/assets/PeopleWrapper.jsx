import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useLogin } from "./LoginContext";
import { useEffect } from "react";

const PeopleWrapper = ({children }) => {
  const { isAuthenticated } = useAuth();
  const { toggleLogin } = useLogin();

  useEffect(() => {
    if (!isAuthenticated) {
      toggleLogin("You need an account to access this content")
    }
  }, [isAuthenticated, toggleLogin])

  return isAuthenticated ? children : null;
};

export default PeopleWrapper;
