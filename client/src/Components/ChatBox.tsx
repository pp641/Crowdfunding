import React, { useState } from 'react';
import UserList from './UserList';
import ChatWindow from './ChatWindow';

const Chatbox: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <div className=" w-96 h-96 bg-white shadow-lg border border-gray-200 flex flex-col">
      <div className="flex h-full">
        {/* User List */}
        <div className="w-1/3 border-r border-gray-300">
          <UserList setSelectedUser={setSelectedUser} />
        </div>

        {/* Chat Window */}
        <div className="w-2/3">
          {selectedUser ? (
            <ChatWindow selectedUser={selectedUser} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a user to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
