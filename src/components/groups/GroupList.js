import React from 'react';
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import axios from 'axios'


const axiosRequest = axios.create({
  withCredentials: true
})  

async function refreshToken() {
  const refreshURL = "http://localhost:3003/refresh/tokens"
    const data = localStorage.getItem("localStorageCurrentUser");
    const userName = JSON.parse(data);
    //console.log("REFRESH TOKEN: you are refreshing for" + userName )
    //STEP 1: Call Logout API
    axiosRequest.post(refreshURL, {
      userName: userName,
      refreshToken: "dontneedheretoken"
    })
    .then(function (response) {
      //console.log(response)
      return response.data;
    })
    .catch(function (error) {
      //console.log(error);
    });

}

// Add a response interceptor
axiosRequest.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  //console.log("INTERCEPTOR: Looks good! ")
  return response;
}, function (error) {
  console.log("INTERCEPTOR: Need a new token ")
  
  if(error.response.status == 401) {
    //console.log("__________________________________")
    //console.log("__________________________________")
    console.log("FIRST 401")
    console.log("error.response")
    console.log(error.response.data)

    console.log("Trying to get a new REFRESH Token");
    const refreshOutcome = refreshToken();
    //console.log("refreshOutcome")
    //console.log(refreshOutcome)
    /*
    console.log("NEW TOKEN OUTCOME")
    
    console.log()
    if(refreshOutcome.logUserOut == true) {
      console.log("REACT: LOG USER OUT")
    } else {
      console.log("REACT: Got the token ok... yayay!!")
    }
    console.log("__________________________________")
    console.log("__________________________________")
    */
  } 

  //LOGOUT USER
  if(error.response.status == 403) {
    localStorage.setItem('localStorageCurrentUser', JSON.stringify("null"));   
      
    console.log("__________________________________")
    console.log("LOGOUT")
    console.log("__________________________________")
  }
  
  return Promise.reject(error);
  
});

async function getGroups(currentUser) {
  if(currentUser && currentUser != null) {
    //console.log("getGroups: " + currentUser)
  }
   
  const groupURL = "http://localhost:3003/groups/user/" + currentUser; 
  const { data } = await axiosRequest.get(groupURL)

  return data
} 


const Groups = (props) => {
  const currentUser = props.currentUser;
  //console.log("GroupList: Getting groups for " + currentUser)

  const { isLoading, data, isError, error  } = useQuery(['user-groups', currentUser], () => getGroups(currentUser), 
    { refetchInterval: 10000000 }
  )

  var groups = data;

  //console.log(groups)
  //console.log(isError)
  //console.log(error)

  return (
  <div className="groups">
      { isLoading && <div> loading... </div>}
      { isError && <div> There was an error fetching the posts { error.message } </div>}
      { data && console.log(data)}
      {data && groups.groups.map(group => (
          <div className="group" key={ group.groupID } >
            <Link to={`/group/${group.groupID}`}>{ group.groupID } | {group.groupName } </Link>
          </div>
      ))}
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