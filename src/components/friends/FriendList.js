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



/*
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