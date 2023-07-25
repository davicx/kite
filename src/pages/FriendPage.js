import { useParams } from "react-router";
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link  } from "react-router-dom"
import { LoginContext } from "../functions/context/LoginContext";
//import { refreshToken } from "../functions/functions";
//import GroupPosts from '../components/posts/GroupPosts';
import FriendList from '../components/friends/FriendList';
import apiFunctions from '../functions/apiFunctions';
import useLoginStatus from '../functions/hooks/useLoginStatus';

const axiosRequest = apiFunctions.getAPI();

//const IndividualGroup = (props) => {
const FriendPage = (props) => {
    const { friendName } = useParams()
    const { currentUserLocal, userLoggedIn  } = useLoginStatus();
    const userData = localStorage.getItem("localStorageCurrentUser");
    const currentUser = JSON.parse(userData);
 

    if("NULL".localeCompare(currentUser.toUpperCase() == 0)) {
        console.log("IndividualGroup: data not loaded yet")
    } else {
        console.log("IndividualGroup: " + currentUser)
    }

    return (
        <div>
          <FriendList currentUser = { currentUser } friendName = { friendName } api = { axiosRequest } />
          <Link className="" to="/users"> My Profile </Link>   
        </div>
    )
}

export default FriendPage;


