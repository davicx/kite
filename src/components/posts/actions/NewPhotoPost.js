import React, { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

async function postImage({image, description}) {
    const formData = new FormData();
    formData.append("postImage", image)
    formData.append("postCaption", "hiya there ohhhh ya!!")
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


const NewPhotoPost = () => {
    const [file, setFile] = useState()
    const [description, setDescription] = useState("")
    const [images, setImages] = useState([])
  
    const submit = async event => {
      event.preventDefault()
      const result = await postImage({image: file, description: description})
      setImages([result.image, ...images])
    }
  
    const fileSelected = event => {
      const file = event.target.files[0]
          setFile(file)
      }
  
    return (
      <div className="App">
        <form onSubmit={submit} className = "sixty">
          <input onChange={fileSelected} className="simple-border" type="file" accept="image/*"></input>
          <input value={description} className="simple-border" onChange={e => setDescription(e.target.value)} type="text"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
}

export default NewPhotoPost;




//WORKS BUT NO QUERY

/*
import React, { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

async function postImage({image, description}) {
    const formData = new FormData();
    formData.append("postImage", image)
    formData.append("postCaption", "hiya there ohhhh ya!!")
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


const NewPhotoPost = () => {
    const [file, setFile] = useState()
    const [description, setDescription] = useState("")
    const [images, setImages] = useState([])
  
    const submit = async event => {
      event.preventDefault()
      const result = await postImage({image: file, description: description})
      setImages([result.image, ...images])
    }
  
    const fileSelected = event => {
      const file = event.target.files[0]
          setFile(file)
      }
  
    return (
      <div className="App">
        <form onSubmit={submit} className = "sixty">
          <input onChange={fileSelected} className="simple-border" type="file" accept="image/*"></input>
          <input value={description} className="simple-border" onChange={e => setDescription(e.target.value)} type="text"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
}

export default NewPhotoPost;

*/





//OLD
/*

//FUNCTION 1: New Post API
async function makePostAPI(post, images) {
    const formData = new FormData();
    /*
    postImage
    postType
    masterSite
    postFrom
    postTo
    groupID
    listID
    postCaption
    notificationMessage: Posted a Photo
    notificationType: new_post_photo
    notificationLink: http://localhost:3003/posts/group/77

    */
   /*
    formData.append("image", image)
    formData.append("description", post.postCaptions)
    const result = await axios.post('http://localhost:3003/post/photo/local/aws', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  
    console.log(result.data)
    return result.data
} 

function NewPhotoPost({ groupID, currentUser, api }) {
    const [file, setFile] = useState()
    const [postCaption, setPostCaption] = useState('Hiya sam! wanna go on a hike today the weather is perfect!')
    //const [images, setImages] = useState([])

    //FUNCTION 2: Handle New Post Submit Button
    const handleChange = (event) => {
        const { name, value } = event.target
        setPostCaption(value)
    }

    //FUNCTION 3: File Upload Handling
    const fileSelected = event => {
        const file = event.target.files[0]
            setFile(file)
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
        mutate(newPost, image)
        
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
                <input onChange={fileSelected} className="simple-border" type="file" accept="image/*"></input>
                <button type="submit"> Submit </button>
            </form>
        </div>
    );
}

export default NewPhotoPost;


*/

/*
<input onChange={fileSelected} className="simple-border" type="file" accept="image/*"></input>
<input value={description} className="simple-border" onChange={e => setDescription(e.target.value)} type="text"></input>
<button type="submit">Submit</button>

//WORKS FOR TEXT: Trying to build one with photo to AWS
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
*/


    /* 
    postImage
    postType
    masterSite
    postFrom
    postTo
    groupID
    listID
    postCaption
    notificationMessage: Posted a Photo
    notificationType: new_post_photo
    notificationLink: http://localhost:3003/posts/group/77
    */