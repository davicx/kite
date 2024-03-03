import React, { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import useLocalStorage from '../../hooks/useLocalStorage';
import IndividualGroupUser from '../groups/users/IndividualGroupUser';
import NewGroupUser from '../groups/users/NewGroupUser';
import NewGroupSearch from '../search/NewGroupSearchTS';


//TEMP 
var frodo5 = {
  firstName: "frodo5",
  friendImage: "frodo5.jpg",
  friendName: "frodo5",
  lastName: "baggins"
}
var frodo6 = {
  firstName: "frodo6",
  friendImage: "frodo6.jpg",
  friendName: "frodo6",
  lastName: "baggins"
}

var frodo7 = {
  firstName: "frodo7",
  friendImage: "frodo7.jpg",
  friendName: "frodo7",
  lastName: "baggins"
}


var friendsArray = [frodo5, frodo6, frodo7]


function CreateGroupTwo({api, currentUser}) {   
  const [newGroupUsers, updateNewGroupUsers] = useState(friendsArray)

    return (
    <div className = "login">
      <p> Friend Search </p>
      <NewGroupSearch api = {api} currentUser = { currentUser } newGroupUsers = {newGroupUsers}/>

    </div>

    );
  }

export default CreateGroupTwo;


/*

<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>  


//TEMP 
var sam = {
  userID: 2,
  userName: "sam",
}
var frodo = {
  userID: 3,
  userName: "frodo",
}
var merry = {
  userID: 4,
  userName: "merry",
}
var david = {
  userID: 5,
  userName: "pippin",
}

var friendsArray = [david, sam, frodo, merry]

//Function: New Group API
async function createGroupAPI(newGroup) {
  const groupURL = "http://localhost:3003/group/create/";
  //const response = await axios.post('')
  const response = await axios.post(groupURL, newGroup);
  //setMessage(response.data)
  console.log(response.data)
  return response.data;
}

function CreateGroupTwo({api, currentUser}) {   
   const [groupName, setGroupName] = useState('New Group!')
   const [availableFriends, updateAvailableFriends] = useState(friendsArray)
   const [newGroupUsers, updateNewGroupUsers] = useState([])

  //FUNCTIONS: Change Functions
  //Function: Handle Group Name Change
  const handleNameChange = (event) => {
      const { name, value } = event.target
      setGroupName(value)
  }

  //Function: New Group Submit 
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newGroupUsers)
    let newGroupUserNames = [currentUser]

    for (let i = 0; i < newGroupUsers.length; i++) {
      newGroupUserNames.push(newGroupUsers[i].userName)
    } 
    console.log(newGroupUserNames);

    const newGroup = {
          "currentUser": currentUser,
          "groupName": groupName,
          "groupType": "kite",
          "groupPrivate": 1,
          "groupUsers": newGroupUserNames,
          "notificationMessage": currentUser + " invited you to a new Group",  
          "notificationType": "group_invite",
          "notificationLink": "http://localhost:3003/group/77"   
      }
      mutate(newGroup)
      console.log(newGroup)   
  }

  //FUNCTIONS: Add or Remove Users
  //Function: Add a new group User
  const addGroupUser = (userName) => {

    //Step 1: Add New Group User to Local Storage Pending Group
    console.log("You are going to add " + userName)
    let updatedNewGroupUsersArray = [...newGroupUsers];
    let newUser = availableFriends.find(x => x.userName === userName);

    updatedNewGroupUsersArray.push(newUser);
    updateNewGroupUsers(updatedNewGroupUsersArray);
 
    //Step 2: Remove User from Current available Friends
    const updatedFriendsArray = availableFriends.filter(user => user.userName !== userName);
    updateAvailableFriends(updatedFriendsArray)  
  
  }

  //Function: Remove a new group User
  const removeGroupUser = (userName) => {

    //Step 1: Remove New Group User from Pending Group 
    console.log("You will remove " + userName)
    const updatedNewGroupUsers = newGroupUsers.filter(user => user.userName !== userName);
    updateNewGroupUsers(updatedNewGroupUsers);

    //Step 2: Add User back to available Friends
    let updatedAvailableFriendsArray = [...availableFriends];
    let selectedUser = newGroupUsers.find(x => x.userName === userName);

    updatedAvailableFriendsArray.push(selectedUser);
    updateAvailableFriends(updatedAvailableFriendsArray);
 
  }

  //FUNCTIONS: React Query Functions
  //Function: React Query Mutation
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(createGroupAPI, {
      onSuccess: (returnedData) => {
        queryClient.setQueryData(['user-groups', currentUser], (originalQueryData) => {
              var updatedGroupData = structuredClone(originalQueryData);

              let newGroup = {
                  "groupID": returnedData.data.groupID,
                  "groupName": returnedData.data.groupName
              }
              updatedGroupData.groups.push(newGroup)    

              return updatedGroupData;     
          })
      }
    })


    return (
    <div className = "login">
      <p> Friend Search </p>
      <FriendSearch api = {api} currentUser = { currentUser } />
      <p> Friend Search </p>

      <form onSubmit={ handleSubmit }>
        <input name= "group-name" className="loginInput" type="text" value={ groupName } onChange={ handleNameChange } />
        <p> { groupName } </p>
        <button type="submit" className="loginButton" > Create New Group </button>
      </form>

      <h4> Friends you can Add </h4>
      {availableFriends.map((user) => (
          <IndividualGroupUser key = { user.userName } addGroupUser = {addGroupUser} removeGroupUser = {removeGroupUser} user = {user} />
      ))} 
      <hr />
      <hr />
      <h4> New Group Users </h4>
      {newGroupUsers.map((user) => (
          <NewGroupUser key = { user.userName } addGroupUser = {addGroupUser} removeGroupUser = {removeGroupUser} user = {user} />
      ))} 
    </div>

    );
  }

export default CreateGroupTwo;



*/