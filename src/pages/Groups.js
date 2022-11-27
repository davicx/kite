import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, useNavigate, Navigate, Link  } from "react-router-dom"

import LogoutUser from '../components/login/LogoutUser';
import { LoginContext } from "../functions/context/LoginContext";
//import { LoggedInContext } from "../functions/context/LoggedInContext";


function Groups() {
  const navigate = useNavigate();
  const { currentUser, setLoginState} = useContext(LoginContext);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("localStorageCurrentUser");
    const currentUserLoggedIn = JSON.parse(data);
    setLoginState(currentUserLoggedIn);
   if(currentUserLoggedIn == 'null') {
     setUserLoggedIn(false);
     console.log("Groups Page: DONT BE HERE");
   } else {
     setUserLoggedIn(true);
     console.log("Groups Page: OK STAY HERE")
   }
 }, []);


  return (
    <div className="user">
        <p> <b> Groups </b></p>
        <p> Current User: { currentUser } </p>
        <p> User Logged In: { userLoggedIn ? 'yep!' : 'nooo' } </p>
       
        <Link to={`/group/1`}>{ "Music 1" } </Link>
        <Link to={`/group/2`}>{ "Music 2" } </Link>
        <Link className="" to="/group/5"> Games 5 </Link>
        <LogoutUser />
    </div>
  );
}

export default Groups;





/*
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