import React, { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

//FUNCTION 1: New Post API
async function makePostAPI(post) {
    const postURL = "http://localhost:3003/post/text";
    const response = await axios.post(postURL, post);

    return response.data;
} 

function NewPost({ groupID, currentUser, api }) {

    //FUNCTION 2: Handle New Post Submit Button
    const [postCaption, setPostCaption] = useState('Hiya sam! wanna go on a hike today the weather is perfect!')
   
    const handleChange = (event) => {
        const { name, value } = event.target
        setPostCaption(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        var newPost = {
            masterSite: "kite",
            postType: "text",
            postFrom: currentUser,
            postTo: groupID,
            groupID: groupID,
            listID: 0,
            postCaption: postCaption,
            notificationMessage: "Posted a Message",   
            notificationType: "new_post_text",
            notificationLink: "http://localhost:3003/posts/group/" + groupID
        }
        //makePost(newPost)
        //console.log(newPost)
        mutate(newPost)
        
    }

    //FUNCTION 3: React Query Mutation
    const queryClient = useQueryClient();
    const { isLoading, mutate } = useMutation(makePostAPI, {
        onSuccess: (returnedData) => {
          queryClient.setQueryData(['group-posts', groupID], (originalQueryData) => {
                var updatedPostData = structuredClone(originalQueryData);
                let newPost = returnedData.data;

                updatedPostData.unshift(newPost);

                return updatedPostData;     
            })
        }
      })

    //FUNCTION 4: React and Site Page
    return (
        <div className="new-post">
            <p><b> Make a Post </b>to Group { groupID } </p>
            <p> Current User: { currentUser} </p>
            <form onSubmit={ handleSubmit }>
                <label> </label> 
                <input name= "postCaption" className = "new-post-caption" type="text" value={ postCaption } onChange={handleChange} />
                <p> &nbsp </p>
                <input type="file" id="myFile" name="filename"></input>
                <button type="submit"> Submit </button>
            </form>
        </div>
    );
}

export default NewPost;


