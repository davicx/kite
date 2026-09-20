import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';

import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import ConnectionPage from './pages/ConnectionPage';
import FindingsPage from './pages/FindingsPage';
import IndividualFindingPage from './pages/IndividualFindingPage';
import TicketPage from './pages/TicketPage';
import SimplePage from './pages/SimplePage';
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import { LoginContext } from './functions/context/LoginContext';
import { ChatConversationContext } from './functions/context/ChatConversationContext';

import './style/style.css';

// Temp shell styles: ./style/style_temp/ (not imported)
// Landing/login styles load from LoginPage → ./style/login.css

const queryClient = new QueryClient();

function App() {
  const [currentUser, setLoginState] = useState('null');
  const [conversationID, setConversationID] = useState(null);
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
      <QueryClientProvider client={queryClient}>
        <LoginContext.Provider value={{ currentUser, setLoginState }}>
          <ChatConversationContext.Provider
            value={{ conversationID, setConversationID }}
          >
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
                  <Route path="/findings" element={<FindingsPage />} />
                  <Route
                    path="/individual-finding"
                    element={<IndividualFindingPage />}
                  />
                  <Route path="/ticket" element={<TicketPage />} />
                  <Route path="/simple" element={<SimplePage />} />
                </Routes>
              </div>
            </div>
          </ChatConversationContext.Provider>
        </LoginContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
