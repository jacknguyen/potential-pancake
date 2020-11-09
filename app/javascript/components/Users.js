import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from '../helpers/api_axios';
import User from './User';;''


const Users = () => {
  const [users, setUsers] = useState([])
  let history = useHistory();

  const getUsers = () => {
    Axios.get('users')
      .then( res => {
        setUsers(res.data.data[0]);
      })
      .catch( error => {
        console.log(error)
      });
  }

  useEffect(() => {
    getUsers();
  }, [])

  let usersList = null;

  if (users) {
    usersList = users.map((user) => (
      <User key={user.id} {...user}/>
    ))
  }

  return (
    <>
      <h1>Users</h1>
      {usersList}
    </>
  )
}

export default Users;
