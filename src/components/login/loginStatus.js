import React, { Component, useState} from 'react'
import Axios from "axios";

const axiosRequest = Axios.create({
  withCredentials: true
})

function LoginStatus() {
    const loginStatusURL = "http://localhost:3003/login/status"
    var loginStatus = "Logged In"

    const getLoginStatus = () => {
      var userInputName = 'davey'
      var userInputPassword = 'password'
      console.log("you are logging in " + userInputName + " with the password " + userInputPassword)
      
      axiosRequest.post(loginStatusURL, {
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
   
    return (
      <div className="simplerHolder">
        <p> Login Status </p>
        <button className = "loginButton" onClick={ getLoginStatus }> Get Login Status </button>
      </div>
    );
  }

export default LoginStatus;
