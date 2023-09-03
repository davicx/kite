import React from 'react';
import { Link } from 'react-router-dom';
import AddFriend from '../../friends/actions/AddFriend';
import FriendInvite from '../../friends/actions/FriendInvite';
import FriendRequest from '../../friends/actions/FriendRequest';


//TYPE 1: You are Currently Friends - "friends"
//TYPE 2: Friendship Invite Pending (you can accept or decline) - "invite_pending"
//TYPE 3: Friendship Request Pending (they have to response and you can cancel) - "request_pending"
//TYPE 4: Not Friends - "not_friends"
//TYPE 5: This is you - "you"


const SimpleProfile = ({api, friend, currentUser}) => {
      const renderFriendSelection = () => {
        switch (friend.friendshipKey) {
            case "friends":
              return <p> Already friends </p>;
            case "invite_pending":
              return <FriendInvite api = { api } friend = { friend } currentUser = {currentUser}  />;            
            case "request_pending":
              return <FriendRequest api = { api } friend = { friend } currentUser = {currentUser}  />;
            case "not_friends":
                return <AddFriend api = { api } friend = { friend } currentUser = {currentUser}  />;
            case "you":
              return <p> you</p>;
            default:
                return <p> default </p>;
        }
    };
    return (
        <div className="post" >
            <Link to={`/friends/${friend.friendName}`}> {friend.friendName } </Link>
            <p> {friend.userName} </p>
            {renderFriendSelection()}
        </div>       
        );
    }  

export default SimpleProfile;


//WORKS
/*
const SimpleProfile = ({api, friend, currentUser}) => {
    return (     
        
        <div className="post" >
            <Link to={`/friends/${friend.friendName}`}> {friend.friendName } </Link>
            <p> {friend.userName} </p>
            {friend.alsoYourFriend ? 
                <p> Already friends </p>
                : 
                <AddFriend api = { api } friend = { friend } currentUser = {currentUser}  />    
            }
        </div>       
        );
    }  

export default SimpleProfile;
*/

/*

https://www.devaradise.com/react-conditional-rendering-if-else

let welcomeMessage;
switch(role) {
  case 'superadmin':
    welcomeMessage = 'Welcome Super Admin';
    // you can put other codes here as well.
  case 'admin':
    welcomeMessage = 'Welcome Admin';
    // you can put other codes here as well.
  case 'user':
    welcomeMessage = 'Welcome User';
    // you can put other codes here as well.
  default:
    welcomeMessage = 'Welcome Guest';
    // you can put other codes here as well.
}

           {friend.alsoYourFriend ? 
                <p> Already friends </p>
                : 
                <AddFriend api = { api } friend = { friend } currentUser = {currentUser}  />    
            }
*/
/*
    //TYPE 1: You are Currently Friends - "friends"
    //TYPE 2: Friendship Invite Pending (you) - "invite_pending"
    //TYPE 3: Friendship Request Pending (them) - "request_pending"
    //TYPE 4: Not Friends - "not_friends"
    //TYPE 5: This is you - "you"
*/

