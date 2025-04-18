import { Button } from "reactstrap";
import { useLogin } from "../assets/LoginContext";

const LogInButton = ({ className = "" }) => {

  const {toggleLogin} = useLogin()
  
  return (
    <Button className={`clickable ${className}`} color='secondary' onClick={toggleLogin}>
      Log in
    </Button>
  )
};

export default LogInButton;
