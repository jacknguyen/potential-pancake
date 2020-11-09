import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LogInContext } from './LogInContext';
import LogoutButton from './LogOut';

const LoginButton = () => (
  <Nav className='mr-auto'>
    <Link className='nav-link' to='/login'>Log In</Link>
  </Nav>
)

const NavDisplay = props => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand>
      <Link className="navbar-brand" to='/'>FRRR</Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link className="nav-link" to='/users'>Users</Link>
        <Link className="nav-link" to='/newsletter'>Newsletter</Link>
      </Nav>
    </Navbar.Collapse>
      {props.children}
  </Navbar>
)

const Navigation = () => {
  const [loggedIn, setLoggedIn] = useContext(LogInContext);
  let login = loggedIn ? <LogoutButton /> : <LoginButton />

  return (
    <NavDisplay>{login}</NavDisplay>
  )
}

export default Navigation;
