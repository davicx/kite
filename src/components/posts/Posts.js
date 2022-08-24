import React from 'react';
import { useQuery } from "react-query";
import axios from 'axios'
import IndividualPost from './IndividualPost';

async function getPosts(groupID) {
  const postErrorURL = "/posts/group/error";
  const postURL = 'http://localhost:3003/posts/group/' + groupID;  
  const { data } = await axios.get(postURL)
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

  return (
  <div className="posts">
       <p> Posts </p>
      { isError && <div> There was an error fetching the posts </div>}
      { isLoading && <div> loading... </div>}
      { data && <IndividualPost posts = { currentPosts } title="The posts!" />}
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
