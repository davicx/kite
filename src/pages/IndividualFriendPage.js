import { useParams } from "react-router";
import React from 'react';
import { Link } from "react-router-dom"
import UserFriends from '../components/friends/UserFriends';

//import { refreshToken } from "../functions/functions";

import apiFunctions from '../functions/apiFunctions';
import useLoginStatus from '../functions/hooks/useLoginStatus';

const api = apiFunctions.getAPI();

const IndividualFriendPage = (async) => {
   const { currentUserTemp, userLoggedIn  } =  useLoginStatus();
   const userData = localStorage.getItem("localStorageCurrentUser");
   const currentUser = JSON.parse(userData);

   //Get Current Friend from URL 
    const { friendName } = useParams()
  
      return ( 
        <div>
          <h4> INDIVDIDUAL FRIEND PAGE </h4>
          <p>{ friendName }  Page! </p> 
          <UserFriends currentUser = { currentUser }  friendName = { friendName } api = { api } /> 
          <Link className="" to="/users"> My Profile </Link>   
        </div>
    )
  
    
}

export default IndividualFriendPage;

