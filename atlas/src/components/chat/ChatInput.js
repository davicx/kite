import React, { useState } from 'react';

function ChatInput({ onSendMessage, isSending }) {
  const [inputValue, setInputValue] = useState('');

  function submitMessage(event) {
    event.preventDefault();

    const cleanedMessage = inputValue.trim();

    if (!cleanedMessage || isSending) {
      return;
    }

    onSendMessage(cleanedMessage);
    setInputValue('');
  }

  return (
    <div className="compose-wrap">
      <form className="compose" onSubmit={submitMessage}>
        <label className="visually-hidden" htmlFor="chat-input">
          Ask CloudPilot
        </label>

        <input
          className="compose-input"
          id="chat-input"
          type="text"
          placeholder="Ask CloudPilot..."
          autoComplete="off"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          disabled={isSending}
        />

        <div className="compose-tools">
          <button
            className="compose-plus"
            type="button"
            aria-label="Add attachment"
          >
            +
          </button>

          <button className="compose-mode" type="button">
            CloudPilot ▾
          </button>

          <button
            className="compose-send"
            type="submit"
            aria-label="Send message"
            disabled={!inputValue.trim() || isSending}
          >
            ↑
          </button>
        </div>
      </form>

      <div className="compose-note">
        CloudPilot can make mistakes. Review changes before applying them.
      </div>
    </div>
  );
}

export default ChatInput;
