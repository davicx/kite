import React from 'react';
import { useParams } from "react-router";
import { Link  } from "react-router-dom"
import useLoginStatus from '../functions/hooks/useLoginStatus';
import apiFunctions from '../functions/apiFunctions';
import GroupPosts from '../components/posts/GroupPosts';
import useCurrentUser from '../hooks/useCurrentUser';
import GroupUsers from '../components/groups/GroupUsers';

const axiosRequest = apiFunctions.getAPI();

function IndividualGroup() {
    const { groupID } = useParams()

    //STEP 1: Check user is logged in
    const loggedInMessage = useLoginStatus();

    //STEP 2: Get the current User
    var [currentUser, setCurrentUser] = useCurrentUser();
  
  return (
    <div className="user">
        <p> Current User: {currentUser}</p>
        <GroupPosts groupID = { groupID } currentUser = { currentUser } api = { axiosRequest } />
        <Link className="" to="/groups"> Groups </Link> 
        <GroupUsers groupID = { groupID } currentUser = { currentUser } api = { axiosRequest } />
    </div>
  );
}

export default IndividualGroup;
