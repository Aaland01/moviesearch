import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

const NotFound = () => {
    return (
        <Container className='text-center pt-4'>
            <h1>404</h1>
            <h3>Page does not exist</h3>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Button tag={Link} to="/">
                Go back to Home
            </Button>
        </Container>
    );
};

export default NotFound;