import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query';

//Function 
import { sayHello } from './functions/functions';

//Style 
import './style/style.css';
import './style/external/normalize.css';

//Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Groups from './pages/GroupsPage';
import Profile from './pages/Profile';
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

            <nav>
              <Link className="loginInput" to="/login">Login </Link>
              <Link className="loginInput" to="/groups"> Groups </Link>
              <Link className="loginInput" to="/profile"> Profile </Link>
            </nav>  
            
            <Routes>      
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



