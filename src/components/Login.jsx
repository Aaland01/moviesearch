import { Modal, ModalHeader} from 'reactstrap'
import { useLogin } from '../assets/LoginContext';
import { useAuth } from '../assets/AuthContext';
import LogoutBody from './LogoutBody';
import LoginBody from './LoginBody';

/**
   * API url for the project
   */

const Login = () => {

  // Login context
  const {showLogin, toggleLogin, message} = useLogin();
  const {isAuthenticated} = useAuth();

  const modalBody = isAuthenticated ? <LogoutBody /> : <LoginBody />

  return (
    <>
      <Modal isOpen={showLogin} toggle={toggleLogin}>
        <ModalHeader toggle={toggleLogin}>
          {isAuthenticated ? "Log out" : "Log in"}
        </ModalHeader>
        {message && 
            <div className='alert alert-secondary m-3 mb-0'>{message}</div>
          }
        {modalBody}
      </Modal>
    </>
  )
};

export default Login;
