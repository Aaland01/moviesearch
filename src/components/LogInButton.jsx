import { Button } from "reactstrap";
import { useLogin } from "../assets/LoginContext";
import { useAuth } from "../assets/AuthContext";

const LogInButton = ({ className = "" }) => {

  const {toggleLogin} = useLogin()
  const {isAuthenticated} = useAuth();
 
  const loginProps = {
    color: 'secondary',
    onClick: toggleLogin,
    id: "Login"
  }

  const logoutProps = {
    color: 'primary',
    onClick: toggleLogin,
    id: "Logout",
  }

  const actualProps = isAuthenticated ? logoutProps : loginProps;
  
  return (
    <Button className={`clickable ${className}`} {...actualProps}>
      {actualProps.id}
    </Button>
  )
};

export default LogInButton;
