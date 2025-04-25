import { Col, Row } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import GridTable from "../components/GridTable";
import SimpleYearFilter from "../components/SimpleYearFilter";
import infiniteDatasource from "../assets/infiniteDatasource";

const Movies = () => {

  const [yearFilter, setYearFilter] = useState(null)
  const [searchFilter, setSearchFilter] = useState("")

  const moviesURL = "/movies/search"
  const [params] = useSearchParams();
  const titleParam = params.get("title")
  const yearParam = params.get("year")

  const navigate = useNavigate();

  const searchParams = () => {
    const queryParams = new URLSearchParams();
    if (titleParam) {
      queryParams.append("title",titleParam);
      if (titleParam !== searchFilter) setSearchFilter(titleParam);
    }
    if (yearParam) {
      queryParams.append("year",yearParam);
      if (yearParam !== yearFilter) setYearFilter(yearParam);
    }
    console.log("Table params:",queryParams.toString())
    return queryParams;
  }

  const datasource = infiniteDatasource(moviesURL,searchParams());

  const pageHeading = () => {
    let heading = "Movies"
    if (titleParam) heading += ` titled "${titleParam}"`
    if (yearParam) heading += ` from ${yearParam}`;
    else return "All " + heading
    return heading
  }

  const columns = [
    {headerName: "Title", field: "title"},
    {headerName: "Year", field: "year"},
    {headerName: "Classification", field: "classification", cellClass: "text-center"},
    {headerName: "IMDB", field: "imdbRating", cellClass: "text-center"},
    {headerName: "RottenTomatoes", field: "rottenTomatoesRating", cellClass: "text-center"},
    {headerName: "Metacritic", field: "metacriticRating", cellClass: "text-center"},
    {headerName: "ID", field: "imdbID", hide: true},
  ]

  const handleYearApply = (selectedYear) => {
    setYearFilter(selectedYear);
    const newQueryParams = new URLSearchParams();
    if (searchFilter) newQueryParams.append("title",searchFilter);
    if (selectedYear) newQueryParams.append("year",selectedYear);
    console.log("Year:",newQueryParams.toString())
    navigate(`/movies?${newQueryParams.toString()}`)
  }

  const handleSearchApply = (selectedSearch) => {
    setSearchFilter(selectedSearch);
    const newQueryParams = new URLSearchParams();
    if (selectedSearch) newQueryParams.append("title",selectedSearch);
    if (yearFilter) newQueryParams.append("year",yearFilter);
    console.log("Year:",newQueryParams.toString())
    navigate(`/movies?${newQueryParams.toString()}`)
  }

  return (
    <>
      <Row className="m-0">
        <Col className="col-3 text-center pt-5 bg-accent">
          <Row>
            <h5>Filter by year:</h5>
          </Row>

          <SimpleYearFilter onApply={handleYearApply}/>

        </Col>
        <Col className="col-9">
          <h2 className="ps-5"> {pageHeading()} </h2>
          <SearchBar onApply={handleSearchApply}/>
          
          <GridTable infinite = {true}
            data = {datasource}
            columnDefs = {columns} 
            onRowClicked={(row) => {
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
