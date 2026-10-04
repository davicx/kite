import React, { useContext, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';

import ChatMessages from '../components/chat/ChatMessages';
import { LoginContext } from '../functions/context/LoginContext';
import { ChatConversationContext } from '../functions/context/ChatConversationContext';
import { AtlasFindingsContext } from '../functions/context/AtlasFindingsContext';
import apiFunctions from '../functions/apiFunctions';
import {
  sendMessageAPI,
  fetchConversationMessages,
} from '../functions/api/chatAPI';
import { normalizeScanResult } from '../functions/scan/normalizeScanResult';
import { readAtlasScan } from '../functions/scan/readAtlasScan';
import AboutContent from './design/AboutPage';

const api = apiFunctions.getAPI();
const DEMO_GROUP_ID = 70;
const POLL_MS = 4000;

function AboutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const resource = location.state || null;
  const { currentUser } = useContext(LoginContext);
  const { conversationID } = useContext(ChatConversationContext);
  const { setScan } = useContext(AtlasFindingsContext) || {};
  const queryClient = useQueryClient();
  const [chatClosed, setChatClosed] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [scanCard, setScanCard] = useState(null);

  const displayName =
    currentUser && currentUser !== 'null' ? currentUser : 'anonymous';

  const { data: messagesRes, isLoading, isError, error: messagesErr } = useQuery(
    ['chat-messages', DEMO_GROUP_ID, conversationID],
    () => fetchConversationMessages({ api, conversationID }),
    {
      enabled: conversationID != null && conversationID > 0,
      refetchInterval: POLL_MS,
      refetchOnWindowFocus: true,
    }
  );

  const messages = useMemo(() => {
    const rows = Array.isArray(messagesRes?.data) ? messagesRes.data : [];
    return rows.map((row) => {
      const from = row?.messageFrom != null ? String(row.messageFrom) : '';
      const isUser = Boolean(from) && from === displayName;
      return {
        id:
          row?.messageID != null
            ? String(row.messageID)
            : `row-${from}-${row?.messageCaption ?? ''}`,
        role: isUser ? 'user' : 'assistant',
        content: String(row?.messageCaption ?? ''),
      };
    });
  }, [messagesRes, displayName]);

  async function sendMessage(event, override) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const overrideMessage = override && override.message ? override.message : '';
    const cleanedMessage = String(overrideMessage || inputValue).trim();
    if (!cleanedMessage || isSending) {
      return;
    }
    if (conversationID == null || conversationID <= 0) {
      setError('CloudPilot needs an active conversation before you can send.');
      return;
    }
    setIsSending(true);
    setError('');
    if (!overrideMessage) {
      setInputValue('');
    }
    try {
      const response = await sendMessageAPI({
        api,
        payload: {
          username: displayName,
          message: cleanedMessage,
          groupID: DEMO_GROUP_ID,
          conversationID,
        },
      });
      if (response?.success === false) {
        throw new Error(
          response?.message || 'CloudPilot could not process the message.'
        );
      }
      const atlasResponse =
        response?.data?.atlasResponse || response?.atlasResponse || null;
      const cloudPilotRow =
        response?.data?.CloudPilotResponseMessage ||
        response?.data?.cloudPilotResponseMessage ||
        null;
      const normalized = normalizeScanResult(atlasResponse);
      const storedScan = readAtlasScan(atlasResponse);
      if (storedScan && typeof setScan === 'function') {
        setScan({
          ...storedScan,
          conversationID,
          scanResult: normalized,
          snapshotID: response?.data?.scanSnapshotID || null,
          snapshotSaved: response?.data?.snapshotSaved,
          cloudPilotMessageID:
            cloudPilotRow?.messageID || cloudPilotRow?.message_id || null,
        });
      }
      if (normalized) {
        setScanCard({
          messageId:
            cloudPilotRow?.messageID != null
              ? String(cloudPilotRow.messageID)
              : null,
          scanResult: normalized,
        });
      }
      await queryClient.invalidateQueries([
        'chat-messages',
        DEMO_GROUP_ID,
        conversationID,
      ]);
    } catch (requestError) {
      setError(
        requestError.message ||
          'Something went wrong while contacting CloudPilot.'
      );
    } finally {
      setIsSending(false);
    }
  }

  const contextName = resource && resource.name ? resource.name : 'About';
  const contextMeta =
    resource && resource.contextMeta
      ? resource.contextMeta
      : 'Information CloudPilot can hold for a company';

  return (
    <div className={chatClosed ? 'about-page chat-closed' : 'about-page'}>
      <style>{`
        .about-page {
          --dcp-green: #2f9874;
          --dcp-green-dark: #23775b;
          --dcp-text: #17201d;
          --dcp-text-secondary: #5f6b67;
          --dcp-text-muted: #8a9691;
          --dcp-border: #e4e9e6;
          --dcp-border-dark: #d8dfdb;
          --dcp-danger: #d92d3a;
          --dcp-chat-width: 390px;
          box-sizing: border-box;
          min-height: calc(100vh - 72px);
          background: #f8faf9;
          color: var(--dcp-text);
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          position: relative;
        }
        .about-page *,
        .about-page *::before,
        .about-page *::after { box-sizing: border-box; }
        .about-page button,
        .about-page input { font: inherit; }
        .about-page .dcp-main {
          width: calc(100% - var(--dcp-chat-width));
          padding: 48px 38px 80px;
        }
        .about-page.chat-closed .dcp-main { width: 100%; }
        .about-page .dcp-content { max-width: 1080px; margin: 0 auto; }
        .about-page .dcp-breadcrumb {
          display: flex;
          gap: 8px;
          margin-bottom: 28px;
          color: #8a9691;
          font-size: 13px;
          align-items: center;
        }
        .about-page .dcp-breadcrumb a {
          color: #23775b;
          font-weight: 600;
          text-decoration: none;
        }
        .about-page .dcp-chat-panel {
          width: var(--dcp-chat-width);
          position: fixed;
          top: 72px;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          background: white;
          border-left: 1px solid var(--dcp-border);
          z-index: 80;
          overflow: hidden;
        }
        .about-page.chat-closed .dcp-chat-panel {
          transform: translateX(100%);
          pointer-events: none;
        }
        .about-page .dcp-chat-header {
          min-height: 74px;
          display: flex;
          align-items: center;
          padding: 0 20px;
          border-bottom: 1px solid var(--dcp-border);
        }
        .about-page .dcp-chat-brand { display: flex; align-items: center; gap: 11px; }
        .about-page .dcp-chat-logo {
          width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
          border-radius: 9px; background: var(--dcp-green); color: white; font-size: 13px; font-weight: 700;
        }
        .about-page .dcp-chat-title { font-size: 15px; font-weight: 700; }
        .about-page .dcp-chat-subtitle { color: var(--dcp-text-muted); font-size: 11px; margin-top: 2px; }
        .about-page .dcp-chat-close {
          margin-left: auto; width: 32px; height: 32px; border: 0; border-radius: 8px;
          background: transparent; color: var(--dcp-text-secondary); font-size: 20px; cursor: pointer;
        }
        .about-page .dcp-chat-context {
          padding: 16px 20px; background: #fbfcfb; border-bottom: 1px solid var(--dcp-border);
        }
        .about-page .dcp-context-label {
          color: var(--dcp-text-muted); font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 7px;
        }
        .about-page .dcp-context-name { font-size: 12px; font-weight: 650; }
        .about-page .dcp-context-meta { color: var(--dcp-text-muted); font-size: 11px; margin-top: 3px; }
        .about-page .dcp-chat-messages { flex: 1; padding: 8px 10px 4px; overflow-y: auto; min-height: 0; }
        .about-page .cloudpilot-chat .messages { padding: 10px 6px 18px; }
        .about-page .cloudpilot-chat .msg { margin-bottom: 18px; }
        .about-page .cloudpilot-chat .msg.ai { display: grid; grid-template-columns: 28px 1fr; gap: 10px; }
        .about-page .cloudpilot-chat .bot-avatar {
          width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center;
          justify-content: center; background: var(--dcp-green); color: white; font-size: 11px; font-weight: 700;
        }
        .about-page .cloudpilot-chat .answer {
          font-size: 13px; line-height: 1.55; color: #26312d; white-space: pre-wrap;
        }
        .about-page .cloudpilot-chat .msg.user { display: flex; justify-content: flex-end; }
        .about-page .cloudpilot-chat .bubble {
          background: #f1f3f1; padding: 10px 13px; border-radius: 12px; font-size: 13px; white-space: pre-wrap;
        }
        .about-page .dcp-chat-status, .about-page .dcp-chat-error {
          margin: 8px 12px; font-size: 13px; color: var(--dcp-text-secondary);
        }
        .about-page .dcp-chat-error { color: var(--dcp-danger); }
        .about-page .dcp-chat-composer {
          padding: 14px 16px 18px; border-top: 1px solid var(--dcp-border); background: white;
        }
        .about-page .dcp-composer-box {
          display: flex; align-items: flex-end; gap: 8px; padding: 8px;
          border: 1px solid var(--dcp-border-dark); border-radius: 12px; background: white;
        }
        .about-page .dcp-chat-input {
          flex: 1; min-width: 0; height: 36px; padding: 0 7px; border: 0; outline: 0;
          background: transparent; font-size: 13px;
        }
        .about-page .dcp-chat-send {
          width: 36px; height: 36px; border: 0; border-radius: 9px;
          background: var(--dcp-green); color: white; cursor: pointer; font-size: 17px;
        }
        .about-page .dcp-chat-send:disabled { opacity: 0.5; cursor: default; }
        .about-page .dcp-chat-note {
          margin-top: 8px; color: var(--dcp-text-muted); font-size: 10px; text-align: center;
        }
      `}</style>

      <main className="dcp-main">
        <div className="dcp-content">
          <div className="dcp-breadcrumb">
            <Link to="/dashboard">Dashboard</Link>
            {resource && resource.name ? (
              <>
                <span>/</span>
                <span>{resource.name}</span>
                <span>/</span>
              </>
            ) : (
              <span>/</span>
            )}
            <span>About</span>
          </div>
          <AboutContent
            eyebrow={resource && resource.eyebrow ? resource.eyebrow : 'About'}
            name={
              resource && resource.name
                ? resource.name
                : 'Organizational knowledge'
            }
            meta={
              resource && resource.meta
                ? resource.meta
                : 'Information CloudPilot can hold for a company'
            }
            backLabel={resource && resource.backLabel ? resource.backLabel : ''}
            onBack={() => navigate(-1)}
            onAsk={() => setChatClosed(false)}
          />
        </div>
      </main>

      <aside className="dcp-chat-panel" aria-label="CloudPilot chat">
        <div className="dcp-chat-header">
          <div className="dcp-chat-brand">
            <div className="dcp-chat-logo">C</div>
            <div>
              <div className="dcp-chat-title">CloudPilot</div>
              <div className="dcp-chat-subtitle">Ask about this page</div>
            </div>
          </div>
          <button
            type="button"
            className="dcp-chat-close"
            onClick={() => setChatClosed(true)}
            aria-label="Close chat"
          >
            ×
          </button>
        </div>
        <div className="dcp-chat-context">
          <div className="dcp-context-label">Current context</div>
          <div className="dcp-context-name">{contextName}</div>
          <div className="dcp-context-meta">{contextMeta}</div>
        </div>
        <div className="dcp-chat-messages cloudpilot-chat">
          {conversationID == null ? (
            <p className="dcp-chat-status">
              Select a project to open a conversation.
            </p>
          ) : null}
          {conversationID != null && isLoading ? (
            <p className="dcp-chat-status">Loading messages…</p>
          ) : null}
          {conversationID != null && isError ? (
            <p className="dcp-chat-error" role="alert">
              Could not load messages ({messagesErr?.message || 'error'}).
            </p>
          ) : null}
          <ChatMessages
            messages={messages}
            isSending={isSending}
            scanCard={scanCard}
            onSelectFixOption={(choice) =>
              sendMessage(null, { message: choice })
            }
            awaitingConfirmation={
              messagesRes?.openRequestStatus === 'waiting_on_confirmation'
            }
            onConfirmRequest={(text) => sendMessage(null, { message: text })}
          />
        </div>
        <div className="dcp-chat-composer">
          <form className="dcp-composer-box" onSubmit={sendMessage}>
            <input
              className="dcp-chat-input"
              type="text"
              placeholder="Ask CloudPilot..."
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              disabled={isSending}
              aria-label="Ask CloudPilot"
            />
            <button
              className="dcp-chat-send"
              type="submit"
              aria-label="Send"
              disabled={isSending || !inputValue.trim()}
            >
              ↑
            </button>
          </form>
          {error ? (
            <div className="dcp-chat-error" role="alert">
              {error}
            </div>
          ) : (
            <div className="dcp-chat-note">
              Same conversation as the selected project.
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export default AboutPage;
