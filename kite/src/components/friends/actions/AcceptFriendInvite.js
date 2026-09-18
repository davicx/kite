import React from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

//PART 1: API Call
async function acceptFriendInviteAPI(acceptFriendInvite) {
    const requestAPI = acceptFriendInvite.api
    const requestBody = acceptFriendInvite.acceptFriendInviteBody

    const acceptFriendInviteURL = "http://localhost:3003/friend/accept/"
    const response = await requestAPI.post(acceptFriendInviteURL, requestBody);
    //console.log(response.data)
  
    return response.data;
} 


//COMPONENT: Friend Request
const AcceptFriendInvite = ({api, currentUser, friend}) => {
    const queryClient = useQueryClient();

    //Button: Add a Friend on Button Click 
    const handleAcceptFriendInvite = (api, currentUser, friendName) => {
        console.log(currentUser + " wants to accept " + friendName + " as a friend!")
        
        var acceptFriendInviteBody = {
            masterSite: "kite",
            currentUser: currentUser,
            friendName: friendName
        }

        var acceptFriendInvite = {
            api: api,
            acceptFriendInviteBody: acceptFriendInviteBody
        }

        mutate(acceptFriendInvite)
       
    }

    //Action: Use React Query to make call
    const { isLoading, mutate } = useMutation(acceptFriendInviteAPI, {
        onSuccess: (returnedData) => {
            queryClient.setQueryData(['all-users'], (originalQueryData) => {
            var updatedQueryData = structuredClone(originalQueryData);
            const currentUser = returnedData.data.currentUser
            const newFriend = returnedData.data.friendName
    
            //Loop over all the users and update the new friend to be request pending
            for (let i = 0; i < updatedQueryData.data.length; i++) {
                //console.log(updatedQueryData.data[i].friendName + " " + newFriend)
                if(updatedQueryData.data[i].friendName.toUpperCase() === newFriend.toUpperCase()) {
                    updatedQueryData.data[i].friendshipKey = "friends"
                }
            }
            
            return updatedQueryData;
    
            })
        
        }
    })

            
    return (     
        <div className="" >
            <button type="submit" className = "" onClick={() => { handleAcceptFriendInvite(api, currentUser, friend.friendName) }}>Accept</button>
        </div>       
        );
    }  

export default AcceptFriendInvite;
