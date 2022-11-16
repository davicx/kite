import { Outlet, Navigate } from 'react-router-dom'
import React, { useContext } from 'react'
//import { loginUser } from '../../functions/functions';
import { LoginContext } from "../context/LoginContext";


const PrivateRoutes = () => {
    const data = localStorage.getItem("currentUserLoggedIn");
    const currentUser = JSON.parse(data);
    //const { currentUser } = useContext(LoginContext);
    console.log("LOGGED IN USER " + currentUser)
    var userLoggedIn = false

    if(currentUser == 'null') {
        userLoggedIn = false
      } else {
        userLoggedIn = true 
      }

    return(
        userLoggedIn ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes


/*
 if (!auth) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
            
import React from 'react';
import Login from '../../pages/Login';
import { useLocation } from 'react-router'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'


//Hard code for exampe 
const useAuth = () => {
    const currentUser = {
        loggedIn: false
    }
    return currentUser && currentUser.loggedIn
}

const PrivateRoutes = () => {
    const useLocation = useLocation();
    const isAuth  = useAuth();

    return isAuth ? ( <Outlet /> 
    ) : (
        <Navigate to="/login" replace state = {{ from: location }}/>
        )
    }  

export default PrivateRoutes;
*/


