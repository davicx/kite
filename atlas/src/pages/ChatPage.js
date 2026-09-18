import React from 'react';
import Hello from '../components/chat/Hello';
import LogoutUser from '../components/login/LogoutUser';

function ChatPage() {
  return (
    <div className="chat-page">
      <Hello />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <LogoutUser />
      </div>
    </div>
  );
}

export default ChatPage;
