/*
import React, { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'


async function updatePost(post) {
  const postURL = "http://localhost:3003/post/temp";
  const response = await axios.post(postURL, post);
  //console.log("RESPONSE DATA: ")
  //console.log(response.data)
  //console.log("_____________________")
  return response.data;
} 

function MakePost() {
  const queryClient = useQueryClient();
  const [postCaption, setPostCaption] = useState('say something cool!')

  
    const { isLoading, mutate } = useMutation(updatePost, {
        onMutate: (post) => {
            console.log("on Mutate: post");
            console.log(post);
            
        },
        onSuccess: (data) => {
            console.log("on Success: data");
            console.log(data.postID);
            console.log(data);
            //queryClient.setQueryData(['posts'], data)
            queryClient.invalidateQueries(['posts'])
        }
    })

        /*
        //setIsEditing(false)
        //queryClient.invalidateQueries(['post', postID])
        //queryClient.invalidateQueries(['posts', 0])
        //queryClient.setQueryData(['posts', { groupID: 77 }], updatePost)
        //queryClient.setQueryData(['post', { id: 1 }], data)
        console.log("onSuccess: ")
        console.log(data)



        //Doesn't work
        queryClient.setQueryData('posts', (oldQueryData) => {
            return {
                ... oldQueryData,
                data: [...oldQueryData,data, data.data]
            }
        })

        //WORKS
        //queryClient.invalidateQueries(['posts'])
        *//*


    //WORKING
    
    const { isLoading, mutate } = useMutation(updatePost, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['posts'])
        }
    })

    
    
  const handleChange = (event) => {
        const { name, value } = event.target
        //console.log(value)
        setPostCaption(value)
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("handleSubmit " + postCaption)
        console.log(post)    
        var post = {
            masterSite: "kite",
            postType: "text",
            postFrom: "davey",
            postTo: "frodo",
            groupID: 77,
            listID: 0,
            postCaption: postCaption,   
            notificationMessage: "Posted a Message",   
            notificationType: "new_post_text",
            notificationLink: "http://localhost:3003/posts/group/77"
          }
        mutate(post)
    }

    if(isLoading) {
        return <p> saving data </p> 
    }

  return (
    <div className="user">
      <p> Make Post </p>
      <form onSubmit={ handleSubmit }>
          <label> </label> 
          <input name= "postCaption" type="text" value={ postCaption } onChange={handleChange} />
          <p> {postCaption}</p>
          <button type="submit"> Submit </button>
      </form>
    </div>
  );
}


export default MakePost;
*/

/*
import React, { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

async function updatePost(post) {
    const postURL = "http://localhost:3003/post/update/text";
    const response = await axios.post(postURL, post);
    return response.data;
} 

const PostForm = ( {post, setIsEditing} ) => {
    const postID = post.postID
    const postCaption = post.postCaption
    console.log(postID, postCaption)
    const [updatedPostCaption, setPostCaption] = useState(postCaption);
    const queryClient = useQueryClient();

    //
    const handleSubmit = (event) => {
        event.preventDefault();
        mutation.mutate({
            "postType": post.postType,
            "groupID": post.groupID,
            "listID": post.listID,
            "postFrom": post.postFrom,
            "postTo": post.postTo,
            "postCaption": updatedPostCaption,
            "fileName": post.fileName,
            "fileNameServer": post.fileNameServer,
            "fileUrl": post.fileUrl,
            "videoURL": post.videoURL,
            "videoCode": post.videoCode,
            "created": post.created,
            "postID": post.postID
          })
    }


    const mutation = useMutation(updatePost, {
      onSuccess: data => {
          console.log(data);
        queryClient.setQueryData(['posts', { id: 1 }], data)
      }
    })
      
    
    // The query below will be updated with the response from the successful mutation
    //const { status, data, error } = useQuery(['todo', { id: 5 }], fetchTodoById)
  
    //Type 1: Simple 
    //const { isLoading, mutate } = useMutation(updatePost)

    //Type 2: Invalidate Data
    
    const { isLoading, mutate } = useMutation(updatePost, {
        onSuccess: () => {
            setIsEditing(false)
            //queryClient.invalidateQueries(['post', postID])
            //queryClient.invalidateQueries(['posts', 0])
            queryClient.setQueryData(['posts', { groupID: 77 }], updatePost)
            //queryClient.setQueryData(['post', { id: 1 }], data)
            //queryClient.invalidateQueries(['posts'])
        }
    })

 
    
    
    //Type 3: Optimistic 
    
    const { isLoading, mutate } = useMutation(updatePost, {
        onMutate: (updatedPost) => {
            queryClient.setQueryData(['post', postID], updatedPost)
            setIsEditing(false);
        },
        onSuccess: () => {  
            //queryClient.invalidateQueries(['post', postID])
            queryClient.invalidateQueries(['posts'])
        }
    })

    if(isLoading) {
        return 'saving change'
    }
    

    const handleChange = (event) => {
        const { name, value } = event.target
        console.log(value)
        setPostCaption(value)
    }

    
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("handleSubmit " + updatedPostCaption)
        const updatedPost = {
            "postType": post.postType,
            "groupID": post.groupID,
            "listID": post.listID,
            "postFrom": post.postFrom,
            "postTo": post.postTo,
            "postCaption": updatedPostCaption,
            "fileName": post.fileName,
            "fileNameServer": post.fileNameServer,
            "fileUrl": post.fileUrl,
            "videoURL": post.videoURL,
            "videoCode": post.videoCode,
            "created": post.created,
            "postID": post.postID
        }

        console.log("POST!")
        console.log(updatedPost)    

        mutate(updatedPost)
    }
    
    return (
        <div>
            <form onSubmit={ handleSubmit }>
                <label> </label> 
                <input name= "postCaption" type="text" value={ updatedPostCaption } onChange={handleChange} />
                <button type="submit"> Submit </button>
            </form>
        </div>
        );
    }  

export default PostForm;

/*
{
    "postType": "text",
    "groupID": 77,
    "listID": 0,
    "postFrom": "davey",
    "postTo": "frodo",
    "postCaption": "UPDATE 5 Hiya Frodo!! What a sunny day! The weather is perfect! wanna hike or we could garden!",
    "fileName": "",
    "fileNameServer": "hiya.jpg",
    "fileUrl": "empty",
    "videoURL": "empty",
    "videoCode": "empty",
    "created": "2021-12-19T08:14:03.000Z",
    "postID": 257
}
*/

/*

const PostForm = ({ post }) => {
    const [postFields, setPostFields] = useState({...post});

    const handleChange = (event) => {
        const { name, value } = event.target
        setPostFields({...postFields, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(postFields)
    }

    return (
        <div>
            <form onSubmit={ handleSubmit }>
                <label> </label> 
                <input name= "postCaption" type="text" value={postFields.postCaption} onChange={handleChange} />
                <button type="submit"> Submit </button>
            </form>
        </div>
        );
    }  

export default PostForm;
*/



/*
<label> </label> 
<input name= "name" type="text" value={postFields.name} onChange={handleChange} />


import React, { useState } from 'react';
import { useQuery } from "react-query";
import * as api from './postsAPI'

const PostForm = ({ postID }) => {
    const { data: post, isLoading } = useQuery(['post', postID], () => api.getPost(postID), {
        enabled: Boolean(postID)
    })

    if(!postID) {
        return "please select a post"
    }

    if(isLoading) {
        return 'Loading posts...'
    } 

    return (
        <div>
            <p> SELECTED { postID } </p>
            <p> post caption { post[0].postCaption } </p>
        </div>
        );
    }  

export default PostForm;

*/
