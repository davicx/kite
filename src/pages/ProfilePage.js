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

