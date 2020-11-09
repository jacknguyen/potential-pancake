import React, { useState, useEffect } from 'react';
import { Route, useLocation } from 'react-router-dom';
import Home from './Home';
import Users from './Users';
import LogIn from './LogIn';
import Navigation from './Navigation';
import PrivateRoute from './PrivateRoute';
import Newsletter from './Newsletter';
import { LogInProvider } from './LogInContext';
import SignUp from './SignUp';

const LoggedIn = React.createContext(false);

const App = () => {
  let location = useLocation();
  let nav = <Navigation />
  const excludeList = ['/login']

  if (excludeList.includes(location.pathname)) {
    nav = null;
  }

  return (
    <LogInProvider>
      {nav}
      <Route exact path="/" component={Home} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/login' component={LogIn} />
      <PrivateRoute path='/users'><Users /></PrivateRoute>
      <PrivateRoute path='/newsletter'><Newsletter /></PrivateRoute>
    </LogInProvider>
  )
}

export default App;
