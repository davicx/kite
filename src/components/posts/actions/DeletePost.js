import React, { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

const api = axios.create({

})

async function deletePostAPI(deletePost) {
  const postURL = "http://localhost:3003/post/delete/"
  const response = await axios.post(postURL, deletePost);
  console.log(response.data)

  return response.data;
  } 
  

const DeletePost = ({ groupID, currentUser, postID}) => {
  const queryClient = useQueryClient();

  const handleDeletePost = (currentUser, postID) => {
    var deletePost = {
        postID: postID,
        currentUser: currentUser   
    }
    console.log("DELETE ")
    console.log(deletePost)
    mutate(deletePost) 
  }

    const { isLoading, mutate } = useMutation(deletePostAPI, {
        onSuccess: (returnedData) => {
          queryClient.setQueryData(['group-posts', groupID], (originalQueryData) => {
            //queryClient.invalidateQueries(['group-posts', groupID]) 

            var updatedQueryData = [];

            //STEP 1: Remove post with this ID
            var deletedPostID = returnedData.data[0].postID

            for (let i = 0; i < originalQueryData.length; i++) {
                if(originalQueryData[i].postID != deletedPostID) {
                    updatedQueryData.push(originalQueryData[i])
                }
            }
    
            return updatedQueryData;
            
            })    
        }
      })
      

    return (     
        <div className="" >
            <button type="submit" className = "" onClick={() => { handleDeletePost(currentUser, postID) }}>Delete Me</button>                 
        </div>       
        );
    }  

export default DeletePost;
