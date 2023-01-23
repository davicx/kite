import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from "react-query";
import { Link, useNavigate } from 'react-router-dom';
//import  functions from "../../functions/functions";
import { LoginContext } from "../../functions/context/LoginContext";


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

//Handle Refresh Tokens
axiosRequest.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  console.log("INTERCEPTOR: Looks good! ")
  return response;
}, function (error) {
  console.log("INTERCEPTOR: Need to get a access token or logout the user")
  if(error.response.status == 401) {
    console.log("INTERCEPTOR 401: We got a 401 so we need a new access token. Will send refresh token ")
    const refreshOutcome = refreshToken();
  } 

  //LOGOUT USER
  if(error.response.status == 403) {
    console.log("INTERCEPTOR 403: We got a 403 so the refresh token was not good need to logout the user")  
    localStorage.setItem('localStorageCurrentUser', JSON.stringify("null")); 
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
  console.log("COMPONENT: GroupsList")  

  //Login Status 
  const navigate = useNavigate();
  const { currentUser, setLoginState} = useContext(LoginContext);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
      const data = localStorage.getItem("localStorageCurrentUser");
      const currentUserLoggedIn = JSON.parse(data);
      setLoginState(currentUserLoggedIn);
      if(currentUserLoggedIn == 'null' || currentUserLoggedIn == null) {
      setUserLoggedIn(false);
      navigate("/login");
      console.log("Groups Page: DONT BE HERE");
      
    } else {
      setUserLoggedIn(true);
      console.log("Groups Page: OK STAY HERE")
      console.log(currentUserLoggedIn + " is currently logged in");
    }
  }, []);

  //const currentUser = props.currentUser;

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
