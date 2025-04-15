import { Button, FormGroup, Input, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader, FormFeedback} from 'reactstrap'
import { useLogin } from './LoginContext';
import { useState } from 'react';
import { API_URL } from '../Moviesearch';

/**
   * API url for the project
   */

const Login = () => {

  // Login context
  const {showLogin, toggleLogin} = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const login = () => {
    const url = `${API_URL}/user/login`;

    return fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
    .then((res) => 
      res.json()
        .then((res) => {
          if(res.error){
            updateErrorfield(res.message, true);
            console.log(res)
            return;
          }
          //!WARNING this is not industry standard or safe
          // but a simplification. Better methods later
          localStorage.setItem("token", res.accessToken)
          console.log(res)
          toggleLogin;
        })
    )
    .catch(error => console.error(error));
  };

  const handleEmailChange = (e) => {
    const { value: emailInput } = e.target;

    if (checkLength(emailInput)){
      updateErrorfield("Email cannot exceed 30 characters", true)
    }
    else if (checkRegex(emailInput)) {
      updateErrorfield("Email cannot contain symbols or spaces", true)
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
    let regex = /[^a-zA-Z0-9@.]+@[a-zA-Z.]+$/;  // ^ - NOT, so NOT matching a-Z, 0-9,@,.
    return regex.test(email)
  }

  const updateErrorfield = (string, invalid) => {
    setErrorMessage(string);
    setInvalidEmail(invalid);
  } 

  const clearErrorfield = () => {
    setErrorMessage("");
    setInvalidEmail(false);
  }

  const handleSubmit = () => {
    e.preventDefault();
    if (!invalidEmail){
      login();  
    }
  }

  /**
   * Development method
   * Cheatloging to avoid entering details
   */
  const cheatLogin = () => {
    const url = `${API_URL}/user/login`;

    return fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // temporary hardcoded credentials
      body: JSON.stringify({
        email: "mike@gmail.com",
        password: "password"
      }),
    })
    .then((res) => 
      res.json()
        .then((res) => {
          //!WARNING this is not industry standard or safe
          // but a simplification. Better methods later
          console.log(res);
          localStorage.setItem("token", res.bearerToken.token);
          console.log(localStorage.getItem("token"))
          toggleLogin();
        })
    )
    .catch(error => console.error(error));
  };

  return (
    <>
      <Modal isOpen={showLogin} toggle={toggleLogin}>
        <ModalHeader toggle={toggleLogin}>
          Login
        </ModalHeader>
        <Form onSubmit={e => handleSubmit(e)}>
          <ModalBody>
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
                <FormFeedback>
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
            <Button color="success" type='submit' disabled={invalidEmail}>Log in</Button>
            <Button color="danger" onClick={toggleLogin}>Cancel</Button>
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
