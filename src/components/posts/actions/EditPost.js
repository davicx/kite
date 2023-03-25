import React, { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

const api = axios.create({
  
})

async function editPostAPI(post) {
    const postURL = "http://localhost:3003/post/text";
    const response = await axios.post(postURL, post);

    return response.data;
} 

function EditPost({ groupID, currentUser, postID}) {
    const queryClient = useQueryClient();
    const [newPostCaption, setPostCaption] = useState('oh change me!')
    
    const { isLoading, mutate } = useMutation(editPostAPI, {
        onSuccess: (returnedData) => {
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

        var editedPost = {
            masterSite: "kite",
            postID: postID,
            postType: "text",
            postFrom: currentUser,
            postCaption: newPostCaption,
        }

        console.log("POST the new edit!!")
        console.log(editedPost)
        //makePost(newPost)
        //mutate(newPost)
        
    }

    return (
    <div className="new-post">
         <form onSubmit={ handleSubmit }>
            <label> </label> 
            <input name= "postCaption" type="text" value={ newPostCaption } onChange={handleChange} />
            <p> {newPostCaption}</p>
            <button type="submit"> Edit Post </button>
        </form>
    </div>
    );
}


export default EditPost;

/*
import React, { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

const api = axios.create({

})

async function editPostAPI(deletePost) {
  const postURL = "http://localhost:3003/post/delete/"
  const response = await axios.post(postURL, deletePost);
  console.log(response.data)

  return response.data;
  } 
  

const EditPost = ({ groupID, currentUser, postID}) => {
  const queryClient = useQueryClient();

  const handleEditPost = (currentUser, postID) => {
    var editPost = {
        postID: postID,
        currentUser: currentUser   
    }
    console.log("EDIT ME! ")
    console.log(editPost)
    //mutate(deletePost) 
  }

    const { isLoading, mutate } = useMutation(editPostAPI, {
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
        <div className="">
            
            <button type="submit" className = "" onClick={() => { handleEditPost(currentUser, postID) }}>Edit Me</button>                 
        </div>       
        );
    }  

export default EditPost;
*/