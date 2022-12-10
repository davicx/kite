import React, { useState} from 'react'
import axios from "axios";

const axiosRequest = axios.create({
  withCredentials: true
})

function LoginStatus() {
    const [loggedInStatus, setLoginStatus] = useState('');
    var loginStatusURL = "http://localhost:3003/login/status"

    const loginStatus = () => {
      const data = localStorage.getItem("localStorageCurrentUser");
      const userName = JSON.parse(data);
        console.log("you are checking on " + userName )
  
        axiosRequest.post(loginStatusURL, {
          userName: userName
        })
        .then(function (response) {
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
          */
           console.log(response.data)
          
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    return (
      <div className="login">
        <button className = "loginButton" onClick={ loginStatus }> Login Status </button>
        <p>{ loggedInStatus }</p>
      </div>
    );
  }

export default LoginStatus;
