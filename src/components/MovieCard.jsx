import { Col, Row } from "reactstrap";

const MovieCard = () => {
  return (
    <>
      <Row>
        <Col className="col-1 border-3 border-start border-accent"></Col>
        <Col className="col">
            <div className="tempbox">
                Movie

            </div>
        </Col>
        <Col className="col-1"></Col>
      </Row>
    </>
  )
};

export default MovieCard;
