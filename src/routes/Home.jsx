import { Col, Container, Row } from "reactstrap";
import SearchBar from "../components/SearchBar";
import Hero from "../components/Hero";
import { useNavigate } from "react-router-dom";
import YearButtons from "../components/YearButtons";
import MovieCard from "../components/MovieCard";

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
          <Col className="col-12 col-md-6 pt-4 pt-md-0">
            <h3> Highlighted movie </h3>
            <MovieCard />
          </Col>
        </Row>

      </Container>
    </>
  )
};

export default Home;
