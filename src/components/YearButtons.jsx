import { Button, Col, Row } from "reactstrap";
import { years } from "./SimpleYearFilter";
import { useNavigate } from "react-router-dom";

const YearButtons = () => {
  const availableYears = years
  const navigate = useNavigate()

  const yearButton = (year) => {

    return (
      <Col key={`Column for ${year}`}>
        <Button
          className="clickable"
          key={year}
          size="sm"
          color="accent"
          title={`Search for movies from ${year}`}
          onClick={() => navigate(`/movies?year=${year}`)}
        >
          {year}
        </Button>
      </Col>
    )
  }

  return (
    <>
      <Row className="g-3 m-3 mx-lg-5">
        {availableYears.map((year) => 
          yearButton(year)
        )}
      </Row>
    </>
  )
};

export default YearButtons;
