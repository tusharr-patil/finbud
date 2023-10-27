import axios from "axios";
import Cookies from "js-cookie";

export default function GetAllPostApi() {
    return axios.get('http://finbudbackend:8090/posts/getAllPost', {
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
