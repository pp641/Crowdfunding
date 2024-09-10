import React, { useState } from 'react';

interface ChatWindowProps {
  selectedUser: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedUser }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
        Chatting with {selectedUser}
      </div>
      <div className="flex-grow p-4 overflow-auto space-y-2 bg-white">
        {messages.length ? (
          messages.map((msg, idx) => (
            <div key={idx} className="bg-gray-200 p-2 rounded-lg">
              {msg}
            </div>
          ))
        ) : (
          <div className="text-gray-500">No messages yet</div>
        )}
      </div>
      <div className="p-2 border-t border-gray-300 flex">
        <input
          type="text"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
