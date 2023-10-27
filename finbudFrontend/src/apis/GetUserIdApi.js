import axios from 'axios';
import Cookies from 'js-cookie';

export async function GetUserIdApi() {
  return await axios.get('http://finbudbackend:8090/user', {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    })
    .then(response => {
      console.log("user id ");
      console.log(response);
      return response.data.id;
    })
    .catch(error => {
      console.log(error)
    });
}
