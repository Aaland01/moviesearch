import { ratingsPrettyPrint } from "./PrettyPrints";
import { API_URL } from "../Moviesearch";

const moviesURL = (yearFilter, page) => {
    let moviesURL = `${API_URL}/movies/search`
    const queryParams = new URLSearchParams();
    if (yearFilter) queryParams.append("year",yearFilter);
    if (page) queryParams.append("page",page);
    if (queryParams.toString()) {
      moviesURL += `?${queryParams.toString()}`
    }
    return moviesURL;
  }

  export const fetchPagination = async (yearFilter, searchFilter) => {
    try {
      const queryParams = new URLSearchParams();
      if (yearFilter) queryParams.append("year",yearFilter);
      if (searchFilter) queryParams.append("title",searchFilter);
      let paramURL = `${API_URL}/movies/search`
      const params = queryParams.toString() ? queryParams.toString() : ""
      if ( params ) paramURL += `?${params}`;
      const response = await fetch(paramURL)
      const json = await response.json()
      const pagination = json.pagination
      
      return pagination;
    
    } catch (error) {
      console.error("Error retrieving pagination data", error.message)
    }
  }

export const fetchMoviesData = async (yearFilter, page) => {
  try {
    const response = await fetch(moviesURL(yearFilter, page))
    const json = await response.json()
    const data = json.data
    return data.map( movie => {
      return {
        title: movie.title,
        year: movie.year,
        classification: movie.classification,
        ratings: ratingsPrettyPrint(movie),
        movieID: movie.imdbID,
      }
    })
  
  } catch (error) {
    console.error("Error retrieving Movies data", error.message)
  }
}

export const fetchPoster = async (movieID) => {
  try {
    if (!movieID) return;
    const response = await fetch(`${API_URL}/movies/data/${movieID}`)
    const json = await response.json()
    return json.poster;
  } catch (error) {
    console.error("Error fetching poster", error.message)
  }
}
