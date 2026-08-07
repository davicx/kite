import React from 'react';
import ReactMarkdown from 'react-markdown';
import './ChatMessage.css';

/*
CloudPilot chat bubble — UI only.
User: compact blue bubble (plain text).
CloudPilot: page content + Markdown (no gray card).
*/

function ChatMessage({ message, isMine }) {
  const caption = message && message.messageCaption != null
    ? String(message.messageCaption)
    : '';
  const timeLabel = message && message.messageTime
    ? String(message.messageTime)
    : '';
  const who = isMine
    ? 'You'
    : (message && message.messageFrom
      ? String(message.messageFrom)
      : 'CloudPilot');

  return (
    <div className={`chat-message mb-4 ${isMine ? 'chat-message--user' : 'chat-message--assistant'}`}>
      {isMine ? (
        <div className="chat-message__user-bubble">
          {caption}
        </div>
      ) : (
        <div className="chat-message__assistant">
          <div className="chat-message__assistant-label">CloudPilot</div>
          <div className="chat-message__markdown">
            <ReactMarkdown>{caption}</ReactMarkdown>
          </div>
        </div>
      )}
      <div className="chat-message__meta">
        {who}
        {timeLabel ? ` · ${timeLabel}` : ''}
      </div>
    </div>
  );
}

export default ChatMessage;
