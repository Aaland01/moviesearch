import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { Col, Row, Container, Badge, Button } from "reactstrap";
import { API_URL } from "../Moviesearch";
import { useNavigate, useSearchParams } from "react-router-dom";
import GridTable from "../components/GridTable";

const Movie = () => {

  const [movie, setMovie] = useState({})
  const [genres, setGenres] = useState([])
  const [involved, setInvolved] = useState([])
  const [ratings, setRatings] = useState([])

  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const movieURL = `${API_URL}/movies/data/${params.get("movieID")}`

  const fetchMovieData = async () => {
    try {
      const response = await fetch(movieURL)
      const json = await response.json()
      console.log(json);
      const poster = await handlePoster(json.poster);
      setMovie(
        {
          title: json.title,
          year: json.year,
          country: json.country,
          runtime: json.runtime,
          boxoffice: json.boxoffice,
          plot: json.plot,
          poster: poster,
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

  const handlePoster = async (posterSRC) => {
    try {
      const res = await fetch(
        posterSRC, { 
          method: "HEAD"}
      );
      if (res.ok) {
        console.log(`Source ok: ${posterSRC}`);
        return posterSRC;
      } else {
        console.warn(`Poster unavailable: ${posterSRC}`);
        return null
      }
    } catch (error) {
      console.error("Error checking poster: ", error.message );
      return null
    }
  }

  const runtimePrettyPrint = (runtime) => {
    if(!runtime){
      return "";
    }
    let hours = Math.floor( runtime / 60 )
    let minutes = runtime - hours*60;
    return `${hours} hours, ${minutes} minutes`;
  }

  const boxofficePrettyPrint = (boxoffice) => {
    if (!boxoffice) return "No Records";
    let numberString = boxoffice.toString();
    let print = ""
    for(let i = 1; i < numberString.length; i++){
      if ((numberString.length - i) % 3 === 0){
        print += " ";
      }
      print += numberString[i]
    }
    return `${print} $`;
  }

  const gridColumns = [
    {headerName: "Role", field: "category"},
    {headerName: "Name", field: "name"},
    {headerName: "Character", field: "characters"},
    {headerName: "Id", field: "id", hide: true},
  ]

  const posterSrc = () => {
    if (loading) {
      return (
        "logo.png"
      )
    }
    if (movie.poster) {
      return (
        movie.poster
      )
    } else {
      return (
        "logo.png"
      )
    }
  }

  return (
    <>
      <Hero imagesrc={posterSrc()}/>
      <h1 className={loading ? "d-block" : "d-none"}>Loading movie..</h1>
      <Container className={`pb-5 ${loading ? "d-none" : "d-block"} `}>
        <Row className="justify-content-start">
          <Col className="text-center col-12 col-sm-auto">
            <div className="posterwrapper">
              <img className="poster" src={posterSrc()}></img>
            </div>
            <p className="caption"> Small poster caption </p>
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
                columnDefs={gridColumns}
                rowData={involved}
                onRowClicked={row => navigate(
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
