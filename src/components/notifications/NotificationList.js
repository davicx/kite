import React from 'react';
import { useQuery } from "react-query";
import IndividualNotification from './IndividualNotification';



async function getNotifications(currentUser, api) {
  const notificationURL = "http://localhost:3003/notifications/user/" + currentUser; 
  const { data } = await api.get(notificationURL)

  return data
} 


const GroupList = (props) => {
  const currentUser = props.currentUser;
  const api = props.api;
  console.log("Get Notifications for " + currentUser)

  const { isLoading, data, isError, error  } = useQuery(['notifications', currentUser], () => getNotifications(currentUser, api), 
    { refetchInterval: 10000000 }
  )

  return (
  <div className="groups">

    {data && <h4>Notifications: {data.notificationData.notificationCount } </h4> }
    
      { isLoading && <div> loading... </div>}
      { isError && <div> There was an error fetching the posts { error.message } </div>}
      { data && console.log(data.notificationData.notificationCount)}
      { data && console.log(data)}
      {data && data.notificationData.notificationArray.map((notification) => (
            console.log(notification)
     ))}
    {data && data.notificationData.notificationArray.map((notification) => (
        <IndividualNotification api = { api } notification = { notification }  currentUser = {currentUser} key = { notification.notificationID }/>
     ))}
  </div>
  );
  }
  
export default GroupList;

//    { data && console.log(data.notificationData.notificationArray)}


/*
<IndividualNotification api = { api } notification = { notification }  currentUser = {currentUser} key = { notification.notificationID }/>
      {data && data.notificationData.notificationArray.map((notification) => (
            <IndividualNotification api = { api } notification = { notification }  currentUser = {currentUser} key = { notification.notificationID }/>
     ))}

  <div className="groups">
        {data && groups.groups.map(group => (
          <div className="group" key={ group.groupID } >
            <Link to={`/group/${group.groupID}`}>{ group.groupID } | {group.groupName } </Link>
          </div>
      ))}

  </div>
*/
