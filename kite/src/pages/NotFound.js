import React, { useState, useEffect } from 'react';
import { Navigate, BrowserRouter, useNavigate, Link  } from "react-router-dom"

function NotFound() {
  const navigate = useNavigate()

  useEffect(() =>{
    setTimeout(() => {

      }, 1000)
  },[])

    return (
      <div className="user">
          <p> Not Found </p>
      </div>
    )
}

export default NotFound;



/*

  useEffect(() =>{
    setTimeout(() => {
      navigate("/login")
      }, 1000)
  },[])

export function NotFound() {
  return <Navigate to = "/login" />

}




function NotFound() {

  return (
    <div className="user">
        <p> Not Found </p>
    </div>
  );
}

import { Navigate, BrowserRouter, useNavigate, Link  } from "react-router-dom"

export function NotFound() {
    return <Navigate to = "/login" />
}
*/