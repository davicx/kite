import React from 'react';

function CloudPilotMessage({ message, isLoading = false }) {
  return (
    <div className={`msg ai${isLoading ? ' loading' : ''}`}>
      <div className="bot-avatar" aria-hidden="true">
        C
      </div>
      <div className="answer">{message.content}</div>
    </div>
  );
}

export default CloudPilotMessage;
