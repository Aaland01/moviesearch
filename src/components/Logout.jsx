import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";

const Logout = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // some call to API 
    // + removing tokens from localstorage
    console.log("[LOGOUT] --- Logging out")
    toggleLogout();
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
