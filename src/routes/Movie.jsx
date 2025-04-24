import { useEffect, useState } from "react";
import { Col, Row, Container, Badge, Button } from "reactstrap";
import { API_URL } from "../Moviesearch";
import { useNavigate, useSearchParams } from "react-router-dom";
import GridTable from "../components/GridTable";
import Hero from "../components/Hero";
import { boxofficePrettyPrint, runtimePrettyPrint } from "../assets/PrettyPrints";

const Movie = () => {

  const [movie, setMovie] = useState({})
  const [genres, setGenres] = useState([])
  const [involved, setInvolved] = useState([])
  const [ratings, setRatings] = useState([])

  const [loading, setLoading] = useState(true)
  const [posterCaption, setPosterCaption] = useState("")
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const movieID = params.get("movieID");
  const movieURL = `${API_URL}/movies/data/${movieID}`

  const fetchMovieData = async () => {
    try {
      if (movieID === null) {
        navigate("/notfound")
      }
      const response = await fetch(movieURL)
      const json = await response.json()
      //const poster = await handlePoster(json.poster);
      setMovie(
        {
          title: json.title,
          year: json.year,
          country: json.country,
          runtime: json.runtime,
          boxoffice: json.boxoffice,
          plot: json.plot,
          poster: json.poster,
        }
      )
      setGenres(json.genres);
      setRatings(json.ratings)
      setLoading(false);
      setInvolved(json.principals);
    } catch (error) {
      console.error("Error fetching movie data", error.message)
    }
  }

  useEffect( () => {
    fetchMovieData();
  }, []);

  const posterSrc = () => {
    if (loading) {
      return (
        "MovieSearchLogo.png"
      )
    }
    if (movie.poster) {
      return (
        movie.poster
      )
    } else {
      setPosterCaption("Poster not found")
      return (
        "MovieSearchLogo.png"
      )
    }
  }

  const gridColumns = [
    {headerName: "Role", field: "category"},
    {headerName: "Name", field: "name"},
    {headerName: "Character", field: "characters", cellDataType:"object", 
      valueFormatter: characters => characters[0]},
    {headerName: "Id", field: "id", hide: true},
  ]

  return (
    <>
      <Hero imagesrc={posterSrc()}/>
      <h1 className={loading ? "d-block" : "d-none"}>Loading movie..</h1>
      <Container className={`pb-5 ${loading ? "d-none" : "d-block"} `}>
        <Row className="justify-content-start">
          <Col className="text-center col-12 col-sm-auto">
            <div className="posterwrapper">
              <img 
                className="poster" 
                src={posterSrc()} 
                alt={`Poster for "${movie.title}"`}
                onError={(e) => { e.target.onerror = null; setPosterCaption("No poster found"); e.target.src = 'MovieSearchLogo.png'; }}
              />
            </div>
            <p className="caption">{posterCaption}</p>
          </Col>
          <Col className="col-12 col-sm-7 col-xl-8">
            <h1>{movie.title}</h1>
            <h5>{movie.year}</h5>
            <h6 className="pb-1 pb-md-4">{movie.country}</h6>
            <h6 className="d-inline"> Runtime: </h6>
            <div className="d-inline "> 
              {runtimePrettyPrint(movie.runtime)}
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
            <div className="buttonwrapper mt-3 m-md-1 text-start text-md-end">
              <Button 
                color="primary"
                onClick={() => {
                  document.getElementById("ratings")
                    .scrollIntoView({behavior: "smooth"})
                }}
              > See ratings and boxoffice</Button>
            </div>
          </Col>
        </Row>

        <Row className="pt-4">
          <Col className="col-12 col-sm-5">
            <h3>Description</h3>
            <p>{movie.plot}</p>
            <h3 id="ratings">Ratings</h3>
            <div className="ps-4">
              {
                ratings.map((rating) => {
                  if (!rating.value) {
                    rating.value = "No rating"
                  } return (
                      <figure key={rating.source}> 
                        <blockquote className="blockquote">
                          <p>{rating.value}</p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                          <cite title={rating.source}>{rating.source}</cite>
                        </figcaption>
                      </figure>
                  )
                })
              }
            </div>
            <div >
              <h4 className="boxoffice">
                Boxoffice
              </h4>
              <p className="ps-4 fw-bold fs-4">
                {boxofficePrettyPrint(movie.boxoffice)}
              </p>
            </div>
          </Col>

          <Col className="ps-sm-4 border-start border-2 border-accent col-12 col-sm-7">
            <h3>People involved</h3>
            <div className="gridwrapper text-capitalize">
              <GridTable
                columnDefs = {gridColumns}
                data = {involved}
                onRowClicked = {row => navigate(
                  `/people?id=${row.data.id}`
                )}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default Movie;
