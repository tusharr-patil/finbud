import axios from 'axios';

export default function LoginApi(email, password) {
  return new Promise((resolve, reject) => {
    const apiURL = 'http://localhost:8090/authenticate';
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


// export default function LoginApi(email, password) {
//   const apiURL = 'http://localhost:8090/login';
//   const xsrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, "$1");

//   const headers = {
//     "Content-Type": "application/x-www-form-urlencoded"
//   };

//   const data = new URLSearchParams();
//   data.append('username', email);
//   data.append('password', password);
//   data.append("_csrf", xsrfToken);

//   axios.post(apiURL, data, { headers })
//     .then(function (response) {
//       console.log(response);
//       return response.status;
//     })
//     .catch(function (response) {
//       //handle error
//       console.log(response);
//     });
// }
