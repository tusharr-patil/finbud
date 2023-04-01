import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

async function AddOrRemovePostIdToSaveList(postId) {
  const apiURL = "http://localhost:8090/users/saveUnSavePostId/" + postId;
  await axios
    .put(
      apiURL,
      {
        postId: postId,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export { AddOrRemovePostIdToSaveList };
