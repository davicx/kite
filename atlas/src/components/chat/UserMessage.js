import React from 'react';

function UserMessage({ message }) {
  return (
    <div className="msg user">
      <div className="bubble">{message.content}</div>
    </div>
  );
}

export default UserMessage;
