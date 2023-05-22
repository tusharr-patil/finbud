import axios from 'axios';

export default function RegisterApi(name, email, password) {
  return new Promise((resolve, reject) => {
    const apiURL = 'http://localhost:8090/register';
    axios.post(apiURL, {
      "name": name,
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
