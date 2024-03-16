import React from 'react';
import { useQuery } from "react-query";

//Function A1: Get User Profile API
async function getUserProfileAPI(currentUser, api) {
  //const userProfileURL = "http://localhost:3003/profile/" + currentUser; 
  const userProfileURL = "http://localhost:3003/posts/group/70"; 
  //const userProfileURL = "http://localhost:3003/profile/davey"; 
  //const userProfileURL = "http://localhost:3003/temp/profile/post"; 
  const response = await api.get(userProfileURL)

  return response.data

} 

const UserProfile = (props) => {
    const currentUser = props.currentUser;
    const api = props.api;

    const onError = (error) => {
      console.log("Do something here if there is Error!")
      console.log(error)
    }
  
    const { isLoading, data, isError, error  } = useQuery(['current-user-', currentUser], () => getUserProfileAPI(currentUser, api), 
      { refetchInterval: 10000000,
        onError: onError
      }
    )

    const currentPosts = data;

    return (
    <div className="groups">
        <p> Your Profile! {currentUser}</p><hr /> 
          { isLoading && <div> loading... </div>}
          { isError && <div> There was an error fetching the posts { error.message } </div>}
          {data && console.log(data) }       
    </div>
    );
    }
    
  export default UserProfile;

/*
<MyFriends currentUser = { currentUser } api = { api } /> 
<PendingFriends currentUser = { currentUser } api = { api } /> 
*/
