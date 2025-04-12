import { Container } from "reactstrap";
import LogOutButton from "../components/LogOutButton";

const Home = () => {
  return (
    <>
      <Container>
        <h1> Moviesearch </h1>
      </Container>
      {/* Temporary logout button */}
      <LogOutButton />
    </>
  )
};

export default Home;
