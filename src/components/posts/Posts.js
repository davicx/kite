import React from 'react';
import { useQuery } from "react-query";
import axios from 'axios'
import IndividualPost from './IndividualPost';

const axiosRequest = axios.create({
    withCredentials: true
  })  

async function getPosts(groupID) {
    const groupPostURL = "http://localhost:3003/posts/group/" + groupID; 
    const response = await axiosRequest.get(groupPostURL)
  
    return response.data
  
} 

const Posts = ({groupID}) => {
    const localData = localStorage.getItem("localStorageCurrentUser");
    const currentUser = JSON.parse(localData);
    console.log("Posts: Getting posts for the group " + groupID)

    const onError = (error) => {
      console.log("Do something here if there is Error!")
      console.log(error)
    }
  
    const { isLoading, data, isError, error  } = useQuery(['group-posts', groupID], () => getPosts(groupID), 
      { refetchInterval: 10000000,
        onError: onError
      }
    )

    //Like Post
    //Edit Post
    //Delete Post 

    const currentPosts = data;

  return (
  <div className="posts">
       <p><b> Group Posts </b> </p>
       <div className = "post-list" >
          { isLoading && <div> loading... </div>}
          { isError && <div> There was an error fetching the posts { error.message } </div>}
          {data && currentPosts.map((post) => (
            <IndividualPost post = { post }  currentUser = {currentUser} key = { post.postID }/>
          ))}
       </div>
  </div>
  );
  }
  
export default Posts;


/*
import React, { useState } from 'react';
import { useQuery } from "react-query";
import axios from 'axios'
import Post from './Post';

var currentUser = "davey"

const api = axios.create({
  
})

async function getPosts(groupID) {
  const postURL = 'http://localhost:3003/api/posts';  
  const { data } = await api.get(postURL)
  console.log(data)
  return data
} 


function WallPosts() {
    var groupID = 72;
    const postID = 1;
 
    const { isLoading, data, isError, error  } = useQuery({
        queryKey: ['group', groupID],
        queryFn: () => getPosts(postID),
        refetchInterval: 10000000 
      })
    
    const currentPosts = data;
    //console.log(isLoading  + " " + isError + " " + error)
  
    return (
    <div className="posts">
        { isLoading && <div> loading... </div>}
        { isError && <div> There was an error fetching the posts { error.message } </div>}
        { data && currentPosts.map((post) => (
            <Post post = { post }  currentUser = {currentUser} key = { post.postID }/>
        ))}
    </div>
    );
}

export default WallPosts;


*/