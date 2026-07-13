import React from 'react';
import './style.css';

function ChatPageTwo() {
  return (
    <div className="chat-two">
      {/* HEADER: 68 tall, full width */}
      <div className="chat-two-header" />

      {/* BODY: left menu + right fill */}
      <div className="chat-two-body">
        {/* LEFT MENU: 180 wide */}
        <div className="chat-two-menu" />

        {/* RIGHT AREA: fill remaining */}
        <div className="chat-two-right" />
      </div>
    </div>
  );
}

export default ChatPageTwo;
