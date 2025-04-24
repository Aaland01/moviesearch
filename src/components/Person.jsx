import { Container } from "reactstrap";
import GridTable from "../components/GridTable";
import { useNavigate } from "react-router-dom";
import Graph from "./Graph";


/**
 * 
 * @param {Object} personDetails: name, birthYear, deathYear
 * @param {List} personMovies: [Object]
 * @returns Page for a single person
 */
const Person = ({name, birthYear, deathYear, movies}) => {

  const navigate = useNavigate();

  const columns = [
    {headerName: "Role", field: "category"},
    {headerName: "Movie", field: "movieName"},
    {headerName: "Characters", field: "characters", 
      valueFormatter: characters => characters[0]},
    {headerName: "IMDBrating", field: "imdbRating"},
    {headerName: "ID", field: "movieID", hide: true},
  ]

  return (
    <>
        <Container className="people text-center py-4">

          <div className="border-bottom border-4 border-accent">
            <h1 className="display-1">{name}</h1>
            <h3>{birthYear ? birthYear : ""} {deathYear ? ` - ${deathYear}` : ""}</h3>
          </div>

          <div className="text-start pt-3">
            <h4 className="ps-5">Movies involving {name}</h4>
            <GridTable 
              data={movies}
              columnDefs={columns}
              onRowClicked={row => navigate(
                `/movie?movieid=${row.data.movieID}`
              )}
            />
          </div>
          <div className="py-5">
            <h4 className="text-end pe-5">Ratings at a glance</h4>
            <Graph movies={movies}/>
          </div>
        </Container>
    </>
  )
};

export default Person;
