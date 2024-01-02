import React, { useState } from 'react';
import { useQuery } from "react-query";
//import useLoginStatus from '../../functions/hooks/useLoginStatus';
//import SimpleProfile from '../users/display/SimpleProfile';


//http://localhost:3003/search/user/davey/string/fro
async function searchUsersAPI(api, currentUser, searchString) { 
    //http://localhost:3003/search/user/davey/string/fro
    //const getSimpleUsersURL = "http://localhost:3003/simple/users/" + currentUser; 
    const simpleSearchURL = "http://localhost:3003/search/user/" + currentUser + "/string/" + searchString;
    //console.log(simpleSearchURL) 
    //const getSimpleUsersURL = "http://localhost:3003/search/user/davey/string/fro"; 
    const { data } = await api.get(simpleSearchURL)
  
    return data
  } 
  
  const SimpleUserSearch = ({ api, currentUser }) => {
        const [searchString, setSearchString] = useState('fro')

      const { isLoading, data, isError, error  } = useQuery(['simple-get-users', currentUser], () => searchUsersAPI(api, currentUser, searchString), 
          { refetchInterval: 10000000 }
      )
      
      return (
          <div>
              { isLoading && <div> loading... </div>}
              { isError && <div> There was an error fetching the posts { error.message } </div>}   
              {data && console.log(data)}
              {data && data.data.map((user) => (
                <p key = {user.friendName}> Username: {user.friendName } | Name: {user.firstName} | Image: {user.friendImage} </p>
             ))}
          </div>
      )
  }
  
  export default SimpleUserSearch;
  



/*
        {data && data.data.map((user) => (
                console.log()
             ))}
import React from 'react';
import { useQuery } from "react-query";
//import useLoginStatus from '../../functions/hooks/useLoginStatus';
import SimpleProfile from '../users/display/SimpleProfile';


async function getUserFriends(currentUser, friendName, api) { 
  const getFriendsURL = "http://localhost:3003/friend/" + friendName + "/user/" + currentUser; 
  const { data } = await api.get(getFriendsURL)

  //console.log(data.data)

  return data
} 


const FriendList = ({ currentUser, friendName, api }) => {
    const { isLoading, data, isError, error  } = useQuery(['user-friends', friendName], () => getUserFriends(currentUser, friendName, api), 
        { refetchInterval: 10000000 }
    )

    return (
        <div>
            { isLoading && <div> loading... </div>}
            { isError && <div> There was an error fetching the posts { error.message } </div>}

            {data && data.data.map((friend) => (
                <SimpleProfile api = { api } friend = { friend } currentUser = {currentUser} key = { friend.friendID }/>
             ))}
        </div>
    )
}

export default FriendList;



*/