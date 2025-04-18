import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { API_URL } from "../Moviesearch";
import { useSearchParams } from "react-router-dom";
import Person from "../components/Person";

const People = () => {

  const [params] = useSearchParams();
  const personURL = `${API_URL}/people/${params.get("id")}`
  
  const token = localStorage.getItem("bearerToken")

  const [personDetails, setPerson] = useState({})
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const getPersonDetails = async () => {
    try {
      console.log(`Fetching from: \n -> ${personURL}` )
      const response = await fetch(personURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const json = await response.json();
      console.log(json);
      if ( response.status === 401 ) {
        handle401(response.message)
      } else if (response.ok){
        console.log("Ok, setting data");
        setData(json);
      } else {
        throw new Error(json.message);
      }
    } catch (error) {
      console.error("Error retrieving data", error.message)
    }
  }

  const setData = (json) => {
    setPerson({
      name: json.name,
      birthYear: json.birthYear,
      deathYear: json.deathYear
    });
    setMovies(json.roles);
    setLoading(false);
    console.log("Data set for ", json.name);
  }

  useEffect(() => {
    getPersonDetails();
  }, [])

  const handle401 = (errorMessage) => {
    // case 1
    // Authorization header ('Bearer token') not found
    // Code related - non-user specific
    // case 2
    // JWT token has expired
    // handle refresh
    // case 3
    // Invalid JWT token
    // Cannot access this
    // handle logout if not refresh and not bearer
    // 
  }

  return (
    <>
        <h3 className="text-center">Moviesearch - Person highlight</h3>
        <h4 className={loading ? "d-block" : "d-none"}>Loading ...</h4>
        <Person {...personDetails} movies = {movies} />
    </>
  )
};

export default People;
