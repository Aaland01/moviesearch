import { Button } from "reactstrap";

const MSButton = (props) => {
  return (
    <>
      <Button color="secondary">
        {props.text}
      </Button>
    </>
  )
};

export default MSButton;
