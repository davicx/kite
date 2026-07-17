import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

//Functions 
import { sayHello } from './functions/functions';

//Style 
import './style/external/normalize.css';
//import './style/styleOLD.css';
//import './style/styleNew.css';
import './style/style.css';

//Pages
import Home from './pages/Home';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Groups from './pages/GroupsPage';
import ChatPage from './pages/ChatPage';
import ChatPageTwo from './pages/chatTwo/ChatPageTwo';
import DashboardPage from './pages/DashboardPage';
import TodoPage from './pages/TodoPage';
import SystemDesignPage from './pages/SystemDesignPage/SystemDesignPage';
import NewGroup from './pages/NewGroupPage';
import Profile from './pages/ProfilePage';
import Posts from './pages/PostsPage';
import Users from './pages/UsersPage';
import NotFound from './pages/NotFound';
import IndividualGroup from './pages/IndividualGroup';
import Playground from './pages/Playground';
import IndividualFriend from './pages/FriendPage';

import { LoginContext } from './functions/context/LoginContext';
import { AtlasFindingsContext, DEFAULT_CHAT_CONTEXT } from './functions/context/AtlasFindingsContext';

const queryClient = new QueryClient();

function App() {
  const [currentUser, setLoginState] = useState('null');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [findings, setFindings] = useState([]);
  const [navigatorData, setNavigatorData] = useState(null);
  const [instructionsData, setInstructionsData] = useState(null);
  const [selectedFinding, setSelectedFinding] = useState(null);
  const [chatContext, setChatContext] = useState(DEFAULT_CHAT_CONTEXT);

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

  return (
      <div
        className="App"
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <QueryClientProvider client={queryClient}>
          <div
            style={{
              flex: 1,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <LoginContext.Provider value={{ currentUser, setLoginState }}>
              <AtlasFindingsContext.Provider
                value={{
                  findings,
                  setFindings,
                  navigatorData,
                  setNavigatorData,
                  instructionsData,
                  setInstructionsData,
                  selectedFinding,
                  setSelectedFinding,
                  chatContext,
                  setChatContext,
                }}
              >
                <nav className="navBar" style={{ flexShrink: 0 }}>
                  <Link className="navLink" to="/login">Login </Link>
                  <Link className="navLink" to="/groups"> Groups </Link>
                  <Link className="navLink" to="/chat"> Chat </Link>
                  <Link className="navLink" to="/chat-two"> Chat Two </Link>
                  <Link className="navLink" to="/dashboard"> Dashboard </Link>
                  <Link className="navLink" to="/todos"> To Dos </Link>
                  <Link className="navLink" to="/system-design"> System Design </Link>
                  <Link className="navLink" to="/profile"> Profile </Link>
                  <Link className="navLink" to="/posts"> Posts </Link>
                  {/* <Link className="navLink" to="/users"> Users </Link> */}
                  {/* <Link className="navLink" to="/playground"> Playground </Link> */}

                </nav>
                <div
                  className="app-route-shell"
                  style={{
                    flex: 1,
                    minHeight: 0,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/groups" element={<Groups/>} />
                    <Route path="/groups/new" element={<NewGroup/>} />
                    <Route path="/group/:groupID" element={<IndividualGroup />} />
                    <Route path="/friends/:friendName" element={<IndividualFriend />} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/posts" element={<Posts/>} />
                    <Route path="/users" element={<Users/>} />
                    <Route path="/playground" element={<Playground/>} />
                    <Route path="/chat" element={<ChatPage/>} />
                    <Route path="/chat-two" element={<ChatPageTwo/>} />
                    <Route path="/dashboard" element={<DashboardPage/>} />
                    <Route path="/todos" element={<TodoPage/>} />
                    <Route path="/system-design" element={<SystemDesignPage/>} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </AtlasFindingsContext.Provider>
            </LoginContext.Provider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </div>
        </QueryClientProvider>
      </div>

  );
}

export default App;

/*
<nav className="navBar">
  <Link className="navLink" to="/login">Login </Link>
  <Link className="navLink" to="/groups"> Groups </Link>
  <Link className="navLink" to="/profile"> Profile </Link>
  <Link className="navLink" to="/posts"> Posts </Link>
  <Link className="navLink" to="/users"> Users </Link>
  <Link className="navLink" to="/playground"> Playground </Link>
</nav>  
*/

//import PlaygroundCheckbox from './pages/PlaygroundCheckbox';
//import IndividualFriend from './pages/IndividualFriendPage';
//This is temp above works