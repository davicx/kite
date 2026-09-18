import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import { LoginContext } from './functions/context/LoginContext';

// Temp shell styles: ./style/style_temp/ (not imported)
// Landing/login styles load from LoginPage → ./style/login.css

function App() {
  const [currentUser, setLoginState] = useState('null');

  useEffect(() => {
    const data = localStorage.getItem('localStorageCurrentUser');
    const currentUserLoggedIn = JSON.parse(data);
    setLoginState(currentUserLoggedIn);
  }, []);

  return (
    <div className="App">
      <LoginContext.Provider value={{ currentUser, setLoginState }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
