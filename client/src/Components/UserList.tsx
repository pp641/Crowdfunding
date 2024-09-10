import React from 'react';

interface UserListProps {
  setSelectedUser: (user: string) => void;
}

const users = ['John Doe', 'Jane Smith', 'Michael Brown', 'Emily Davis'];

const UserList: React.FC<UserListProps> = ({ setSelectedUser }) => {
  return (
    <div className="h-full overflow-auto">
      <ul className="p-2 space-y-2">
        {users.map((user) => (
          <li
            key={user}
            className="p-2 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
            onClick={() => setSelectedUser(user)}
          >
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
