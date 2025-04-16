import { Button, Col, Row } from "reactstrap";
import SearchBar from "../components/SearchBar";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GridTable from "../components/GridTable";
import { API_URL } from "../Moviesearch";
import SimpleYearFilter from "../components/SimpleYearFilter";

const Movies = () => {

  const [movies, setMovies] = useState([])
  const [yearFilter, setYearFilter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [params] = useSearchParams();
  const titleParam = params.get("title")

  /**
   * TODO
   * Table size
   */

  const navigate = useNavigate();

  useEffect(() => {
    let moviesURL = `${API_URL}/movies/search`

    const queryParams = new URLSearchParams();
    if (titleParam) queryParams.append("title",titleParam);
    if (yearFilter) queryParams.append("year",yearFilter);
    if (queryParams.toString()) {
      moviesURL += `?${queryParams.toString()}`
    }
    console.log("Fetching movies from: ", moviesURL);
    
    fetch(moviesURL)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        return json.data;
      })
      .then(data => 
        data.map( movie => {
          return {
            title: movie.title,
            year: movie.year,
            classification: movie.classification,
            ratings: ratingsPrettyPrint(movie),
            movieID: movie.imdbID,
          }
        })
      ).then(movies => {
        setMovies(movies);
        console.log("Movies retrieved");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies: ", error.message);
        setLoading(true)
      })
  }, [params, yearFilter])

  const ratingsPrettyPrint = (movieObj) => {
    const ratings = []
    if(movieObj.imdbRating){
      let imdbRating = movieObj.imdbRating.toString();
      if(!imdbRating.includes(".")) imdbRating += ".0";
      ratings.push(imdbRating)
    } else ratings.push("\u00A0\u00A0\u00A0");

    ratings.push(movieObj.rottenTomatoesRating ? movieObj.rottenTomatoesRating.toString() : "\u00A0\u00A0\u00A0\u00A0\u00A0");
    ratings.push(movieObj.metacriticRating ? movieObj.metacriticRating.toString() : "");
    
    return ratings.join("\u00A0\u00A0\u00A0");
  }

  const handleApply = (selectedYear) => {
    setYearFilter(selectedYear);
  }

  const pageHeading = () => {
    let heading = "Movies"

    if (titleParam) heading += ` titled "${titleParam}"`
    if (yearFilter) heading += ` from ${yearFilter}`;
    else return "All " + heading
    return heading
  }

  const columns = [
    {headerName: "Title", field: "title"},
    {headerName: "Year", field: "year"},
    {headerName: "Classification", field: "classification"},
    {headerName: "Ratings", field: "ratings"},
    {headerName: "ID", field: "movieID", hide: true},
  ]

  return (
    <>
      <Row className="vh-100">
        <Col className="col-3 text-center pt-5 bg-accent">
          <Row>
            <h5>Filter by year:</h5>
          </Row>

          <SimpleYearFilter onApply={handleApply}/>

        </Col>
        <Col className="col-9">
          <h2 className="ps-5"> {pageHeading()} </h2>
          <SearchBar />
          
          <GridTable 
            columnDefs={columns} 
            rowData={movies} 
            onRowClicked={(row) => navigate(
              `/movie?movieID=${row.data.movieID}`
            )} 
          />
          
        </Col>
      </Row>
    </>
  )
};

export default Movies;
