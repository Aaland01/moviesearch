import { useState } from "react";
import { Button } from "reactstrap";

const SimpleYearFilter = ({ onApply }) => {

  // Hardcoded but can easily be made dynamic
  const lastYear = 2023;
  const startYear = 1990;

  const years = Array.from(
    { length: lastYear - startYear + 1 }, 
    (_, i) => startYear + i
  );

  const [selectedYear, selectYear] = useState(0);


  const clear = () => {
    selectYear(0);
    applyFilter(0);
  }

  const handleYearSet = (year) => {
    console.log(year);
    selectYear(year);
  }

  const applyFilter = (year) => {
    if (year === 0) onApply(0);
    else onApply(selectedYear)
  }

  return (
    <>
      <label htmlFor="year-select" className="form-label me-2">
        Select:
      </label>
      <div className="mx-5">
        <select
          id="year-select"
          className="form-select"
          value={selectedYear}
          onChange={(e) => handleYearSet(Number(e.target.value))}
        > 
          <option key="none" value={0}>----</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div>
        <Button className="mt-3" size="md" onClick={applyFilter} color="success">
          Apply
        </Button>
      </div>
      <Button className="mt-2" size="sm" onClick={clear} color="primary">
        Clear
      </Button>


    </>
  )
};

export default SimpleYearFilter;
