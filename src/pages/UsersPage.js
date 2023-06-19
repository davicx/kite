import React from 'react';
import useLoginStatus from '../functions/hooks/useLoginStatus';
import apiFunctions from '../functions/apiFunctions';
import UserProfile from '../components/users/UserProfile';
//import MyFriends from '../components/friends/MyFriends';

const axiosRequest = apiFunctions.getAPI();

function UsersPage() {
  const { currentUser, userLoggedIn  } = useLoginStatus();
  
  return (
    <div className="user">
        <UserProfile currentUser = { currentUser } api = { axiosRequest } /> 
    </div>
  );
}

export default UsersPage;

