import React from 'react';
import { useQuery } from "react-query";
//import Comment from './display/IndividualComment';
//import NewComment from './actions/NewComment';

async function getPosts(groupID, api) {
    const groupPostURL = "http://localhost:3003/posts/group/" + groupID; 
    const response = await api.get(groupPostURL)
  
    return response.data
  
} 

const CommentList = ({groupID, api}) => {
    const localData = localStorage.getItem("localStorageCurrentUser");
    const currentUser = JSON.parse(localData);
    console.log("Comments: (welll posts right now.. ) Getting posts for the group " + groupID)

    const onError = (error) => {
      console.log("Do something here if there is Error!")
      console.log(error)
    }
  
    const { isLoading, data, isError, error  } = useQuery(['group-post-comments', groupID], () => getPosts(groupID, api), 
      { refetchInterval: 10000000,
        onError: onError
      }
    )

    const currentPosts = data;

  return (
  <div className="posts">
       <p><b> Group Posts </b> </p>
       <div className = "post-list" >
          { isLoading && <div> loading... </div>}
          { isError && <div> There was an error fetching the posts { error.message } </div>}
          {data && currentPosts.map((post) => (
            console.log(post)
          ))}
       </div>
  </div>
  );
  }
  
export default CommentList;
/*
<IndividualPost api = { api } post = { post }  groupID = { groupID } currentUser = {currentUser} key = { post.postID }/>
*/




/*
    <NewComment groupID = { groupID } currentUser = { currentUser }  />
    <Comment groupID = { groupID } api = { api }/>


import React from 'react';
import { useQuery } from "react-query";
//import axios from 'axios'
import IndividualPost from './IndividualPost';


async function getPosts(groupID, api) {
    const groupPostURL = "http://localhost:3003/posts/group/" + groupID; 
    const response = await api.get(groupPostURL)
  
    return response.data
  
} 

const PostList = ({groupID, api}) => {
    const localData = localStorage.getItem("localStorageCurrentUser");
    const currentUser = JSON.parse(localData);
    console.log("Posts: Getting posts for the group " + groupID)

    const onError = (error) => {
      console.log("Do something here if there is Error!")
      console.log(error)
    }
  
    const { isLoading, data, isError, error  } = useQuery(['group-posts', groupID], () => getPosts(groupID, api), 
      { refetchInterval: 10000000,
        onError: onError
      }
    )

    const currentPosts = data;

  return (
  <div className="posts">
       <p><b> Group Posts </b> </p>
       <div className = "post-list" >
          { isLoading && <div> loading... </div>}
          { isError && <div> There was an error fetching the posts { error.message } </div>}
          {data && currentPosts.map((post) => (
            <IndividualPost api = { api } post = { post }  groupID = { groupID } currentUser = {currentUser} key = { post.postID }/>
          ))}
       </div>
  </div>
  );
  }
  
export default PostList;

*/