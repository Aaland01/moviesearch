import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const LogOutButton = ({ className = "" }) => {

  const navigate = useNavigate()

  const toggleLogout = () => {
    navigate("/logout")
  }
  
  return (
    <Button className={`clickable ${className}`} color='primary' onClick={toggleLogout}>
      Log out
    </Button>
  )
};

export default LogOutButton;
