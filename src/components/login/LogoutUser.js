import React, { useContext } from 'react';
import { LoginContext } from "../../functions/context/LoginContext";
import { useNavigate } from "react-router-dom";
//import { LoggedInContext } from "../../functions/context/LoggedInContext";


function LogoutUser() {
  const navigate = useNavigate();
  const { currentUser, setLoginState} = useContext(LoginContext);
  //const { userLoggedIn, setUserLoggedIn} = useContext(LoggedInContext);
        
    function logout() {
        //STEP 1: Call Logout API

        //STEP 2: Success
        //Step 2A: Set local storage  
        localStorage.setItem('localStorageCurrentUser', JSON.stringify("null"));   
      
        //Step 2B: Set context
        setLoginState('null')
        //setUserLoggedIn(false)

        //Step 2C: Redirect to Login
        navigate("/login");
        
    }
    
    return (
    <div className = "holder">
        <p>LOGOUT</p>
        <button className="loginButton" onClick={() => logout() }> Logout </button>
      </div>
    );
}


export default LogoutUser;







/*
import React, { useState, useContext } from 'react';
import { LoginContext } from "../context/LoginContext";

function Logout() {
    const { currentUser, setLoginState} = useContext(LoginContext);

    function logout() {
      localStorage.setItem('currentUserLoggedIn', JSON.stringify("null"));   
      setLoginState('null')   
    }

    
    return (
    <div className = "holder">
        <h2>LOGOUT</h2>
        <button onClick={() => logout() }> Logout </button>
      </div>
    );
}


export default Logout;
*/