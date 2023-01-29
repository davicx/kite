import React from 'react';
import { useQuery } from "react-query";
import axios from 'axios'
import IndividualPosts from './IndividualPosts';

const axiosRequest = axios.create({
    withCredentials: true
  })  

/*
async function refreshToken() {
  const refreshURL = "http://localhost:3003/refresh/tokens"
    const data = localStorage.getItem("localStorageCurrentUser");
    const userName = JSON.parse(data);
    console.log("you are refreshing for" + userName )
    
    //STEP 1: Call Logout API
    axiosRequest.post(refreshURL, {
      userName: userName,
      refreshToken: "dontneedheretoken"
    })
    .then(function (response) {
      console.log(response.data)
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}


axiosRequest.interceptors.response.use(function (response) {
  console.log("interceptors: GOOD ")
  return response;
}, function (error) {
  console.log("interceptors: NEED NEW TOKEN ")
  
  if(error.response.status == 401) {
    console.log("A new token was got!! Get a new token here");
    const refreshOutcome = refreshToken();
    console.log("NEW TOKEN OUTCOME")
    console.log(refreshOutcome)
  } 
  
  return Promise.reject(error);
  
});
*/


async function getPosts(groupID) {
    const groupPostURL = "http://localhost:3003/posts/group/" + groupID; 
    const response = await axiosRequest.get(groupPostURL)
  
    return response.data
  
} 

const Posts = ({groupID}) => {
    const localData = localStorage.getItem("localStorageCurrentUser");
    const currentUser = JSON.parse(localData);
    console.log("Posts: Getting posts for the group " + groupID)

    const onError = (error) => {
      console.log("Do something here if there is Error!")
      console.log(error)
    }
  
    const { isLoading, data, isError, error  } = useQuery(['group-posts', groupID], () => getPosts(groupID), 
      { refetchInterval: 10000000,
        onError: onError
      }
    )

    //Like Post
    //Edit Post
    //Delete Post 

    const currentPosts = data;

  return (
  <div className="posts">
       <p> Posts </p>
       <div className = "post-list" >
          { isLoading && <div> loading... </div>}
          { isError && <div> There was an error fetching the posts { error.message } </div>}
          {data && currentPosts.map((post) => (console.log(post)))}
          { data && <IndividualPosts posts = { currentPosts } title="The posts!" />}
       </div>
  </div>
  );
  }
  
export default Posts;


/*
{data && currentPosts.map((currentPost) => (<IndividualPost post = { currentPost } />))}
 
 
 const IndividualPost = (props) => {
    const posts = props.posts;
    console.log("IndividualPost " + posts)
    const postID = posts.postID
    const title = props.title;

    const likePost = (e) => {
      console.log(e.target);
      console.log("you liked! " + postID);
    }

    return (
        <div className = "post-list">
            { posts.map((post) => (
                <div className="post" key={ post.postID }>
                    <p className = "post-text"> { post.postCaption } </p>
                    <p className = "post-text"> { post.postID } |  { post.postFrom } | { post.postTo} | { post.groupID }</p>      
                    <button onClick={ likePost }> Like </button>                         
                </div>
            ))}
        </div>
        );
    }  

export default IndividualPost;
*/