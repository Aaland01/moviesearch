import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { Col, Row, Container, Badge, Button } from "reactstrap";
import { API_URL } from "../Moviesearch";
import { AgGridReact } from "ag-grid-react";
import { gridTheme } from "../assets/aggridtheme";
import { ModuleRegistry, ClientSideRowModelModule, ValidationModule, ColumnAutoSizeModule } from 'ag-grid-community'
import { useNavigate } from "react-router-dom";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule,
  ColumnAutoSizeModule
]);

const Movie = () => {

  const [movie, setMovie] = useState({})
  const [genres, setGenres] = useState([])
  const [involved, setInvolved] = useState([])
  const [ratings, setRatings] = useState([])

  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

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
        setLoading(false);
        setInvolved(json.principals);
        setRatings(json.ratings);
      })
  }, []);

  const runtimePrettyPrint = (runtime) => {
    if(!runtime){
      return "";
    }
    let hours = Math.floor( runtime / 60 )
    let minutes = runtime - hours*60;
    return `${hours} hours, ${minutes} minutes`;
  }

  const boxofficePrettyPrint = (boxoffice) => {
    if (!boxoffice) return "No Data";
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

  return (
    <>
      <Hero imagesrc={loading ? "movieposter.png" : movie.poster}/>
      <h1 className={loading ? "d-block" : "d-none"}>Loading movie..</h1>
      <Container className={`pb-5 ${loading ? "d-none" : "d-block"} `}>
        <Row className="justify-content-start">
          <Col className="text-center col-12 col-sm-auto">
            <div className="posterwrapper">
              <img className="poster" src={movie.poster}></img>
            </div>
            <p className="caption"> Small poster caption </p>
          </Col>
          <Col className="col-12 col-sm-7 col-xl-8">
            <h1>{movie.title}</h1>
            <h5>{movie.year}</h5>
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
            <div className="buttonwrapper text-end">
              <Button color="primary"
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
                ratings.map((rating) => (
                  <figure key={rating.source}> 
                    <blockquote className="blockquote">
                      <p>{rating.value}</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                      <cite title={rating.source}>{rating.source}</cite>
                    </figcaption>
                  </figure>
                ))
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

          <Col className="ps-sm-4 border-start border-2 border-accent col-12 col-sm">
            <h3>People involved</h3>
            <div className="gridwrapper text-capitalize">
              <AgGridReact
                autoSizeStrategy={{type: "fitCellContents"}}
                theme={gridTheme}
                columnDefs={gridColumns}
                rowData={involved}
                onRowClicked={row => navigate(
                  `/people?=${row.data.id}`
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
