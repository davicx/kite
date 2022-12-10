import React from 'react';
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import axios from 'axios'

async function getGroups(currentUser) {
  const postURL = 'http://localhost:3003/groups/' + currentUser;  
  const { data } = await axios.get(postURL)
  return data
} 

const Groups = (props) => {
  const currentUser = props.currentUser;
  console.log(currentUser)

  const { isLoading, data, isError, error  } = useQuery(['user-groups', currentUser], () => getGroups(currentUser), 
    { refetchInterval: 10000000 }
  )

  var groups = data;

  //console.log(isLoading)
  //console.log(isError)
  //console.log(error)

  return (
  <div className="posts">
       <p> Groups </p>
       <p> User { currentUser } </p>
       { data && console.log(groups)}
      
  </div>
  );
  }
  
export default Groups;
/*
 {data && groups.map(group => (
          <div className="group" key={ group.groupID } >
            <Link to={`/group/${group.groupID}`}>{ group.groupID } </Link>
            <p>{ group.groupID }</p>
          </div>
        ))}

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

const PostList = (props) => {
  const groupID = props.groupID;
  
  const { isLoading, data, isError, error  } = useQuery(['group-posts', groupID], () => getPosts(groupID), 
    { refetchInterval: 10000000 }
  )

  const currentPosts = data;
  console.log(isLoading)
  console.log(isError)
  console.log(error)

  return (
  <div className="posts">
       <p> Posts </p>
      { isLoading && <div> loading... </div>}
      { isError && <div> There was an error fetching the posts { error.message } </div>}
      { data && <IndividualPost posts = { currentPosts } title="The posts!" />}
      {console.log(data)}
  </div>
  );
  }
  
export default PostList;
<p> <b> Groups </b></p>
<p> Current User: { currentUser } </p>
<p> User Logged In: { userLoggedIn ? 'yep!' : 'nooo' } </p>

<Link to={`/group/1`}>{ "Music 1" } </Link>
<Link to={`/group/2`}>{ "Music 2" } </Link>
<Link className="" to="/group/5"> Games 5 </Link>

//


*/