import { Navbar, NavbarBrand, Collapse, NavbarToggler, NavItem, Nav, NavLink } from 'reactstrap'
import { useState } from 'react'
import { useAuth } from '../assets/AuthContext';
import { Link } from 'react-router-dom';
import LogInButton from './LogInButton';
import Logo from './Logo';


const Header = () => {

  const [collapse, setCollapse] = useState(false)

  const toggleNav = () => setCollapse(!collapse)

  const { user } = useAuth();
  
  const register = (
    <NavLink tag={Link} to="/Register">
      Register
    </NavLink>
  )

  const userMail = (
    <div className='p-2 text-primary text-bg-accent rounded'>
      {user}
    </div>
  )

  return (
    <>
      <Navbar className='px-4' color="background" expand="md" dark>

        <NavbarBrand tag={Link} to="/">
          <Logo />
          <h5 className='clickable d-none d-sm-inline ps-2'>Moviesearch</h5>
        </NavbarBrand>

        <NavbarToggler className='ms-auto me-4' onClick={toggleNav}/>

        {/* Button for small screens*/}
        <LogInButton className='d-md-none' />

        <Collapse className='me-3' isOpen={collapse} navbar>

          <Nav className='ms-auto gap-md-4' navbar>
            <NavItem>
              <NavLink tag={Link} to="/movies">
                Movies
              </NavLink>
            </NavItem>

            <NavItem>
              {user ? userMail : register}
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