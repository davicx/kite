import axios from 'axios'
import functions from "./functions";

function getAPI() {
    const axiosRequest = axios.create({
        withCredentials: true
      })  
    
      axiosRequest.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        console.log("INTERCEPTOR: Looks good! ")
        return response;
      }, function (error) {
        console.log(error.response.status)
        console.log(error.response)
        
        //STATUS 498:  Need to get a access token
        console.log("INTERCEPTOR: Need to get a access token or logout the user")
        if(error.response.status == 498) {
          console.log("INTERCEPTOR 498: We got a 498 so we need a new access token. Will send refresh token ")
          //const refreshURL = "http://localhost:3003/refresh/tokens"
          const refreshURL = "http://localhost:3003/refresh/tokens"
      
          //const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
          //const { data, error, isPending } = useRefreshToken(refreshURL);
          const refreshOutcome = functions.refreshToken();
          console.log("We refreshed the access token!")
      
        } 
      
        //STATUS 440: Logout User
        if(error.response.status == 440) {
          console.log("INTERCEPTOR 440: We got a 440 we couldn't refresh the access token because the refresh token was no good need to logout the user")  
          localStorage.setItem('localStorageCurrentUser', JSON.stringify("null")); 
          window.location.href = '/login';
        }
        
        return Promise.reject(error);
        
      });

      return axiosRequest;
}

export default { getAPI };



/*


//STATUS 200: Good Request 

*/