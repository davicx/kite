import React from 'react';
import useLoginStatus from '../functions/hooks/useLoginStatus';
import apiFunctions from '../functions/apiFunctions';
import LogoutUser from '../components/login/LogoutUser';
//import useCurrentUser from '../hooks/useCurrentUser';
import useCurrentUser from '../hooks/useCurrentUser';

//import MyFriends from '../components/friends/MyFriends';
import AllUsers from '../components/users/display/AllUsers';

const axiosRequest = apiFunctions.getAPI();

function UsersPage() {

    //STEP 1: Check user is logged in 
    const loggedInMessage = useLoginStatus();

    //STEP 2: Get the current User
    var [currentUser, setCurrentUser] = useCurrentUser();

  
  return (
    <div className="user">
        <AllUsers currentUser = { currentUser} api = { axiosRequest } /> 
        <LogoutUser />
    </div>
  );
}


export default UsersPage;

