import React, { useEffect, useRef } from 'react';
import UserMessage from './UserMessage';
import CloudPilotMessage from './CloudPilotMessage';

function ChatMessages({ messages, isSending, scanCard = null }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, isSending, scanCard]);

  const lastAssistantIndex = (() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      if (messages[i].role !== 'user') {
        return i;
      }
    }
    return -1;
  })();

  return (
    <section
      className="messages"
      aria-live="polite"
      aria-label="CloudPilot conversation"
    >
      {messages.map((message, index) => {
        if (message.role === 'user') {
          return <UserMessage key={message.id} message={message} />;
        }

        let scanResult = null;
        if (scanCard && scanCard.scanResult) {
          const matchById =
            scanCard.messageId != null &&
            String(message.id) === String(scanCard.messageId);
          const idMissingFromThread =
            scanCard.messageId != null &&
            !messages.some((m) => String(m.id) === String(scanCard.messageId));
          const matchLatestFallback =
            index === lastAssistantIndex &&
            (scanCard.messageId == null || idMissingFromThread);
          if (matchById || matchLatestFallback) {
            scanResult = scanCard.scanResult;
          }
        }

        return (
          <CloudPilotMessage
            key={message.id}
            message={message}
            scanResult={scanResult}
          />
        );
      })}

      {isSending ? (
        <CloudPilotMessage
          message={{
            id: 'cloudpilot-loading',
            role: 'assistant',
            content: 'CloudPilot is thinking…',
          }}
          isLoading
        />
      ) : null}

      <div ref={messagesEndRef} />
    </section>
  );
}

export default ChatMessages;
