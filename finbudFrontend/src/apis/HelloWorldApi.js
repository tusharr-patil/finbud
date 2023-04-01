import axios from 'axios';

export function HelloWorldApi() {
  return axios.get('http://localhost:8090/hello')
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(error => {
      console.log(error)
    });
}