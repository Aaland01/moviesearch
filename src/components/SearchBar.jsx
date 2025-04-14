import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import { API_URL } from "../Moviesearch";


const SearchBar = () => {

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [dummydata, setDummydata] = useState({})

  const getDummydata = () => {

    const tempSearch = "Star Wars"

    return fetch(`${API_URL}/movies/search?=${tempSearch}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => 
      res.json()
        .then((res) => {
          console.log(res);
          setDummydata({

          })
        })
    )
    .catch( error => console.error(error))
  }

  const handleSearch = () => {
    if (!search){
      console.log("No search parameters")
      return;
    }
    let url = `/movie?title${search}`
    console.log(`Navigating to: | ${url} |`);
    navigate(url)
  }

  return (
    <>
      <div className="mt-3 mb-5">
        <Row className="align-items-center justify-content-sm-center justify-content-start">
          <Col className="col-7 px-2 px-sm-0">
            <input className="w-100 p-2 px-3 bg-accent rounded-pill" type="search" name="search" id="search" 
              aria-labelledby="search-button"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
              }}
            />
          </Col>
          <Col className="col-2">
            <Button id="search-button" color="primary" type="button"
            onClick={handleSearch}
            >
              Search
            </Button>
          </Col>
        </Row>
      </div>
    </>
  )
};

export default SearchBar;
