import { useEffect, useState } from "react";
import { API_URL } from "../Moviesearch";
import { useSearchParams } from "react-router-dom";
import Person from "../components/Person";
import { useAuth } from "../assets/AuthContext";
import { useLogin } from "../assets/LoginContext";

const People = () => {

  const [params] = useSearchParams();
  const personURL = `${API_URL}/people/${params.get("id")}`
  
  const token = localStorage.getItem("bearerToken")

  const [personDetails, setPerson] = useState({})
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  const {isAuthenticated,logout} = useAuth();
  const {toggleLogin, setMessage} = useLogin();

/*   useEffect(() => {
    if(isAuthenticated){
      getPersonDetails();
    } 
  }, [isAuthenticated]) */

  useEffect(() => {
    let isMounted = true;
    const getPersonDetails = async () => {
      try {
        setLoading(true)
        console.log(`Fetching from: \n -> ${personURL}` )
        const response = await fetch(personURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const json = await response.json();
        if ( response.status === 401 ) {
          if (isMounted) handle401(json.message);
        } else if (response.ok){
          console.log("Ok, setting data");
          if (isMounted) setData(json);
        } else {
          throw new Error(json.message);
        }
      } catch (error) {
        if (isMounted) console.error("Error retrieving data", error.message)
      }
    }

    getPersonDetails();

    return () => {
      isMounted = false;
    }
  }, [isAuthenticated])

  

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

  const handle401 = (errorMessage) => {
    console.log("Handling 401: ", errorMessage);
    
    if (errorMessage.includes("expired")) {
      if (!attemptRefresh()){
        console.log("Refresh failed");
        logout();
        setMessage("Session expired. Please log in")
        toggleLogin();
        setLoading(false)
      } else {
        console.log("Refreshed user");
      }
    } else {
      setMessage("You need an account to access this content. Please log in or register")
      toggleLogin();
      setLoading(false)
    }
  }

  return (
    <>
        <h3 className="text-center">Moviesearch - Person highlight</h3>
        {
          !isAuthenticated ? (
            <h3 className="text-center">You need an account to access this content. Please log in</h3>
          ) :
          (
            <Person {...personDetails} movies = {movies} />
          )
        }
        <h4 className={loading ? "d-block" : "d-none"}>Loading ...</h4>

    </>
  )
};

export default People;
