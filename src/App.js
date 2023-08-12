import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

//Functions 
import { sayHello } from './functions/functions';

//Style 
import './style/style.css';
import './style/external/normalize.css';

//Pages
import Home from './pages/Home';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Groups from './pages/GroupsPage';
import Profile from './pages/ProfilePage';
import Posts from './pages/PostsPage';
import Users from './pages/UsersPage';
import NotFound from './pages/NotFound';
import IndividualGroup from './pages/IndividualGroup';
//import IndividualFriend from './pages/IndividualFriendPage';
//This is temp above works
import IndividualFriend from './pages/FriendPage';
//
import { LoginContext } from './functions/context/LoginContext';

const queryClient = new QueryClient();

function App() {
  const [currentUser, setLoginState] = useState('null');
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
     const data = localStorage.getItem("localStorageCurrentUser");
     const currentUserLoggedIn = JSON.parse(data);
     setLoginState(currentUserLoggedIn);
    if(currentUserLoggedIn == "null") {
      setUserLoggedIn(false);
    } else {
      setUserLoggedIn(true);
    }
  }, []);

  //http://localhost:3000/group/70
  //http://localhost:3000/friend/sam

  return (
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <LoginContext.Provider value = {{currentUser, setLoginState}} > 

            <nav className="navBar">
              <Link className="navLink" to="/login">Login </Link>
              <Link className="navLink" to="/groups"> Groups </Link>
              <Link className="navLink" to="/profile"> Profile </Link>
              <Link className="navLink" to="/posts"> Posts </Link>
              <Link className="navLink" to="/users"> Users </Link>
            </nav>  
            
            <Routes>      
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/groups" element={<Groups/>} />
              <Route path = "/group/:groupID" element = {<IndividualGroup />} />   
              <Route path = "/friends/:friendName" element = {<IndividualFriend />} />   
              <Route path="/profile" element={<Profile/>} />
              <Route path="/posts" element={<Posts/>} />
              <Route path="/users" element={<Users/>} />
              <Route path="*" element={ <NotFound /> } />       
            </Routes>
          </LoginContext.Provider> 
          <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>  
        </QueryClientProvider>
      </div>

  );
}

export default App;

/*
<Link className="navLink" to="/users"> Users </Link>
*/