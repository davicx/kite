import React, { useEffect, useRef } from 'react';
import UserMessage from './UserMessage';
import CloudPilotMessage from './CloudPilotMessage';

function ChatMessages({ messages, isSending }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, isSending]);

  return (
    <section
      className="messages"
      aria-live="polite"
      aria-label="CloudPilot conversation"
    >
      {messages.map((message) => {
        if (message.role === 'user') {
          return <UserMessage key={message.id} message={message} />;
        }

        return <CloudPilotMessage key={message.id} message={message} />;
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
