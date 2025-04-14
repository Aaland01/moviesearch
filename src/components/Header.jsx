import { Button, Navbar, NavbarBrand, Collapse, NavbarToggler, NavItem, Nav, NavLink } from 'reactstrap'
import { useState } from 'react'
import Login from './Login';
import { useLogin } from './LoginContext';
import { Link } from 'react-router-dom';
import LogInButton from './LogInButton';


const Header = () => {

  const [collapse, setCollapse] = useState(false)
  const {toggleLogin} = useLogin()

  const toggleNav = () => setCollapse(!collapse)

  return (
    <>
      <Login />

      <Navbar className='px-4' color="background" expand="md" dark>

        {/* Logo */}
        <NavbarBrand tag={Link} to="/">
          <img className='clickable logo' src="MovieSearchLogo.png" />
        </NavbarBrand>


        {/* Collapse button for responsiveness */}
        <NavbarToggler className='ms-auto me-4' onClick={toggleNav}/>

        {/* Button for when screens are small*/}
        <LogInButton className='d-md-none' />

        <Collapse className='me-3' isOpen={collapse} navbar>

          <Nav className='ms-auto gap-md-4' navbar>
            <NavItem>
              <NavLink href='https://github.com/Aaland01' target='_blank'>
                Github
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/movies">
                Movies
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/people">
                People
              </NavLink>
            </NavItem>

            {/* ? Here we must do something to replace it with the mail when logged in */}
            <NavItem>
              <NavLink tag={Link} to="/Register">
                Register
              </NavLink>
            </NavItem>

          </Nav>
        </Collapse>

        {/* Button for large screens*/}
        <LogInButton className='d-none d-md-block' />

      </Navbar>

    </>
  )
};

export default Header;