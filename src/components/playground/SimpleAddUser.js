import React from 'react';
import { useQuery } from "react-query";
//import useLoginStatus from '../../functions/hooks/useLoginStatus';
//import SimpleProfile from '../users/display/SimpleProfile';


async function getSimpleUsers(currentUser, api) { 
  const getSimpleUsersURL = "http://localhost:3003/simple/users/" + currentUser; 
  const { data } = await api.get(getSimpleUsersURL)
  //localStorage.setItem("user", "frodo")
  //let user = localStorage.getItem("user")

  return data
} 

const SimpleGetUsers = ({ api, currentUser }) => {
    const { isLoading, data, isError, error  } = useQuery(['simple-get-users', currentUser], () => getSimpleUsers(currentUser, api), 
        { refetchInterval: 10000000 }
    )
    
    return (
        <div>
            { isLoading && <div> loading... </div>}
            { isError && <div> There was an error fetching the posts { error.message } </div>}   
            {data && console.log(data)}
            {data && data.map((user) => (
                <p key = { user.userID }> { user.userID } | { user.userName} </p>
             ))}
        </div>
    )
}

export default SimpleGetUsers;