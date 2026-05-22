import React, { useState, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';

import apiFunctions from '../functions/apiFunctions';
import { LoginContext } from '../functions/context/LoginContext';
import { AtlasFindingsContext } from '../functions/context/AtlasFindingsContext';
import { useSendMessage } from '../hooks/useSendMessage';
import {
  fetchConversationMessages,
  fetchConversationsForGroup,
} from '../functions/api/chatAPI';
import ChatConversationSidebar from '../components/chat/ChatConversationSidebar';

const api = apiFunctions.getAPI();

const DEMO_GROUP_ID = 70;
const POLL_MS = 4000;

function ChatPage() {
  const { currentUser: contextUser } = useContext(LoginContext);
  const { setFindings } = useContext(AtlasFindingsContext) || {};
  const stored = localStorage.getItem('localStorageCurrentUser');
  const currentUser = contextUser ?? (stored ? JSON.parse(stored) : null);

  const [selectedConversationID, setSelectedConversationID] = useState(null);
  const [message, setMessage] = useState('');

  const { data: groupConversationsRes } = useQuery(
    ['group-conversations', DEMO_GROUP_ID],
    () => fetchConversationsForGroup({ api, groupID: DEMO_GROUP_ID }),
    { staleTime: 30_000 }
  );

  const conversationList = groupConversationsRes?.data ?? [];
  const activeConv = conversationList.find(
    (c) => c.conversationID === selectedConversationID
  );
  const conversationTitle =
    activeConv?.conversationTitle ||
    (selectedConversationID
      ? `Thread ${selectedConversationID}`
      : 'Select a conversation');

  const { sendMessage, isLoading } = useSendMessage(api, currentUser, {
    groupID: DEMO_GROUP_ID,
    conversationID: selectedConversationID ?? 0,
  });

  const canSend =
    selectedConversationID != null &&
    selectedConversationID > 0 &&
    !isLoading;

  const {
    data: messagesRes,
    isLoading: messagesLoading,
    isError: messagesError,
    error: messagesErr,
  } = useQuery(
    ['chat-messages', DEMO_GROUP_ID, selectedConversationID],
    () =>
      fetchConversationMessages({
        api,
        conversationID: selectedConversationID,
      }),
    {
      enabled: selectedConversationID != null && selectedConversationID > 0,
      refetchInterval: POLL_MS,
      refetchOnWindowFocus: true,
    }
  );

  const messages = useMemo(() => messagesRes?.data ?? [], [messagesRes]);

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || !canSend) return;

    sendMessage(trimmed, {
      onSuccess: (data) => {
        if (
          typeof setFindings === 'function' &&
          data?.data?.atlasResponse &&
          Array.isArray(data.data.atlasResponse.findings)
        ) {
          setFindings(data.data.atlasResponse.findings);
        }
        setMessage('');
      },
    });
  };

  const displayName =
    currentUser && currentUser !== 'null' ? currentUser : 'anonymous';

  return (
    <div
      className="d-flex flex-column bg-light"
      style={{
        // Fill `.app-route-shell` from App.js (flex parent + minHeight:0); do not use 100vh here — App nav sits above routes.
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <header
        className="bg-white border-bottom shadow-sm py-2 flex-shrink-0"
        style={{ position: 'relative', height: 'auto', width: '100%' }}
      >
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
              <Link to="/chat" className="text-decoration-none text-dark">Chat</Link>
              <Link to="/dashboard" className="text-decoration-none text-dark">Dashboard</Link>
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

      <div
        className="d-flex flex-grow-1 overflow-hidden align-items-stretch"
        style={{ flex: 1, minHeight: 0, minWidth: 0 }}
      >
        <ChatConversationSidebar
          groupID={DEMO_GROUP_ID}
          api={api}
          currentUser={currentUser}
          selectedConversationID={selectedConversationID}
          onSelectConversation={setSelectedConversationID}
        />

        <main
          className="d-flex flex-column flex-grow-1 bg-light mx-auto overflow-hidden"
          style={{ maxWidth: 800, flex: 1, minHeight: 0, minWidth: 0 }}
        >
          <div className="px-4 pt-3 pb-0 flex-shrink-0">
            <p className="text-muted small mb-1">
              Group {DEMO_GROUP_ID}
              {selectedConversationID != null
                ? ` · conversation #${selectedConversationID}`
                : ''}
            </p>
            <h1 className="h5 mb-0">{conversationTitle}</h1>
            <p className="text-muted small mb-0">
              Signed in as <strong>{displayName}</strong> · refreshes every {POLL_MS / 1000}s
            </p>
          </div>

          <div
            className="flex-grow-1 d-flex flex-column p-4"
            style={{ flex: 1, minHeight: 0 }}
          >
            <div
              className="bg-white rounded-3 shadow-sm flex-grow-1 overflow-auto p-4 mb-3"
              style={{ minHeight: 0, flex: 1 }}
            >
              {selectedConversationID == null && (
                <p className="text-muted small">
                  Choose a conversation on the left or create a new one.
                </p>
              )}
              {selectedConversationID != null && messagesLoading && (
                <p className="text-muted small">Loading messages…</p>
              )}
              {selectedConversationID != null && messagesError && (
                <p className="text-danger small">
                  Could not load messages ({messagesErr?.message || 'error'}). Are you logged in?
                </p>
              )}
              {selectedConversationID != null &&
                !messagesLoading &&
                !messagesError &&
                messages.length === 0 && (
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
                    className={`mb-3 ${mine ? 'text-end' : 'text-start'}`}
                  >
                    <div
                      className={`d-inline-block rounded-3 px-3 py-2 ${
                        mine
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-body-secondary text-dark border border-secondary'
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

            <form onSubmit={handleSubmit} className="d-flex gap-2 flex-shrink-0" style={{ marginBottom: 24 }}>
              <input
                type="text"
                className="form-control rounded-3"
                placeholder={
                  canSend
                    ? 'Type a message...'
                    : 'Select a conversation to send'
                }
                value={message}
                onChange={handleChange}
                disabled={!canSend}
              />
              <button
                type="submit"
                className="btn btn-primary rounded-3 px-4"
                disabled={!canSend || !message.trim()}
              >
                {isLoading ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ChatPage;
