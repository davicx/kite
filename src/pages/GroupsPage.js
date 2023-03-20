import React, { useState, useEffect, useContext } from 'react';
import { useNavigate  } from "react-router-dom"
import { LoginContext } from "../functions/context/LoginContext";
import useLoginStatus from '../functions/hooks/useLoginStatus';
import apiFunctions from '../functions/apiFunctions';
import Groups from '../components/groups/GroupList';

//import CreateGroup from '../components/groups/CreateGroup';

const axiosRequest = apiFunctions.getAPI();

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