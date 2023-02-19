import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from "react-query";
import { Link, useNavigate } from 'react-router-dom';
import  functions from "../../functions/functions";
import useHello from '../../functions/hooks/useHello';


async function getGroups(currentUser, api) {
  if(currentUser && currentUser != null) {
    //console.log("getGroups: " + currentUser)
  }
   
  const groupURL = "http://localhost:3003/groups/user/" + currentUser; 
  const { data } = await api.get(groupURL)

  return data
} 


const GroupList = (props) => {
  //console.log("COMPONENT: GroupsList")  
  const currentUser = props.currentUser;
  const api = props.api;
  //const { hello} = useHello();

  const { isLoading, data, isError, error  } = useQuery(['user-groups', currentUser], () => getGroups(currentUser, api), 
    { refetchInterval: 10000000 }
  )

  var groups = data;
  //console.log(groups + " " + isError + " " + error)

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
  
export default GroupList;



//import useRefreshToken from '../../functions/hooks/useRefreshToken';

//import axios from 'axios'


/*
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
      console.log(response.data)
      return response.data;
    })
    .catch(function (error) {
      //console.log(error);
    });
}
*/

/*

const axiosRequest = axios.create({
  withCredentials: true
})  


//STATUS 200: Good Request 
axiosRequest.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  console.log("INTERCEPTOR: Looks good! ")
  return response;
}, function (error) {
  
  //STATUS 498:  Need to get a access token
  console.log("INTERCEPTOR: Need to get a access token or logout the user")
  if(error.response.status == 498) {
    console.log("INTERCEPTOR 498: We got a 498 so we need a new access token. Will send refresh token ")
    const refreshURL = "http://localhost:3003/refresh/tokens"

    //const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
    //const { data, error, isPending } = useRefreshToken(refreshURL);
    const refreshOutcome = functions.refreshToken();
    console.log("Got a 498: Here is the status if we could get a new refresh token!")

  } 

  //STATUS 440: Logout User
  if(error.response.status == 440) {
    console.log("INTERCEPTOR 440: We got a 440 we couldn't refresh the access token because the refresh token was no good need to logout the user")  
    localStorage.setItem('localStorageCurrentUser', JSON.stringify("null")); 
    window.location.href = '/login';
  }
  
  return Promise.reject(error);
  
});

*/
