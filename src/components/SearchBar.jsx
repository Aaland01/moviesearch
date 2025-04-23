import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";

const SearchBar = () => {

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search){
      console.log("No search parameters")
      return;
    }
    let url = `/movies?title=${search}`
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
            <Button 
            className="clickable" 
            disabled={search ? false : true} 
            id="search-button" 
            color="primary" 
            type="button"
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
