import { Button, FormGroup, Input, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader, FormFeedback} from 'reactstrap'
import { useLogin } from '../assets/LoginContext';
import { useState } from 'react';
import { API_URL } from '../Moviesearch';
import { useAuth } from '../assets/AuthContext';

/**
   * API url for the project
   */

const Login = () => {

  // Login context
  const {showLogin, toggleLogin, message, setMessage} = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false)

  const { login } = useAuth();

  const handleLogin = async () => {

    try {
      setLoading(true)
      const loginURL = `${API_URL}/user/login`;
      const requestOptions = {
        method:"POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: email,
          password: password
        }),
      }
      const response = await fetch(loginURL, requestOptions)
      const json = await response.json()
      if (json.error) {
        console.error("Login error:", json.message)
        setMessage(json.message)
      } else {
        login(json.bearerToken.token, json.refreshToken.token, email);
        console.log("Logged in");
        setLoading(false)
        toggleLogin();
        clear();
      }

    } catch (error) {
      console.error("Error handling login request:", error.message)
      setLoading(false)
    }
  }
  
  const handleEmailChange = (e) => {
    const { value: emailInput } = e.target;

    if (checkLength(emailInput)){
      updateErrorfield("Email cannot exceed 30 characters", true)
    }
    else if (checkRegex(emailInput)) {
      updateErrorfield("Invalid Email format.", true)
    }
    else {
      clearErrorfield();
    }
    setEmail(emailInput)
  }

  const checkLength = (email) => {
    return email.length >= 31;
  }

  const checkRegex = (email) => {
    // Arbitrary validation only accepting letters, numbers, dots and a single @
    // Valid: abc.123@abc.com
    let regex = /[a-zA-Z0-9._]+@[a-zA-Z.-]+$/;  // ^ - NOT, so NOT matching a-Z, 0-9,@,.
    return !regex.test(email)
  }

  const updateErrorfield = (string, invalid) => {
    setErrorMessage(string);
    setInvalidEmail(invalid);
  } 

  const clearErrorfield = () => {
    setErrorMessage("");
    setInvalidEmail(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!invalidEmail){
      handleLogin();  
    }
  }

  const clear = () => {
    setEmail("");
    setPassword("");
    setMessage("");
  }

  const cancel = () => {
    toggleLogin();
    clear();
  }

  /**
   * Development method
   * Cheatloging to avoid entering details
   */
  const cheatLogin = () => {
    setEmail("mike@gmail.com");
    setPassword("password")
    setMessage("Cheater!")
  };

  return (
    <>
      <Modal isOpen={showLogin} toggle={toggleLogin}>
        <ModalHeader toggle={toggleLogin}>
          Login
        </ModalHeader>
        <Form onSubmit={e => handleSubmit(e)}>
          <ModalBody>
            {message && 
              <div className='alert alert-secondary'>{message}</div>
            }
            <FormGroup row>
              <Label for="email">
                Email
              </Label>
              <Input 
                id="email" 
                name="email"
                placeholder=""
                type="email"
                value={email}
                onChange={ e => {
                  handleEmailChange(e)
                }}
                invalid={invalidEmail}
              />
            {
              (
                <FormFeedback valid={!invalidEmail}>
                  {errorMessage}
                </FormFeedback>
              )
            }
            </FormGroup>
            <FormGroup row>
              <Label for="password">
                Password
              </Label>
              <Input 
                id="password" 
                name="password"
                placeholder=""
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                invalid={invalidEmail}
              />
            </FormGroup>
          
          </ModalBody>
          <ModalFooter>
            <Button color="success" type='submit' disabled={invalidEmail || loading}>Log in</Button>
            <Button color="danger" onClick={cancel}>Cancel</Button>
            {/*  Cheatlogin for development   */}
            <div>
              <Button color="secondary" onClick={cheatLogin}>cheatLogin</Button>
            </div>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  )
};

export default Login;
