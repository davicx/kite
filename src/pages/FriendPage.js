import { useParams } from "react-router";
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link  } from "react-router-dom"
import { LoginContext } from "../functions/context/LoginContext";
//import { refreshToken } from "../functions/functions";
//import GroupPosts from '../components/posts/GroupPosts';
import FriendList from '../components/friends/FriendList';
import apiFunctions from '../functions/apiFunctions';
import useLoginStatus from '../functions/hooks/useLoginStatus';
import useCurrentUser from '../hooks/useCurrentUser';

const axiosRequest = apiFunctions.getAPI();

const FriendPage = (props) => {

    //STEP 1: Get friend name from URL
    const { friendName } = useParams()

    //STEP 2: Check user is logged in 
    const loggedInMessage = useLoginStatus();

    //STEP 3: Get the current User
    var [currentUser, setCurrentUser] = useCurrentUser();

    return (
        <div>
          <FriendList currentUser = { currentUser } friendName = { friendName } api = { axiosRequest } />
          <Link className="" to="/users"> My Profile </Link>   
        </div>
    )
}

export default FriendPage;


