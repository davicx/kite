import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';

import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import ConnectionPage from './pages/ConnectionPage';
import RecentsPage from './pages/design/RecentsPage';
import FindingsPage from './pages/design/FindingsPage';
import IndividualFindingPage from './pages/design/IndividualFindingPage';
import TicketPage from './pages/design/TicketPage';
import SimplePage from './pages/design/SimplePage';
import DashboardChatPage from './pages/DashboardChatPage';
import DashboardPage from './pages/DashboardPage';
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import { LoginContext } from './functions/context/LoginContext';
import { ChatConversationContext } from './functions/context/ChatConversationContext';
import AtlasFindingsProvider from './functions/context/AtlasFindingsProvider';

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
            <AtlasFindingsProvider>
            {showAppChrome ? <Header /> : null}
            <div className={showAppChrome ? 'app-shell' : undefined}>
              {showAppChrome ? <Menu /> : null}
              <div className={showAppChrome ? 'app-main' : undefined}>
                <Routes>
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/connections" element={<ConnectionPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/recents" element={<RecentsPage />} />
                  <Route path="/findings" element={<FindingsPage />} />
                  <Route
                    path="/individual-finding"
                    element={<IndividualFindingPage />}
                  />
                  <Route path="/ticket" element={<TicketPage />} />
                  <Route path="/simple" element={<SimplePage />} />
                  <Route path="/dashboard-chat" element={<DashboardChatPage />} />
                </Routes>
              </div>
            </div>
            </AtlasFindingsProvider>
          </ChatConversationContext.Provider>
        </LoginContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
