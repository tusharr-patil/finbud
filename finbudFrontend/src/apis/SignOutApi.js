import axios from 'axios';
import Cookies from 'js-cookie';

export default function LoginApi(email, password) {
  return new Promise((resolve, reject) => {
    const apiURL = 'http://localhost:8090/logout';
    Cookies.remove('jwtToken', { path: '/', sameSite: 'strict'});
    localStorage.clear();
    axios.get(apiURL);
  });
}