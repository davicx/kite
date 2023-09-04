import React from 'react';
import { useMutation, useQueryClient } from "react-query";

import axios from 'axios'

//PART 1: API Call
async function cancelFriendRequestAPI(cancelFriendRequest) {
    const requestAPI = cancelFriendRequest.api
    const requestBody = cancelFriendRequest.cancelFriendRequestBody

    const cancelFriendRequestURL = "http://localhost:3003/friend/cancel/"
    const response = await requestAPI.post(cancelFriendRequestURL, requestBody);
    //console.log(response.data)
  
    return response.data;
} 

//COMPONENT: Friend Request
const FriendRequest = ({api, currentUser, friend}) => {
    const queryClient = useQueryClient();

    //Button: Add a Friend on Button Click 
    const handleCancelFriendRequest = (api, currentUser, friendName) => {
        console.log(currentUser + " wants to cancel " + friend.friendName + " as a friend!")
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
       
    }

    //Action: Use React Query to make call
    const { isLoading, mutate } = useMutation(cancelFriendRequestAPI, {
        onSuccess: (returnedData) => {
            queryClient.setQueryData(['all-users'], (originalQueryData) => {
            var updatedQueryData = structuredClone(originalQueryData);
            const statusCode = returnedData.statusCode
            const currentUser = returnedData.data.currentUser
            const newFriend = returnedData.data.friendName

            //Loop over all the users and update the new friend to be request pending
            for (let i = 0; i < updatedQueryData.data.length; i++) {
                //console.log(updatedQueryData.data[i].friendName + " " + newFriend)
                if(updatedQueryData.data[i].friendName.toUpperCase() === newFriend.toUpperCase()) {
                    updatedQueryData.data[i].friendshipKey = "not_friends"
                }
            }
            
            return updatedQueryData;
    
            })
        
        }
        })

    return (     
        <div className="" >
            <p> Friend Request </p>
            <p> Friendship Request Pending (they have to response and you can cancel) - "request_pending"</p>
            <button type="submit" className = "" onClick={() => { handleCancelFriendRequest(api, currentUser, friend.friendName) }}>Cancel</button>
        </div>       
        );
    }  

export default FriendRequest;



