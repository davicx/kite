import React from 'react';
import { Link } from 'react-router-dom';
import AddFriend from '../../friends/actions/AddFriend';


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

/*
    //TYPE 1: You are Currently Friends - "friends"
    //TYPE 2: Friendship Invite Pending (you) - "invite_pending"
    //TYPE 3: Friendship Request Pending (them) - "request_pending"
    //TYPE 4: Not Friends - "not_friends"
    //TYPE 5: This is you - "you"
*/

