import React, { useState } from 'react';
import { useQuery } from "react-query";
import axios from 'axios'
import IndividualPosts from './IndividualPostsOLD';


const api = axios.create({
  baseURL: 'http://localhost:3003/'
})

async function getPosts() {
    const postURL = 'posts';  
    const { data } = await api.get(postURL)
    return data
} 
  
function AllPosts() {
    const groupID = 72;

    const { isLoading, data, isError, error  } = useQuery(['posts'], () => getPosts(), 
      { refetchInterval: 10000000 }
    )
  
    const currentPosts = data;
    //console.log(isLoading + " " + isError + " " + error)
  
    return (
    <div className="posts">
         <p><b> Posts </b></p>
        { isLoading && <div> loading... </div>}
        { isError && <div> There was an error fetching the posts { error.message } </div>}
        { data && <IndividualPosts posts = { currentPosts } />}

    </div>
    );
}

export default AllPosts;


/*
        {console.log(data)}
const IndividualPost = (props) => {
    const posts = props.posts;
    const postID = posts.postID

    return (
        <div className = "post-list">
            { posts.map((post) => (
                <div className="post" key={ post.id }>
                    <p className = "post-text"> { post.title } </p>
                    <p className = "post-text"> { post.body }</p>    
                    <hr />                       
                </div>
            ))}
        </div>
        );
    }  
  
  export default IndividualPost;

  import React, { useState } from 'react';
import { useQuery } from "react-query";
import axios from 'axios'
import IndividualPost from './IndividualPost';


const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
})

api.interceptors.response.use(function (response) {
  console.log("INTERCEPTOR: Looks good! 200 ")
  return response;

  }, function (error) {
  console.log("INTERCEPTOR: Oh no got an error " + error.response.status)  
  return Promise.reject(error);

});

async function getPosts(groupID) {
  const postURL = 'https://jsonplaceholder.typicode.com/posts?_start=0&_limit=5';  
  const { data } = await api.get(postURL)
  return data
} 


function AllPosts() {
    const groupID = 72;

    const { isLoading, data, isError, error  } = useQuery(['group-posts', groupID], () => getPosts(groupID), 
      { refetchInterval: 10000000 }
    )
  
    const currentPosts = data;
    console.log(isLoading)
    console.log(isError)
    console.log(error)
  
    return (
    <div className="posts">
         <p><b> Posts </b></p>
        { isLoading && <div> loading... </div>}
        { isError && <div> There was an error fetching the posts { error.message } </div>}
        { data && <IndividualPost posts = { currentPosts } />}
        {console.log(data)}
    </div>
    );
}


export default AllPosts;

import React, { useState } from 'react';

function Frodo() {
  const [name, setLocation] = useState("Frodo");

  return (
    <div className="user">
      <p>Name {name} </p>
      <p> Location: Shire </p>
    </div>
  );
}


export default Frodo;
*/