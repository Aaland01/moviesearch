import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import { useAuth } from "../assets/AuthContext";
import { API_URL } from "../Moviesearch";

const Logout = () => {

  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = async () => {
    // some call to API 
    try {
      const logoutURL = `${API_URL}/user/logout`
      const refreshToken = localStorage.getItem("refreshToken")
      const requestOptions = {
        method:"POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          refreshToken: refreshToken
        })
      }
      const response = await fetch(logoutURL,requestOptions)
      const json = await response.json()
      
      if (json.error) console.error("Response error:", json.message)
      
      // + removing tokens from localstorage
      logout();
      console.log("Logged out")
      toggleLogout();
    } catch (error) {
      console.error("Error handling logout:", error.message)
    }
  }

  const [showLogout, setShowLogout] = useState(true);

  const toggleLogout = () => {
    setShowLogout( prev => !prev);
    navigate("/")
  }

  return (
    <>
      <Modal isOpen={showLogout} toggle={toggleLogout}>
        <ModalHeader toggle={toggleLogout}>
          Are you sure you want to logout?
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Button color="danger" onClick={handleLogout}>Log Out</Button>
            </Col>
            <Col className="text-end">
              <Button color="primary" onClick={toggleLogout}>Cancel</Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  )
};

export default Logout;
