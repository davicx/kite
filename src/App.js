import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query';

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
import NotFound from './pages/NotFound';
import IndividualGroup from './pages/IndividualGroup';
import { LoginContext } from './functions/context/LoginContext';

const queryClient = new QueryClient();

function App() {
  const [currentUser, setLoginState] = useState('null');
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
     const data = localStorage.getItem("localStorageCurrentUser");
     const currentUserLoggedIn = JSON.parse(data);
     setLoginState(currentUserLoggedIn);
    if(currentUserLoggedIn == 'null') {
      setUserLoggedIn(false);
    } else {
      setUserLoggedIn(true);
    }
  }, []);

  return (
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <LoginContext.Provider value = {{currentUser, setLoginState}} > 

            <nav className="navBar">
              <Link className="navLink" to="/login">Login </Link>
              <Link className="navLink" to="/groups"> Groups </Link>
              <Link className="navLink" to="/profile"> Profile </Link>
            </nav>  
            
            <Routes>      
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/groups" element={<Groups/>} />
              <Route path = "/group/:groupID" element = {<IndividualGroup />} />   =
              <Route path="/profile" element={<Profile/>} />
              <Route path="*" element={ <NotFound /> } />       
            </Routes>
          </LoginContext.Provider>   
        </QueryClientProvider>
      </div>

  );
}

export default App;



