import { useState } from "react";
import { Button, Container } from "reactstrap";

const SearchBar = ( {onApply }) => {

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search){
      console.warn("No search parameters")
      return;
    }
    onApply(search);
  }

  return (
    <>
      <div className="mt-3 mb-5">
        <Container>
          <input maxLength={50} 
            className="w-75 p-2 px-3 bg-accent rounded-pill" 
            type="search" name="search" id="search" 
            aria-labelledby="search-button"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
            }}
          />
          <Button 
            className="clickable ms-2"
            disabled={search ? false : true} 
            id="search-button" 
            color="primary" 
            type="button"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Container>
      </div>
    </>
  )
};

export default SearchBar;
