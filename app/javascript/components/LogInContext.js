import React, { useState, createContext, useEffect } from 'react';

export const LogInContext = createContext();

export const LogInProvider = props => {
  let status = localStorage.getItem('loggedIn') || false;
  const [loggedIn, setLoggedIn] = useState(status)

  const loginStatus = () => {
    setLoggedIn(status);
  }

  useEffect(() => {
    loginStatus();
  }, [])

  return(
    <LogInContext.Provider value={[loggedIn, setLoggedIn]}>
      {props.children}
    </LogInContext.Provider>
  )

}
