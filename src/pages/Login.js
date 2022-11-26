import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter,Navigate,  Route, Routes, Link, NavLink, useLocation, useNavigate} from 'react-router-dom'

import LoginUser from '../components/login/LoginUser';


function Login() {  
  const navigate = useNavigate();
  useEffect(() => {
    const data = localStorage.getItem("currentUserLoggedIn");
    const currentUserLoggedIn = JSON.parse(data);
    //console.log("APP LOGIN PAGE " + currentUserLoggedIn)
    console.log(currentUserLoggedIn)
    if(currentUserLoggedIn == 'null') {
      console.log("OK STAY HERE")
      console.log("userLoggedIn = false")
    } else {
      console.log("DONT BE HERE");
      navigate("/groups");
      console.log("userLoggedIn = true")
      
    }
  }, []);
    return (
      <div className="login">
        <LoginUser />
      </div>
    );
  }

export default Login;






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

