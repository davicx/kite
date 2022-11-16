import { useState, useEffect } from 'react';

/*
Login Functions:
*/
export function sayHello(userName) {
    console.log("hello " + userName)
}

export function loginStatus(userName) {
    const initialState = {
        isAuthenticated: false,
        user: null,
        token: null,
    };
    console.log("hello")
}

export function loginUser(userName) {
    console.log("login " + userName)
}

export function logouUser(userName) {
    console.log("logout " + userName)
}


//export default { sayHi, sayHello };