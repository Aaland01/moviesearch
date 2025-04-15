import { useState } from "react";
import { Container } from "reactstrap";

const People = () => {

  const dummyperson = {
    name: "Viggo Mortensen",
    "birthYear": 1970,
    "deathYear": null,
  }
  const dummyMovies = [
    {
      title: "movie"
    }
  ]

  const [person, setPerson] = useState({})
  const [movies, setMovies] = useState([])
  

  return (
    <>
      <Container className="people text-center py-4">
        <h3>Moviesearch - Person highlight</h3>
        <div>
          <div className="border-bottom border-4 border-accent">
            <h1 className="display-1">{person.name}</h1>
            <h3>{person.birthYear} {person.deathYear ? ` - ${person.deathYear}` : ""}</h3>
            Text
          </div>

          <div className="text-start pt-3">
            <h4 className="ps-5">Movies</h4>
            <div className="tempbox">
              AGGRID
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
