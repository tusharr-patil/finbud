import axios from 'axios';
import Cookies from 'js-cookie';

export default function CreatePostApi(post) {
  return new Promise((resolve, reject) => {
    console.log("post {}", post);
    const apiURL = 'http://finbudbackend:8090/posts/createPost';
    axios.post(apiURL, {
      userId: post?.userId, 
      projectName: post?.projectName,
      workingOn: post?.workingOn,
      requirements: post?.requirements,
      expertise: post?.expertise,
      benefits: post?.benefits,
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
