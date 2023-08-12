import React from 'react';
//import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

//PART 1: API Call
async function addFriendAPI(api, currentUser, friend) {
    const addFriendURL = "http://localhost:3003/friend/request/"
    
    const addFriendBody = {
        "masterSite": "kite",
        "currentUser": currentUser,
        "addFriendName": friend.friendName           
    }

    //console.log(addFriendBody)
    
    //const response = await axios.post(postURL, likedPost);
    const response = await api.post(addFriendURL, addFriendBody);
    console.log(response.data)
  
    return response.data;
} 



const handleAddFriend = (api, currentUser, friend) => {
    console.log(currentUser + " wants to add " + friend.friendName + " as a friend!")
    addFriendAPI(api, currentUser, friend)
    /*
    var likedPost = {
        postID: postID,
        currentUser: currentUser,
        groupID: groupID
    }
    */
    //mutate(likedPost)

}

const AddFriend = ({api, currentUser, friend}) => {
    //console.log(api)
    //console.log(friend)
    //console.log(currentUser)
    //<button type="button">Add a Friend!</button> 
    return (     
        <div className="" >
            <button type="submit" className = "" onClick={() => { handleAddFriend(api, currentUser, friend) }}>Add a Friend!</button>
        </div>       
        );
    }  

export default AddFriend;