import { useEffect, useState, useContext } from 'react'
import { useNavigate  } from "react-router-dom"
import { LoginContext } from "../context/LoginContext";

function useLoginStatus() {
    const navigate = useNavigate();
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const { currentUser, setLoginState} = useContext(LoginContext);

    useEffect(() => {
      const data = localStorage.getItem("localStorageCurrentUser");
      const currentUserLoggedIn = JSON.parse(data);
      setLoginState(currentUserLoggedIn);
      //if(currentUserLoggedIn == 'null' || currentUserLoggedIn == null) {
      if(currentUserLoggedIn == 'null') {
        setUserLoggedIn(false);

        //console.log("Logged In Page: DONT BE HERE");
        navigate("/login");
      } else {
        setUserLoggedIn(true);
        //console.log("Logged In Page: OK STAY HERE")
        //console.log(currentUserLoggedIn + " is currently logged in");
      }
   }, []);

    return { currentUser, userLoggedIn }
}

export default useLoginStatus;



/*
  //Login Status 
  const navigate = useNavigate();
  const { currentUser, setLoginState} = useContext(LoginContext);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("localStorageCurrentUser");
    const currentUserLoggedIn = JSON.parse(data);
    setLoginState(currentUserLoggedIn);
    //if(currentUserLoggedIn == 'null' || currentUserLoggedIn == null) {
    if(currentUserLoggedIn == 'null') {
      setUserLoggedIn(false);
      console.log("Profile Page: DONT BE HERE");
      //navigate("/login");
    } else {
      setUserLoggedIn(true);
      console.log("Profile Page: OK STAY HERE")
      console.log(currentUserLoggedIn + " is currently logged in");
    }
 }, []);
 */

/*

import { useDebugValue, useEffect, useState } from 'react'

function useDisplayName() {
    const [name, setName] = useState('name')

    useEffect(() => {
      const dataName = "Frodo from database"
      setName(dataName)
    }, []);

    return name
}

export default useDisplayName
*/
/*
import { useState, useEffect } from 'react';

const useFetchPosts = (postsURL) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(postsURL)
      .then(res => {
        if (!res.ok) { 
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch(err => {
        setIsPending(false);
        setError(err.message);
      })
    }, 1000);
  }, [postsURL])

  return { data, isPending, error };
}
 
export default useFetchPosts;
*/
//DEBUG
/*
function useDisplayName() {
    const [name, setName] = useState('name')

    useEffect(() => {
      const dataName = "Frodo from database"
      setName(dataName)
    }, []);

    useDebugValue(name ?? '... loading!')

    return name
}
*/
