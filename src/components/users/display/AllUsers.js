import React from 'react';
import { useQuery } from "react-query";
import SimpleProfile from './SimpleProfile';

async function getAllUsers(api, currentUser) {
  const allUsersURL = "http://localhost:3003/users/all/" + currentUser; 
  const { data } = await api.get(allUsersURL)

  return data
} 

const AllUsers = (props) => {
    const currentUser = props.currentUser;
    const api = props.api;

    const { isLoading, data, isError, error  } = useQuery(['all-users'], () => getAllUsers(api, currentUser), 
    { refetchInterval: 10000000 }
  )

    return (
        <div>
            <p> All Users {currentUser} </p>
            { isLoading && <div> loading... </div>}
            { isError && <div> There was an error fetching the posts { error.message } </div>}
            { data && console.log(data)}
            {data && data.data.map((friend) => (
                <SimpleProfile api = { api } friend = { friend } currentUser = {currentUser} key = { friend.userName }/>
             ))}

        </div>
    )
}

export default AllUsers;


/*
            <SimpleProfile />
import React from 'react';
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';

import SimpleProfile from '../users/display/SimpleProfile';

const MyFriends = (props) => {
    const currentUser = props.currentUser;
    const api = props.api;

    const { isLoading, data, isError, error  } = useQuery(['your-friends', currentUser], () => getYourFriends(currentUser, api), 
        { refetchInterval: 10000000 }
    )

    return (
        <div>
            { isLoading && <div> loading... </div>}
            { isError && <div> There was an error fetching the posts { error.message } </div>}
            { data && console.log(data.friendsArray)}
            <p> My Friends {currentUser}  </p>
            {data && data.friendsArray.map((friend) => (
                <SimpleProfile api = { api } friend = { friend } currentUser = {currentUser} key = { friend.friendID }/>
             ))}
        </div>
    )
}

export default MyFriends;
*/


/*
//import apiFunctions from '../functions/apiFunctions';
//import useLoginStatus from '../functions/hooks/useLoginStatus';

//const axiosRequest = apiFunctions.getAPI();

import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
//import  functions from "../../functions/functions";
//import useHello from '../../functions/hooks/useHello';

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

  return (
  <div className="groups">
      { isLoading && <div> loading... </div>}
      { isError && <div> There was an error fetching the posts { error.message } </div>}
      { data && console.log()}
      {data && groups.groups.map(group => (
          <div className="group" key={ group.groupID } >
            <Link to={`/group/${group.groupID}`}>{ group.groupID } | {group.groupName } </Link>
          </div>
      ))}
  </div>
  );
  }
  
export default GroupList;
*/