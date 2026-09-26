import React, { useState, useContext, useMemo, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import ChatMessages from '../components/chat/ChatMessages';
import ChatInput from '../components/chat/ChatInput';
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

const api = apiFunctions.getAPI();

/** Same demo group as kite workshop chat (localhost:3000/chat). */
const DEMO_GROUP_ID = 70;
const POLL_MS = 4000;

function ChatPage() {
  const { currentUser } = useContext(LoginContext);
  const { conversationID } = useContext(ChatConversationContext);
  const { scan, setScan } = useContext(AtlasFindingsContext) || {};
  const queryClient = useQueryClient();
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [scanCard, setScanCard] = useState(null);

  const displayName =
    currentUser && currentUser !== 'null' ? currentUser : 'anonymous';

  useEffect(() => {
    setScanCard(null);
  }, [conversationID]);

  useEffect(() => {
    if (
      scan?.scanResult &&
      Number(scan.conversationID) === Number(conversationID)
    ) {
      setScanCard({
        messageId: scan.cloudPilotMessageID || null,
        scanResult: scan.scanResult,
      });
    }
  }, [scan, conversationID]);

  const {
    data: messagesRes,
    isLoading: messagesLoading,
    isError: messagesError,
    error: messagesErr,
  } = useQuery(
    ['chat-messages', DEMO_GROUP_ID, conversationID],
    () =>
      fetchConversationMessages({
        api,
        conversationID,
      }),
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

  async function sendMessage(messageText) {
    const cleanedMessage = messageText.trim();

    if (!cleanedMessage || isSending) {
      return;
    }

    if (conversationID == null || conversationID <= 0) {
      setError('CloudPilot needs an active conversation before you can send.');
      return;
    }

    setIsSending(true);
    setError('');

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

      if (storedScan && response?.data?.snapshotSaved === false) {
        setError(
          'Scan completed, but this result could not be saved. It will not survive a refresh.'
        );
      }

      if (storedScan && response?.data?.snapshotSaved === true) {
        await Promise.all([
          queryClient.invalidateQueries(['scan-latest', conversationID]),
          queryClient.invalidateQueries(['scan-recents', conversationID]),
        ]);
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

  return (
    <main className="cloudpilot-chat">
      <div className="chat">
        <div className="chat-header">
          <div>
            <strong>CloudPilot</strong>
            <small>Your engineering workspace</small>
          </div>
        </div>

        {conversationID == null ? (
          <p className="chat-status">Select a project to open a conversation.</p>
        ) : null}
        {conversationID != null && messagesLoading ? (
          <p className="chat-status">Loading messages…</p>
        ) : null}
        {conversationID != null && messagesError ? (
          <p className="chat-error" role="alert">
            Could not load messages (
            {messagesErr?.message || 'error'}
            ). Are you logged in?
          </p>
        ) : null}

        <ChatMessages
          messages={messages}
          isSending={isSending}
          scanCard={scanCard}
          onSelectFixOption={sendMessage}
        />
      </div>

      <ChatInput onSendMessage={sendMessage} isSending={isSending} />

      {error ? (
        <div className="chat-error" role="alert">
          {error}
        </div>
      ) : null}
    </main>
  );
}

export default ChatPage;
