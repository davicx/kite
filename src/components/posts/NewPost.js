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
    const [postCaption, setPostCaption] = useState('say something cool!')
    
    const { isLoading, mutate } = useMutation(makePost, {
        onSuccess: (returnedData) => {
           //queryClient.invalidateQueries(['group-posts', groupID])
            
            const newPost = returnedData.newPost;
            console.log("newPost")
            console.log(newPost)


            //var updatedPostData= structuredClone(originalQueryData);
            queryClient.setQueryData(['group-posts', groupID], (oldPostData) => {
                oldPostData.unshift(newPost);

                return oldPostData;
            })
        


        }
    })
    
    /*
        //API UPDATE
    const { isLoading, mutate } = useMutation(editPost, {
        onSuccess: (returnedData) => {
            //queryClient.invalidateQueries(['group', groupID])
            queryClient.setQueryData(['group', groupID], (originalQueryData) => {
                console.log("returnedData")
                console.log(returnedData)
                console.log("originalQueryData")
                console.log(originalQueryData)
                    
                //STEP 1: Get post ID of updated post and new like array 
                const postID = returnedData.postID;
                const newPostCaption = returnedData.postCaption;
  
                var updatedQueryData = structuredClone(originalQueryData);

                for (let i = 0; i < updatedQueryData.length; i++) {
                    //console.log(updatedQueryData[i].postID + " " + postID)
                    if(updatedQueryData[i].postID == postID) {
                        console.log("Change this post! " + postID)
                        //Create the new array of users who have liked this
                        updatedQueryData[i].postCaption = newPostCaption
                    }
                }

                return updatedQueryData;
            }) 
        }
    })
    */

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




/*





function NewPost() {
    var groupID = 72;
    const queryClient = useQueryClient();
    const [postCaption, setPostCaption] = useState('say something cool!')
    
    const { isLoading, mutate } = useMutation(makePost, {
        onSuccess: (data) => {
            //queryClient.invalidateQueries(['posts'])
            const newPost = data;

            queryClient.setQueryData(['group', groupID], (oldPostData) => {
                oldPostData.unshift(newPost);

                return oldPostData;
            })
        }
    })
    
    const handleChange = (event) => {
        const { name, value } = event.target
        setPostCaption(value)
        console.log(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var post = {
            postID: 1,
            postFrom: "david",
            postTo: "sam",
            postCaption: postCaption
        }
        mutate(post)
        console.log("handleSubmit " + postCaption)
    }

    return (
    <div className="new-post">
         <p><b> Make Post </b></p>
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

*/