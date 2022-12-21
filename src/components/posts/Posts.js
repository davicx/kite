import React from 'react';
import { useQuery } from "react-query";
import axios from 'axios'

const axiosRequest = axios.create({
    withCredentials: true
  })  

  async function refreshToken() {
    const refreshURL = "http://localhost:3003/refresh/tokens"
      const data = localStorage.getItem("localStorageCurrentUser");
      const userName = JSON.parse(data);
      console.log("you are refreshing for" + userName )
      
      //STEP 1: Call Logout API
      axiosRequest.post(refreshURL, {
        userName: userName,
        refreshToken: "dontneedheretoken"
      })
      .then(function (response) {
        console.log(response.data)
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }


// Add a response interceptor
axiosRequest.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log("interceptors: GOOD ")
  return response;
}, function (error) {
  console.log("interceptors: NEED NEW TOKEN ")
  
  if(error.response.status == 401) {
    console.log("A new token was got!! Get a new token here");
    const refreshOutcome = refreshToken();
    console.log("NEW TOKEN OUTCOME")
    console.log(refreshOutcome)
  } 
  
  return Promise.reject(error);
  
});


async function getPosts(currentUser) {
    const postURL = "http://localhost:3003/posts/user/" + currentUser; 
    //const groupURL = 'http://localhost:3003/groups/' + currentUser;  
    const response = await axiosRequest.get(postURL)
  
    console.log("response");
    console.log(response);
    return response.data
  
} 


const PostList = () => {
    const localData = localStorage.getItem("localStorageCurrentUser");
    const currentUser = JSON.parse(localData);
    //console.log("PostList" + currentUser)

    const onError = (error) => {
      console.log("Do something here if there is Error!")
      console.log(error)
    }
  
    const { isLoading, data, isError, error  } = useQuery(['group-posts', currentUser], () => getPosts(currentUser), 
      { refetchInterval: 10000000,
        onError: onError
      }
    )

    const currentPosts = data;
  //console.log(isLoading)
  //console.log(isError)
  //console.log(error)

  return (
  <div className="posts">
       <p> Posts </p>
      { isLoading && <div> loading... </div>}
      { isError && <div> There was an error fetching the posts { error.message } </div>}
      {data && console.log(data)}
      {data && data.map((post) => (console.log(post)))}
  </div>
  );
  }
  
export default PostList;

