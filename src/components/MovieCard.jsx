import { Button, Col, Row } from "reactstrap";
import { years } from "./SimpleYearFilter";
import { useEffect, useRef, useState } from "react";
import { fetchMoviesData, fetchPagination, fetchPoster } from "../assets/MoviesData";
import { Link } from "react-router-dom";

const MovieCard = () => {

  const [selectedMovie, setSelectedMovie] = useState({});

  /**
   * 
   * @returns A random movie - based on randomizing a year, then a page, and a movie from that page.
   */
  const pickRandomMovie = async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    // Randomizing a year
    const randomYearIndex = Math.floor(Math.random() * (years.length));
    const randomYear = years[randomYearIndex];

    // Randomizing a page of movies within that year
    const pagination = await fetchPagination(randomYear);
    const lastPage = pagination.lastPage;
    const randomPage = Math.floor( Math.random() * lastPage + 1)
    const moviesRange = await fetchMoviesData(randomYear, randomPage);
    
    // Randomizing an index within that page
    const randomIndex = Math.floor(Math.random() * moviesRange.length)
    
    const theMovie = moviesRange[randomIndex];
    theMovie.poster = await posterSrc(theMovie.movieID)
    
    setSelectedMovie(theMovie)
    
    hasFetched.current = false;
  }

  const posterSrc = async (movieID) => {
    const poster = await fetchPoster(movieID);
    
    if ( poster ) return poster;
    else {
      console.warn("Poster not found")
      return (
        "MovieSearchLogo.png"
      )
    }
  }

  const hasFetched = useRef(false);

  useEffect( () => {
    pickRandomMovie();
  }, []
  )

  return (
    <>
      <Row className="pt-md-4 pt-2">
        <Col className="col-1 border-3 border-start border-accent d-md-flex d-none"></Col>
        <Col className="col">
          <Link className="text-decoration-none" to={`/movie?movieID=${selectedMovie.movieID}`}>
            <img
              className="poster pb-2" 
              src={selectedMovie.poster}
              title={(selectedMovie.poster == "MovieSearchLogo.png") ? "Poster missing" : ""}
              alt={`Poster for "${selectedMovie.title}"`}
              onError={(e) => { e.target.onerror = null; e.target.src = 'MovieSearchLogo.png'; }}
            />
            <h3>{selectedMovie.title ? selectedMovie.title : "Title missing"}</h3>
            <h5>{selectedMovie.year ? selectedMovie.year : "Year missing"}</h5>
          </Link>
          <div title="Ratings" className="mx-5 bg-accent rounded-pill"> {selectedMovie.ratings}</div>
          <div className="mt-4">
            <Button
              className="clickable"
              onClick={() => pickRandomMovie()}
            >
              Get another movie
            </Button>
          </div>
        </Col>
        <Col className="col-1 d-md-flex d-none"></Col>
      </Row>
    </>
  )
};

export default MovieCard;
