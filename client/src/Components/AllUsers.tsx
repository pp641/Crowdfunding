import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

interface User {
  _id: string;
  firstName: string;
  email: string;
  projectsCreatedCount: number;
  investmentsCount: number;
}


interface Message {
    sender : string | undefined;
    messageText : string;
    receiver: string
}

const socket = io('http://localhost:5001',{
    transports : ['websockets' , 'polling']
}); 

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    axios
      .get('http://localhost:5001/users') 
      .then((response) => {
        setUsers(response.data.users);
            console.log("API response", response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching users');
        setLoading(false);
        console.error(error);
      });
  }, []);

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const openChat = (user: User) => {
    setSelectedUser(user);
    setIsChatOpen(true);
    const sender = localStorage.getItem('userId');
    const receiver = user._id
    socket.emit('join', { userId: user._id });
    axios.get(`http://localhost:5001/messages/${sender}/${receiver}`)
    .then((response) => {
        console.log("okgot", response.data.message);
        setMessages(response.data.data);
    }).catch((error)=>{
        console.log("Error Catched", error);
    })
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setSelectedUser(null);
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedUser) {
    const senderId = localStorage.getItem('userId') || undefined;
      const messageData = {
        sender: senderId, 
        receiver: selectedUser._id,
        messageText: newMessage,
      };
      socket.emit('sendMessage', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage(''); 
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Users List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-gray-700">Name</th>
              <th className="py-2 px-4 border-b text-left text-gray-700">Email</th>
              <th className="py-2 px-4 border-b text-left text-gray-700">Projects Created</th>
              <th className="py-2 px-4 border-b text-left text-gray-700">Investments</th>
              <th className="py-2 px-4 border-b text-left text-gray-700">Chat</th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="py-2 px-4 border-b text-gray-800">{user.firstName}</td>
                  <td className="py-2 px-4 border-b text-gray-800">{user.email}</td>
                  <td className="py-2 px-4 border-b text-gray-800">{user.projectsCreatedCount}</td>
                  <td className="py-2 px-4 border-b text-gray-800">{user.investmentsCount}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => openChat(user)}
                    >
                      Chat
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-600">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isChatOpen && selectedUser && (
        <div className="fixed bottom-0 right-0 w-80 h-80 bg-white shadow-lg rounded-t-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Chat with {selectedUser.firstName}</h3>
            <button onClick={closeChat} className="text-red-500 hover:text-red-700">
              Close
            </button>
          </div>
          <div className="flex-grow p-2 overflow-y-auto border border-gray-300 rounded">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <strong>{msg.sender === 'yourSenderId' ? 'You' : selectedUser.firstName}:</strong> {msg.messageText}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full border border-gray-300 rounded p-2"
            />
            <button
              className="w-full bg-blue-500 text-white mt-2 p-2 rounded"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
