import React, { Component, useState} from 'react'
import Axios from "axios";

const axiosRequest = Axios.create({
  withCredentials: true
})

function Register() {  
    const [userName, setUsername] = React.useState('');
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const loginURL = "http://localhost:3003/register"

    const registerUser = () => {
      var userInputName = userName
      var userInputFullName = fullName
      var userInputEmail = email
      var userInputPassword = password

      console.log("you are logging in " + userInputName + " with the password " + userInputPassword)
      console.log("userInputFullName " + userInputFullName + " userInputEmail " + userInputEmail)

      //SEND POST
      axiosRequest.post(loginURL, {
        userName: userInputName,
        fullName: userInputFullName,
        email: userInputEmail,
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
      <div className="login">
        <input type="text" className="loginInput" placeholder="userName" onChange={e => setUsername(e.target.value)} />
        <p></p>
        <input type="text" className="loginInput" placeholder="full name" onChange={e => setFullName(e.target.value)} />
        <p></p>
        <input type="text" className="loginInput" placeholder="email" onChange={e => setEmail(e.target.value)} />
        <p></p>
        <input type="text" className="loginInput" placeholder="password" onChange={e => setPassword(e.target.value)} />
        <p></p>        
        <button className = "loginButton" onClick={ registerUser }> Register </button>
        <div className = "simplerHolder">
          <p>{ userName }</p> 
          <p>{ fullName }</p>
          <p>{ email }</p>
          <p>{ password }</p>
        </div>

      </div>
    );
  }

  export default Register;
  
