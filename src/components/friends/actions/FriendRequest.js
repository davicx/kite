import React from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

//COMPONENT: Friend Request
const FriendRequest = ({api, currentUser, friend}) => {

    //Button: Add a Friend on Button Click 
    const handleCancelFriendRequest = (api, currentUser, friendName) => {
        console.log(currentUser + " wants to cancel " + friend.friendName + " as a friend!")
       
    }

    return (     
        <div className="" >
            <p> Friend Request </p>
            <p> Friendship Request Pending (they have to response and you can cancel) - "request_pending"</p>
            <button type="submit" className = "" onClick={() => { handleCancelFriendRequest(api, currentUser, friend.friendName) }}>Cancel</button>
        </div>       
        );
    }  

export default FriendRequest;



