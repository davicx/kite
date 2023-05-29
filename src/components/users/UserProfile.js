import React from 'react';
import MyFriends from '../friends/MyFriends';


const UserProfile = (props) => {
    const currentUser = props.currentUser;
    const api = props.api;

    return (
    <div className="groups">
        <p> Your Profile! {currentUser}</p>
        <MyFriends currentUser = { currentUser } api = { api } /> 

    </div>
    );
    }
    
  export default UserProfile;
  