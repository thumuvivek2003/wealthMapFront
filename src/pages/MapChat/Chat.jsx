import React, { useState } from 'react';

const Chat = ({ generateLocations }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('Give me houses locations within $400');

  const generateResponse = (userMessage) => {
    return `Showing results for : "${userMessage}"`;
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    const botMessage = { sender: 'bot', text: generateResponse(input) };

    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
      generateLocations();
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-green-100 text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex border-t p-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </>
  );
};

export default Chat;
