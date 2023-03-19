import { useParams } from "react-router";
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link  } from "react-router-dom"
import { LoginContext } from "../functions/context/LoginContext";
//import { refreshToken } from "../functions/functions";
import functions from '../functions/functions';
import GroupPosts from '../components/posts/GroupPosts';

//import Posts from '../components/posts/GroupPosts';
//import NewPost from './../components/posts/NewPost';

//USER: Login and Refresh 
import axios from 'axios'

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
    //const refreshOutcome = refreshToken(axiosRequest);
    const refreshOutcome = functions.refreshToken(axiosRequest);
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

//Login and Refresh

const IndividualGroup = () => {
    //const name = useDisplayName()
    //console.log("NAME!!!!! " + name)
    functions.sayHello("hi")

    const { groupID } = useParams()
    console.log("PAGE: IndividualGroup Page");

    //Login Status 
    const navigate = useNavigate();
    const { currentUser, setLoginState} = useContext(LoginContext);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
  
    useEffect(() => {
      const data = localStorage.getItem("localStorageCurrentUser");
      const currentUserLoggedIn = JSON.parse(data);
      setLoginState(currentUserLoggedIn);
      if(currentUserLoggedIn == 'null' || currentUserLoggedIn == null) {
        setUserLoggedIn(false);
        console.log("Group Page: DONT BE HERE");
      } else {
        setUserLoggedIn(true);
        console.log("Group Page: OK STAY HERE")
      }
   }, []);

    return (
        <div>
          <p><b>Current User: { currentUser } is visiting a group with the ID { groupID }</b></p>
          <GroupPosts groupID = { groupID } currentUser = { currentUser } api = { axiosRequest } />
          <Link className="" to="/groups"> Groups </Link>
        </div>
    )
}

export default IndividualGroup;

/*

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate  } from "react-router-dom"
import { LoginContext } from "../functions/context/LoginContext";
import useLoginStatus from '../functions/hooks/useLoginStatus';
import functions from "../functions/functions";

import Refresh from '../components/login/Refresh';
import Groups from '../components/groups/GroupList';
import CreateGroup from '../components/groups/CreateGroup';


//USER: Login and Refresh 
import axios from 'axios'

const axiosRequest = axios.create({
  withCredentials: true
})  

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
    const refreshOutcome = refreshToken();
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

//Login and Refresh


function GroupsPage() {
  console.log("PAGE: GroupsPage")
  const { currentUser, userLoggedIn  } = useLoginStatus();
  
  return (
    <div className="user">
        <p> Current User: {currentUser}</p>
        <Groups currentUser = { currentUser } api = { axiosRequest } />   
    </div>
  );
}

export default GroupsPage;

*/


/*
async function refreshToken(axiosRequest) {
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