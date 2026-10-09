import React, { useState, useCallback } from 'react';
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
import CostsPage from './pages/design/CostsPage';
import ToDoPage from './pages/design/ToDoPage';
import HistoryPage from './pages/design/HistoryPage';
import TeamPage from './pages/design/TeamPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import { LoginContext } from './functions/context/LoginContext';
import { ChatConversationContext } from './functions/context/ChatConversationContext';
import {
  readStoredConversationID,
  writeStoredConversationID,
} from './functions/context/storedConversation';
import AtlasFindingsProvider from './functions/context/AtlasFindingsProvider';

import './style/style.css';

// Temp shell styles: ./style/style_temp/ (not imported)
// Landing/login styles load from LoginPage → ./style/login.css

const queryClient = new QueryClient();

function App() {
  const [currentUser, setLoginState] = useState(() => {
    try {
      const data = localStorage.getItem('localStorageCurrentUser');
      return data ? JSON.parse(data) : 'null';
    } catch (error) {
      return 'null';
    }
  });
  const [conversationID, setConversationIDState] = useState(
    readStoredConversationID
  );
  const setConversationID = useCallback((id) => {
    const next = id == null || Number(id) <= 0 ? null : Number(id);
    setConversationIDState(next);
    writeStoredConversationID(next);
  }, []);
  const location = useLocation();
  const showAppChrome =
    location.pathname !== '/login' && location.pathname !== '/';
  const isLoggedIn = currentUser && currentUser !== 'null';

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
                  <Route
                    path="/chat"
                    element={
                      isLoggedIn ? <ChatPage /> : <Navigate to="/login" replace />
                    }
                  />
                  <Route
                    path="/connections"
                    element={
                      isLoggedIn ? (
                        <ConnectionPage />
                      ) : (
                        <Navigate to="/login" replace />
                      )
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      isLoggedIn ? (
                        <DashboardPage />
                      ) : (
                        <Navigate to="/login" replace />
                      )
                    }
                  />
                  <Route
                    path="/about"
                    element={
                      isLoggedIn ? <AboutPage /> : <Navigate to="/login" replace />
                    }
                  />
                  <Route path="/recents" element={<RecentsPage />} />
                  <Route path="/findings" element={<FindingsPage />} />
                  <Route
                    path="/individual-finding"
                    element={<IndividualFindingPage />}
                  />
                  <Route path="/ticket" element={<TicketPage />} />
                  <Route path="/simple" element={<SimplePage />} />
                  <Route path="/costs" element={<CostsPage />} />
                  <Route path="/todo" element={<ToDoPage />} />
                  <Route path="/history" element={<HistoryPage />} />
                  <Route path="/team" element={<TeamPage />} />
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
