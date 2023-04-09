import axios from 'axios';
import Cookies from 'js-cookie';

export default async function UpdateUserData(mainUser)  {
  return await axios.put('http://localhost:8090/users/updateUser', {
    "firstName": mainUser.firstName,
    "linkedIn": mainUser.linkedIn
  } ,{
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
