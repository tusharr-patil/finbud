import axios from 'axios';
import Cookies from 'js-cookie';

export default function SignOutApi() {
  return new Promise((resolve, reject) => {
    const apiURL = 'http://localhost:8090/logout';
    Cookies.remove('jwtToken', { path: '/', sameSite: 'strict' });
    localStorage.clear();   
    axios.get(apiURL)
      .then(response => {
        resolve(response.data); // Resolve the promise with the response data
      })
      .catch(error => {
        reject(error); // Reject the promise with the error
      });
  });
}
