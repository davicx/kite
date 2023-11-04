


//APPENDIX

/*
        <div>
          <p><b>Current User: { currentUser } is visiting a group with the ID { groupID }</b></p>
          <GroupPosts groupID = { groupID } currentUser = { currentUser } api = { axiosRequest } />
          <Link className="" to="/groups"> Groups </Link>
        </div>
*/


//import Posts from '../components/posts/GroupPosts';
//import NewPost from './../components/posts/NewPost';

//USER: Login and Refresh 

/*
import axios from 'axios'

const axiosRequest = axios.create({
  withCredentials: true
})  

async function refreshToken() {
  console.log("ATTEMPTING TO REFRESH TOKEN: refreshToken()")
    const refreshURL = "http://localhost:3003/refresh/tokens"
      const data = localStorage.getItem("localStorageCurrentUser");
      const userName = JSON.parse(data);
      console.log("refreshToken: you are refreshing for" + userName)
      //STEP 1: Call Logout API
      axiosRequest.post(refreshURL, {
        userName: userName,
        refreshToken: "dontneedheretoken"
      })
      .then(function (response) {
        console.log("refreshToken(): We got a new access token!")
        return response.data;
      })
      .catch(function (error) {
        console.log("refreshToken(): We failed to get a new access token!")
        //console.log(error);
      });
  
  }

//STATUS 200: Good Request 
axiosRequest.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  console.log("INTERCEPTOR: Looks good! ")
  return response;
}, function (error) {
  console.log(error.response.status)
  console.log(error.response)
  
  //STATUS 498:  Need to get a access token
  console.log("INTERCEPTOR: Need to get a access token or logout the user")
  if(error.response.status == 498) {
    console.log("INTERCEPTOR 498: We got a 498 so we need a new access token. Will send refresh token ")
    //const refreshURL = "http://localhost:3003/refresh/tokens"
    const refreshURL = "http://localhost:3003/refresh/tokens"

    //const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
    //const { data, error, isPending } = useRefreshToken(refreshURL);
    //const refreshOutcome = refreshToken(axiosRequest);
    const refreshOutcome = refreshToken(axiosRequest);
    console.log("We refreshed the access token!")

  } 

  //STATUS 440: Logout User
  if(error.response.status == 440) {
    console.log("INTERCEPTOR 440: We got a 440 we couldn't refresh the access token because the refresh token was no good need to logout the user")  
    localStorage.setItem('localStorageCurrentUser', JSON.stringify("null")); 
    window.location.href = '/login';
  }
  
  return Promise.reject(error);
  
});

//Login and Refresh
*/


//ORIGINAL
/*
console.log("originalQueryData")
console.log(originalQueryData)
console.log("originalQueryData")

console.log("updatedQueryData")
console.log(updatedQueryData)
console.log("updatedQueryData")      

console.log("returnedData")
console.log(returnedData)
console.log("returnedData")
*/
/*
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
           //OLD: queryClient.invalidateQueries(['group-posts', groupID])
            let newPost = returnedData.data;

            console.log("returnedData")
            console.log(returnedData)
            
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
*/


//BACKUP






//ORIGINAL
/*
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
           //OLD: queryClient.invalidateQueries(['group-posts', groupID])
            let newPost = returnedData.data;

            console.log("returnedData")
            console.log(returnedData)
            
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
*/


//ORIGINAL NEWER
/*
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

function NewPost({ groupID, currentUser, api }) {
    var groupID = props.groupID
    var currentUser = props.currentUser
    //console.log("props")
    //console.log(props)
    //console.log("props")
    const queryClient = useQueryClient();
    const [postCaption, setPostCaption] = useState('Hiya sam! wanna go on a hike today the weather is perfect!')
    
    const { isLoading, mutate } = useMutation(makePost, {
        onSuccess: (returnedData) => {
            queryClient.setQueryData(['group-posts', groupID], (originalQueryData) => {
                console.log(returnedData)
                
                //STEP 1: Get post ID of updated post and new like array 
                var updatedQueryData = structuredClone(originalQueryData);
                console.log("updatedQueryData")
                console.log(updatedQueryData)
                console.log("updatedQueryData")
        
                const postID = returnedData.postID;
                const currentUser = returnedData.currentUser;
    
        
                    return updatedQueryData;
        
                })
                    
            
            console.log(returnedData)
            console.log("DV: GROUPD DATA")
            console.log(groupID)
            console.log(returnedData)
            console.log("DV: GROUPD DATA")
           //OLD: 
           //queryClient.invalidateQueries(['group-posts', groupID])
           
            let newPost = returnedData.data;

            //queryClient.setQueryData(['group-posts', groupID], (originalQueryData) => {
            queryClient.setQueryData(['group-posts', groupID], (oldPostData) => {
                //var updatedPostData = structuredClone(oldPostData);
                //updatedPostData.unshift(newPost);
                console.log("oldPostData")
                console.log(oldPostData)
                console.log("oldPostData")
                //return updatedPostData;
                return oldPostData;
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
            //postFrom: missing so doesn't work,
            postFrom: "davey",
            postTo: groupID,
            groupID: groupID,
            listID: 0,
            postCaption: postCaption,
            notificationMessage: "Posted a Message",   
            notificationType: "new_post_text",
            notificationLink: "http://localhost:3003/posts/group/" + groupID
        }
        console.log(newPost)
        //currentUser = "davey" groupID = { 70 } api = { axiosRequest }
        //makePost(newPost)
        mutate(newPost)
        
    }

    return (
    <div className="new-post">
         <p><b> Make a Post </b>to Group { groupID } NEEDS UPDATING </p>
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