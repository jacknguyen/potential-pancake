import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LogInContext } from './LogInContext';

const PrivateRoute = ({children, ...rest}) => {
  const [loggedIn, setLoggedIn] = useContext(LogInContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
      loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
