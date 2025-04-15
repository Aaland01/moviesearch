import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { Col, Row, Container, Badge, Button } from "reactstrap";
import { API_URL } from "../Moviesearch";

const Movie = () => {

  const [movie, setMovie] = useState({})
  const [genres, setGenres] = useState([])
  const [involved, setInvolved] = useState([])
  const [ratings, setRatings] = useState([])

  const [loading, setLoading] = useState(true)

  const tempMovie = {
    title: "Star Wars: Episode I - The Phantom Menace",
    year: 1999,
    imdbID: "tt0120915",
    imdbRating: 6.5,
    rottenTomatoesRating: 51,
    metacriticRating: 51,
    classification: "PG"
  }

  const imdbID = tempMovie.imdbID;

  useEffect( () => {
    fetch(`${API_URL}/movies/data/${imdbID}`)
      .then(response => response.json())
      .then(json => {
        setMovie(
          {
            title: json.title,
            year: json.year,
            runtime: json.runtime,
            boxoffice: json.boxoffice,
            plot: json.plot,
            poster: json.poster
          }
        );
        setGenres(json.genres);
        setLoading(false)
        setInvolved(json.principals);
        setRatings(json.ratings);
      })
  }, []);

  const runtimePrettyPrint = (runtime) => {
    let hours = Math.floor( runtime / 60 )
    let minutes = runtime - hours*60;
    return {hours: hours, minutes: minutes}
  }

  return (
    <>
      <Hero imagesrc={loading ? "movieposter.png" : movie.poster}/>
      <h1 className={loading ? "d-block" : "d-none"}>Loading movie..</h1>
      <Container className={loading ? "d-none" : "d-block"}>
        <Row className="justify-content-start">
          <Col className="col-auto">
            <div className="posterwrapper">
              <img className="poster" src={movie.poster}></img>
            </div>
            <p className="caption"> Small poster caption </p>
          </Col>
          <Col className="col-2 col-md-4 col-lg-6 col-xl-8">
            <h1>{movie.title}</h1>
            <h5>{movie.year}</h5>
            <h6 className="d-inline"> Runtime: </h6>
            <div className="d-inline "> 
              {`
              ${runtimePrettyPrint(movie.runtime).hours} hours, 
              ${runtimePrettyPrint(movie.runtime).hours} minutes
              `} 
            </div>
            <div className="genres mt-3">
              {
                genres.map(genre => (
                  <Badge key={genre} color="primary" className={`genre ${genre} px-2 me-2`}>
                    {genre}
                  </Badge>
                ))
              }
            </div>

            <Button color="primary"> See ratings and boxoffice</Button>

          </Col>
        </Row>
      </Container>
    </>
  )
};

export default Movie;
