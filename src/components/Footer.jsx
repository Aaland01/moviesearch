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
              <ul className="footerlist ps-2 list-group">
                  <li>
                    <Link className="text-background" to={"/"}>Home</Link>
                  </li>
                  <li>
                    <Link className="text-background" to={"/register"}>Register</Link>
                  </li>
                  <li>
                    <Link className="text-background" to={"/movies"}>Movies</Link>
                  </li>                  
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

          </Col>
        </Row>

        <div className="text-center">
          All data from IMDB, Metacritic and RottenTomatoes
        </div>
        <p className="text-center">
          © Haakon Aaland
        </p>
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
