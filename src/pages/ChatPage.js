import React, { useState, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';

import apiFunctions from '../functions/apiFunctions';
import { LoginContext } from '../functions/context/LoginContext';
import { useSendMessage } from '../hooks/useSendMessage';
import {
  fetchConversationById,
  fetchConversationMessages,
} from '../functions/api/chatAPI';

const api = apiFunctions.getAPI();

/** Demo wiring: group 70 + conversation id 1 (“Sailing”) — see conversations_seed_demo.sql */
const DEMO_GROUP_ID = 70;
const DEMO_CONVERSATION_ID = 1;
const POLL_MS = 4000;

function ChatPage() {
  const { currentUser: contextUser } = useContext(LoginContext);
  const stored = localStorage.getItem('localStorageCurrentUser');
  const currentUser = contextUser ?? (stored ? JSON.parse(stored) : null);

  const [message, setMessage] = useState('');
  const { sendMessage, isLoading } = useSendMessage(api, currentUser, {
    groupID: DEMO_GROUP_ID,
    conversationID: DEMO_CONVERSATION_ID,
  });

  const { data: convRes } = useQuery(
    ['conversation', DEMO_CONVERSATION_ID],
    () => fetchConversationById({ api, conversationID: DEMO_CONVERSATION_ID }),
    { staleTime: 60_000 }
  );

  const conversationTitle =
    convRes?.data?.conversationTitle || 'Sailing (demo)';

  const {
    data: messagesRes,
    isLoading: messagesLoading,
    isError: messagesError,
    error: messagesErr,
  } = useQuery(
    ['chat-messages', DEMO_GROUP_ID, DEMO_CONVERSATION_ID],
    () =>
      fetchConversationMessages({
        api,
        conversationID: DEMO_CONVERSATION_ID,
      }),
    { refetchInterval: POLL_MS, refetchOnWindowFocus: true }
  );

  const messages = useMemo(
    () => messagesRes?.data ?? [],
    [messagesRes]
  );

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || isLoading) return;

    sendMessage(trimmed, {
      onSuccess: () => setMessage(''),
    });
  };

  const displayName =
    currentUser && currentUser !== 'null' ? currentUser : 'anonymous';

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <header className="bg-white border-bottom shadow-sm py-2">
        <div className="container-fluid d-flex align-items-center justify-content-between px-4">
          <div className="d-flex align-items-center gap-4">
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

      <div className="d-flex flex-grow-1 overflow-hidden">
        <aside className="flex-grow-1 bg-white border-end min-w-0" />

        <main className="d-flex flex-column flex-shrink-0 bg-light" style={{ width: 800 }}>
          <div className="px-4 pt-3 pb-0">
            <p className="text-muted small mb-1">
              Group {DEMO_GROUP_ID} · conversation #{DEMO_CONVERSATION_ID}
            </p>
            <h1 className="h5 mb-0">{conversationTitle}</h1>
            <p className="text-muted small mb-0">
              Signed in as <strong>{displayName}</strong> · refreshes every {POLL_MS / 1000}s
            </p>
          </div>

          <div className="flex-grow-1 d-flex flex-column p-4">
            <div
              className="bg-white rounded-3 shadow-sm flex-grow-1 overflow-auto p-4 mb-3"
              style={{ minHeight: 300 }}
            >
              {messagesLoading && (
                <p className="text-muted small">Loading messages…</p>
              )}
              {messagesError && (
                <p className="text-danger small">
                  Could not load messages ({messagesErr?.message || 'error'}). Are you logged in?
                </p>
              )}
              {!messagesLoading && !messagesError && messages.length === 0 && (
                <p className="text-muted small">No messages yet. Say hi below.</p>
              )}
              {messages.map((m) => {
                const mine =
                  m.messageFrom &&
                  displayName &&
                  m.messageFrom === displayName;
                return (
                  <div
                    key={m.messageID}
                    className={`mb-3 ${mine ? 'text-end' : ''}`}
                  >
                    <div
                      className={`d-inline-block rounded-3 px-3 py-2 ${
                        mine
                          ? 'bg-light text-dark border'
                          : 'bg-primary text-white'
                      }`}
                    >
                      <small>{m.messageCaption}</small>
                    </div>
                    <div className="small text-muted mt-1">
                      {mine ? 'You' : m.messageFrom} · {m.messageTime || ''}{' '}
                      {m.timeMessage ? `(${m.timeMessage})` : ''}
                    </div>
                  </div>
                );
              })}
            </div>

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

        <aside className="flex-grow-1 bg-white border-start min-w-0" />
      </div>
    </div>
  );
}

export default ChatPage;
