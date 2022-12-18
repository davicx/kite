import React, { useContext } from 'react';
import axios from "axios";

const axiosRequest = axios.create({
  withCredentials: true
})

function Refresh() {
    function refreshToken() {
      const refreshURL = "http://localhost:3003/refresh/tokens"
        const data = localStorage.getItem("localStorageCurrentUser");
        const userName = JSON.parse(data);
        console.log("you are refreshing for" + userName )
        
        //STEP 1: Call Logout API
        axiosRequest.post(refreshURL, {
          userName: userName,
          refreshToken: "dontneedheretoken"
        })
        .then(function (response) {
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    
    return (
    <div className = "holder">
        <p>Refresh Token</p>
        <button className="loginButton" onClick={() => refreshToken() }> Refresh Token </button>
      </div>
    );
}


export default Refresh;




