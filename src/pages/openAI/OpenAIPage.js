import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';

import apiFunctions from '../../functions/apiFunctions';
import { LoginContext } from '../../functions/context/LoginContext';
import {
  fetchConversationMessages,
  fetchConversationsForGroup,
  createConversationAPI,
} from '../../functions/api/chatAPI';
import ChatMessage from '../../components/chat/ChatMessage';
import { postOpenAIChat } from './openAIApi';

const api = apiFunctions.getAPI();
const OPENAI_GROUP_ID = 726;

const TIER_OPTIONS = [
  { tier: 'CHEAP', label: 'Cheap', displayName: 'GPT-5.6 Luna' },
  { tier: 'MEDIUM', label: 'Medium', displayName: 'GPT-5.6 Terra' },
  { tier: 'EXPENSIVE', label: 'Expensive', displayName: 'GPT-5.6 Sol' },
];

function formatUsd(value, digits = 6) {
  const n = Number(value) || 0;
  if (n === 0) return '$0';
  if (n < 0.01) return `$${n.toFixed(digits)}`;
  return `$${n.toFixed(2)}`;
}

function formatTokens(n) {
  return Number(n || 0).toLocaleString();
}

function OpenAIPage() {
  const { currentUser: contextUser } = useContext(LoginContext);
  const stored = localStorage.getItem('localStorageCurrentUser');
  const currentUser = contextUser ?? (stored ? JSON.parse(stored) : null);
  const displayName =
    currentUser && currentUser !== 'null' ? String(currentUser) : '';

  const queryClient = useQueryClient();
  const [selectedConversationID, setSelectedConversationID] = useState(null);
  const [message, setMessage] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [modelTier, setModelTier] = useState('CHEAP');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [showNewConvModal, setShowNewConvModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  // Session-only Current Info (resets on refresh)
  const [info, setInfo] = useState({
    model: 'GPT-5.6 Luna',
    currentRequestCost: 0,
    totalSpend: 0,
    totalTokens: 0,
    inputTokens: 0,
    outputTokens: 0,
  });

  const bottomRef = useRef(null);

  function selectTier(tier) {
    setModelTier(tier);
    const opt = TIER_OPTIONS.find((t) => t.tier === tier);
    if (opt) {
      setInfo((prev) => ({ ...prev, model: opt.displayName }));
    }
  }

  const handleSelectConversation = useCallback((id) => {
    setSelectedConversationID(id);
  }, []);

  const { isLoading: convLoading, data: convRes, isError: convError, error: convErr } =
    useQuery(
      ['openai-group-conversations', OPENAI_GROUP_ID],
      () => fetchConversationsForGroup({ api, groupID: OPENAI_GROUP_ID }),
      { staleTime: 30_000 }
    );

  const conversationList = convRes?.data ?? [];
  const activeConv = conversationList.find(
    (c) => c.conversationID === selectedConversationID
  );
  const conversationTitle =
    activeConv?.conversationTitle ||
    (selectedConversationID
      ? `Thread ${selectedConversationID}`
      : 'Select a conversation');

  useEffect(() => {
    if (
      selectedConversationID == null &&
      conversationList.length > 0 &&
      !convLoading
    ) {
      setSelectedConversationID(conversationList[0].conversationID);
    }
  }, [conversationList, convLoading, selectedConversationID]);

  const {
    data: messagesRes,
    isLoading: messagesLoading,
    isError: messagesError,
    error: messagesErr,
    refetch: refetchMessages,
  } = useQuery(
    ['openai-chat-messages', OPENAI_GROUP_ID, selectedConversationID],
    () =>
      fetchConversationMessages({
        api,
        conversationID: selectedConversationID,
      }),
    {
      enabled: selectedConversationID != null && selectedConversationID > 0,
    }
  );

  const messages = messagesRes?.data ?? [];

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length, sending]);

  const { mutate: createConversation, isLoading: creating } = useMutation(
    (title) =>
      createConversationAPI({
        api,
        body: {
          groupID: OPENAI_GROUP_ID,
          conversationTitle: title.trim() || 'New conversation',
          createdBy: displayName || 'anonymous',
        },
      }),
    {
      onSuccess: (res) => {
        const newConv = res?.data;
        queryClient.setQueryData(
          ['openai-group-conversations', OPENAI_GROUP_ID],
          (prev) => {
            const prevList = prev?.data ? [...prev.data] : [];
            if (newConv) prevList.push(newConv);
            return { ...prev, data: prevList, success: true };
          }
        );
        if (newConv?.conversationID != null) {
          setSelectedConversationID(newConv.conversationID);
        }
        setNewTitle('');
        setShowNewConvModal(false);
      },
    }
  );

  const canSend =
    selectedConversationID != null &&
    selectedConversationID > 0 &&
    !sending &&
    Boolean(displayName);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || !canSend) return;

    setSending(true);
    setSendError('');
    try {
      const result = await postOpenAIChat({
        api,
        payload: {
          message: trimmed,
          systemPrompt,
          modelTier,
          groupID: OPENAI_GROUP_ID,
          conversationID: selectedConversationID,
          username: displayName,
        },
      });

      if (!result?.success) {
        setSendError(result?.message || 'OpenAI request failed');
      } else {
        const d = result.data || {};
        const cost = Number(d.currentRequestCost) || 0;
        const tokens = Number(d.totalTokens) || 0;
        setInfo((prev) => ({
          model: d.model || prev.model,
          currentRequestCost: cost,
          totalSpend: prev.totalSpend + cost,
          totalTokens: prev.totalTokens + tokens,
          inputTokens: Number(d.inputTokens) || 0,
          outputTokens: Number(d.outputTokens) || 0,
        }));
        setMessage('');
        await refetchMessages();
      }
    } catch (err) {
      setSendError(err?.message || 'Request failed');
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      className="d-flex flex-column bg-light"
      style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}
    >
      <header
        className="bg-white border-bottom shadow-sm py-2 flex-shrink-0"
        style={{ position: 'relative', height: 'auto', width: '100%' }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between px-4">
          <div className="d-flex align-items-center gap-4">
            <div className="d-flex align-items-center">
              <span
                className="text-dark fs-5 fw-bold me-0"
                style={{ fontFamily: 'monospace' }}
              >
                {'{'}
              </span>
              <div
                className="d-flex align-items-center justify-content-center rounded-2 mx-1"
                style={{ width: 36, height: 36, backgroundColor: '#1a1a1a' }}
              >
                <span className="text-white fw-bold">B</span>
              </div>
              <span
                className="text-dark fs-5 fw-bold ms-0"
                style={{ fontFamily: 'monospace' }}
              >
                {'}'}
              </span>
            </div>
            <nav className="d-flex gap-3">
              <Link to="/chat" className="text-decoration-none text-dark">
                Chat
              </Link>
              <Link to="/openai" className="text-decoration-none text-dark fw-semibold">
                Open AI
              </Link>
              <Link to="/dashboard" className="text-decoration-none text-dark">
                Dashboard
              </Link>
            </nav>
          </div>
          <div className="d-flex align-items-center gap-3">
            <input
              type="text"
              className="form-control border-0 bg-light rounded-3"
              placeholder="Search..."
              style={{ width: 200 }}
            />
            <div
              className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center"
              style={{ width: 36, height: 36, backgroundColor: '#6c5ce7' }}
            >
              <span className="text-white fw-bold small">U</span>
            </div>
          </div>
        </div>
      </header>

      <div
        className="d-flex flex-grow-1 overflow-hidden align-items-stretch"
        style={{ flex: 1, minHeight: 0, minWidth: 0 }}
      >
        {/* Left sidebar */}
        <div
          className="d-flex flex-column flex-shrink-0 bg-body-secondary border-end h-100 min-h-0"
          style={{ width: 280 }}
        >
          <div className="flex-shrink-0 px-3 pt-3 pb-2">
            <div className="d-flex align-items-center text-body-emphasis">
              <span className="fs-6 fw-semibold">Conversations</span>
            </div>
            <p className="small text-muted mb-2">Group {OPENAI_GROUP_ID}</p>
            <hr className="my-2" />
          </div>

          <div className="flex-grow-1 overflow-auto min-h-0 px-3">
            {convLoading && <p className="small text-muted">Loading…</p>}
            {convError && (
              <p className="small text-danger">
                {convErr?.message || 'Could not load conversations'}
              </p>
            )}
            <ul className="nav nav-pills flex-column gap-1 pb-2">
              {conversationList.map((c) => {
                const active = c.conversationID === selectedConversationID;
                const label =
                  c.conversationTitle || `Thread ${c.conversationID}`;
                return (
                  <li className="nav-item" key={c.conversationID}>
                    <button
                      type="button"
                      className={`nav-link w-100 text-start py-2 ${
                        active ? 'active' : 'link-body-emphasis'
                      }`}
                      onClick={() => handleSelectConversation(c.conversationID)}
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
            {!convLoading && conversationList.length === 0 && !convError && (
              <p className="small text-muted">No conversations yet.</p>
            )}

            {/* Current Info — mid sidebar */}
            <hr className="my-3" />
            <div className="small pb-3">
              <div className="fw-semibold text-uppercase text-muted mb-2">
                Current Info
              </div>
              <div className="mb-2">
                <div className="text-muted">Model</div>
                <div className="fw-semibold">{info.model}</div>
              </div>
              <div className="mb-2">
                <div className="text-muted">Current Request</div>
                <div className="fw-semibold">
                  {formatUsd(info.currentRequestCost, 6)}
                </div>
              </div>
              <div className="mb-2">
                <div className="text-muted">Total Spend</div>
                <div className="fw-semibold">{formatUsd(info.totalSpend, 2)}</div>
              </div>
              <div className="mb-2">
                <div className="text-muted">Total Tokens</div>
                <div className="fw-semibold">
                  {formatTokens(info.totalTokens)}
                </div>
              </div>
              <div className="mb-1 text-muted">Last Request</div>
              <div className="d-flex justify-content-between">
                <span>Input</span>
                <span>{formatTokens(info.inputTokens)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Output</span>
                <span>{formatTokens(info.outputTokens)}</span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 px-3 pb-3 pt-2 border-top">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm w-100"
              onClick={() => {
                setNewTitle('');
                setShowNewConvModal(true);
              }}
            >
              New conversation
            </button>
          </div>
        </div>

        {/* Main chat */}
        <main
          className="d-flex flex-column flex-grow-1 bg-light mx-auto overflow-hidden"
          style={{ maxWidth: 800, flex: 1, minHeight: 0, minWidth: 0 }}
        >
          <div className="px-4 pt-3 pb-0 flex-shrink-0">
            <p className="text-muted small mb-1">
              Group {OPENAI_GROUP_ID}
              {selectedConversationID != null
                ? ` · conversation #${selectedConversationID}`
                : ''}
              {' · '}
              OpenAI lab (no CloudPilot)
            </p>
            <h1 className="h5 mb-0">{conversationTitle}</h1>
            <p className="text-muted small mb-2">
              Signed in as <strong>{displayName || '—'}</strong>
            </p>

            <label className="form-label small mb-1" htmlFor="openai-system-prompt">
              System Prompt
            </label>
            <textarea
              id="openai-system-prompt"
              className="form-control form-control-sm mb-2"
              rows={3}
              placeholder="Leave blank to send no system message"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
            />

            <div className="btn-group btn-group-sm mb-2" role="group" aria-label="Model tier">
              {TIER_OPTIONS.map((opt) => (
                <button
                  key={opt.tier}
                  type="button"
                  className={`btn ${
                    modelTier === opt.tier
                      ? 'btn-primary'
                      : 'btn-outline-primary'
                  }`}
                  onClick={() => selectTier(opt.tier)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
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
                  Could not load messages (
                  {messagesErr?.message || 'error'}). Are you logged in?
                </p>
              )}
              {selectedConversationID != null &&
                !messagesLoading &&
                !messagesError &&
                messages.length === 0 && (
                  <p className="text-muted small">
                    No messages yet. Type a prompt below.
                  </p>
                )}
              {messages.map((m) => {
                const mine =
                  m.messageFrom &&
                  displayName &&
                  m.messageFrom === displayName;
                return (
                  <ChatMessage
                    key={m.messageID}
                    message={m}
                    isMine={Boolean(mine)}
                  />
                );
              })}
              {sending && (
                <p className="text-muted small">Waiting for OpenAI…</p>
              )}
              {sendError && (
                <p className="text-danger small">{sendError}</p>
              )}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="d-flex gap-2 flex-shrink-0"
              style={{ marginBottom: 24 }}
            >
              <input
                type="text"
                className="form-control rounded-3"
                placeholder={
                  canSend
                    ? 'Type a message...'
                    : 'Select a conversation to send'
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!canSend}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!canSend || !message.trim()}
              >
                Submit
              </button>
            </form>
          </div>
        </main>
      </div>

      {showNewConvModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
          onClick={() => !creating && setShowNewConvModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title h5">New conversation</h2>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  disabled={creating}
                  onClick={() => setShowNewConvModal(false)}
                />
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!creating) createConversation(newTitle || 'New conversation');
                }}
              >
                <div className="modal-body">
                  <label htmlFor="openai-new-conv-title" className="form-label">
                    Name
                  </label>
                  <input
                    id="openai-new-conv-title"
                    type="text"
                    className="form-control"
                    placeholder="Conversation name"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    autoFocus
                    disabled={creating}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    disabled={creating}
                    onClick={() => setShowNewConvModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={creating}
                  >
                    {creating ? 'Creating…' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OpenAIPage;
