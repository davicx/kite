import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import ConnectionPage from './pages/ConnectionPage';
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import { LoginContext } from './functions/context/LoginContext';

import './style/style.css';

// Temp shell styles: ./style/style_temp/ (not imported)
// Landing/login styles load from LoginPage → ./style/login.css

function App() {
  const [currentUser, setLoginState] = useState('null');
  const location = useLocation();
  const showAppChrome =
    location.pathname !== '/login' && location.pathname !== '/';

  useEffect(() => {
    const data = localStorage.getItem('localStorageCurrentUser');
    const currentUserLoggedIn = JSON.parse(data);
    setLoginState(currentUserLoggedIn);
  }, []);

  return (
    <div className="App">
      <LoginContext.Provider value={{ currentUser, setLoginState }}>
        {showAppChrome ? <Header /> : null}
        <div className={showAppChrome ? 'app-shell' : undefined}>
          {showAppChrome ? <Menu /> : null}
          <div className={showAppChrome ? 'app-main' : undefined}>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/connections" element={<ConnectionPage />} />
              <Route path="/dashboard" element={<div className="chat-page" />} />
              <Route path="/findings" element={<div className="chat-page" />} />
            </Routes>
          </div>
        </div>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
