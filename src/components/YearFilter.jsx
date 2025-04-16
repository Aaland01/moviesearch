import { useState } from "react";
import { Button, Col, Row } from "reactstrap";

const YearFilter = () => {

  const [century, setCentury] = useState("00");
  const [decade, setDecade] = useState(0);
  const [year, setYear] = useState(0);

  const upIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
    </svg>
  )

  const downIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
    </svg>
  )
  const availableCenturies = ["19","20"]

  const toggleCentury = () => {
    if (century === availableCenturies[0]){
      setYear(availableCenturies[1]);
    } else setYear(availableCenturies[0])
  }

  const increaseDecade = () => {
    if (maxDigit(decade)) return;
    else setDecade(decade + 1)
  }

  const decreaseDecade = () => {
    if (minDigit(decade)) return;
    else setDecade(decade - 1)
  }

  const increaseYear = () => {
    if (maxDigit(year)) return;
    else setYear(year + 1)
  }

  const decreaseYear = () => {
    if (minDigit(year)) return;
    else setYear(year - 1)
  }

  const maxCentury = () => {
    return century === availableCenturies[1];
  }

  const minCentury = () => {return !maxCentury()}

  const maxDigit = (digit) => {
    return digit >= 9;
  }

  const minDigit = (digit) => {
    return digit <= 0;
  }

  const maxDecade = () => {return maxDigit(decade)}
  const minDecade = () => {return minDigit(decade)}
  const maxYear = () => {return maxDigit(year)}
  const minYear = () => {return minDigit(year)}


  const decreaseButton = (onClick, disableWhen) => {
    return (
      <Button 
        outline 
        color="primary" 
        size="sm"
        onClick={onClick}
        disabled={disableWhen}
      >
        {downIcon}
      </Button>
    )
  }

  const increaseButton = (onClick, disableWhen) => {
    return (
      <Button 
        outline 
        color="primary" 
        size="sm"
        onClick={onClick}
        disabled={disableWhen}
      >
        {upIcon}
      </Button>
    )
  }


  return (
    <>
      <Row className="gx-0 mx-5 text-center">
        <Col className="col-4">
          {increaseButton(toggleCentury, maxCentury)}
          <div className="year-display">
            {century}
          </div>
          {decreaseButton(toggleCentury, minCentury)}
        </Col>
        <Col >
          {increaseButton(increaseDecade, maxDecade)}
          <div className="year-display">
            {decade}
          </div>
          {decreaseButton(decreaseDecade, maxDecade)}
        </Col>
        <Col>
          {increaseButton(increaseYear, maxYear)}
          <div className="year-display">
            {year}
          </div>
          {decreaseButton(decreaseYear, maxYear)}
        </Col>
      </Row>
    </>
  )
};

export default YearFilter;
