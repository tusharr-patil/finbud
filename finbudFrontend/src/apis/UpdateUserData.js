import axios from 'axios';
import Cookies from 'js-cookie';

export default async function UpdateUserData(mainUser)  {
  return await axios.put('http://localhost:8090/users/updateUser', {
    "name": mainUser.name,
    "linkedIn": mainUser.linkedIn,
    "about": mainUser.about,
    "college": mainUser.college,
    "website": mainUser.website,
    "github": mainUser.github,
    "twitter": mainUser.twitter
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
