import axios from 'axios'
import functions from "./functions";

function getAPI() {
    const axiosRequest = axios.create({
        withCredentials: true
      })  
    
      axiosRequest.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        //console.log("__________________________")
        //console.log("INTERCEPTOR: Looks good! ")
        //console.log("Status: 200")
        //console.log("Message you are logged in")
        //console.log("__________________________")

        return response;
      }, function (error) {
        const res = error.response;
        if (res) {
          console.log(res.status);
          console.log(res);
        } else {
          console.log(
            'INTERCEPTOR: no HTTP response (network/CORS/offline).',
            error.message || error.code || error
          );
        }

        //STATUS 498:  Need to get a access token
        if (res && res.status === 498) {
          console.log("__________________________")
          console.log("INTERCEPTOR 498: We got a 498 so we need a new access token. Will send refresh token ")
          console.log("Status: 498")
          functions.refreshToken();
          console.log("Message: We refreshed the access token!")
          console.log("__________________________")
        }

        //STATUS 440: Logout User
        if (res && res.status === 440) {
          console.log("__________________________")
          console.log("INTERCEPTOR 440: We got a 440 we couldn't refresh the access token because the refresh token was no good need to logout the user")
          console.log("Status: 440")
          console.log("Message: Logout the user!")
          localStorage.setItem('localStorageCurrentUser', JSON.stringify("null"));
          window.location.href = '/login';
          console.log("__________________________")
        }

        return Promise.reject(error);
      });

      return axiosRequest;
}

export default { getAPI };


/*
function getAPI() {
    const axiosRequest = axios.create({
        withCredentials: true
      })  
    
      axiosRequest.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        //console.log("__________________________")
        //console.log("INTERCEPTOR: Looks good! ")
        //console.log("Status: 200")
        //console.log("Message you are logged in")
        //console.log("__________________________")

        return response;
      }, function (error) {
        const res = error.response;
        if (res) {
          console.log(res.status);
          console.log(res);
        } else {
          console.log(
            'INTERCEPTOR: no HTTP response (network/CORS/offline).',
            error.message || error.code || error
          );
        }

        //STATUS 498:  Need to get a access token
        if (res && res.status === 498) {
          console.log("__________________________")
          console.log("INTERCEPTOR 498: We got a 498 so we need a new access token. Will send refresh token ")
          console.log("Status: 498")
          functions.refreshToken();
          console.log("Message: We refreshed the access token!")
          console.log("__________________________")
        }

        //STATUS 440: Logout User
        if (res && res.status === 440) {
          console.log("__________________________")
          console.log("INTERCEPTOR 440: We got a 440 we couldn't refresh the access token because the refresh token was no good need to logout the user")
          console.log("Status: 440")
          console.log("Message: Logout the user!")
          localStorage.setItem('localStorageCurrentUser', JSON.stringify("null"));
          window.location.href = '/login';
          console.log("__________________________")
        }

        return Promise.reject(error);
      });

      return axiosRequest;
}

export default { getAPI };
*/