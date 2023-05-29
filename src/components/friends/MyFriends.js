import React from 'react';
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';

import SimpleProfile from '../users/profiles/SimpleProfile';

async function getYourFriends(currentUser, api) {
  if(currentUser && currentUser != null) {
    //console.log("getGroups: " + currentUser)
  }
   
  const myFriendsURL = "http://localhost:3003/friends/" + currentUser; 
  const { data } = await api.get(myFriendsURL)

  return data
} 


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

/*



    var groups = data;

    return (
    <div className="groups">
        {data && groups.groups.map(group => (
            <div className="group" key={ group.groupID } >
                <Link to={`/group/${group.groupID}`}>{ group.groupID } | {group.groupName } </Link>
            </div>
        ))}
    </div>
    );
    }
    

//import SimpleProfile from '../../users/SimpleProfile';

//import apiFunctions from '../functions/apiFunctions';
//import useLoginStatus from '../functions/hooks/useLoginStatus';

//const axiosRequest = apiFunctions.getAPI();

<SimpleProfile />  
*/