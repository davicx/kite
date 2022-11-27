import { useState, useEffect } from 'react';

/*

/* FUNCTIONS 
FUNCTIONS A: Login Functions 
	1) Function A1: Login a User 
	2) Function A2: Logout a User  
	3) Function A3: Get Login Status 

*/
//FUNCTIONS A: Login Functions 
//Function A1: Login a User 
export function loginUser(userName) {
    console.log("login " + userName)
}

//Function A2: Logout a User 
export function logouUser(userName) {
    console.log("logout " + userName)
}

//Function A3: Get Login Status 
export function loginStatus(userName) {
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

export function sayHello(userName) {
    console.log("hello " + userName)
}




//export default { sayHi, sayHello };