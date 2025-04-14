import { Col, Row } from "reactstrap";
import SearchBar from "../components/SearchBar";

const Movies = () => {

  return (
    <>
      <Row className="vh-100">
        <Col className="col-3 text-center pt-5 bg-accent">
          <Row>
            <h5>Filter by year:</h5>
          </Row>
          <Row className="mx-2">
            <div className="tempbox border-secondary border-2 border text-center">
              Component placeholder
            </div>
          </Row>
        </Col>
        <Col className="col-9">
          <h2> Movies containing {"{search}"} in title, from {"{year}"}</h2>
          <SearchBar />
          <div className="tempbox border-secondary border-2 border text-center">
             Component placeholder
          </div>
          
        </Col>
      </Row>
    </>
  )
};

export default Movies;
