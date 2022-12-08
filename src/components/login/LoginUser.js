import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate, useResolvedPath } from "react-router-dom";
//import { loginUser } from '../../functions/functions';
import { LoginContext } from "../../functions/context/LoginContext";

function LoginUser() {  
    const navigate = useNavigate();
    const { currentUser, setLoginState} = useContext(LoginContext);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
      const data = localStorage.getItem("localStorageCurrentUser");
      const currentUserLoggedIn = JSON.parse(data);
      setLoginState(currentUserLoggedIn);
      if(currentUserLoggedIn == 'null') {
        setUserLoggedIn(false);
        console.log("Login Page: OK STAY HERE");
      } else {
        setUserLoggedIn(true);
        console.log("Login Page: DONT BE HERE");
      }
  }, []);

    const [userName, setUserName] = useState('david')
    const [password, setPassword] = useState('password')

    const handleChange = (event) => {
      const { name, value } = event.target

      if(name == "username") {
        setUserName(value)
      } else {
        setPassword(value)
      }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        //Call Function Login User 
        
        //STEP 1: Call Login API

        //STEP 2: Success
        //Step 2A: Set local storage  
        localStorage.setItem('localStorageCurrentUser', JSON.stringify(userName));

        //Step 2B: Set context
        setLoginState(userName)
        //setUserLoggedIn(true)

        //Step 2C: Redirect to Groups
        //navigate(from, {replace: true});
        navigate("/groups");
        

    }

    return (
      <div className = "login">
          <form onSubmit={ handleSubmit }>
              <label>Current User: { currentUser } </label> 
              <p> User Logged In: { userLoggedIn ? 'yep!' : 'nooo' } </p>

              <input name= "username" className="loginInput" type="text" value={ userName } onChange={handleChange} />
              <input name= "password" className="loginInput" type="text" value={ password } onChange={handleChange} />
              <button type="submit" className="loginButton" > Login </button>
          </form>
      </div>
    );
  }

export default LoginUser;









/*

import React, { Component, useState} from 'react'
import Axios from "axios";

const axiosRequest = Axios.create({
  withCredentials: true
})

function Login() {
    const [userName, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loggedInStatus, setLoginStatus] = React.useState('');
    const loginURL = "http://localhost:3003/login"
    const loginStatusURL = "http://localhost:3003/login/status"
    const logoutURL = "http://localhost:3003/logout"
    const logoutVerifyURL = "http://localhost:3003/verify"
  
    const loginUser = () => {
      var userInputName = userName
      var userInputPassword = password
      console.log("you are logging in " + userInputName + " with the password " + userInputPassword)
  
      axiosRequest.post(loginURL, {
        userName: userInputName,
        password: userInputPassword
      })
      .then(function (response) {
        console.log(response);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const loginStatus = () => {
      //FIX: This is whatever is currently typed 
      var userInputName = userName

      axiosRequest.post(loginStatusURL, {
        userName: userInputName
      })
      .then(function (response) {
        //console.log(response.data);
        // userName: "", userLoggedIn: "notLoggedIn", accessToken: "accessToken", refreshToken: "refreshToken"
        if(response.data.userLoggedIn != "notLoggedIn"){
          let loginStatusMessage = response.data.userName + " is currently logged in!"
          console.log(loginStatusMessage)
          setLoginStatus(loginStatusMessage);

        } else {
          let loginStatusMessage = "nobody logged in!"
          console.log(loginStatusMessage)
          setLoginStatus(loginStatusMessage);
        }
        
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const logoutUser = () => {
      //FIX: This is whatever is currently typed 
      var userInputName = userName
      var refreshToken = "refreshToken"

      axiosRequest.post(logoutURL, {
        userName: userInputName,
        refreshToken: refreshToken
      })
      .then(function (response) {
        console.log(response.data)
        setLoginStatus("nobody logged in!");
        /*
        if(response.data.userLoggedIn != "notLoggedIn"){
          let loginStatusMessage = response.data.userName + " is currently logged in!"
          console.log(loginStatusMessage)
          setLoginStatus(loginStatusMessage);

        } else {
          let loginStatusMessage = "nobody logged in!"
          console.log(loginStatusMessage)
          setLoginStatus(loginStatusMessage);
        }
        *//*
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    

    const loginVerify = () => {
      axiosRequest.post(logoutVerifyURL, {
        userName: "davey",
      })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
      
    }

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

  export default Login;



*/
