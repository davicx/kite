import React, { useState, useEffect, useContext } from 'react';

import ChatMessages from '../components/chat/ChatMessages';
import ChatInput from '../components/chat/ChatInput';
import { LoginContext } from '../functions/context/LoginContext';
import apiFunctions from '../functions/apiFunctions';
import {
  sendMessageAPI,
  fetchConversationsForGroup,
} from '../functions/api/chatAPI';

const api = apiFunctions.getAPI();

/** Same demo group as kite workshop chat (localhost:3000/chat). */
const DEMO_GROUP_ID = 70;

const startingMessages = [
  {
    id: 'welcome-user',
    role: 'user',
    content: 'Why is encryption being off a problem?',
  },
  {
    id: 'welcome-assistant',
    role: 'assistant',
    content:
      "Without default encryption, new objects can be stored without server-side encryption. For this bucket, I'd enable S3-managed encryption so new files are encrypted automatically.\n\nI can walk you through the change first, or prepare the fix and show you exactly what would change before anything runs.",
  },
];

function createMessageId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `message-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function ChatPage() {
  const { currentUser } = useContext(LoginContext);
  const [messages, setMessages] = useState(startingMessages);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [conversationID, setConversationID] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadConversation() {
      try {
        const result = await fetchConversationsForGroup({
          api,
          groupID: DEMO_GROUP_ID,
        });
        const list = Array.isArray(result?.data) ? result.data : [];
        const first = list[0];
        const id = first?.conversationID ?? first?.conversation_id ?? null;

        if (!cancelled) {
          if (id != null && Number(id) > 0) {
            setConversationID(Number(id));
          } else {
            setError(
              'No conversation found for the demo group. Open kite chat once to create one, then try again.'
            );
          }
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError.message ||
              'Could not load a CloudPilot conversation for this session.'
          );
        }
      }
    }

    loadConversation();

    return () => {
      cancelled = true;
    };
  }, []);

  async function sendMessage(messageText) {
    const cleanedMessage = messageText.trim();

    if (!cleanedMessage || isSending) {
      return;
    }

    if (conversationID == null || conversationID <= 0) {
      setError('CloudPilot needs an active conversation before you can send.');
      return;
    }

    const userMessage = {
      id: createMessageId(),
      role: 'user',
      content: cleanedMessage,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setIsSending(true);
    setError('');

    try {
      const resolvedUsername =
        currentUser && currentUser !== 'null' ? currentUser : 'anonymous';

      const response = await sendMessageAPI({
        api,
        payload: {
          username: resolvedUsername,
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

      const cloudPilotRow =
        response?.data?.CloudPilotResponseMessage ||
        response?.data?.cloudPilotResponseMessage ||
        null;

      const assistantText =
        (cloudPilotRow && cloudPilotRow.messageCaption) ||
        response?.data?.atlasResponse?.message ||
        '';

      if (!String(assistantText).trim()) {
        throw new Error('CloudPilot returned an empty response.');
      }

      const cloudPilotMessage = {
        id:
          cloudPilotRow?.messageID != null
            ? String(cloudPilotRow.messageID)
            : createMessageId(),
        role: 'assistant',
        content: String(assistantText),
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        cloudPilotMessage,
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

        <ChatMessages messages={messages} isSending={isSending} />
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
