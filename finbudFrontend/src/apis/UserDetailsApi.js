import axios from 'axios';
import Cookies from 'js-cookie';

export default async function UserDetailsApi(id)  {
  return await axios.get('http://localhost:8090/users/userDetails/' + id, {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    })
    .then(response => {
      console.log("user details " + response.data.id);
      return response.data;
    })
    .catch(error => {
      console.log(error)
      throw error;
    });
}
