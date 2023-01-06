import React, { useState, useEffect, useContext } from 'react';
import { useNavigate  } from "react-router-dom"
import { LoginContext } from "../functions/context/LoginContext";

import Refresh from '../components/login/Refresh';
import Groups from '../components/groups/GroupList';

function GroupsPage() {

  //Login Status 
  const navigate = useNavigate();
  const { currentUser, setLoginState} = useContext(LoginContext);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("localStorageCurrentUser");
    const currentUserLoggedIn = JSON.parse(data);
    setLoginState(currentUserLoggedIn);
    if(currentUserLoggedIn == 'null' || currentUserLoggedIn == null) {
   //if(currentUserLoggedIn == 'null') {
     setUserLoggedIn(false);
     console.log("Groups Page: DONT BE HERE");
     
   } else {
     setUserLoggedIn(true);
     console.log("Groups Page: OK STAY HERE")
     console.log(currentUserLoggedIn + " is currently logged in");
   }
 }, []);

  return (
    <div className="user">
        <Groups currentUser = { currentUser } />
        
        <Refresh /> 
    </div>
  );
}

export default GroupsPage;

/*
<Posts />
          





        
body {
  margin: 40;
  padding: 40;
}

.App {
  text-align: center;
}

header {
  height: 58px;
  border-bottom: 1px solid black;
}

.posts {
  width: 60%;
  margin-left: 20%;
  border: 1px solid black;
}

.post {
  width: 80%;
  min-height: 42px;
  margin-left: 10%;
  margin-bottom: 8px;
  border: 1px solid blue;
}

.post-text {
  margin: 2px;
  padding: 0px;
}

.group {
  float: left;
  height: 200px;
  width: 200px;
  border: 1px solid blue;
  margin: 40px;
}

.link {
  margin: 4px;
  margin-right: 8px;
}

.holder {
  float: left;
  width: 98%;
  min-height: 20px;
}

.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}



body {
  margin: 40px;
}

.holder {
  float: left;
  border: 1px solid blue;
  margin-top: 80px;
  margin-left: 30%;
  width: 40%;
  min-height: 40px;
}

.text {
  text-align: center;
}

.button {
  float: left;
  height: 32px;
  margin-top: 8px;
  margin-left: 20%;
  width: 60%;margin-bottom: 12px;

}

#login {
  float: left;
  border: 1px solid blue;
  margin-top: 80px;
  margin-left: 30%;
  width: 40%;
}

.loginInput {
  float: left;
  height: 22px;
  margin-top: 8px;
  margin-left: 30%;
  width: 40%;

}

.loginButton {
  float: left;
  height: 32px;
  margin-top: 8px;
  margin-left: 30%;
  width: 40%;
}

.simplerHolder {
  float: left;
  min-height: 20px;
  margin-left: 10%;
  margin-top: 8px;
  width: 80%;
}

.spacer {
  float: left;
  border: 1px solid blue;
  min-height: 100px;
  margin-left: 10%;
  margin-top: 8px;
  width: 80%;
}

import React, { useState } from 'react';
import { BrowserRouter, useNavigate, Link  } from "react-router-dom"


function Groups() {
  let navigate = useNavigate();
  const [groups, setGroups] = useState([
    { groupName: 'Music!', groupID: 70 },
    { groupName: 'Hike', groupID: 77 },
    { groupName: 'Games', groupID: 78 }
  ])

  return (
    <div className="user">

      <div className='holder'>
        <p> Groups </p>
        {groups.map(group => (
          <div className="group" key={ group.groupID } >
            <Link to={`/group/${group.groupID}`}>{ group.groupName } </Link>
            <p>{ group.groupID }</p>
          </div>
        ))}
      </div>

      <div className='holder'>
        <button onClick={ () => navigate('/users') } > Users </button>
      </div>
    
    </div>
  );
}

export default Groups;
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, useNavigate, Navigate, Link  } from "react-router-dom"

import LogoutUser from '../components/login/LogoutUser';
import { LoginContext } from "../functions/context/LoginContext";
//import { LoggedInContext } from "../functions/context/LoggedInContext";

import Axios from "axios";

function Groups() {
  const navigate = useNavigate();
  
  
  function App() {
  const [currentUser, setLoginState] = useState('null');
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
     const data = localStorage.getItem("localStorageCurrentUser");
     const currentUserLoggedIn = JSON.parse(data);
     setLoginState(currentUserLoggedIn);
    if(currentUserLoggedIn == 'null') {
      setUserLoggedIn(false);
      console.log("userLoggedIn = false")
    } else {
      setUserLoggedIn(true);
      console.log("userLoggedIn = true")
    }
  }, []);
  useEffect(() => {
    const data = localStorage.getItem("currentUserLoggedIn");
    const currentUserLoggedIn = JSON.parse(data);
    //console.log("APP LOGIN PAGE " + currentUserLoggedIn)
    console.log(currentUserLoggedIn)
    if(currentUserLoggedIn == 'null') {
      console.log("Groups Page: DONT BE HERE");
      navigate("/login")   
    } else {
      console.log("Groups Page: OK STAY HERE")

    }
  }, []);
  

  const { currentUser, setLoginState} = useContext(LoginContext);
  //const { userLoggedIn, setUserLoggedIn} = useContext(LoggedInContext);
        // 
  return (
    <div className="user">
        <p> Groups </p>
        <p> Current User: { currentUser } </p>
       
        <Link to={`/group/1`}>{ "Music 1" } </Link>
        <Link to={`/group/2`}>{ "Music 2" } </Link>
        <Link className="" to="/group/5"> Games 5 </Link>
        <LogoutUser />
    </div>
  );
}

export default Groups;


*/