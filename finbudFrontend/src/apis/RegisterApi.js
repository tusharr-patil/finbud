import axios from 'axios';

export default function RegisterApi(name, email, password) {
  const apiURL = 'http://localhost:8090/register';
  axios.post(apiURL, {
    "name": name,
    "email": email,
    "password": password
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
}
