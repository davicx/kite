//import { useNavigate } from "react-router-dom";

/* 
FUNCTIONS A: Login Functions 
	1) Function A1: Login a User 
	2) Function A2: Logout a User  
	3) Function A3: Get Login Status 

*/

//FUNCTIONS A: Login Functions 
//Function A1: Login a User 
function loginUser(userName) {
    console.log("login " + userName)
}

//Function A2: Logout a User 
function logoutUser() {
    //const navigate = useNavigate();
    console.log("logout ")

    //Step 2A: Set local storage  
    localStorage.setItem('localStorageCurrentUser', JSON.stringify("null"));   

    //Step 2B: Redirect to Login
    //navigate("/login");
}

//Function A3: Get Login Status 
function loginStatus(userName) {
    let userStatus = {
        isAuthenticated: false,
        user: userName,
    };

    if(userName == 'null') {
        userStatus.isAuthenticated = false;
      } else {
        userStatus.isAuthenticated = true;
      }

      return userStatus;
}

function sayHello(userName) {
    console.log("hello " + userName)
}


export default { loginUser, logoutUser, loginStatus, sayHello };