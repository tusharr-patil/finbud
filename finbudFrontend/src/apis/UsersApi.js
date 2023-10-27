import axios from "axios";
import Cookies from "js-cookie";

function GetAllUsers() {
    return axios.get('http://finbudbackend:8090/users/getAllUsers', {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error)
    });
}

export default GetAllUsers;