import React, { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

//FUNCTION 1: New Post API
async function newCommentAPI(comment) {
    const commentURL = "http://localhost:3003/comment";
    const response = await axios.post(commentURL, comment);

    return response.data;
} 

function NewComment({ api, postComments, groupID, postID, postTo, currentUser }) {

    //FUNCTION 2: Handle New Comment Submit Button
    const [commentCaption, setCommentCaption] = useState('Yes lets go hike!')
   
    const handleChange = (event) => {
        const { name, value } = event.target
        setCommentCaption(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        var newComment = {
            masterSite: "kite",
            commentCaption: commentCaption,
            commentType: "post",
            commentFrom: currentUser,
            groupID: groupID,
            postID: postID,
            listID: 0,
            notificationMessage: "Posted a Message",   
            notificationType: "new_post_text",
            notificationLink: "http://localhost:3003/posts/group/" + groupID
        }

        //makePost(newPost)
        //console.log(newComment)
        mutate(newComment)
        
    }

    //FUNCTION 3: React Query Mutation
    const queryClient = useQueryClient();
    const { isLoading, mutate } = useMutation(newCommentAPI, {
        onSuccess: (returnedData) => {
          queryClient.setQueryData(['group-posts', groupID], (originalQueryData) => {
                var updatedPostData = structuredClone(originalQueryData);
                //let newPost = returnedData.data;
            

                console.log("returnedData")
                console.log(returnedData.data)
                console.log("returnedData")

                
                var postID = returnedData.data.postID
                var returnedComment = returnedData.data
                for (let i = 0; i < updatedPostData.length; i++) {
                    //console.log(updatedPostData[i])
                    if(updatedPostData[i].postID == postID) {
                        console.log("Update this post")
                        console.log(updatedPostData[i]);
                        //var postLike = returnedData.newLike[0];

                        //Create the new array of users who have liked this
                        //updatedQueryData[i].postLikesArray.push(postLike)
                        //updatedQueryData[i].simpleLikesArray.push(currentUser)
                        //updatedQueryData[i].totalLikes = updatedQueryData[i].simpleLikesArray.length

                        /*
                        {
                            "commentID": 179,
                            "postID": 537,
                            "commentCaption": "Yes lets go hike!",
                            "commentFrom": "davey",
                            "userName": "davey",
                            "imageName": "davey.jpg",
                            "firstName": "davey v",
                            "lastName": "davey v",
                            "commentLikes": [],
                            "postDate": "11/12/2023",
                            "postTime": "4:47 pm",
                            "timeMessage": "a few seconds ago",
                            "created": "2023-11-13T00:47:48.620Z",
                            "commentLikeCount": 0
                          }
                          {
                            "commentID": 178,
                            "postID": 537,
                            "commentCaption": "Yes lets go hike!",
                            "commentFrom": "davey",
                            "userName": "davey",
                            "imageName": "davey.jpg",
                            "firstName": "davey v",
                            "lastName": "davey v",
                            "commentLikes": [],
                            "created": "2023-11-13T00:47:30.000Z",
                            "commentLikeCount": 0
                            }
                          */
                    }
                    
                }
                console.log("originalQueryData")
                //updatedPostData.unshift(newPost);

                //Set the new posts

                return originalQueryData;     
            })
        }
      })

    //FUNCTION 4: React and Site Page
    return (
        <div className="new-post">
            <form onSubmit={ handleSubmit }>
                <label> New Comment </label> 
                <input name= "postCaption" type="text" value={ commentCaption } onChange={handleChange} />
                <p> {commentCaption}</p>
                <button type="submit"> Submit </button>
            </form>
        </div>
    );
}

export default NewComment;

