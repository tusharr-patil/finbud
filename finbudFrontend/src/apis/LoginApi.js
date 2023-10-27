import axios from 'axios';

export default function LoginApi(email, password) {
  return new Promise((resolve, reject) => {
    const apiURL = 'http://finbudbackend:8090/authenticate';
    axios.post(apiURL, {
      "email": email, 
      "password": password
    })
      .then(function (response) {
        console.log(response.data);
        resolve(response.data);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
}
