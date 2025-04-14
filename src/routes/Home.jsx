import { Col, Container, Row } from "reactstrap";
import LogOutButton from "../components/LogOutButton";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <>
      <div className="fixed-bottom text-end p-2">
        {/* Temporary logout button */}
        <LogOutButton />
      </div>

      <div className="herowrapper">
        <img src="heroimage.png" className="img-fluid"/>
      </div>

      <Container className="text-center">
        <h1 className="title"> Moviesearch </h1>
        
        <SearchBar />

        <Row>
          <Col className="col-6">
            <h3> Movies by year </h3>
            <div className="tempbox"> Yearbuttons here </div>
          </Col>
          <Col className="col-6 border-3 border-start border-accent">
            <h3> Highlighted movie </h3>
            <div className="tempbox"> Movie component here </div>
          </Col>
        </Row>
        
        <Row className="pt-3 border-3 border-top border-accent">
          <h4> Some movies </h4>
          <div className="tempbox"> Lots of movie cards here </div>
        </Row>

      </Container>
    </>
  )
};

export default Home;
