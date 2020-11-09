import React, { useContext, useReducer, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { LogInContext } from './LogInContext';
import Sessions from './Reducers/Sessions';
import ACTION from './Actions/Actions';

const LogOut = () => {
  let history = useHistory();
  const [_logout, dispatch] = useReducer(Sessions)
  const [_loggedIn, setLoggedIn] = useContext(LogInContext);

  const LogoutHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: ACTION.LOGOUT,
      payload: { history: history, setContext: setLoggedIn }
    })
  }

  return (
    <Nav className='mr-auto'>
      <a href='#' className='nav-link' onClick={LogoutHandler}>Log out</a>
    </Nav>
  )
}

export default LogOut;
