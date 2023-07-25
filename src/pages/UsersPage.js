import React from 'react';
import useLoginStatus from '../functions/hooks/useLoginStatus';
import apiFunctions from '../functions/apiFunctions';
import LogoutUser from '../components/login/LogoutUser';

//import MyFriends from '../components/friends/MyFriends';

const axiosRequest = apiFunctions.getAPI();

function UsersPage() {
  const { currentUser, userLoggedIn  } = useLoginStatus();
  
  return (
    <div className="user">
        <LogoutUser />
    </div>
  );
}

export default UsersPage;

