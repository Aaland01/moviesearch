import { useEffect } from "react";
import { ratingsPrettyPrint } from "./PrettyPrints";

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