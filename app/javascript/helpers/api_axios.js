import Axios from 'axios';

const instance = Axios.create({
  baseURL: '/api/v1',
  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-CSRF-TOKEN',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  },
})

export default instance;
