import { useState } from "react";
import { Button } from "reactstrap";

// Hardcoded but can easily be made dynamic
const lastYear = 2023;
const startYear = 1990;

export const years = Array.from(
  { length: lastYear - startYear + 1 }, 
  (_, i) => startYear + i
);

const SimpleYearFilter = ({ onApply }) => {

  const [selectedYear, selectYear] = useState(0);

  const handleYearSet = (year) => selectYear(year);
  
  const applyFilter = (year) => {
    if (year === 0) onApply(0);
    else onApply(selectedYear)
  }

  return (
    <>
      <label htmlFor="year-select" className="form-label me-2">
        Select:
      </label>
      <div className="mx-0 mx-md-5">
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
        <Button className="clickable mt-3" size="md" onClick={applyFilter} color="success">
          Apply
        </Button>
      </div>

    </>
  )
};

export default SimpleYearFilter;
