import React from 'react';
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';

import SimpleProfile from '../users/display/SimpleProfile';

async function getYourFriends(currentUser, api) {
  if(currentUser && currentUser != null) {
    //console.log("getGroups: " + currentUser)
  }
  //http://localhost:3003/friends/pending/davey/ 
  const myPendingFriendsURL = "http://localhost:3003/friends/pending/" + currentUser; 
  const { data } = await api.get(myPendingFriendsURL)

  return data
} 


const MyFriends = (props) => {
    const currentUser = props.currentUser;
    const api = props.api;

    const { isLoading, data, isError, error  } = useQuery(['pending-friends', currentUser], () => getYourFriends(currentUser, api), 
        { refetchInterval: 10000000 }
    )

    return (
        <div>
            { isLoading && <div> loading... </div>}
            { isError && <div> There was an error fetching the posts { error.message } </div>}
            { data && console.log(data.friendsArray)}
            <p> My Pending Friends {currentUser}  </p>
            {data && data.friendsArray.map((friend) => (
                <SimpleProfile api = { api } friend = { friend } currentUser = {currentUser} key = { friend.friendID }/>
             ))}
        </div>
    )
}

export default MyFriends;
