import React, { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

//FUNCTION 1: New Post API
async function makePostAPI(newPost) {
    const formData = new FormData();
    formData.append("postImage", newPost.image)
    formData.append("postCaption", newPost.postCaption)
    formData.append("masterSite", "kite")
    formData.append("postType", "photo")
    formData.append("postFrom", "davey")
    formData.append("postTo", "photo")
    formData.append("groupID", "70")
    formData.append("listID", "0")
    formData.append("notificationMessage", "Posted a Photo")
    formData.append("notificationType", "new_post_photo")
    formData.append("notificationLink", "http://localhost:3003/posts/group/70")

    const result = await axios.post('http://localhost:3003/post/photo/local/aws', formData, { headers: {'Content-Type': 'multipart/form-data'}})

    return result.data
}


const NewPhotoPost = ({ groupID, currentUser, api }) => {
    const [file, setFile] = useState()
    const [postCaption, setPostCaption] = useState('Hiya sam! wanna go on a hike today the weather is perfect!')
  
    //FUNCTION 2: Handle New Post Submit Button
    const handleChange = (event) => {
        const { name, value } = event.target
        setPostCaption(value)
    }

    const handleSubmit = async event => {
      event.preventDefault()
 
      var newPost = {
        masterSite: "kite",
        postType: "photo",
        postCaption: postCaption,
        postFrom: currentUser,
        postTo: groupID,
        groupID: groupID,
        listID: 0,
        image: file,
        notificationMessage: "Posted a Message",   
        notificationType: "new_post_text",
        notificationLink: "http://localhost:3003/posts/group/" + groupID
    }

    mutate(newPost)

      //const result = await makePostAPI(newPost)
   }
  
    const fileSelected = event => {
      const file = event.target.files[0]
          setFile(file)
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
  
    
    return (
      <div className="App">
        <form onSubmit={handleSubmit} className = "sixty">
          <input onChange={fileSelected} className="simple-border" type="file" accept="image/*"></input>
          <input name= "postCaption" className = "new-post-caption" type="text" value={ postCaption } onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
}

export default NewPhotoPost;


