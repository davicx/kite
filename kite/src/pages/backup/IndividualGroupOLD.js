import { useParams } from "react-router";
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link  } from "react-router-dom"
import { LoginContext } from "../../functions/context/LoginContext";
//import { refreshToken } from "../functions/functions";
import GroupPosts from '../../components/posts/GroupPosts';
import GroupUsers from '../../components/groups/GroupUsers';
import apiFunctions from '../../functions/apiFunctions';
import useLoginStatus from '../../functions/hooks/useLoginStatus';
import useCurrentUser from '../../functions/hooks/useCurrentUser';
import NotificationList from '../../components/notifications/NotificationList';

const axiosRequest = apiFunctions.getAPI();


const IndividualGroup = (props) => {
    const { groupID } = useParams()

    //STEP 1: Check user is logged in
    const loggedInMessage = useLoginStatus();

    //STEP 2: Get the current User
    var [currentUser, setCurrentUser] = useCurrentUser();


    return (
        <div>
          <p> Current User: {currentUser}</p>
          <p> logged In Message: {loggedInMessage}</p>
          <GroupPosts groupID = { groupID } currentUser = { currentUser } api = { axiosRequest } />
          <GroupUsers groupID = { groupID } currentUser = { currentUser } api = { axiosRequest } />
          <Link className="" to="/groups"> Groups </Link>   
        </div>
    )
}

export default IndividualGroup;

//Removed for a bit
//<NotificationList currentUser = { currentUser } api = { axiosRequest } />




