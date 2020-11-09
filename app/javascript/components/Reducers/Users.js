import ACTION from '../Actions/Actions';
import Axios from '../../helpers/api_axios';

const create = payload => {
  Axios.post('/users', { sign_up: payload.data } )
    .then(res => {
      localStorage.setItem('loggedIn', true);
      localStorage.setItem('username', res.data.user.username);
      payload.setContext(true);
      payload.history.push('/')
    })
    .catch(error => {
      console.log(error);
    })
}

const Users = (_, action) => {
  switch (action.type) {
    case ACTION.USERS_CREATE:
      create(action.payload)
    default:
      return {}
  }
}

export default Users;
