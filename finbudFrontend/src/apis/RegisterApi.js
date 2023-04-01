import axios from 'axios';

export default function RegisterApi(firstName, email, password) {
  const apiURL = 'http://localhost:8090/register';
  axios.post(apiURL, {
    "firstName": firstName,
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
