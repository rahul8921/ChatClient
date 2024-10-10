// src/App.js
import React, { useState } from 'react';
import useWebSocket from './hooks/useWebSocket';

const App = () => {
  const [message, setMessage] = useState('');
  const { messages, sendMessage } = useWebSocket('ws://localhost:8080/chat'); // Update with your WebSocket URL

  const handleSendMessage = () => {
    sendMessage('/app/send', { content: message }); // Adjust the destination and message structure as needed
    setMessage('');
  };


  return (
      <div>
        <h1>WebSocket Chat</h1>
        <div>
          <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>

        <div>
          <h2>Messages</h2>
          <ul>
            {messages.map((msg, index) => (
                <li key={index}>{msg.content}</li> // Assuming `msg` contains a `content` field
            ))}
          </ul>
        </div>
      </div>
  );
};

export default App;
