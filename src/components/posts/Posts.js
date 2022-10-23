import React from 'react';
import { useQuery } from "react-query";
import axios from 'axios'
import IndividualPost from './IndividualPost';

//STOP 10 
//https://stackoverflow.com/questions/43002444/make-axios-send-cookies-in-its-requests-automatically
/*
axios.get(BASE_URL + '/todos', { withCredentials: true });

Also its possible to force credentials to every Axios requests

axios.defaults.withCredentials = true

Or using credentials for some of the Axios requests as the following code

const instance = axios.create({
   withCredentials: true,
   baseURL: BASE_URL
})
*/
async function getPosts(groupID) {
  const postErrorURL = "/posts/group/error";
  const postURL = 'http://localhost:3003/posts/group/' + groupID;  
  const { data } = await axios.get(postURL, { withCredentials: true })
  return data
} 

const Posts = (props) => {
  const groupID = props.groupID;
  
  const { isLoading, isError, data, error  } = useQuery(['group-posts', groupID], () => getPosts(groupID))
  const currentPosts = data;
  console.log(isLoading)
  console.log(isError)
  //console.log(data)
  console.log(error)

  const handleDelete = (postID) => {
    console.log("handleDelete: you liked! " + postID);
    const newPosts = currentPosts.filter(post => post.postID !== postID)
    console.log(newPosts)
  }

  return (
  <div className="posts">
       <p> Posts </p>
      { isError && <div> There was an error fetching the posts </div>}
      { isLoading && <div> loading... </div>}
      { data && <IndividualPost posts = { currentPosts } title="The posts!" handleDelete = { handleDelete } />}
      {console.log(data)}
  </div>
  );
  }
export default Posts;

/*
const getPostsAnon = async (groupID) => {
  const postErrorURL = "/posts/group/error";
  const postURL = 'http://localhost:3003/posts/group/' + groupID;  
  const { data } = await axios.get(postURL)
  return data
}
*/
