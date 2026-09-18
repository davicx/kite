import React, { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'


//Create the API to call 
const api = axios.create({

})

async function likePostAPI(likedPost) {
  const postURL = "http://localhost:3003/post/like"
  const response = await axios.post(postURL, likedPost);
  console.log(response.data)

  return response.data;
} 

//COMPONENT: Like Post  
function LikePost({groupID, post, currentUser}) {
  const queryClient = useQueryClient();
  //const postUserLikesArray = post.likedByUsernameArray;
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
          console.log("updatedQueryData")
          console.log(updatedQueryData)
          console.log("updatedQueryData")

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
