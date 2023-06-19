import React from 'react';
import AllUsers from './display/AllUsers';
//import MyFriends from '../friends/MyFriends';
//import PendingFriends from '../friends/PendingFriends';


const UserProfile = (props) => {
    const currentUser = props.currentUser;
    const api = props.api;

    return (
    <div className="groups">
        <p> Your Profile! {currentUser}</p>
        <AllUsers currentUser = { currentUser } api = { api } /> 
    </div>
    );
    }
    
  export default UserProfile;

/*
<MyFriends currentUser = { currentUser } api = { api } /> 
<PendingFriends currentUser = { currentUser } api = { api } /> 
*/
