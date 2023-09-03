import React from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

//COMPONENT: Friend Request
const FriendInvite = ({api, currentUser, friend}) => {
    return (     
        <div className="" >
            <p> Friend Invite </p>
            <p> Friendship Invite Pending (you can accept or decline) - "invite_pending"</p>
            <p> Accept </p>
            <p> Decline </p>
        </div>       
        
        );
    }  

export default FriendInvite;



