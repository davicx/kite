import React, { useEffect, useRef } from 'react';
import UserMessage from './UserMessage';
import CloudPilotMessage from './CloudPilotMessage';
import { splitFixOptionsMessage } from './FixOptionsCard';

function ChatMessages({
  messages,
  isSending,
  scanCard = null,
  onShowAll,
  onSelectFixOption,
}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const end = messagesEndRef.current;
    if (!end || end.closest('.chat-closed')) {
      return;
    }

    const panel = end.closest('.dcp-chat-messages');
    if (panel) {
      panel.scrollTop = panel.scrollHeight;
      return;
    }

    end.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
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

        const fixOptions = splitFixOptionsMessage(message.content);
        const showFixOptions =
          fixOptions.showFixOptions && index === messages.length - 1;

        return (
          <CloudPilotMessage
            key={message.id}
            message={message}
            scanResult={scanResult}
            onShowAll={onShowAll}
            showFixOptions={showFixOptions}
            fixOptionsDisabled={isSending}
            onSelectFixOption={onSelectFixOption}
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
