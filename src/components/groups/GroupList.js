import React from 'react';
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import axios from 'axios'


const axiosRequest = axios.create({
  withCredentials: true
})  

async function getGroups(currentUser) {
  currentUser = "davey"
  //const groupURL = 'http://localhost:3003/groups/' + currentUser;
  const groupURL = "http://localhost:3003/posts/user/" + currentUser;   
  //const groupURL = "http://localhost:3003/posts/group/" + currentUser;
  //const groupURL = "http://localhost:3003/test/" + currentUser;
  //axios.defaults.withCredentials = true;
  const { data } = await axiosRequest.get(groupURL)
  console.log("data")
  console.log(data)
  return data
} 


const Groups = (props) => {
  const currentUser = props.currentUser;
  console.log("GroupList: Getting groups for " + currentUser)

  const { isLoading, data, isError, error  } = useQuery(['user-groups', currentUser], () => getGroups(currentUser), 
    { refetchInterval: 10000000 }
  )

  var groups = data;

  console.log(groups)
  //console.log(isError)
  //console.log(error)

  return (
  <div className="groups">
      { isLoading && <div> loading... </div>}
      { isError && <div> There was an error fetching the posts { error.message } </div>}
      { data && console.log(data)}
  </div>
  );
  }
  
export default Groups;


/*
       { data && console.log("")}
      {data && groups.map(group => (
          <div className="group" key={ group.groupID } >
            <Link to={`/group/${group.groupID}`}>{ group.groupID } | {group.groupName } </Link>
          </div>
      ))}

    
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