import { Button, FormGroup, Input, Form, Label, ModalBody, ModalFooter} from 'reactstrap'
import { useLogin } from '../assets/LoginContext';
import { useState } from 'react';
import { API_URL } from '../Moviesearch';
import { useAuth } from '../assets/AuthContext';

/**
 * @returns The Modal content for logging in
 * @requires Parent Modal
 */
const LoginBody = () => {

  const { toggleLogin, setMessage } = useLogin();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [invalidLogin, setInvalidLogin] = useState(false);

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
        setInvalidLogin(true);
        setLoading(false)
      } else {
        login(json.bearerToken.token, json.refreshToken.token, email);
        toggleLogin();
        setLoading(false)
        clear();
      }

    } catch (error) {
      console.error("Error handling login request:", error.message)
      setLoading(false)
    }
  }
  
  const handleEmailChange = (newMail) => {
    setEmail(newMail)
    if (invalidLogin) setInvalidLogin(false)
  }

  const handlePasswordChange = (newPass) => {
    setPassword(newPass)
    if (invalidLogin) setInvalidLogin(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!invalidLogin){
      handleLogin();  
    }
  }

  const clear = () => {
    setEmail("");
    setPassword("");
    setMessage("");
    setInvalidLogin(false)
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
              onChange={ e => {handleEmailChange(e.target.value)}}
              invalid={invalidLogin}
              maxLength={40}
            />
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
              onChange={e => handlePasswordChange(e.target.value)}
              invalid={invalidLogin}
              maxLength={40}
            />
          </FormGroup>
        
        </ModalBody>
        <ModalFooter>
          <Button color="success" type='submit' disabled={invalidLogin || loading}>Log in</Button>
          <Button color="danger" onClick={cancel}>Cancel</Button>
          {/*  Cheatlogin for development   */}
          <div>
            <Button color="secondary" onClick={cheatLogin}>cheatLogin</Button>
          </div>
        </ModalFooter>
      </Form>

    </>
  )
};

export default LoginBody;
