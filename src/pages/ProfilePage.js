import React, { useState, useContext, useEffect } from 'react';
import { useNavigate  } from "react-router-dom"
import { LoginContext } from "../functions/context/LoginContext";
import LogoutUser from '../components/login/LogoutUser';

import useLoginStatus from '../functions/hooks/useLoginStatus';


import axios from 'axios'


async function refreshToken() {
  const refreshURL = "http://localhost:3003/refresh/tokens"
    const data = localStorage.getItem("localStorageCurrentUser");
    const userName = JSON.parse(data);
    //console.log("REFRESH TOKEN: you are refreshing for" + userName )
    //STEP 1: Call Logout API
    axios.post(refreshURL, {
      userName: userName,
      refreshToken: "dontneedheretoken"
    })
    .then(function (response) {
      //console.log(response)
      return response.data;
    })
    .catch(function (error) {
      //console.log(error);
    });
}

/*
axiosRequest.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  console.log("INTERCEPTOR: Looks good! ")
  return response;
}, function (error) {
  console.log("INTERCEPTOR: Need to get a access token or logout the user")
  if(error.response.status == 401) {
    console.log("INTERCEPTOR 401: We got a 401 so we need a new access token. Will send refresh token ")
    const refreshOutcome = refreshToken();
  } 

  //LOGOUT USER
  if(error.response.status == 403) {
    console.log("INTERCEPTOR 403: We got a 403 so the refresh token was not good need to logout the user")  
    localStorage.setItem('localStorageCurrentUser', JSON.stringify("null")); 
    window.location.href = '/login';
  }
  
  return Promise.reject(error);
  
});
*/

function ProfilePage() {
  console.log("PAGE: ProfilePage")
  //const { currentUser, setLoginState} = useContext(LoginContext);
  //const [userLoggedIn, setUserLoggedIn] = useState(false);
  const { currentUser, userLoggedIn  } = useLoginStatus();
  
  /*
  //Login Status 
  const navigate = useNavigate();
  const { currentUser, setLoginState} = useContext(LoginContext);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("localStorageCurrentUser");
    const currentUserLoggedIn = JSON.parse(data);
    setLoginState(currentUserLoggedIn);
    //if(currentUserLoggedIn == 'null' || currentUserLoggedIn == null) {
    if(currentUserLoggedIn == 'null') {
      setUserLoggedIn(false);
      console.log("Profile Page: DONT BE HERE");
      //navigate("/login");
    } else {
      setUserLoggedIn(true);
      console.log("Profile Page: OK STAY HERE")
      console.log(currentUserLoggedIn + " is currently logged in");
    }
 }, []);

 */

  return (
    <div className="user">
        <p><b> Profile </b></p>
        <p> Current User: { currentUser } </p>
        <p> User Logged In: { userLoggedIn ? 'yep!' : 'nooo' } </p>
        <LogoutUser />
    </div>
  );
}

export default ProfilePage;





/*
import React, { useState, useContext } from 'react';
import { BrowserRouter, useNavigate, Link  } from "react-router-dom"
import LogoutUser from '../components/login/LogoutUser';
import { LoginContext } from "../functions/context/LoginContext";
//import { LoggedInContext } from "../functions/context/LoggedInContext";

import Axios from "axios";

const axiosRequest = Axios.create({
  withCredentials: true
})

function Profile() {
  const { currentUser, setLoginState} = useContext(LoginContext);
      
  return (
    <div className="user">
        <p> Profile</p>

    </div>
  );
}

export default Profile;
export default Profile;
*/

