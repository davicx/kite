import React, { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import AddGroupUser from '../users/AddGroupUser'
import RemoveGroupUser from '../users/RemoveGroupUser'

import useGroupFriendsFetch from '../../../functions/hooks/useGroupFriendsFetch'

async function createGroupAPI(newGroup) {
    const groupURL = "http://localhost:3003/group/create/";
    const response = await axios.post(groupURL, newGroup);
    console.log(response.data)
    return response.data;
  }

const NewGroup= ({ currentUser, api }) => {
    const [groupName, setGroupName] = useState('New Group!')
    const [searchString, setSearchString] = useState("")
    const [availableFriends, updateAvailableFriends] = useState([])
    const [newGroupUsers, updateNewGroupUsers] = useState([])

    //SEARCH FUNCTION
    const friendSearchURL = "http://localhost:3003/search/user/" + currentUser + "/string/" + searchString; 
    
    //Make useFetch for this and filter data here useFetch(friendSearchURL, selectedUsers)
    var { data, isPending, error } = useGroupFriendsFetch(friendSearchURL, newGroupUsers);


    useEffect(() => {
        if(data != null) {

            //No one has been added to a group
            if(newGroupUsers.length < 1) {
                updateAvailableFriends(data.data)

            } else {
                
                //Create a Set of current group users
                let newGroupUsersSet = new Set();

                for (let i = 0; i < newGroupUsers.length; i++) {
                    newGroupUsersSet.add(newGroupUsers[i].friendName.toLowerCase())
                }
                
                //Loop over recently returned users and add any that are not in the set
                let newGroupUsersArray = []

                for (let i = 0; i < data.data.length; i++) {
                    let currentUser = data.data[i].friendName.toLowerCase();

                    if(!newGroupUsersSet.has(currentUser)) {
                        newGroupUsersArray.push(data.data[i])
                    } 
                }
                updateAvailableFriends(newGroupUsersArray)

            }     
        }  

    }, [searchString])

    //GROUP CREATE ACTIONS
    const addGroupUser = (user) => {
        let updatedNewGroupUsers = [...newGroupUsers, user]
        //console.log("You are going to add " + user.friendName)
        
        //Add to new Group
        updateNewGroupUsers(updatedNewGroupUsers)

        //Remove from Avaiable Friends
        let updatedAvailableFriends = availableFriends.filter(function (currentUser) {
            return currentUser.friendName.toLowerCase() != user.friendName.toLowerCase()
          });
          //console.log(updatedAvailableFriends)
          updateAvailableFriends(updatedAvailableFriends)
    }

    const removeGroupUser = (user) => {

        //Remove From New Group Users
        let updatedNewGroupUsers = newGroupUsers.filter(function (currentUser) {
            return currentUser.friendName.toLowerCase() != user.friendName.toLowerCase()
          });
    
        updateNewGroupUsers(updatedNewGroupUsers)
 
        //Add to Available Friends
        let updatedAvailableFriends = [...availableFriends, user]
        updateAvailableFriends(updatedAvailableFriends)  
 
    }
    
    //FORM ACTIONS
    const handleNameChange = (event) => {
        const { name, value } = event.target
        setGroupName(value)
    }   
    
    const handleSearchChange = (event) => {
        const { name, value } = event.target

        setSearchString(value)   
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Create a new Group " + groupName + " for "  + currentUser)

        let newGroupUserNames = [currentUser]

        for (let i = 0; i < newGroupUsers.length; i++) {
            newGroupUserNames.push(newGroupUsers[i].friendName)
        }

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
        //console.log(newGroup)
        
    }

    //REACT QUERY 
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
        <div> 
            {/* New Group From */}
            <div className='simple-border sixty'>
                <form onSubmit={ handleSubmit }>
                    <p><b> Group Name | { groupName }</b></p>
                    <input name= "group-name" className="simple-input-box" type="text" value={ groupName } onChange={ handleNameChange} /><hr />

                    <p><b> Friend Search </b></p>
                    <input name= "group-friend-search" className="simple-input-box" type="text" value={ searchString } onChange={ handleSearchChange} />
                    <p> { searchString } </p>
    
                    <button type="submit" className="loginButton" > Create New Group </button>
                </form>
            </div>

            {/* Friends you can add */}
            <div className='simple-border sixty'>
                <h4> Friends you can Add </h4>
                {availableFriends && availableFriends.map((user) => (
                    <AddGroupUser key = { user.friendName } addGroupUser = {addGroupUser} user = {user} />     
                ))} 
            </div>


            {/* GROUP FORM */}
            <div className='simple-border sixty'>
                <h4> New Group Users </h4>
                {newGroupUsers.map((user) => (
                    <RemoveGroupUser key = { user.friendName } removeGroupUser = {removeGroupUser} user = {user} />   
                ))}     
            </div>

        
        </div>
    );

}


export default NewGroup;

