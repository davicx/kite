import React from 'react';
import { Link  } from "react-router-dom"

//import { useNavigate  } from "react-router-dom"
//import { LoginContext } from "../functions/context/LoginContext";
import useLoginStatus from '../functions/hooks/useLoginStatus';
import apiFunctions from '../functions/apiFunctions';
import Groups from '../components/groups/GroupList';
import FriendSearch from '../components/search/FriendSearch';
import CreateGroup from '../components/groups/actions/CreateGroup';
import NewGroup from '../components/groups/actions/NewGroup';
//import NotificationList from '../components/notifications/NotificationList';

const axiosRequest = apiFunctions.getAPI();

function GroupsPage() {
  const data = localStorage.getItem("localStorageCurrentUser");
  const currentUser = JSON.parse(data);
  //const { currentUser, userLoggedIn  } = useLoginStatus();
  console.log("GroupsPage")
  console.log("Current User " + currentUser)
  
  return (
    <div className="user">
        <p> Current User: {currentUser}</p>
        <Groups currentUser = { currentUser } api = { axiosRequest } /> 
        <NewGroup api = { axiosRequest } currentUser = { currentUser } />    
    </div>
  );
}

export default GroupsPage;




/*
<CreateGroup api = { axiosRequest } currentUser = { currentUser } />
<Link className="navLink center" to="/groups/new"> New Group </Link>
<hr />
<CreateGroup api = { axiosRequest } currentUser = { currentUser } />
<FriendSearch api = { axiosRequest } currentUser = { currentUser } />
<!-- Doesn't work -->
<CreateGroup currentUser = { currentUser } api = { axiosRequest } />
*/

