import { useEffect, useRef, useState } from "react";
import { API_URL } from "../Moviesearch";
import { useSearchParams } from "react-router-dom";
import Person from "../components/Person";
import { useAuth } from "../assets/AuthContext";
import { useLogin } from "../assets/LoginContext";
import LogInButton from "../components/LogInButton";
import { Container } from "reactstrap";

const People = () => {

  const [params] = useSearchParams();
  const personURL = `${API_URL}/people/${params.get("id")}`
  
  const token = localStorage.getItem("bearerToken")

  const [personDetails, setPerson] = useState({})
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [refetchTrigger, setTrigger] = useState(0)

  const {isAuthenticated, logout, attemptRefresh} = useAuth();
  const {toggleLogin, setMessage} = useLogin();

  const hasFetched = useRef(false)


  useEffect(() => {
    let isMounted = true;

    const getPersonDetails = async () => {
      if (!isMounted || hasFetched.current || !isAuthenticated) return;
      hasFetched.current = true;

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
          if (json.message.includes("expired")) {
            console.log("JWT Token expired, attempting refresh:");
            const refreshAttempt = await attemptRefresh();
            if (refreshAttempt){
              hasFetched.current = false;
              setTrigger(prev => prev + 1)
              setLoading(false);
              return;
            } else {
              console.log("Refresh failed");
              logout();
              setMessage("Session expired. Please log in")
              setLoading(false);
              return;
            }
          } else {
            console.log("Non-expired 401: ", json.message);
            setMessage("You need an account to access this content. Please log in or register")
            setLoading(false);
            return;
          }
        } else if (response.ok){
          setData(json);
        } else {
          throw new Error(json.message);
        }
      } catch (error) {
        console.error("Error retrieving person:", error.message)
      }
    }

    getPersonDetails();

    return () => {
      isMounted = false;
    }
  }, [isAuthenticated, logout, attemptRefresh, refetchTrigger])

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

  return (
    <>
        <h3 className="text-center">Moviesearch - Person highlight</h3>
        <h4 className={`loadingbar bg-accent p-2 text-center ${loading ? "d-block" : "d-none"}`}>Loading ...</h4>
        {
          !isAuthenticated ? (
            <Container className="text-center p-3 ">
              <h3 className="p-2">You need an account to access this content.</h3>
              <h4 className="p-2"> Please log in </h4>
              <LogInButton className="btn-lg"/>
            </Container>
          ) :
          (
            <Person {...personDetails} movies = {movies} />
          )
        }

    </>
  )
};

export default People;
