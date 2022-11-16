import React, { useState, useContext } from 'react';
import { BrowserRouter, useNavigate, Link  } from "react-router-dom"
import LogoutUser from '../components/login/LogoutUser';
import { LoginContext } from "../functions/context/LoginContext";

import Axios from "axios";

const axiosRequest = Axios.create({
  withCredentials: true
})

function Groups() {
  const { currentUser, setLoginState} = useContext(LoginContext);

  return (
    <div className="user">
        <p> Groups </p>
        <p> Current User: { currentUser } </p>
        <Link to={`/group/1`}>{ "Music 1" } </Link>
        <Link to={`/group/2`}>{ "Music 2" } </Link>
        <Link className="" to="/group/5"> Games 5 </Link>
        <LogoutUser />
    </div>
  );
}

export default Groups;



