import React from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

//COMPONENT: Friend Request
const DeclineFriendInvite = ({api, currentUser, friend}) => {
    const queryClient = useQueryClient();

    //Button: Add a Friend on Button Click 
    const handleDeclineFriendInvite = (api, currentUser, friendName) => {
        console.log(currentUser + " wants to decline " + friendName + " as a friend!")
        /*
        var cancelFriendRequestBody = {
            masterSite: "kite",
            currentUser: currentUser,
            friendName: friendName
        }

        var cancelFriendRequest = {
            api: api,
            cancelFriendRequestBody: cancelFriendRequestBody
        }

        mutate(cancelFriendRequest)
        */
       
    }

    return (     
        <div className="" >
            <button type="submit" className = "" onClick={() => { handleDeclineFriendInvite(api, currentUser, friend.friendName) }}>Decline</button>
       </div>       
        );
    }  

export default DeclineFriendInvite;
