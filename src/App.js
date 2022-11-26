import React, { useState, useEffect } from 'react';
import { BrowserRouter,Navigate,  Route, Routes, Link, NavLink, useLocation, useNavigate} from 'react-router-dom'
//import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query';
//https://html5boilerplate.com/
import Login from './pages/Login';
import Register from './pages/Register';
import Groups from './pages/Groups';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import IndividualGroup from './pages/IndividualGroup';
//import PrivateRoutes from './functions/hooks/PrivateRoutes.js';
import { LoggedInContext } from "./functions/context/LoggedInContext";
import { LoginContext } from "./functions/context/LoginContext";
import RequireAuth from './components/login/RequireAuth';
//import Layout from './components/Layout';

//import { sayHello } from './functions/functions';
//STOP: 20

import './index.css';
import './style/style.css';
import './style/external/normalize.css';

const queryClient = new QueryClient()
//Put user in user Context 

function App() {
  const [currentUser, setLoginState] = useState('null');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
   console.log("Page reloaded ");
   const data = localStorage.getItem("localStorageCurrentUser");
   const currentUserLoggedIn = JSON.parse(data);
   setLoginState(currentUserLoggedIn);
   if(currentUserLoggedIn == 'null') {
    setUserLoggedIn(false);
    console.log("userLoggedIn = false")
  } else {
    setUserLoggedIn(true);
    console.log("userLoggedIn = true")
  }
  }, []);
  

  return (
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <LoginContext.Provider value={{currentUser, setLoginState}}>
          <LoggedInContext.Provider value = {{userLoggedIn, setUserLoggedIn}}> 
        
          <nav>
            <Link className="loginInput" to="/login">Login </Link>
            <Link className="loginInput" to="/groups"> Groups </Link>
            <Link className="loginInput" to="/profile"> Profile </Link>
          </nav>
       
          <Routes> 
                    
                <Route path="/login" element={<Login/>} />
                <Route path="/groups" element={<Groups/>} />

                <Route path = "/group/:groupID" element = {<IndividualGroup />} />   
                
                  <Route path="/profile" element={<Profile/>} />
      

                { /* Anything Else Routes */}
                <Route path="*" element={ <NotFound /> } />       
     
          </Routes>

          <p> Current User: { currentUser } </p>
          <p> User Logged In: { userLoggedIn ? 'yep!' : 'nooo' } </p>
          </LoggedInContext.Provider>
          </LoginContext.Provider>  
        </QueryClientProvider>
      </div>

  );
}

export default App;

/*


          
          


  //New

  useEffect(() => {
    const data = localStorage.getItem("localStorageCurrentUser");
    const currentUserLoggedIn = JSON.parse(data);
    console.log("APP useEffect " + currentUserLoggedIn)
    console.log(currentUser)
    if(currentUser == 'null') {
      setUserLoggedIn(false);
      console.log("userLoggedIn = false")
    } else {
      setUserLoggedIn(true);
      console.log("userLoggedIn = true")
    }
    setLoginState(currentUserLoggedIn)
  }, []);
  
  //const   = localStorage.getItem("location");
  //const location = localStorage.getItem("location");
  //const navigate = useNavigate();
  const history = {
    currentLocation: "groups",
    previousLocation: "groups2",
  }
  const location = useLocation();
  //const currentLocation = localStorage.getItem("currentLocation");
  //console.log("currentLocation " + currentLocation)
  //localStorage.setItem('previousLocation', JSON.stringify(currentLocation));
  localStorage.setItem('currentLocation', JSON.stringify(history));



  //<button onClick={() => navigate(-1)}>go back</button>


  //New
           <Route path ="/login" element = { userLoggedIn ? <Navigate to="/login" /> : <Navigate to="/groups" /> } />
           
  <nav>
              <Link className="loginInput" to="/login">Login </Link>
              <Link className="loginInput" to="/groups"> Groups </Link>
              <Link className="loginInput" to="/test"> Test </Link>
              <Link className="loginInput" to="/register"> Register </Link>
            </nav>
            <p> Current User: { currentUser } </p>
            <NavLink to="/login" state="hi"> Login </NavLink>

            <Routes>
              <Route element={<PrivateRoutes />}>
                  <Route path="/groups" element={<Groups/>} />
                  <Route path="/test" element={<Groups/>} />
                  <Route path = "/group/:groupID" element = {<IndividualGroup />} /> 
              </Route>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />

              <Route path="*" element={ <NotFound /> } />
             </Routes>
*/



/*
//WORKING
   <LoginContext.Provider value={{currentUser, setLoginState}}>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>

            <nav>
              <Link className="loginInput" to="/login">Login </Link>
              <Link className="loginInput" to="/groups"> Groups </Link>
              <Link className="loginInput" to="/test"> Test </Link>
              <Link className="loginInput" to="/register"> Register </Link>
            </nav>
            <p> Current User: { currentUser } </p>
            <NavLink to="/login" state="hi"> Login </NavLink>

            <Routes>
              <Route element={<PrivateRoutes />}>
                  <Route path="/groups" element={<Groups/>} />
                  <Route path="/test" element={<Groups/>} />
                  <Route path = "/group/:groupID" element = {<IndividualGroup />} /> 
              </Route>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />

              <Route path="*" element={ <NotFound /> } />
             </Routes>

          </BrowserRouter>
        </QueryClientProvider>
      </div>
    </LoginContext.Provider>


import React, { useState, useEffect, createContext } from "react";
//import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
//import { Index } from "./pages";
//import { About } from "./pages/about";
import { LoginContext } from "./context/LoginContext";
import Login from './components/Login'
import Logout from './components/Logout'
import Home from './components/Home'


function App() {
  var userLoggedIn = 'false'
  const [currentUser, setLoginState] = useState('null');

  if(currentUser == 'null') {
    userLoggedIn = 'false'  
  } else {
    userLoggedIn = 'true' 
  }

  useEffect(() => {
    const data = localStorage.getItem("currentUserLoggedIn");
    const currentUserLoggedIn = JSON.parse(data);
    setLoginState(currentUserLoggedIn)
  }, []);

  return (
    <LoginContext.Provider value={{currentUser, setLoginState}}>
      <div>
        <p> Username {currentUser} </p>
        <p> Login State {userLoggedIn} </p>
        <Login />
        <Logout />
        <Home />
      </div>
    </LoginContext.Provider>

  );
}

export default App;

*/