import React, {
  useState,
  useContext,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
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
import { formatYouSelectedMessage } from '../functions/findings/selectedFinding';
import ChatConversationSidebar from '../components/chat/ChatConversationSidebar';
import ChatCloudPilotSidebar from '../components/chat/ChatCloudPilotSidebar';
import ChatNavigatorPreview from '../components/chat/ChatNavigatorPreview';
import ChatInstructionsPanel from '../components/chat/ChatInstructionsPanel';
import ChatPullRequestPanel from '../components/chat/ChatPullRequestPanel';
import ChatMessage from '../components/chat/ChatMessage';

const api = apiFunctions.getAPI();

const DEMO_GROUP_ID = 70;
const POLL_MS = 4000;

// true = new Bootstrap Cloud Pilot sidebar; false = original ChatConversationSidebar
const USE_CLOUD_PILOT_SIDEBAR = false;

function isInstructionsPayload(atlasResponse) {
  return (
    atlasResponse &&
    atlasResponse.type === 'instructions' &&
    Array.isArray(atlasResponse.steps) &&
    atlasResponse.steps.length > 0
  );
}

function isPullRequestPayload(atlasResponse) {
  return (
    atlasResponse &&
    atlasResponse.type === 'pr' &&
    typeof atlasResponse.pullRequestUrl === 'string' &&
    atlasResponse.pullRequestUrl.length > 0
  );
}

function ChatPage() {
  const { currentUser: contextUser } = useContext(LoginContext);
  const {
    setFindings,
    setNavigatorData,
    setChatContext,
    selectedFinding,
    setSelectedFinding,
    navigatorData,
    findings,
    instructionsData,
    setInstructionsData,
  } = useContext(AtlasFindingsContext) || {};
  const stored = localStorage.getItem('localStorageCurrentUser');
  const currentUser = contextUser ?? (stored ? JSON.parse(stored) : null);

  const [selectedConversationID, setSelectedConversationID] = useState(null);
  const [message, setMessage] = useState('');
  // Local copy so Chat still renders if context setter is missing/stale
  const [localInstructions, setLocalInstructions] = useState(null);
  const [localPullRequest, setLocalPullRequest] = useState(null);
  // Spike: which message should show the navigator preview under it (latest CloudPilot reply after a scan/action)
  const [previewMessageID, setPreviewMessageID] = useState(null);
  const [showPreviewFallback, setShowPreviewFallback] = useState(false);

  const walkthrough = isInstructionsPayload(localInstructions)
    ? localInstructions
    : isInstructionsPayload(instructionsData)
      ? instructionsData
      : null;

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

  const handleMessageResponse = useCallback(
    (data) => {
      const atlasResponse = data?.data?.atlasResponse || null;
      const navigatorDataFromResponse =
        atlasResponse?.navigatorResponse?.data || null;

      if (typeof setNavigatorData === 'function' && navigatorDataFromResponse) {
        setNavigatorData(navigatorDataFromResponse);
      }

      if (
        typeof setFindings === 'function' &&
        atlasResponse &&
        Array.isArray(atlasResponse.findings)
      ) {
        setFindings(atlasResponse.findings);
      }

      const cloudPilotMessage =
        data?.data?.CloudPilotResponseMessage ||
        data?.data?.cloudPilotResponseMessage ||
        null;
      const cloudPilotMessageID =
        cloudPilotMessage?.messageID || cloudPilotMessage?.message_id || null;

      const hasPreview =
        Boolean(navigatorDataFromResponse) ||
        (Array.isArray(atlasResponse?.findings) &&
          atlasResponse.findings.length > 0);

      if (hasPreview && cloudPilotMessageID) {
        setPreviewMessageID(cloudPilotMessageID);
        setShowPreviewFallback(false);
      } else if (hasPreview) {
        setPreviewMessageID(null);
        setShowPreviewFallback(true);
      } else {
        setPreviewMessageID(null);
        setShowPreviewFallback(false);
      }

      if (isInstructionsPayload(atlasResponse)) {
        setLocalInstructions(atlasResponse);
        if (typeof setInstructionsData === 'function') {
          setInstructionsData(atlasResponse);
        }
      } else {
        setLocalInstructions(null);
        if (typeof setInstructionsData === 'function') {
          setInstructionsData(null);
        }
      }

      if (isPullRequestPayload(atlasResponse)) {
        setLocalPullRequest(atlasResponse);
      } else {
        setLocalPullRequest(null);
      }

      // Helpful while wiring Mode 1 — remove once stable
      console.log('[Chat] message response atlasResponse', {
        type: atlasResponse?.type || null,
        stepCount: atlasResponse?.stepCount || 0,
        pullRequestUrl: atlasResponse?.pullRequestUrl || null,
        keys: atlasResponse ? Object.keys(atlasResponse) : [],
      });

      setMessage('');
    },
    [setFindings, setNavigatorData, setInstructionsData]
  );

  const { sendMessage, isLoading } = useSendMessage(api, currentUser, {
    groupID: DEMO_GROUP_ID,
    conversationID: selectedConversationID ?? 0,
    selectedFinding: selectedFinding || null,
    onResponse: handleMessageResponse,
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

  const selectedConversationIDRef = useRef(selectedConversationID);
  selectedConversationIDRef.current = selectedConversationID;

  const handleSelectConversation = useCallback(
    (conversationID) => {
      if (Number(selectedConversationIDRef.current) !== Number(conversationID)) {
        setPreviewMessageID(null);
        setShowPreviewFallback(false);
        setLocalInstructions(null);
        if (typeof setInstructionsData === 'function') {
          setInstructionsData(null);
        }
      }
      setSelectedConversationID(conversationID);
    },
    [setInstructionsData]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || !canSend) return;
    sendMessage(trimmed);
  };

  const displayName =
    currentUser && currentUser !== 'null' ? currentUser : 'anonymous';

  useEffect(() => {
    if (typeof setChatContext !== 'function') {
      return;
    }

    setChatContext({
      conversationID: selectedConversationID,
      groupID: DEMO_GROUP_ID,
      username: displayName,
    });
  }, [selectedConversationID, displayName, setChatContext]);

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
        {USE_CLOUD_PILOT_SIDEBAR ? (
          <ChatCloudPilotSidebar
            groupID={DEMO_GROUP_ID}
            api={api}
            currentUser={currentUser}
            selectedConversationID={selectedConversationID}
            onSelectConversation={handleSelectConversation}
          />
        ) : (
          <ChatConversationSidebar
            groupID={DEMO_GROUP_ID}
            api={api}
            currentUser={currentUser}
            selectedConversationID={selectedConversationID}
            onSelectConversation={handleSelectConversation}
          />
        )}

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
            {selectedFinding && (
              <div
                className="alert alert-info border border-info d-flex align-items-start justify-content-between gap-2 mt-2 mb-0 py-2"
                role="status"
              >
                <div className="small">
                  <div className="fw-semibold">
                    {formatYouSelectedMessage(selectedFinding)}
                  </div>
                  <div className="text-muted">
                    Ask about this finding below (e.g. “why is this bad?”)
                  </div>
                </div>
                {typeof setSelectedFinding === 'function' && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setSelectedFinding(null)}
                  >
                    Clear
                  </button>
                )}
              </div>
            )}
          </div>

          <div
            className="flex-grow-1 d-flex flex-column p-4"
            style={{ flex: 1, minHeight: 0 }}
          >
            <div
              className="bg-white rounded-3 shadow-sm flex-grow-1 overflow-auto p-4 mb-3"
              style={{ minHeight: 0, flex: 1 }}
            >
              <div className="chat-thread">
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
                messages.length === 0 &&
                !selectedFinding &&
                !walkthrough && (
                  <p className="text-muted small">No messages yet. Say hi below.</p>
                )}
              {messages.map((m) => {
                const mine =
                  m.messageFrom &&
                  displayName &&
                  m.messageFrom === displayName;
                const showPreviewUnderThis =
                  !mine &&
                  previewMessageID != null &&
                  Number(m.messageID) === Number(previewMessageID);

                return (
                  <div key={m.messageID}>
                    <ChatMessage
                      message={m}
                      isMine={Boolean(mine)}
                    />
                    {showPreviewUnderThis && (
                      <ChatNavigatorPreview
                        navigatorData={navigatorData}
                        findings={findings}
                      />
                    )}
                  </div>
                );
              })}
              {showPreviewFallback &&
                selectedConversationID != null &&
                (navigatorData || (Array.isArray(findings) && findings.length > 0)) && (
                  <div className="mb-3 text-start">
                    <ChatNavigatorPreview
                      navigatorData={navigatorData}
                      findings={findings}
                    />
                  </div>
                )}
              {selectedConversationID != null && walkthrough && (
                <div className="mb-3 text-start w-100">
                  <ChatInstructionsPanel instructions={walkthrough} />
                </div>
              )}
              {selectedConversationID != null && localPullRequest && (
                <div className="mb-3 text-start w-100">
                  <ChatPullRequestPanel pullRequest={localPullRequest} />
                </div>
              )}
              {selectedFinding && selectedConversationID != null && (
                <div className="mb-3 text-start">
                  <div
                    className="d-inline-block rounded-3 px-3 py-2 text-dark border"
                    style={{ backgroundColor: '#cff4fc', borderColor: '#9eeaf9' }}
                  >
                    <small>{formatYouSelectedMessage(selectedFinding)}</small>
                  </div>
                  <div className="small text-muted mt-1">
                    Dashboard selection · not saved
                  </div>
                </div>
              )}
              </div>
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
