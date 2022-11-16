import { useLocation, Navigate, Outlet } from "react-router-dom";
import { LoginContext } from "../../functions/context/LoginContext";
import React, { useState, useContext } from 'react'
//import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { currentUser, setLoginState} = useContext(LoginContext);
    const location = useLocation();
    var userLoggedIn = false;
    if(currentUser == 'null') {
        userLoggedIn = false
      } else {
        userLoggedIn = true 
    }

    return (
        userLoggedIn ? <Outlet /> : <Navigate to = "/login" state={{from: location}} replace />
    );
}

export default RequireAuth;

/*
const RequireAuth = ({ allowedRoles }) => {
    
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}
*/