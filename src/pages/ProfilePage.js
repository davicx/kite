import React, { useState, useContext, useEffect } from 'react';
import { useNavigate  } from "react-router-dom"
import { LoginContext } from "../functions/context/LoginContext";
import LogoutUser from '../components/login/LogoutUser';

function ProfilePage() {
  console.log("PAGE: ProfilePage")

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
      navigate("/login");
    } else {
      setUserLoggedIn(true);
      console.log("Profile Page: OK STAY HERE")
      console.log(currentUserLoggedIn + " is currently logged in");
    }
 }, []);

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

