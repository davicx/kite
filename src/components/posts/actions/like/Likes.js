import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'
import LikePost from './LikePost';
import UnlikePost from './UnlikePost';



async function unlikePostAPI(likedPost) {
    const postURL = "http://localhost:3003/post/unlike"
    const response = await axios.post(postURL, likedPost);
    //console.log(response)

    return response.data;
} 


const Likes = ({groupID, post, currentUser}) => {
    var postID = post.postID
    const postLikes = post.postLikesArray;
    const simplePostLikes = post.simpleLikesArray;
 

    const handleUnLikePost = (postID, currentUser) => {
        console.log(currentUser + " you liked " + postID)
        var likedPost = {
            postID: postID,
            currentUser: currentUser   
        }

        unlikePostAPI(likedPost)
    }

    return (     
        <div className="post" >
            <p className = "post-text">total Likes { postLikes.length } </p>  
            <ul> { postLikes.map((postLike) => (
              <li className= "like-list" key = { postLike.postLikeID } > { postLike.likedByUserName } </li> 
            ))}</ul>  


            { simplePostLikes.includes(currentUser) ? 
                <button type="submit" className = "post-liked" onClick={() => { handleUnLikePost(postID, currentUser) }}>Unlike</button>: 
                <LikePost groupID = { groupID } post = { post } currentUser = {currentUser} />
            }
        </div>       
        );
    }  

export default Likes;



//FROM SIMPLE
/*
import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

var groupID = 72;

const api = axios.create({
  
})

async function likePostAPI(likedPost) {
    const postURL = "http://localhost:3003/api/post/like"
    const response = await axios.post(postURL, likedPost);

    return response.data;
} 


const Likes = (props) => {
    const queryClient = useQueryClient();
    const currentUser = props.currentUser;
    const post = props.post;

    const totalLikes = props.post.totalLikes;
    const postLikesArray = props.post.postLikesArray;
    const postID = props.post.postID;
    

    const handleLikePost = (postID, currentUser) => {
        var likedPost = {
            postID: postID,
            likedBy: currentUser   
        }

        mutate(likedPost)
        //console.log(currentUser + " you liked " + postID)
    }
    const { isLoading, mutate } = useMutation(likePostAPI, {
        onSuccess: (returnedData) => {
            //queryClient.invalidateQueries(['posts'])
   
            queryClient.setQueryData(['group', groupID], (originalQueryData) => {
                console.log("returnedData")
                console.log(returnedData)
                console.log("originalQueryData")
                console.log(originalQueryData)

                //STEP 1: Get post ID of updated post and new like array 
                const postID = returnedData.postID;
                const postLikesArray = returnedData.postLikesArray;
                console.log("postID")
                console.log(postID)
                console.log("postLikesArray")
                console.log(postLikesArray)  
                var updatedQueryData = structuredClone(originalQueryData);

                for (let i = 0; i < updatedQueryData.length; i++) {
                    //console.log(updatedQueryData[i].postID + " " + postID)
                    if(updatedQueryData[i].postID == postID) {
                        console.log("Change this post! " + postID)

                        
                        //Create the new array of users who have liked this
                        updatedQueryData[i].postLikesArray = []
                        updatedQueryData[i].postLikesArray = returnedData.postLikesArray
                        updatedQueryData[i].totalLikes = returnedData.postLikesArray.length


                    }
                }

                return updatedQueryData;
                //return [data];
            })
        }
    })

    return (
        <div className="">
            <p className = "post-text">total Likes { totalLikes } </p>  
            <ul> { postLikesArray.map((likedBy) => (
                <li key = { likedBy}  > { likedBy } </li> 
            ))}</ul>
            { postLikesArray.includes(currentUser) ? 
                <button type="submit" className = "post-liked" onClick={() => { handleLikePost(postID, currentUser) }}>Like</button>: 
                <button type="submit" className = "" onClick={() => { handleLikePost(postID, currentUser) }}>Like</button>
            }
        </div>
        );
    } 
  
export default Likes;
*/




//CODE
/*
import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

var groupID = 72;


const api = axios.create({
  
})

async function likePostAPI(likedPost) {
    const postURL = "http://localhost:3003/api/post/like"
    const response = await axios.post(postURL, likedPost);

    return response.data;
} 


const Likes = (props) => {
    const queryClient = useQueryClient();
    const currentUser = props.currentUser;
    const post = props.post;

    const totalLikes = props.post.totalLikes;
    const postLikesArray = props.post.postLikesArray;
    const postID = props.post.postID;
    

    const handleLikePost = (postID, currentUser) => {
        var likedPost = {
            postID: postID,
            likedBy: currentUser   
        }

        mutate(likedPost)
        //console.log(currentUser + " you liked " + postID)
    }
    const { isLoading, mutate } = useMutation(likePostAPI, {
        onSuccess: (returnedData) => {
            //queryClient.invalidateQueries(['posts'])
   
            queryClient.setQueryData(['group', groupID], (originalQueryData) => {
                console.log("returnedData")
                console.log(returnedData)
                console.log("originalQueryData")
                console.log(originalQueryData)

                //STEP 1: Get post ID of updated post and new like array 
                const postID = returnedData.postID;
                const postLikesArray = returnedData.postLikesArray;
                console.log("postID")
                console.log(postID)
                console.log("postLikesArray")
                console.log(postLikesArray)  
                var updatedQueryData = structuredClone(originalQueryData);

                for (let i = 0; i < updatedQueryData.length; i++) {
                    //console.log(updatedQueryData[i].postID + " " + postID)
                    if(updatedQueryData[i].postID == postID) {
                        console.log("Change this post! " + postID)

                        
                        //Create the new array of users who have liked this
                        updatedQueryData[i].postLikesArray = []
                        updatedQueryData[i].postLikesArray = returnedData.postLikesArray
                        updatedQueryData[i].totalLikes = returnedData.postLikesArray.length


                    }
                }

                return updatedQueryData;
                //return [data];
            })
        }
    })

    return (
        <div className="">
            <p className = "post-text">total Likes { totalLikes } </p>  
            <ul> { postLikesArray.map((likedBy) => (
                <li key = { likedBy}  > { likedBy } </li> 
            ))}</ul>
            { postLikesArray.includes(currentUser) ? 
                <button type="submit" className = "post-liked" onClick={() => { handleLikePost(postID, currentUser) }}>Like</button>: 
                <button type="submit" className = "" onClick={() => { handleLikePost(postID, currentUser) }}>Like</button>
            }
        </div>
        );
    } 
  
export default Likes;
*/
/*
//WORKS
const Likes = (props) => {
    const handleLike = props.handleLike;
    const currentUser = props.currentUser;
    const post = props.post;

    const totalLikes = props.post.totalLikes;
    const postLikesArray = props.post.postLikesArray;
    const postID = props.post.postID;

    return (
        <div className="">
            <p className = "post-text">total Likes { totalLikes } </p>  
            <ul> { postLikesArray.map((likedBy) => (
                <li key = { likedBy}  > { likedBy } </li> 
            ))}</ul>
            { postLikesArray.includes(currentUser) ? 
                <button type="submit" className = "post-liked" onClick={() => { handleLike(post) }}>Like</button>: 
                <button type="submit" className = "" onClick={() => { handleLike(post) }}>Like</button>
            }
        </div>
        );
    } 
  
export default Likes;
*/
/*
const { isLoading, mutate } = useMutation(likePost, {
    onSuccess: (data) => {
        queryClient.invalidateQueries(['group', groupID])
        
        const newPost = data;

        queryClient.setQueryData(['group', groupID], (oldPostData) => {
            oldPostData.unshift(newPost);

            return oldPostData;
        })
        
    }
})
*/


/*
const [youLikedPost, setYouLikedPost] = useState(false);
You liked { youLikedPost ? "yep!" : "nope"} | 
    //Maybe don't need 
    useEffect(() => {
        if(postLikesArray.includes(currentUser)) {
            setYouLikedPost(true)
        } else {
            setYouLikedPost(false)
        }   
    }, [youLikedPost]); 
console.log(currentUser)
console.log(postLikesArray)
console.log(postLikesArray.includes(currentUser))
*/

/*

    /*


  for (let i = 0; i < posts.length; i++) {
    //console.log(posts[i].postID + " " + postID)
    if(posts[i].postID == postID) {
      if(posts[i].postLikesArray.includes(currentUser)) {
        console.log(currentUser + " Had already liked this post so we will unlike! ")
        const index = posts[i].postLikesArray.indexOf(currentUser);
        if (index > -1) { 
          posts[i].postLikesArray.splice(index, 1); 
        }
        posts[i].totalLikes = posts[i].postLikesArray.length
      } else {
        console.log(currentUser + " Liked this post!")
        posts[i].postLikesArray.push(currentUser);
        posts[i].totalLikes = posts[i].postLikesArray.length

      }
      posts[i].postLikesArray.includes(currentUser)
    }
    res.json(posts[i])
    return 
  } 

    
    const { isLoading, mutate } = useMutation(likePostAPI, {
        onSuccess: (oldData) => {
            //queryClient.invalidateQueries(['group', groupID])
            console.log(oldData)
        }
    })
*/
            //const postID = 5;

            //var newData = structuredClone(oldData);
            
            /*
            queryClient.setQueryData(['group', groupID], (oldPostData) => {
                return oldPostData;
            })

            */
            //Works
            /*
            queryClient.setQueryData(['group', groupID], (oldData) => {

                for (let i = 0; i < oldData.length; i++) {
                    if(posts[i].postID == postID) {
                        console.log("updated post ")
                        console.log(posts[i])
                    }      
                } 
              return newData;  
            })
            */
                    /*
                    const oldObj = {a: {b: 10}};
                    const newObj = {...oldObj};
                      if(posts[i].postLikesArray.includes(currentUser)) {
                        console.log(currentUser + " Had already liked this post so we will unlike! ")
                        const index = posts[i].postLikesArray.indexOf(currentUser);
                        if (index > -1) { 
                          posts[i].postLikesArray.splice(index, 1); 
                        }
                        posts[i].totalLikes = posts[i].postLikesArray.length
                
                      } else {
                        console.log(currentUser + " Liked this post!")
                        posts[i].postLikesArray.push(currentUser);
                        posts[i].totalLikes = posts[i].postLikesArray.length
                
                      }
                      posts[i].postLikesArray.includes(currentUser)
                      */
                    

                //return oldData;
      
            

            /*
                await queryClient.cancelQueries({ queryKey: ['todos', newTodo.id] })

                // Snapshot the previous value
                const previousTodo = queryClient.getQueryData(['todos', newTodo.id])

                // Optimistically update to the new value
                queryClient.setQueryData(['todos', newTodo.id], newTodo)

                // Return a context with the previous and new todo
                return { previousTodo, newTodo }

            queryClient.setQueryData(
                ['posts', { id }],
                //this is the way
                (oldData) => oldData ? {
                    ...oldData,
                    title: 'my new post title'
                } : oldData
            )

              */
            /*
            const newPost = data;

            queryClient.setQueryData(['group', groupID], (oldPostData) => {
                oldPostData.unshift(newPost);

                return oldPostData;
            })
            */
        
    

/*
            <LikePost post = { post } currentUser = {currentUser} />
<Likes post = { post } currentUser = {currentUser}  />   
<li key = { postLikes.postLikeID }  > { postLikes.likedByName } </li> 
          <ul> { postLikesArray.map((postLikes) => (
                <li key = { postLikes.likedByName }  > { postLikes.likedByName } </li> 
            ))}</ul>        

<ul> { postLikesArray.map((likedBy) => (
                <li key = { likedBy}  > { likedBy } </li> 
            ))}</ul>    

"postLikes": [
    {
        "postLikeID": 92,
        "postID": 70,
        "likedByName": "sam",
        "likedByImage": "12.jpg",
        "likedByFirstName": "David",
        "likedByLastName": "Vasquez"
    }
]*/

