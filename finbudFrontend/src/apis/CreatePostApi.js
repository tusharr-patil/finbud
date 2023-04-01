import axios from 'axios';
import Cookies from 'js-cookie';

export default function CreatePostApi(post) {
  return new Promise((resolve, reject) => {
    const apiURL = 'http://localhost:8090/posts/createPost';
    axios.post(apiURL, {
      userId: post?.userId, 
      content: post?.description
    }, {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
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
