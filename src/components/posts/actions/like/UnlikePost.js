import React from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

const api = axios.create({

})

async function unlikePostAPI(unlikePost) {
  const postURL = "http://localhost:3003/post/unlike"
  const response = await axios.post(postURL, unlikePost);
  console.log(response.data)

  return response.data;
} 


function UnlikePost({groupID, post, currentUser}) {
  const queryClient = useQueryClient();
  const postUserLikesArray = post.likedByUsernameArray;
  const postID = post.postID;

  const handleUnlikePost = (postID, currentUser) => {
    var likedPost = {
        postID: postID,
        currentUser: currentUser   
    }

    mutate(likedPost)
  }

  const { isLoading, mutate } = useMutation(unlikePostAPI, {
    onSuccess: (returnedData) => {
      queryClient.setQueryData(['group-posts', groupID], (originalQueryData) => {
      console.log(returnedData)
      //queryClient.invalidateQueries(['group-posts', groupID]) 
      var updatedQueryData = structuredClone(originalQueryData);
      const postID = returnedData.postID;
      const currentUser = returnedData.currentUser;

      for (let i = 0; i < updatedQueryData.length; i++) {
        if(updatedQueryData[i].postID == postID) {
          
          //Remove the Like from the Complex Like
          let newPostLikesArray = updatedQueryData[i].postLikesArray.filter(function( obj ) {
            return obj.likedByUserName !== currentUser;
          });

          //Remove the Like from the Simple Like
          let newSimpleLikesArray = [];
          
          for (let j = 0; j < updatedQueryData[i].simpleLikesArray.length; j++) {
            if(updatedQueryData[i].simpleLikesArray[j] != currentUser){
              newSimpleLikesArray.push(updatedQueryData[i].simpleLikesArray[j])
            }
          }
            console.log(updatedQueryData[i].postLikesArray);
            console.log(newPostLikesArray);

            console.log(updatedQueryData[i].simpleLikesArray);
            console.log(newSimpleLikesArray);

            updatedQueryData[i].postLikesArray = []
            updatedQueryData[i].postLikesArray = newPostLikesArray

            updatedQueryData[i].simpleLikesArray = []
            updatedQueryData[i].simpleLikesArray = newSimpleLikesArray

          }
      }
      
      return updatedQueryData;
    })
      
    }
  })


  return (
    <div className="">
        <button type="submit" className = "" onClick={() => { handleUnlikePost(postID, currentUser) }}>UnLike Me</button>
    </div>
  );
}


export default UnlikePost;



//
/*



function LikePost({groupID, post, currentUser}) {
  const queryClient = useQueryClient();
  const postUserLikesArray = post.likedByUsernameArray;
  const postID = post.postID;


  const handleLikePost = (postID, currentUser) => {
    var likedPost = {
        postID: postID,
        currentUser: currentUser   
    }

    mutate(likedPost)
  }

  const { isLoading, mutate } = useMutation(likePostAPI, {
    onSuccess: (returnedData) => {
      queryClient.setQueryData(['group-posts', groupID], (originalQueryData) => {

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
