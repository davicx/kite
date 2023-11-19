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

        mutate(newComment)
        
    }

    //FUNCTION 3: React Query Mutation
    const queryClient = useQueryClient();
    const { isLoading, mutate } = useMutation(newCommentAPI, {
        onSuccess: (returnedData) => {
          queryClient.setQueryData(['group-posts', groupID], (originalQueryData) => {
                var updatedPostData = structuredClone(originalQueryData);
                var postID = returnedData.data.postID
                var newComment = returnedData.data;

                //Inser the new comment into the post that the comment was made too 
                for (let i = 0; i < updatedPostData.length; i++) {
                    if(updatedPostData[i].postID == postID) {
                        updatedPostData[i].commentsArray.push(newComment)
                    }
                    
                }
                return updatedPostData;     
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


