import React, { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

const api = axios.create({
  
})

async function makePost(post) {
    const postURL = "http://localhost:3003/post/text";
    const response = await axios.post(postURL, post);

    return response.data;
} 

function NewPost({ groupID, currentUser }) {
    const queryClient = useQueryClient();
    const [postCaption, setPostCaption] = useState('Hiya sam! wanna go on a hike today the weather is perfect!')
    
    const { isLoading, mutate } = useMutation(makePost, {
        onSuccess: (returnedData) => {
            console.log(returnedData)
           //queryClient.invalidateQueries(['group-posts', groupID])
            const newPost = returnedData.newPost;

            queryClient.setQueryData(['group-posts', groupID], (oldPostData) => {
                var updatedPostData= structuredClone(oldPostData);
                updatedPostData.unshift(newPost);

                return updatedPostData;
            })
        }
    })
    

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
        mutate(newPost)
        
    }

    return (
    <div className="new-post">
         <p><b> Make a Post </b>to Group { groupID }</p>
         <form onSubmit={ handleSubmit }>
            <label> </label> 
            <input name= "postCaption" type="text" value={ postCaption } onChange={handleChange} />
            <p> {postCaption}</p>
            <button type="submit"> Submit </button>
        </form>
    </div>
    );
}


export default NewPost;