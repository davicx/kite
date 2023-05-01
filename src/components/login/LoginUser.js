import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate, useResolvedPath } from "react-router-dom";
//import { loginUser } from '../../functions/functions';
import { LoginContext } from "../../functions/context/LoginContext";
import axios from "axios";

const axiosRequest = axios.create({
  withCredentials: true
})


function LoginUser() {  
    var loginURL = "http://localhost:3003/user/login"
    const navigate = useNavigate();
    const { currentUser, setLoginState} = useContext(LoginContext);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userName, setUserName] = useState('davey')
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
        console.log("logging in " + userName + " with password "  + password)
        
        //STEP 1: Call Login API
        var userInputName = userName
        var userInputPassword = password
        console.log("you are logging in " + userInputName + " with the password " + userInputPassword)
    
        axiosRequest.post(loginURL, {
          userName: userInputName,
          password: userInputPassword
        })
        .then(function (response) {
          console.log(response.data);
   
          const loginSuccess = response.data.data.loginSuccess;
          const currentUser = response.data.data.loggedInUser;

          //var userNameServer = 

          //STEP 2: Success
          if(loginSuccess == true) {
            
            //Step 2A: Set local storage  
            localStorage.setItem('localStorageCurrentUser', JSON.stringify(currentUser));

            //Step 2B: Set context
            setLoginState(currentUser)
 
            //Step 2C: Redirect to Groups
            //navigate("/groups");
            navigate("/profile");

          } else {
            console.log("Display error message");
          }
        })
        .catch(function (error) {
          console.log(error);
        });

    }

    return (
      <div className = "login">
          <form onSubmit={ handleSubmit }>
              <input name= "username" className="loginInput" type="text" value={ userName } onChange={handleChange} />
              <input name= "password" className="loginInput" type="text" value={ password } onChange={handleChange} />
              <button type="submit" className="loginButton" > Login </button>
          </form>
      </div>
    );
  }

export default LoginUser;




