import React, { useState } from 'react';
import Chatbox from './ChatBox';

const ChatApp: React.FC = () => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  return (
    <div>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
        onClick={() => setIsChatboxOpen(!isChatboxOpen)}
      >
        {isChatboxOpen ? 'Close Chat' : 'Open Chat'}
      </button>

      {isChatboxOpen && <Chatbox />}
    </div>
  );
};

export default ChatApp;
