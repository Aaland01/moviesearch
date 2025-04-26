import { Button, Col, Row } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SearchBar from "../components/SearchBar";
import GridTable from "../components/GridTable";
import SimpleYearFilter from "../components/SimpleYearFilter";
import infiniteDatasource from "../assets/infiniteDatasource";
import { fetchPagination } from "../assets/MoviesData";
import { resultsPrettyPrint } from "../assets/PrettyPrints";

const Movies = () => {

  // const [yearFilter, setYearFilter] = useState(null)
  // const [searchFilter, setSearchFilter] = useState("")
  const [results, setResults] = useState();

  const moviesURL = "/movies/search"
  const [params] = useSearchParams();
  const titleParam = params.get("title")
  const yearParam = params.get("year")

  const navigate = useNavigate();

  const hasFetched = useRef(false);

  useEffect( () => {
    getResults(yearParam, titleParam)
  }, [yearParam, titleParam])

  const searchParams = () => {
    const queryParams = new URLSearchParams();
    if (titleParam) {
      queryParams.append("title",titleParam);
    }
    if (yearParam) {
      //Hardcoded validation check for year parameter
      if (yearParam < 1990 || yearParam > 2023) {
        console.warn("Invalid parameter for year");
        params.delete("year");
      }
      else queryParams.append("year",yearParam);
    }
    return queryParams;
  }

  const datasource = infiniteDatasource(moviesURL, searchParams());

  const getResults = async (resultsYear, resultsTitle) => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const results = await fetchPagination(resultsYear, resultsTitle);
    
    setResults(resultsPrettyPrint(results.total))
    hasFetched.current = false;
  }

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
    {headerName: "Rated", field: "classification", headerClass: "text-center", cellClass: "text-center"},
    {headerName: "IMDB", field: "imdbRating", cellClass: "text-center"},
    {headerName: "RottenTomatoes", field: "rottenTomatoesRating", cellClass: "text-center"},
    {headerName: "Metacritic", field: "metacriticRating", cellClass: "text-center"},
    {headerName: "ID", field: "imdbID", hide: true},
  ]

  const handleYearApply = (selectedYear) => {
    //setYearFilter(selectedYear);
    const newQueryParams = new URLSearchParams();
    if (titleParam) newQueryParams.append("title",titleParam);
    if (selectedYear) newQueryParams.append("year",selectedYear);
    navigate(`/movies?${newQueryParams.toString()}`)
  }

  const handleSearchApply = (selectedSearch) => {
    //setSearchFilter(selectedSearch);
    const newQueryParams = new URLSearchParams();
    if (selectedSearch) newQueryParams.append("title",selectedSearch);
    if (yearParam) newQueryParams.append("year",yearParam);
    navigate(`/movies?${newQueryParams.toString()}`)
  }

  const handleClear = () => navigate(`/movies`);

  return (
    <>
      <Row className="m-0">
        <Col className="col-3 text-center pt-5 bg-accent">

          <div className="pb-md-3">
            <h3>Results</h3>
            <p>{results}</p>
          </div>
          
          <h5>Filter by year:</h5>
          

          <SimpleYearFilter onApply={handleYearApply}/>

          <Button className="mt-4 clickable" size="sm" onClick={handleClear} color="primary">
            Clear all filters
          </Button>
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
