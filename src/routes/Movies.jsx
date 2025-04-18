import { Col, Row } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../Moviesearch";
import SearchBar from "../components/SearchBar";
import GridTable from "../components/GridTable";
import SimpleYearFilter from "../components/SimpleYearFilter";
import { ratingsPrettyPrint } from "../assets/ratingsPrint";
import infiniteDatasource from "../assets/infiniteDatasource";

const Movies = () => {

  const [movies, setMovies] = useState([])
  const [yearFilter, setYearFilter] = useState(null)
  const [loading, setLoading] = useState(true)

  const [params] = useSearchParams();
  const titleParam = params.get("title")

  const navigate = useNavigate();

  const datasource = infiniteDatasource("/movies/search",{
    ...(titleParam ? {title: titleParam} : {}),
    ...(yearFilter ? { year: yearFilter} : {}),
  });

  const moviesURL = () => {
    let moviesURL = `${API_URL}/movies/search`
    const queryParams = new URLSearchParams();
    if (titleParam) queryParams.append("title",titleParam);
    if (yearFilter) queryParams.append("year",yearFilter);
    if (queryParams.toString()) {
      moviesURL += `?${queryParams.toString()}`
    }
    console.log("Crafted moviesURL: ", moviesURL)
    return moviesURL;
  }

  const fetchMovies = async () => {
    try {
      const response = await fetch(moviesURL())
      const json = await response.json()
      const data = json.data
      setMovies(
        data.map( movie => {
          return {
            title: movie.title,
            year: movie.year,
            classification: movie.classification,
            ratings: ratingsPrettyPrint(movie),
            movieID: movie.imdbID,
          }
        })
      )
      setLoading(false)
    } catch (error) {
      console.error("Error retrieving data", error.message)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [params, yearFilter])

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

  const handleApply = (selectedYear) => {
    setYearFilter(selectedYear);
  }

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
            datasource={datasource}
            columnDefs={columns} 
            //rowData={movies} 
            onRowClicked={(row) => 
              navigate(`/movie?movieID=${row.data.movieID}`
            )} 
          />
          
        </Col>
      </Row>
    </>
  )
};

export default Movies;
