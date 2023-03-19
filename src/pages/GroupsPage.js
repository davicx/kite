import React, { useState, useEffect, useContext } from 'react';
import { useNavigate  } from "react-router-dom"
import { LoginContext } from "../functions/context/LoginContext";
import useLoginStatus from '../functions/hooks/useLoginStatus';
import functions from "../functions/functions";
import apiFunctions from '../functions/apiFunctions';

//import Refresh from '../components/login/Refresh';
import Groups from '../components/groups/GroupList';
//import CreateGroup from '../components/groups/CreateGroup';

//USER: Login and Refresh 
const axiosRequest = apiFunctions.getAPI();

/*
import axios from 'axios'

apiFunctions.sayHello("hiya!")
const axiosRequest = axios.create({
  withCredentials: true
})  


//STATUS 200: Good Request 
axiosRequest.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  console.log("INTERCEPTOR: Looks good! ")
  return response;
}, function (error) {
  console.log(error.response.status)
  console.log(error.response)
  
  //STATUS 498:  Need to get a access token
  console.log("INTERCEPTOR: Need to get a access token or logout the user")
  if(error.response.status == 498) {
    console.log("INTERCEPTOR 498: We got a 498 so we need a new access token. Will send refresh token ")
    //const refreshURL = "http://localhost:3003/refresh/tokens"
    const refreshURL = "http://localhost:3003/refresh/tokens"

    //const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
    //const { data, error, isPending } = useRefreshToken(refreshURL);
    const refreshOutcome = functions.refreshToken();
    console.log("We refreshed the access token!")

  } 

  //STATUS 440: Logout User
  if(error.response.status == 440) {
    console.log("INTERCEPTOR 440: We got a 440 we couldn't refresh the access token because the refresh token was no good need to logout the user")  
    localStorage.setItem('localStorageCurrentUser', JSON.stringify("null")); 
    window.location.href = '/login';
  }
  
  return Promise.reject(error);
  
});

*/
//Login and Refresh


function GroupsPage() {
  const { currentUser, userLoggedIn  } = useLoginStatus();
  
  return (
    <div className="user">
        <p> Current User: {currentUser}</p>
        <Groups currentUser = { currentUser } api = { axiosRequest } />   
    </div>
  );
}

export default GroupsPage;




/*
async function refreshToken() {
  console.log("ATTEMPTING TO REFRESH TOKEN: refreshToken()")
    const refreshURL = "http://localhost:3003/refresh/tokens"
      const data = localStorage.getItem("localStorageCurrentUser");
      const userName = JSON.parse(data);
      console.log("refreshToken: you are refreshing for" + userName)
      //STEP 1: Call Logout API
      axiosRequest.post(refreshURL, {
        userName: userName,
        refreshToken: "dontneedheretoken"
      })
      .then(function (response) {
        console.log("refreshToken(): We got a new access token!")
        return response.data;
      })
      .catch(function (error) {
        console.log("refreshToken(): We failed to get a new access token!")
        //console.log(error);
      });
  
  }
*/