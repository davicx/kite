import React from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'


//PART 1: API Call
async function declineFriendInviteAPI(declineFriendInvite) {
    const requestAPI = declineFriendInvite.api
    const requestBody = declineFriendInvite.declineFriendInviteBody

    const declineFriendInviteURL = "http://localhost:3003/friend/decline/"
    const response = await requestAPI.post(declineFriendInviteURL, requestBody);
    //console.log(response.data)
  
    return response.data;
} 

//COMPONENT: Friend Request
const DeclineFriendInvite = ({api, currentUser, friend}) => {
    const queryClient = useQueryClient();

    //Button: Add a Friend on Button Click 
    const handleDeclineFriendInvite = (api, currentUser, friendName) => {
        console.log(currentUser + " wants to decline " + friendName + " as a friend!")

        var declineFriendInviteBody = {
            masterSite: "kite",
            currentUser: currentUser,
            friendName: friendName
        }

        var declineFriendInvite = {
            api: api,
            declineFriendInviteBody: declineFriendInviteBody
        }

        mutate(declineFriendInvite)
    
       
    }

    //Action: Use React Query to make call
    const { isLoading, mutate } = useMutation(declineFriendInviteAPI, {
        onSuccess: (returnedData) => {
            queryClient.setQueryData(['all-users'], (originalQueryData) => {
            var updatedQueryData = structuredClone(originalQueryData);
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
            <button type="submit" className = "" onClick={() => { handleDeclineFriendInvite(api, currentUser, friend.friendName) }}>Decline</button>
       </div>       
        );
    }  

export default DeclineFriendInvite;
