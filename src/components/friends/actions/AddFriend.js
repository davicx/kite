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
    return (     
        <div className="" >
            <button type="submit" className = "" onClick={() => { handleAddFriend(api, currentUser, friend) }}>Add a Friend!</button>
        </div>       
        );
    }  

export default AddFriend;


//WORKS NO REACT QUERY
/*
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
   /*
    //mutate(likedPost)

}


const AddFriend = ({api, currentUser, friend}) => {
    return (     
        <div className="" >
            <button type="submit" className = "" onClick={() => { handleAddFriend(api, currentUser, friend) }}>Add a Friend!</button>
        </div>       
        );
    }  

export default AddFriend;
*/

//EXAMPLE

/*
import React, { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

const api = axios.create({

})

async function likePostAPI(likedPost) {
  const postURL = "http://localhost:3003/post/like"
  const response = await axios.post(postURL, likedPost);
  console.log(response.data)

  return response.data;
} 


function LikePost({groupID, post, currentUser}) {
  const queryClient = useQueryClient();
  const postUserLikesArray = post.likedByUsernameArray;
  const postID = post.postID;


  const handleLikePost = (postID, currentUser) => {
    var likedPost = {
        postID: postID,
        currentUser: currentUser,
        groupID: groupID
    }

    mutate(likedPost)

  }

  const { isLoading, mutate } = useMutation(likePostAPI, {
    onSuccess: (returnedData) => {
      queryClient.setQueryData(['group-posts', groupID], (originalQueryData) => {
        console.log(returnedData)
        //STEP 1: Get post ID of updated post and new like array 
        var updatedQueryData = structuredClone(originalQueryData);
        const postID = returnedData.postID;
        const currentUser = returnedData.currentUser;

        for (let i = 0; i < updatedQueryData.length; i++) {

            if(updatedQueryData[i].postID == postID) {

                var postLike = returnedData.newLike[0];

                //Create the new array of users who have liked this
                updatedQueryData[i].postLikesArray.push(postLike)
                updatedQueryData[i].simpleLikesArray.push(currentUser)
                updatedQueryData[i].totalLikes = updatedQueryData[i].simpleLikesArray.length

            }
        }

            return updatedQueryData;

        })
            
    }
  })

  return (
    <div className="">
        <button type="submit" className = "" onClick={() => { handleLikePost(postID, currentUser) }}>Like Me</button>
    </div>
  );
}


export default LikePost;

*/