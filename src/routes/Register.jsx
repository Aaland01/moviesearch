import { useEffect, useState } from 'react';
import { useAuth } from '../assets/AuthContext';
import { useLogin } from '../assets/LoginContext';
import { Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import { API_URL } from '../Moviesearch';

const Register = () => {
  
  const { setMessage, toggleLogin } = useLogin();
  const { isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [happyMessage, setHappyMessage] = useState("");

  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    try {
      if (!email || !password) {
        updateErrorfield("All details need to be filled in")
        return;
      }
      if (!comparePasswords(password, passwordConfirm)) {
        updatePasswordError("Passwords do not match")
        return;
      }
      setLoading(true);
      const registerURL = `${API_URL}/user/register`;
      const requestOptions = {
        method:"POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: email,
          password: password
        }),
      }
      const response = await fetch(registerURL, requestOptions)
      const json = await response.json()
      if (json.error) {
        if (json.message.includes("already exists")) {
          updateErrorfield("A user with this email already exists.")
          setLoading(false)
          return;
        } else {
          console.error("Error not regarding duplicate user:", json.message)
          setLoading(false)
        }
      } else {
        setHappyMessage("User succesfully created!")
        setMessage("User succesfully created. Please log in")
        clear();
        if (!isAuthenticated) toggleLogin();
      }
    } catch (error) {
      console.error("Error during registration:", error.message)
    }
  }

  const handleEmailChange = (e) => {
    const { value: emailInput } = e.target;

    if (checkLength(emailInput)){
      updateErrorfield("Email cannot exceed 30 characters")
    }
    else if (checkRegex(emailInput)) {
      updateErrorfield("Invalid Email format.")
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

  const updateErrorfield = (string) => {
    setErrorMessage(string);
    setInvalidEmail(true);
  } 

  const clearErrorfield = () => {
    setErrorMessage("");
    setInvalidEmail(false);
  }

  const handlePasswordChange = (passwordValue) => {
    if (checkPassLength(passwordValue)) {
      updatePasswordError("Password has to be between 6 and 20 characters long")
    } if (checkStrength(passwordValue)) {
      updatePasswordError("Password needs to have at least 1 of each: Upper case, lower case, number")
    } else {
      clearPasswordError()
    }
    setPassword(passwordValue)
  }

  const checkPassLength = (passwordValue) => {
    const passLength = passwordValue.length;
    return (passLength < 6 || passLength > 20);
  }

  const checkStrength = (passwordValue) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).+$/
    return !regex.test(passwordValue)
  }

  const handleConfirmChange = (newConfirm) => {
    setPasswordConfirm(newConfirm)
    if (!comparePasswords(password, newConfirm)) {
      updatePasswordError("Passwords do not match");
    } else {
      console.log("No errors");
      clearPasswordError();
    }
  }

  const comparePasswords = (pass1, pass2) => {
    const comparison = pass1.localeCompare(pass2);
    return comparison === 0;
  }

  const updatePasswordError = (string) => {
    setPasswordMessage(string)
    setInvalidPassword(true)
  }

  const clearPasswordError = () => {
    setPasswordMessage("");
    setInvalidPassword(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!invalidEmail){
      handleRegister();  
    }
  }

  const clear = () => {
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    clearPasswordError();
    clearErrorfield();
  }

  useEffect(() => clear() ,[]);

  return (
    <>
      <Container>
        <Row className='justify-content-center pb-5'>
          <Col className='col-auto col-md-7 col-lg-6 bg-accent p-5 rounded'>
            <h1 className='pb-3'>Register user</h1>
            {happyMessage && (
                    <p className='text-success'>
                      {happyMessage}
                    </p>
                  )}
            {isAuthenticated && (<p>You're already authenticated, but you may register another user.</p>)}
            <Form onSubmit={e => handleSubmit(e)}>
              <div className='pb-2 border-bottom border-2 border-background'>
                <FormGroup className='pt-2 border-top border-2 border-background' row>
                  <Label for="email">
                    Email
                  </Label>
                  <Input 
                    className='border-secondary'
                    id="email" 
                    name="email"
                    placeholder=""
                    type="email"
                    value={email}
                    onChange={ e => {
                      handleEmailChange(e)
                    }}
                    invalid={invalidEmail}
                    maxLength={50}
                  />
                  <FormFeedback valid={!invalidEmail}>
                    {errorMessage}
                  </FormFeedback>
                </FormGroup>

                <FormGroup className='pt-2 border-top border-2 border-background' row>
                  <Label for="password">
                    Password
                  </Label>
                  <Input 
                    className='border-secondary'
                    id="password" 
                    name="password"
                    placeholder=""
                    type="password"
                    value={password}
                    onChange={e => handlePasswordChange(e.target.value)}
                    invalid={invalidPassword}
                    maxLength={50}
                  />
                  <FormFeedback valid={!invalidPassword}>
                    {passwordMessage}
                  </FormFeedback>

                  <Label className='pt-3' for="confirmPassword">
                    Confirm Password
                  </Label>
                  <Input 
                    className='border-primary'
                    id="confirmPassword" 
                    name="confirmPassword"
                    placeholder=""
                    type="password"
                    value={passwordConfirm}
                    onChange={e => handleConfirmChange(e.target.value)}
                    invalid={invalidPassword}
                  />
                </FormGroup>
              </div>
              <div className='pt-3'>
                <Button className='clickable' color="success" type='submit' disabled={invalidEmail || invalidPassword || loading}>Register</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default Register;
