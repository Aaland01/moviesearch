import { useState } from "react";
import { Button } from "reactstrap";

const SimpleYearFilter = () => {

  const currentYear = 2025;
  const startYear = 1950;

  const years = Array.from(
    { length: currentYear - startYear + 1 }, 
    (_, i) => startYear + i
  );

  const [selectedYear, selectYear] = useState(0);


  const clear = () => {
    selectYear(0);
  }

  const handleYearSet = (year) => {
    console.log(year);
    selectYear(year);
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
      <Button className="mt-5" size="sm" onClick={clear} color="primary">Clear</Button>

    </>
  )
};

export default SimpleYearFilter;
