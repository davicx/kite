/*
import React, { useState} from 'react'
import axios from "axios";

const axiosRequest = axios.create({
  withCredentials: true
})

function PostsSimple() {
    const getPosts = () => {
      const data = localStorage.getItem("localStorageCurrentUser");
      const currentUser = JSON.parse(data);
      const postURL = "http://localhost:3003/posts/user/" + currentUser;
      console.log("Get Posts for " + currentUser)
      
        axiosRequest.get(postURL)
        .then(function (response) {
          const posts = response.data;
           console.log(response)
           //console.log("Status " + response.message)
           console.log(posts)
           posts.map((post) => (
            console.log(post)
          ))     
        })
        .catch(function (error) {
          console.log(error);
          console.log(error.response.status);
        });
    }

    return (
      <div className="login">
        <button className = "loginButton" onClick={ getPosts }> Get Posts </button>
      </div>
    );
  }

export default PostsSimple;
*/
/*
posts.map((post) => (
    
))

{ posts.map((post) => (
    <div className="post" key={ post.postID }>
        <p className = "post-text"> { post.postCaption } </p>
        <p className = "post-text"> { post.postID } |  { post.postFrom } | { post.postTo} | { post.groupID }</p>      
        <button onClick={ likePost }> Like </button>                         
    </div>
))}
*/


