import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { API_URL } from "../Moviesearch";
import { useSearchParams } from "react-router-dom";

const People = () => {

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
        setMovies(json.roles)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error when requesting person: ", error.message)
      })
  }, [])

  const handle401 = (errorJSON) => {
    
  }
  

  const handleError = (message) => {
    console.log(message);
  }

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
            <div className="tempbox">

            </div>
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
