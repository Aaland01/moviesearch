import { Badge, Button, Col, Row } from "reactstrap";
import Logo from "./Logo";
import { Link } from "react-router-dom";

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
        <Row className="gx-0 pb-3">
          <Col className="order-2">
            <div>
              <ul>
                  <li>Contact</li>
                  <li>About</li>
                  <li>These dont work</li>
                </ul>
            </div>
          </Col>

          <Col className="text-center order-1 order-sm-3 col-12 col-sm">
            <Button className="clickable" color="success" size="sm" onClick={scrollToTop}>
              Back to top
            </Button>
          </Col>

          <Col className="order-5 text-end">
            <Link to={"/"}>
              <Logo />
            </Link>
            {/* DEV */}
            <div>
              <Button className="clickable" color="info" size="sm" 
                onClick={e => {
                  console.log("Bearer:",localStorage.getItem("bearerToken"));
                  console.log("Refresh:",localStorage.getItem("refreshToken"));
                  
              }}>
                Print my tokens!
              </Button>
              <Button className="clickable" color="info" size="sm" 
                onClick={e => {
                  localStorage.setItem("bearerToken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pa2VAZ21haWwuY29tIiwiZXhwIjoxNzQ1Mzg2ODQ2LCJpYXQiOjE3NDUzODYyNDZ9.TrrjMBRJ2Xlrk2_iCuVarOGyecVL3HzRXINksUbkG8w")
                  console.log("Expired Bearer:", localStorage.getItem("bearerToken"))
              }}>
                Expire Bearer
              </Button>
            </div>
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
