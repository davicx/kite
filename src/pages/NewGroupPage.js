import React from 'react';

import apiFunctions from '../functions/apiFunctions';
//import CreateGroup from '../components/groups/CreateGroup';
import CreateGroupTwo from '../components/groups/CreateGroupTwo';

const axiosRequest = apiFunctions.getAPI();

function GroupsPage() {
  const data = localStorage.getItem("localStorageCurrentUser");
  const currentUser = JSON.parse(data);
  
  return (
    <div className="user">
        <CreateGroupTwo api = { axiosRequest } currentUser = { currentUser } />
    </div>
  );
}

export default GroupsPage;

/*
<FriendSearch api = { axiosRequest } currentUser = { currentUser } />
import FriendSearch from '../components/search/FriendSearch';
*/
