import axios from 'axios';

export function GetUserPost(id) {
  return axios.get('http://finbudbackend:8090/getUserPost/' + id)
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(error => {
      console.log(error)
    });
}