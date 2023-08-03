import React from 'react';
//import { useMutation, useQueryClient } from "react-query";
//import axios from 'axios'


const handleAddFriend = (currentUser, friend) => {
    console.log(currentUser + " wants to add " + friend.friendName + " as a friend!")
    
    /*
    var likedPost = {
        postID: postID,
        currentUser: currentUser,
        groupID: groupID
    }
    */
    //mutate(likedPost)

}

const AddFriend = ({api, friend, currentUser}) => {
    //console.log(api)
    //console.log(friend)
    //console.log(currentUser)
    //<button type="button">Add a Friend!</button> 
    return (     
        <div className="" >
            <button type="submit" className = "" onClick={() => { handleAddFriend(currentUser, friend) }}>Add a Friend!</button>
        </div>       
        );
    }  

export default AddFriend;