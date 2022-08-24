import React from 'react';
import { useQuery } from "react-query";
import axios from 'axios'
import IndividualPost from './IndividualPost';

const getPostsAnon = async (groupID) => {
  const postErrorURL = "/posts/group/error";
  const postURL = 'http://localhost:3003/posts/group/' + groupID;  
  const { data } = await axios.get(postURL)
  return data
}

async function getPosts(groupID) {
  const postErrorURL = "/posts/group/error";
  const postURL = 'http://localhost:3003/posts/group/' + groupID;  
  const { data } = await axios.get(postURL)
  return data
} 

const Posts = (props) => {
  const groupID = props.groupID;
  
  const { isLoading, isError, data, error  } = useQuery(['group-posts', groupID], () => getPostsNew(groupID))
  const currentPosts = data;
  console.log(isLoading)
  console.log(isError)
  console.log(data)
  console.log(error)

  return (
  <div className="posts">
       <p> Posts </p>
      { isError && <div> error... </div>}
      { isLoading && <div> loading... </div>}
      { data && <IndividualPost posts = { currentPosts } title="The posts!" />}
      {console.log(data)}
  </div>
  );
  }
export default Posts;


/*
const fetchPosts = async (groupID) => {
  const postURL = 'http://localhost:3003/posts/group/' + groupID;
  const res = await fetch(postURL);
  console.log("fetchPosts for " + groupID);
  return res.json();
}
*/

/*
async function fetchPosts(groupID){
  const postURL = 'http://localhost:3003/posts/group/' + groupID;
  const {data} = await axios.get(postURL)    
  return data
}

const Posts = (props) => {
  const groupID = props.groupID;
  const postErrorURL = "/posts/group/error";
  const postURL = 'http://localhost:3003/posts/group/' + groupID;

  //
  //const { isLoading, isError, data, error  } = fetchPosts(groupID);
  const {data, error, isError, isLoading } = useQuery('posts', fetchPosts(groupID)) 
   
  console.log(data);

  //
  //const currentPosts = data;
  //const { isLoading, isError, data, error } = useQuery(['todos'], fetchTodoList)
  
  //const {isLoading, data } = useQuery('group-posts', () => {
    
  const {isLoading, isError, data, error } = useQuery('group-posts', () => {
      return axios.get(postURL)
    })
    

  return (
  <div className="posts">
       <p> Posts </p>
      { isLoading && <div> loading... </div>}
      { data && <IndividualPost posts = { data.data } title="The posts!" />}
      {console.log(data)}
  </div>
  );
  }
  */
 
//WORKS

/*
const Posts = (props) => {
    const groupID = props.groupID;
    const postErrorURL = "/posts/group/error";
    const postURL = 'http://localhost:3003/posts/group/' + groupID;

    //const currentPosts = data;
    //const { isLoading, isError, data, error } = useQuery(['todos'], fetchTodoList)
    
    //const {isLoading, data } = useQuery('group-posts', () => {
    const {isLoading, isError, data, error } = useQuery('group-posts', () => {
        return axios.get(postURL)
      })
      /*
    if (isError) {
      return <span>Error: {error.message}</span>
    }
    */

    /*

    return (
    <div className="posts">
         <p> Posts </p>
        { isLoading && <div> loading... </div>}
        { data && <IndividualPost posts = { data.data } title="The posts!" />}
        {console.log(data)}
    </div>
    );
    }
    */

    /*
       <div className="posts">
         <p> Posts </p>
          { data?.data.map((post) => (
                <div className="post" key={ post.postID }>
                    <p className = "post-text"> { post.postCaption } </p>
                    <p className = "post-text"> { post.postID } |  { post.postFrom } | { post.postTo} | { post.groupID }</p>                                  
                </div>
            ))}
    </div>
    */
  


//NET
/*

const fetchPlanets = async () => {
  const res = await fetch('http://swapi.dev/api/planets/');
  return res.json();
}

const Planets = () => {
  const { data, status } = useQuery('planets', fetchPlanets);
  console.log(data);

  return (
    <div>
      <h2>Planets</h2>

      {status === 'loading' && (
        <div>Loading data</div>
      )}

      {status === 'error' && (
        <div>Error fetching data</div>
      )}

      {status === 'success' && (
        <div>
          { data.results.map(planet => <Planet key={planet.name} planet={planet} /> ) }
        </div>
      )} 
    </div>
  );
}
*/

/*
/*
const IndividualGroup = () => {
  const { groupID } = useParams()
  var groupsURL = "http://localhost:3003/posts/group/" + groupID

  const {isLoading, data } = useQuery('group-posts', () => {
    return axios.get(groupsURL)
  })

  if(isLoading) {
    return <h4>loading...</h4>
  }

  return (
      <div>
          <p> Your on a group!!! </p>
          <p> Group ID { groupID } </p>
          <p> Posts </p>
          { data?.data.map((post) => (
                <div className="post" key={ post.postID }>
                    <p className = "post-text"> { post.postCaption } </p>
                    <p className = "post-text"> { post.postID } |  { post.postFrom } | { post.postTo} | { post.groupID }</p>                                  
                </div>
            ))}
      </div>
  )
}
*/


/*
import React from 'react';
import IndividualPost from './IndividualPost';
import fetchPosts from './../../functions/useFetchPosts';

const Posts = (props) => {
    const groupID = props.groupID;
    const postURL = 'http://localhost:3003/posts/group/' + groupID;

    const { data, isPending, error } = fetchPosts(postURL)
    const currentPosts = data;

    return (
    <div className="posts">
        { error && <div> { error } </div>}
        { isPending && <div> loading... </div>}
        { currentPosts && <IndividualPost posts = { currentPosts } title="The posts!" />}
    </div>
    );
    }
  
export default Posts;
*/

