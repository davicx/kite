import React from 'react';
import useLoginStatus from '../functions/hooks/useLoginStatus';
import apiFunctions from '../functions/apiFunctions';
import UserProfile from '../components/users/UserProfile';
import LogoutUser from '../components/login/LogoutUser';
import useCurrentUser from '../hooks/useCurrentUser';
import MyFriends from '../components/friends/MyFriends';

const axiosRequest = apiFunctions.getAPI();

function ProfilePage() {

    //STEP 1: Check user is logged in
    const loggedInMessage = useLoginStatus();

    //STEP 2: Get the current User
    var [currentUser, setCurrentUser] = useCurrentUser();
  
  return (
    <div className="user">
        <h4> PROFILE PAGE </h4>
        <p> Current User: {currentUser}</p>
        
        <UserProfile currentUser = { currentUser } api = { axiosRequest } /> 
        <MyFriends currentUser = { currentUser } api = { axiosRequest } /> 
        <LogoutUser />
    </div>
  );
}

export default ProfilePage;


/*
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate  } from "react-router-dom"
import { LoginContext } from "../functions/context/LoginContext";
import UserProfile from '../components/users/UserProfile';
import LogoutUser from '../components/login/LogoutUser';

import useLoginStatus from '../functions/hooks/useLoginStatus';
import axios from 'axios'



function ProfilePage() {
  console.log("PAGE: ProfilePage")
  //const { currentUser, setLoginState} = useContext(LoginContext);
  //const [userLoggedIn, setUserLoggedIn] = useState(false);
  const { currentUser, userLoggedIn  } = useLoginStatus();
  
  return (
    <div className="user">
        <p><b> Profile </b></p>
        <p> Current User: { currentUser } </p>
        <p> User Logged In: { userLoggedIn ? 'yep!' : 'nooo' } </p>
        <UserProfile currentUser = { currentUser } api = { axiosRequest } /> 
        <LogoutUser />
    </div>
  );
}

export default ProfilePage;
*/





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

