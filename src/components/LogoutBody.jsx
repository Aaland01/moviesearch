import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ModalBody, Row, Col } from "reactstrap";
import { useAuth } from "../assets/AuthContext";
import { API_URL } from "../Moviesearch";
import { useLogin } from "../assets/LoginContext";

/**
 * @returns The Modal content for logging out
 * @requires Parent Modal
 */
const LogoutBody = () => {

  const { toggleLogin, setMessage } = useLogin();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const logoutURL = `${API_URL}/user/logout`
      const refreshToken = localStorage.getItem("refreshToken")
      const requestOptions = {
        method:"POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          refreshToken: refreshToken
        })
      }
      const response = await fetch(logoutURL, requestOptions)
      const json = await response.json()
      
      if (json.error) console.error("Response error:", json.message)
      setMessage("You've successfully logged out. Goodbye!")
      // + removing tokens from localstorage
      
      logout();
      console.log("Logged out")
      setTimeout(() => {
        setLoading(false);
        setMessage("");
        toggleLogin();
        navigate("/");
      }, 2000)
      
    } catch (error) {
      console.error("Error handling logout:", error.message)
      setLoading(false)
    }
  }

  return (
    <>
      <ModalBody>
        <h3>Are you sure you want to log out?</h3>
        <Row className="pt-3 px-5">
          <Col>
            <Button color="danger" disabled={loading} onClick={handleLogout}>Log Out</Button>
          </Col>
          <Col className="text-end">
            <Button color="primary" disabled={loading} onClick={toggleLogin}>Cancel</Button>
          </Col>
        </Row>
      </ModalBody>
    </>
  )
};

export default LogoutBody;
