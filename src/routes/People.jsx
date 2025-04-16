import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { API_URL } from "../Moviesearch";
import { useNavigate, useSearchParams } from "react-router-dom";
import GridTable from "../components/GridTable";

const People = () => {

  const navigate = useNavigate();

  const [params] = useSearchParams();
  const personURL = `${API_URL}/people/${params.get("id")}`
  
  const token = localStorage.getItem("token")

  const [person, setPerson] = useState({})
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log(`Fetching from: \n -> ${personURL}` )

    fetch(personURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(async res => {
        if ( res.status === 401 ) {
          const errorJSON = await res.json();
          handle401(errorJSON);
          throw new Error("401 Unauthorized")
          
        } else if (res.ok){
          return res.json();

        } else {
          const errorJSON = await res.json();
          handleError(errorJSON.message);
          throw new Error("Request failed")
        }
      })
      .then(json => {
        console.log(json);
        
        setPerson({
          name: json.name,
          birthYear: json.birthYear,
          deathYear: json.deathYear
        });
        setMovies((json.roles));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error when requesting person: ", error.message)
      })
  }, [])

  const handle401 = (errorJSON) => {
    // Something to redirect
  }
  
  const handleError = (message) => {
    console.log(message);
  }
  
  /**
   * 
   * 
   * {
      "movieName": "Star Trek: First Contact",
      "movieId": "tt0117731",
      "category": "actor",
      "characters": [
        "Picard"
      ],
      "imdbRating": 7.6
    }
   */

  const columns = [
    {headerName: "Role", field: "category"},
    {headerName: "Movie", field: "movieName"},
    {headerName: "Characters", field: "characters"},
    {headerName: "IMDBrating", field: "imdbRating"},
    {headerName: "ID", field: "movieID", hide: true},
  ]

  return (
    <>
      <Container className="people text-center py-4">
        <h3>Moviesearch - Person highlight</h3>
        <div>
          <h4 className={loading ? "d-block" : "d-none"}></h4>
          <div className="border-bottom border-4 border-accent">
            <h1 className="display-1">{person.name}</h1>
            <h3>{person.birthYear} {person.deathYear ? ` - ${person.deathYear}` : ""}</h3>
          </div>

          <div className="text-start pt-3">
            <h4 className="ps-5">Movies</h4>
            <GridTable 
              rowData={movies}
              columnDefs={columns}
              onRowClicked={row => navigate(
                `/movie?movieid=${row.data.movieID}`
              )}
            />
          </div>
          <div className="text-end pt-3">
            <h4 className="pe-5">Ratings at a glance</h4>
            <div className="tempbox">
              Diagram
            </div>
          </div>

        </div>
      </Container>
    </>
  )
};

export default People;
