import { useState, useEffect } from 'react';

/*
Login Functions:
*/
export function sayHello(userName) {
    console.log("hello " + userName)
}

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

export function loginUser(userName) {
    console.log("login " + userName)
}

export function logouUser(userName) {
    console.log("logout " + userName)
}


//export default { sayHi, sayHello };