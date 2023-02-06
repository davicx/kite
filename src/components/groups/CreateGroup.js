import React, { useState } from 'react';
import { useMutation } from "react-query";
//import { Link, useLocation, useNavigate, useResolvedPath } from "react-router-dom";
//import { loginUser } from '../../functions/functions';
//import { LoginContext } from "../../functions/context/LoginContext";
//import axios from "axios";


async function createNewGroup(api) {
    const response = await api.post('http://localhost:3003/group/create/')
    //setMessage(response.data)
    console.log(response.data)
}


function CreateGroup(props) {  
    const currentUser = props.currentUser;
    const api = props.api;
    const [groupName, setGroupName] = useState('New Group!')

    const { isLoading, isError, error, mutate } = useMutation(createNewGroup(api))

    const handleChange = (event) => {
        const { name, value } = event.target
        setGroupName(value)
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
            "notificationMessage": "Invited you to a new Group",  
            "notificationType": "group_invite",
            "notificationLink": "http://localhost:3003/group/77"   
        }
        
        mutate(newGroup)
    }

    return (
      <div className = "login">
          <form onSubmit={ handleSubmit }>
              <input name= "group-name" className="loginInput" type="text" value={ groupName } onChange={handleChange} />
              <p> { groupName } </p>
              <button type="submit" className="loginButton" > Create New Group </button>
          </form>
      </div>
    );
  }

export default CreateGroup;




