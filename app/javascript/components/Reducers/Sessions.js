import ACTION from '../Actions/Actions';
import Axios from '../../helpers/api_axios';

const login = payload => {
  Axios.post('/users/sign_in', { data: payload.data })
    .then(res => {
      localStorage.setItem('loggedIn', true);
      localStorage.setItem('username', res.data.user.username);
      payload.setContext(true);
      payload.history.push(payload.from);
    })
    .catch(error => {
      console.log(error);
    })
}

const logout = payload => {
  Axios.delete('/users/sign_out')
      .then(res => {
        localStorage.clear();
        payload.setContext(false);
        payload.history.push('/');
      })
      .catch(error => {console.log(error)})
}

const Sessions = (_, action) => {
  switch (action.type) {
    case ACTION.LOGIN:
      login(action.payload);
      break;
    case ACTION.LOGOUT:
      logout(action.payload);
      break;
    default:
      break;
  }
}

export default Sessions;
