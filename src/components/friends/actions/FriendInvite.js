import React from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

import AcceptFriendInvite from './AcceptFriendInvite';
import DeclineFriendInvite from './DeclineFriendInvite';

//COMPONENT: Friend Request
const FriendInvite = ({api, currentUser, friend}) => {
    return (     
        <div className="" >
            <p> Friendship Invite Pending (you can accept or decline) - "invite_pending"</p>
            <AcceptFriendInvite api = { api } friend = { friend } currentUser = {currentUser}  />
            <p> </p> 
            <DeclineFriendInvite api = { api } friend = { friend } currentUser = {currentUser}  />
        </div>       
        
        );
    }  

export default FriendInvite;



