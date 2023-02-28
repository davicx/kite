import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

var groupID = 72;


const api = axios.create({
  
})

async function likePostAPI(likedPost) {
    const postURL = "http://localhost:3003/api/post/like"
    const response = await axios.post(postURL, likedPost);

    return response.data;
} 


const Likes = (props) => {
    const queryClient = useQueryClient();
    const currentUser = props.currentUser;
    const post = props.post;

    const totalLikes = props.post.totalLikes;
    const postLikesArray = props.post.postLikesArray;
    const postID = props.post.postID;
    

    const handleLikePost = (postID, currentUser) => {
        var likedPost = {
            postID: postID,
            likedBy: currentUser   
        }

        mutate(likedPost)
        //console.log(currentUser + " you liked " + postID)
    }
    const { isLoading, mutate } = useMutation(likePostAPI, {
        onSuccess: (returnedData) => {
            //queryClient.invalidateQueries(['posts'])
   
            queryClient.setQueryData(['group', groupID], (originalQueryData) => {
                console.log("returnedData")
                console.log(returnedData)
                console.log("originalQueryData")
                console.log(originalQueryData)

                //STEP 1: Get post ID of updated post and new like array 
                const postID = returnedData.postID;
                const postLikesArray = returnedData.postLikesArray;
                console.log("postID")
                console.log(postID)
                console.log("postLikesArray")
                console.log(postLikesArray)  
                var updatedQueryData = structuredClone(originalQueryData);

                for (let i = 0; i < updatedQueryData.length; i++) {
                    //console.log(updatedQueryData[i].postID + " " + postID)
                    if(updatedQueryData[i].postID == postID) {
                        console.log("Change this post! " + postID)

                        
                        //Create the new array of users who have liked this
                        updatedQueryData[i].postLikesArray = []
                        updatedQueryData[i].postLikesArray = returnedData.postLikesArray
                        updatedQueryData[i].totalLikes = returnedData.postLikesArray.length


                    }
                }

                return updatedQueryData;
                //return [data];
            })
        }
    })

    return (
        <div className="">
            <p className = "post-text">total Likes { totalLikes } </p>  
            <ul> { postLikesArray.map((likedBy) => (
                <li key = { likedBy}  > { likedBy } </li> 
            ))}</ul>
            { postLikesArray.includes(currentUser) ? 
                <button type="submit" className = "post-liked" onClick={() => { handleLikePost(postID, currentUser) }}>Like</button>: 
                <button type="submit" className = "" onClick={() => { handleLikePost(postID, currentUser) }}>Like</button>
            }
        </div>
        );
    } 
  
export default Likes;
