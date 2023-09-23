import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';

async function getGroupUsers(groupID, api) {
  const groupUsersURL = "http://localhost:3003/group/users/" + groupID; 
  const { data } = await api.get(groupUsersURL)

  return data
} 


const GroupUsers = (props) => {
    const groupID = props.groupID;
    const currentUser = props.currentUser;
    const api = props.api;
  
    const { isLoading, data, isError, error  } = useQuery(['group-users-', groupID], () => getGroupUsers(groupID, api), 
        { refetchInterval: 10000000 }
    )

    return (
        <div className="groups">
            <p><b> Active Group Users </b></p>
            { isLoading && <div> loading... </div>}
            { isError && <div> There was an error fetching the posts { error.message } </div>}
            { data && console.log(data.data.activeGroupUsers)}
            { data && console.log(data.data.pendingGroupUsers)}
            
            {data && data.data.activeGroupUsers.map((user) => (
                <p key={user}>{user}</p>
            ))}
        </div>
    );
}
  
export default GroupUsers;
