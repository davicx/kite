import React, { useState, useEffect } from 'react'
//import useLocalStorage from '../../hooks/useLocalStorage';
//import IndividualGroupUser from './IndividualGroupUser';
//import NewGroupUser from './NewGroupUser';
//import AddGroupUser from '../groups/users/AddGroupUser'
//import RemoveGroupUser from '../groups/users/RemoveGroupUser'

//import useGroupFriendsFetch from '../../functions/hooks/useGroupFriendsFetch'

const NewGroup= ({ currentUser, api }) => {
    const [groupName, setGroupName] = useState('New Group!')
    const [searchString, setSearchString] = useState("")
    const [availableFriends, updateAvailableFriends] = useState([])
    const [newGroupUsers, updateNewGroupUsers] = useState([])

    //PART 1: Friend Search 
    const friendSearchURL = "http://localhost:3003/search/user/" + currentUser + "/string/" + searchString; 

    //Make useFetch for this and filter data here useFetch(friendSearchURL, selectedUsers)
    var { data, isPending, error } = useGroupFriendsFetch(friendSearchURL, newGroupUsers);

    useEffect(() => {
        console.log('use effect ran');
        if(data != null) {
            console.log("There is data update availableFriends")
            console.log(data.data)
            updateAvailableFriends(data.data)
        }  
      }, [searchString])


    //PART 2: Functions
    const addGroupUser = (user) => {
        let updatedNewGroupUsers = [...newGroupUsers, user]

        //Step 1: Add New Group User to Local Storage Pending Group
        console.log("You are going to add " + user.friendName)

        updateNewGroupUsers(updatedNewGroupUsers)
        //updateAvailableFriends
        console.log(availableFriends)
    }

    const removeGroupUser = (userName) => {

        //Step 1: Add New Group User to Local Storage Pending Group
        console.log("You are going to remove " + userName)
 
    }

    //PART 3: Form Actions
    const handleChange = (event) => {
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
        const newGroup = {
            "currentUser": currentUser,
            "groupName": groupName,
            "groupType": "kite",
            "groupPrivate": 1,
            "groupUsers": ["davey", "sam", "frodo"],
            "notificationMessage": currentUser + " invited you to a new Group",  
            "notificationType": "group_invite",
            "notificationLink": "http://localhost:3003/group/77"   
        }
        //mutate(newGroup)
        console.log(newGroup)
        
    }


    return (
        <div> 
            <div className='simple-border sixty'>
                <form onSubmit={ handleSubmit }>
                <p><b> Group Name  </b></p>
                <input name= "group-name" className="simple-input-box" type="text" value={ groupName } onChange={ handleChange} />
                <p> { groupName } </p>
                <hr />
                <p><b> Friend Search </b></p>
                <input name= "group-friend-search" className="simple-input-box" type="text" value={ searchString } onChange={ handleSearchChange} />
                <p> { searchString } </p>
  
                <button type="submit" className="loginButton" > Create New Group </button>
            </form>
            </div>

            <div className='simple-border sixty'>
                <h4> Friends you can Add </h4>
                {data && data.data.map((user) => (
                    <AddGroupUser key = { user.friendName } addGroupUser = {addGroupUser} removeGroupUser = {removeGroupUser} user = {user} />
                    
                ))} 
            </div>

            <div className='simple-border sixty'>
                <h4> New Group Users </h4>
                {newGroupUsers.map((user) => (
                    <p key = {user.friendName}> {user.friendName }</p>
                ))} 
            </div>
        
        </div>
    );

}


export default NewGroup;


//MOSTLY WORKING

/*
import React, { useState, useEffect } from 'react'
//import useLocalStorage from '../../hooks/useLocalStorage';
//import IndividualGroupUser from './IndividualGroupUser';
//import NewGroupUser from './NewGroupUser';
import AddGroupUser from '../users/AddGroupUser'
import RemoveGroupUser from '../users/RemoveGroupUser'

import useGroupFriendsFetch from '../../../functions/hooks/useGroupFriendsFetch'

const NewGroup= ({ currentUser, api }) => {
    const [groupName, setGroupName] = useState('New Group!')
    const [searchString, setSearchString] = useState("")
    const [availableFriends, updateAvailableFriends] = useState([])
    const [newGroupUsers, updateNewGroupUsers] = useState([])

    //PART 1: Friend Search 
    const friendSearchURL = "http://localhost:3003/search/user/" + currentUser + "/string/" + searchString; 

    //Make useFetch for this and filter data here useFetch(friendSearchURL, selectedUsers)
    var { data, isPending, error } = useGroupFriendsFetch(friendSearchURL, newGroupUsers);

    useEffect(() => {
        console.log('use effect ran');
        if(data != null) {
            console.log("There is data update availableFriends")
            console.log(data.data)
            updateAvailableFriends(data.data)
        }  
      }, [searchString])


    //PART 2: Functions
    const addGroupUser = (user) => {
        let updatedNewGroupUsers = [...newGroupUsers, user]

        //Step 1: Add New Group User to Local Storage Pending Group
        console.log("You are going to add " + user.friendName)

        updateNewGroupUsers(updatedNewGroupUsers)
        //updateAvailableFriends
        console.log(availableFriends)
    }

    const removeGroupUser = (userName) => {

        //Step 1: Add New Group User to Local Storage Pending Group
        console.log("You are going to remove " + userName)
 
    }

    //PART 3: Form Actions
    const handleChange = (event) => {
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
        const newGroup = {
            "currentUser": currentUser,
            "groupName": groupName,
            "groupType": "kite",
            "groupPrivate": 1,
            "groupUsers": ["davey", "sam", "frodo"],
            "notificationMessage": currentUser + " invited you to a new Group",  
            "notificationType": "group_invite",
            "notificationLink": "http://localhost:3003/group/77"   
        }
        //mutate(newGroup)
        console.log(newGroup)
        
    }


    return (
        <div> 
            <div className='simple-border sixty'>
                <form onSubmit={ handleSubmit }>
                <p><b> Group Name  </b></p>
                <input name= "group-name" className="simple-input-box" type="text" value={ groupName } onChange={ handleChange} />
                <p> { groupName } </p>
                <hr />
                <p><b> Friend Search </b></p>
                <input name= "group-friend-search" className="simple-input-box" type="text" value={ searchString } onChange={ handleSearchChange} />
                <p> { searchString } </p>
  
                <button type="submit" className="loginButton" > Create New Group </button>
            </form>
            </div>

            <div className='simple-border sixty'>
                <h4> Friends you can Add </h4>
                {data && data.data.map((user) => (
                    <AddGroupUser key = { user.friendName } addGroupUser = {addGroupUser} removeGroupUser = {removeGroupUser} user = {user} />
                    
                ))} 
            </div>

            <div className='simple-border sixty'>
                <h4> New Group Users </h4>
                {newGroupUsers.map((user) => (
                    <p key = {user.friendName}> {user.friendName }</p>
                ))} 
            </div>
        
        </div>
    );

}


export default NewGroup;


/*
{newGroupUsers.map((user) => (
<RemoveGroupUser key = { user.friendName } addGroupUser = {addGroupUser} removeGroupUser = {removeGroupUser} user = {user} />
))} 
*/


/*
                
            <ul> 
                { error && <div>{ error }</div> }
                { isPending && <div>Loading...</div> }
                {data && data.data.map(friend => (
                    <div key = {friend.friendName} className='small-border'>                                          
                        <p> { friend.friendName } </p>
                        <button onClick={() => addGroupUser(friend.friendName)}>Add Me to your Group | {friend.friendName }</button> 
                    </div>
                ))}
            </ul>
                <FriendSearch api = { api } currentUser = { "davey" } />
function MyAPI() {
    const { data: posts, isPending, error } = useFetch("http://localhost:3003/simple/posts")

    return (
        <div> 
            <ul> 
              { error && <div>{ error }</div> }
              { isPending && <div>Loading...</div> }
              {posts && <PostList posts = {posts}/> }
            </ul>
        </div>
    );
}

*/



/*
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from 'axios'

//FUNCTION 1: Search for Friends API
async function friendSearchAPI(currentUser,searchString) {   
    if (searchString.length > 0) {
        const friendSearchURL = "http://localhost:3003/search/user/" + currentUser + "/string/" + searchString; 
        const { data } = await axios.get(friendSearchURL)

        return data
    } 

} 

function FriendSearch({ api, currentUser }) {
    const [searchString, setSearchString] = useState('')

    //FUNCTION 2: Handle user typing
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearchString(value);
    }

     //FUNCTION 3: React Query 
    const { isLoading, data, isError, error  } = useQuery(['friend-search', searchString], () => friendSearchAPI(currentUser, searchString), 
        {  staleTime: 60000 }
    )

    return (
        <div className="new-post">
            <p className = "single-line">Friend Name</p>
            
            { data && console.log(data.data)}
            {data && data.data.map(user => (
                console.log(user.friendName)
            ))}

            <input name= "group-name" className="friend-search-input-box" type="text" value={ searchString } onChange={ handleChange} />
            <p className = "single-line"> Typed { searchString } </p>
        </div>
    );
}

export default FriendSearch;
export default FriendSearch;
*/