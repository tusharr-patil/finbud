import axios from 'axios';
import Cookies from 'js-cookie';

export default async function GetMyPost(id) {
  return await axios.get('http://localhost:8090/posts/getSavedPost/' + id, {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    })
    .then(response => {
      console.log("saved's post ");
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error)
    });
}
