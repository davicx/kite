import { useLocation, Navigate, Outlet } from "react-router-dom";
import { LoginContext } from "../../functions/context/LoginContext";
import React, { useState, useContext } from 'react'
//import useAuth from "../hooks/useAuth";
import { LoggedInContext } from "../../functions/context/LoggedInContext";

const RequireAuth = () => {
    const { userLoggedIn, setUserLoggedIn} = useContext(LoggedInContext);
      
    if(userLoggedIn) {
        return (
            <Outlet />
        )       
    } else {
        return (
            <Navigate to='/login'/>
        )   

    }

    
/*
    if(userLoggedIn) {
        return (
            <div> <p> userLoggedin!!!!!</p> </div>
        )       
    } else {
        return (
            <Navigate to = "/login" state={{from: location}} replace />
        )   

    }
    return (
        userLoggedIn ? <Outlet /> : <Navigate to = "/login" state={{from: location}} replace />
    );
    */
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