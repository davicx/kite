import React, { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

//ADD REACT QUERY BUT NO IMAGE
async function postImage(newPost) {
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
  
    console.log(result.data)
    return result.data
}


const NewPhotoPost = ({ groupID, currentUser, api }) => {
    const [file, setFile] = useState()
    const [postCaption, setPostCaption] = useState('Hiya sam! wanna go on a hike today the weather is perfect!')
  
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

      const result = await postImage(newPost)
    }
  
    const fileSelected = event => {
      const file = event.target.files[0]
          setFile(file)
      }
  
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


