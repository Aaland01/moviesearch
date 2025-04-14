import { Container } from "reactstrap";
import LogOutButton from "../components/LogOutButton";

const Home = () => {
  return (
    <>
      <div className="fixed-bottom text-end p-2">
        {/* Temporary logout button */}
        <LogOutButton />
      </div>

      <div className="herowrapper">
        <img src="heroimage.png" className="img-fluid"/>
      </div>

      <Container className="text-center">
        <h1 className="title"> Moviesearch </h1>


      </Container>
    </>
  )
};

export default Home;
