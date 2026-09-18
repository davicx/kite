import { useState, useEffect } from 'react';
import axios from 'axios'

const api = axios.create({
    withCredentials: true
})  

const useRefreshToken = (refreshURL) => {
    const localData = localStorage.getItem("localStorageCurrentUser");
    const userName = JSON.parse(localData);
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      setTimeout(() => {
        api.post(refreshURL, {
            userName: userName,
            refreshToken: "dontneedheretoken"
          })
          .then(function (response) {
            setIsPending(false);
            setData(data);
            setError(null);
            console.log(response.data)
            return response.data;
          })
          .catch(function (error) {
            setIsPending(false);
            setError(error.message);
            //console.log(error);
          });
          
        ////
        /*
        fetch(refreshURL)
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
        */
        ////

      }, 1000);
    }, [refreshURL])
  
    return { data, isPending, error };
  }

export default useRefreshToken;

  /*useRefreshToken
async function refreshToken() {

    const refreshURL = "http://localhost:3003/refresh/tokens"
      const data = localStorage.getItem("localStorageCurrentUser");
      const userName = JSON.parse(data);
      //console.log("REFRESH TOKEN: you are refreshing for" + userName )
      //STEP 1: Call Logout API
      axiosRequest.post(refreshURL, {
        userName: userName,
        refreshToken: "dontneedheretoken"
      })
      .then(function (response) {
        console.log(response.data)
        return response.data;
      })
      .catch(function (error) {
        //console.log(error);
      });
      
  }
  */