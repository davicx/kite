import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import LoginUser from '../components/login/LoginUser';
import LoginStatus from '../components/login/LoginStatus';
import { LoginContext } from "../functions/context/LoginContext";


function LoginPage() {  

  //Check Login Status 
  const { currentUser, setLoginState} = useContext(LoginContext);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("localStorageCurrentUser");
    const currentUserLoggedIn = JSON.parse(data);
    setLoginState(currentUserLoggedIn);

    if(currentUserLoggedIn == 'null' || currentUserLoggedIn == null) {
      setUserLoggedIn(false);
      console.log("No one is logged in right now");
      console.log("Login Page: OK STAY HERE");
    } else {
      setUserLoggedIn(true);
      console.log("Login Page: DONT BE HERE");
      console.log(currentUserLoggedIn + " is currently logged in");
    } 
}, []);
    return (
      <div className="login">
        <label>Current User: { currentUser } </label> 
        <p> User Logged In: { userLoggedIn ? 'yep!' : 'nooo' } </p>
        <LoginUser />
        <LoginStatus />
      </div>
    );
  }

export default LoginPage;














/*
import { useNavigate, useResolvedPath } from "react-router-dom";
import Axios from "axios";

//import LoginHeader from '../components/headers/LoginHeader';

  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("currentUserLoggedIn");
    const currentUserLoggedIn = JSON.parse(data);
    //console.log("APP LOGIN PAGE " + currentUserLoggedIn)
    console.log(currentUserLoggedIn)
    if(currentUserLoggedIn == 'null') {
      //console.log("OK STAY HERE")
      //console.log("userLoggedIn = false")
    } else {
      //console.log("DONT BE HERE");
      navigate("/groups");
      //console.log("userLoggedIn = true")
      
    }
  }, []);

function Login() {
    return (
      <div className="login">
        <input type="text" className="loginInput" placeholder="userName" onChange={e => setUsername(e.target.value)} />
        <p></p>
        <input type="text" className="loginInput" placeholder="password" onChange={e => setPassword(e.target.value)} />
        <p></p>
        <button className = "loginButton" onClick={ loginUser }> Login</button>
        <div className = "simplerHolder">
          <p>{ userName }</p> 
          <p>{ password }</p>
        </div>
        <div>
          <button className = "loginButton" onClick={ loginStatus }> Login Status </button>
          <div className = "simplerHolder"> 
          <p>{ loggedInStatus }</p>
        </div>

        <div>
          <button className = "loginButton" onClick={ loginVerify }> Get a Post </button>
        </div>

        </div>
        <div>
          <button className = "loginButton" onClick={ logoutUser }> Logout </button>
        </div>
      </div>
    );
  }
*/

