import { Badge, Button, Col, Row } from "reactstrap";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import LogOutButton from "./LogOutButton";

const Footer = () => {

  const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
    }); 
  }; 

  return (
    <>
      <div className="footer text-bg-primary p-2">
        <Row className="pb-5">
          <Col className="order-2">
            <div>
              <ul>
                  <li>Contact</li>
                  <li>About</li>
                  <li>These dont work</li>
                </ul>
            </div>
          </Col>

          <Col className="text-center order-1 order-sm-3 col-12 col-sm-4">
            <Button className="clickable" color="success" size="sm" onClick={scrollToTop}>
              Back to top
            </Button>
          </Col>

          <Col className="order-5 text-end">
            <LogOutButton className="me-2" />
            <Link to={"/"}>
              <Logo />
            </Link>

          </Col>
        </Row>


        <div className="basement">
          {["shadow","secondary","success","danger","accent"].map(color => (
            <div key={`${color} circle`} className={`footerbadge rounded-circle bg-${color}`}></div>
          ))
          }
        </div>
      </div>
    </>
  )
};

export default Footer;
