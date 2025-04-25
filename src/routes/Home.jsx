import { Col, Container, Row } from "reactstrap";
import SearchBar from "../components/SearchBar";
import Hero from "../components/Hero";
import { useNavigate } from "react-router-dom";
import YearButtons from "../components/YearButtons";

const Home = () => {

  const navigate = useNavigate();

  return (
    <>
      <Hero imagesrc={"heroimage.png"} />

      <Container className="text-center">
        <h1 className="title"> Moviesearch </h1>
        
        <SearchBar onApply={(search) => {
          console.log(`/movies?title=${search}`)
          navigate(`/movies?title=${search}`)
        }} />

        <Row>
          <Col className="col-12 col-md-6">
            <h3> Movies by year </h3>
            <YearButtons />
          </Col>
          <Col className="col-12 col-md-6 pt-4 pt-md-0 border-3 border-start border-accent">
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
