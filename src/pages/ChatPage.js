import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import apiFunctions from '../functions/apiFunctions';
import { LoginContext } from '../functions/context/LoginContext';
import { useSendMessage } from '../hooks/useSendMessage';

const api = apiFunctions.getAPI();

function ChatPage() {
  const { currentUser: contextUser } = useContext(LoginContext);
  // Fallback to localStorage (matches GroupsPage) in case context hasn't synced yet
  const stored = localStorage.getItem('localStorageCurrentUser');
  const currentUser = contextUser ?? (stored ? JSON.parse(stored) : null);

  const [message, setMessage] = useState('');
  const { sendMessage, isLoading } = useSendMessage(api, currentUser);

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || isLoading) return;

    sendMessage(trimmed, {
      onSuccess: () => setMessage(''),
    });
  };

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      {/* Header - matching the reference design */}
      <header className="bg-white border-bottom shadow-sm py-2">
        <div className="container-fluid d-flex align-items-center justify-content-between px-4">
          {/* Left: Logo + Nav */}
          <div className="d-flex align-items-center gap-4">
            {/* Logo {B} */}
            <div className="d-flex align-items-center">
              <span className="text-dark fs-5 fw-bold me-0" style={{ fontFamily: 'monospace' }}>{'{'}</span>
              <div 
                className="d-flex align-items-center justify-content-center rounded-2 mx-1"
                style={{ width: 36, height: 36, backgroundColor: '#1a1a1a' }}
              >
                <span className="text-white fw-bold">B</span>
              </div>
              <span className="text-dark fs-5 fw-bold ms-0" style={{ fontFamily: 'monospace' }}>{'}'}</span>
            </div>
            {/* Nav links */}
            <nav className="d-flex gap-3">
              <Link to="/login" className="text-decoration-none text-dark">Login</Link>
              <Link to="/groups" className="text-decoration-none text-dark">Groups</Link>
              <Link to="/profile" className="text-decoration-none text-dark">Profile</Link>
              <Link to="/posts" className="text-decoration-none text-dark">Posts</Link>
              <Link to="/users" className="text-decoration-none text-dark">Users</Link>
              <Link to="/playground" className="text-decoration-none text-dark">Playground</Link>
              <Link to="/chat" className="text-decoration-none text-dark">Chat</Link>
            </nav>
          </div>
          {/* Right: Search + Avatar */}
          <div className="d-flex align-items-center gap-3">
            <input
              type="text"
              className="form-control border-0 bg-light rounded-3"
              placeholder="Search..."
              style={{ width: 200 }}
            />
            <div className="d-flex align-items-center">
              <div 
                className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36, backgroundColor: '#6c5ce7' }}
              >
                <span className="text-white fw-bold small">U</span>
              </div>
              <span className="ms-1 text-muted" style={{ fontSize: 10 }}>▼</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content: Left Area | Messages (800px) | Right Area */}
      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* Left Area - fills remaining space */}
        <aside className="flex-grow-1 bg-white border-end min-w-0" />

        {/* Messages - 800px centered */}
        <main className="d-flex flex-column flex-shrink-0 bg-light" style={{ width: 800 }}>
          <div className="flex-grow-1 d-flex flex-column p-4">
            {/* Chat messages area */}
            <div 
              className="bg-white rounded-3 shadow-sm flex-grow-1 overflow-auto p-4 mb-3"
              style={{ minHeight: 300 }}
            >
              {/* Placeholder messages for visual */}
              <div className="mb-3">
                <div className="d-inline-block bg-primary text-white rounded-3 px-3 py-2">
                  <small>Hello! How can I help you today?</small>
                </div>
                <div className="small text-muted mt-1">10:30 AM</div>
              </div>
              <div className="mb-3 text-end">
                <div className="d-inline-block bg-light text-dark rounded-3 px-3 py-2 border">
                  <small>Just testing the chat interface.</small>
                </div>
                <div className="small text-muted mt-1">10:31 AM</div>
              </div>
              <div className="mb-3">
                <div className="d-inline-block bg-primary text-white rounded-3 px-3 py-2">
                  <small>Looks good! Feel free to send a message below.</small>
                </div>
                <div className="small text-muted mt-1">10:32 AM</div>
              </div>
            </div>

            {/* Input + Submit - moved up 40px from bottom */}
            <form onSubmit={handleSubmit} className="d-flex gap-2" style={{ marginBottom: 40 }}>
              <input
                type="text"
                className="form-control rounded-3"
                placeholder="Type a message..."
                value={message}
                onChange={handleChange}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="btn btn-primary rounded-3 px-4"
                disabled={isLoading || !message.trim()}
              >
                {isLoading ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>
        </main>

        {/* Right Area - fills remaining space */}
        <aside className="flex-grow-1 bg-white border-start min-w-0" />
      </div>
    </div>
  );
}

export default ChatPage;
