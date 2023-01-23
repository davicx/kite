import React, { useContext } from 'react';
import { LoginContext } from "../../functions/context/LoginContext";
import functions from "../../functions/functions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const axiosRequest = axios.create({
  withCredentials: true
})

function LogoutUser() {
  const navigate = useNavigate();
  const { currentUser, setLoginState} = useContext(LoginContext);
  const logoutURL = "http://localhost:3003/user/logout"
     
    function logout() {
        const data = localStorage.getItem("localStorageCurrentUser");
        const userName = JSON.parse(data);
        console.log("you are loggin out" + userName )
        
        //STEP 1: Call Logout API
        axiosRequest.post(logoutURL, {
          userName: userName,
          refreshToken: "token"
        })
        .then(function (response) {
          console.log(response.data)

          if(response.data.userLoggedIn != "notLoggedIn"){
            let loginStatusMessage = response.data.userName + " is currently logged in!"
            console.log(loginStatusMessage)
            //setLoginStatus(loginStatusMessage);
  
          } else {
            let loginStatusMessage = "nobody logged in!"
            console.log(loginStatusMessage)
            //setLoginStatus(loginStatusMessage);
          }
          
        })
        .catch(function (error) {
          console.log(error);
        });

        //Step 2A: Set local storage  
        localStorage.setItem('localStorageCurrentUser', JSON.stringify("null"));   
      
        //Step 2B: Set context
        setLoginState('null')

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
import React, { Component, useState} from 'react'
import axios from "axios";

const axiosRequest = axios.create({
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
      console.log("you are checking on " + userInputName )

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