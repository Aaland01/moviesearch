import { Col, Row } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../Moviesearch";
import SearchBar from "../components/SearchBar";
import GridTable from "../components/GridTable";
import SimpleYearFilter from "../components/SimpleYearFilter";
import { ratingsPrettyPrint } from "../assets/ratingsPrint";
import infiniteDatasource from "../assets/infiniteDatasource";
import InfiniteTable from "../components/InfiniteTable";

const Movies = () => {

  const [movies, setMovies] = useState([])
  const [yearFilter, setYearFilter] = useState(null)
  const [loading, setLoading] = useState(true)

  const moviesURL = "/movies/search"
  const [params] = useSearchParams();
  const titleParam = params.get("title")

  const navigate = useNavigate();

  const searchParams = () => {
    const queryParams = new URLSearchParams();
    if (titleParam) queryParams.append("title",titleParam);
    if (yearFilter) queryParams.append("year",yearFilter);
    return queryParams;
  }

  const datasource = infiniteDatasource(moviesURL,searchParams());

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
    {headerName: "IMDB", field: "imdbRating"},
    {headerName: "RottenTomatoes", field: "rottenTomatoesRating"},
    {headerName: "Metacritic", field: "metacriticRating"},
    {headerName: "ID", field: "imdbID", hide: true},
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
          
          <InfiniteTable 
            datasource={datasource}
            columnDefs={columns} 
            onRowClicked={(row) => {
              console.log(row.data);
              navigate(`/movie?movieID=${row.data.imdbID}`
              )} 
            }
          />
        </Col>
      </Row>
    </>
  )
};

export default Movies;
