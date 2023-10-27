import axios from "axios";
import Cookies from "js-cookie";

export default function DeletePostApi(postId) {
    return axios.delete('http://finbudbackend:8090/posts/deletePost/' + postId , {
        headers: {
            Authorization: `Bearer ${Cookies.get('jwtToken')}`
        }
    })
    .then(response => {
        console.log(response);
        return response.data;
    })
    .catch(error => {
        console.log(error)
    });
}
