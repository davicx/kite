import React, { useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query';

import Login from './pages/Login';
import Register from './pages/Register';
import Groups from './pages/Groups';
import IndividualGroup from './pages/IndividualGroup';
import Users from './pages/Users';
import UserProfile from './pages/UserProfile';

//Temp
import Signup from './pages/Signup';
import UserLogin from './pages/UserLogin';
import Home from './pages/Home';
/*
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
*/
//Temp

import './index.css';
import './style/style.css';

const queryClient = new QueryClient()

function App() {
  const [userLoggedIn] = useState(false) 

  return (
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>

            <nav>
              <Link className="link" to="/" >Home </Link>
              <Link className="link" to="/login">Login </Link>
              <Link className="link" to="/register">Register </Link>
              <Link className="link" to="/groups"> Groups </Link>
              <Link className="link" to="/users"> Users </Link>
            </nav>

            <Routes>
              <Route path = "/" element = {<Groups />} /> 
              <Route path = "/login" element = {<Login />} /> 
              <Route path = "/register" element = {<Register />} /> 

              <Route path = "/signup" element = {<Signup />} /> 
              <Route path = "/loginuser" element = {<UserLogin />} /> 
              <Route path = "/home" element = {<Home />} /> 

              <Route path = "/groups/works" element = {<Groups />} />
              <Route path = "/groups" element = { userLoggedIn ? <Navigate to= "/Groups" /> : <Navigate to= "/Login"/> } />  
              <Route path = "/group/:groupID" element = {<IndividualGroup />} /> 
              <Route path = "/user/:userID" element = {<UserProfile />} /> 
              <Route path = "/users" element = {<Users />} /> 

              <Route path = "/redirect" element = {<Navigate to= "/Login" />} /> 
              
              <Route path = "/status" element = { userLoggedIn ? <Navigate to= "/Groups" /> : <Navigate to= "/Login"/> } />  
            
            </Routes>

          </BrowserRouter>
        </QueryClientProvider>
      </div>
  );
}

export default App;

/*
import React, { useState } from 'react';

//function Sam(props) { props.location
function Sam({location}) {
  const [name, setLocation] = useState("Sam");

  return (
    <div className="user">
      <p>Name {name} </p>
      <p> Location: {location} </p>
    </div>
  );
}

Sam.defaultProps = {
    location: 'gardening'
}

export default Sam;

import React from 'react';

class Pippin extends React.Component {
    state = {
        name: 'Pippin',
        location: 'Shire',
    }

    render() {
        return (
            <div className = "user">
                <p>Hello { this.props.name }</p>
                <p>Hello { this.state.name }</p>
            </div>
        )
    }
}


export default Pippin;

const Merry = (props) => {
    const location = props.location;

    return (
        <div className="user">
            <p> Merry </p>
            <p> Location: {location} </p>
        </div>
        );
    }  

export default Merry;

import React, { useState } from 'react';

function Frodo() {
  // Declare a new state variable, which we'll call "count"
  const [name, setLocation] = useState("Frodo");

  return (
    <div className="user">
      <p>Name {name} </p>
      <p> Location: Shire </p>
    </div>
  );
}


export default Frodo;

import React, { useState } from 'react';

function Bilbo() {
  // Declare a new state variable, which we'll call "count"
  const [name, setLocation] = useState("Bilbo");

  return (
    <div className="user">
      <p>Name {name} times</p>
      <p> Location: Shire </p>
    </div>
  );
}


export default Bilbo;


*/
/*
    <BrowserRouter>
          
       </BrowserRouter>
import './index.css';
import Groups from './pages/Groups';
import UserProfile from './pages/UserProfile';
import IndividualGroup from './components/groups/IndividualGroup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
       <div className = "body">
          <Switch> 
            <Route exact path = "/"> 
              <Groups />
            </Route>  
            <Route path = "/group/:groupID"> 
              <IndividualGroup />
            </Route>
            <Route path = "/user/:userID"> 
              <UserProfile />
            </Route>  
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
 */