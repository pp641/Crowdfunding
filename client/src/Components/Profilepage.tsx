import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const toggleSettingsPane = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className="flex">
      <div className={`flex-1 p-6 ${isSettingsOpen ? 'mr-64' : ''}`}>
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">User Profile</h1>
          <button
            onClick={toggleSettingsPane}
            className="text-blue-500 hover:underline"
          >
            {isSettingsOpen ? 'Close Settings' : 'Open Settings'}
          </button>
        </header>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-6">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="w-24 h-24 rounded-full mr-6"
              />
              <div>
                <h2 className="text-2xl font-semibold">John Doe</h2>
                <p className="text-gray-700">john.doe@example.com</p>
              </div>
            </div>
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-4">My Projects</h3>
              <ul>
                <li><Link to="/project/1" className="text-blue-500 hover:underline">Tech Innovation</Link></li>
                <li><Link to="/project/2" className="text-blue-500 hover:underline">Art for All</Link></li>
              </ul>
            </section>
            <section>
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <ul>
                <li>Supported "Tech Innovation" project.</li>
                <li>Created a new project "Art for All".</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      {isSettingsOpen && (
        <aside className="w-64 bg-gray-100 p-6 shadow-md fixed top-0 right-0 h-full">
          <h2 className="text-2xl font-semibold mb-4">Settings</h2>
          <ul>
            <li className="mb-4"><Link to="/profile/edit" className="text-blue-500 hover:underline">Edit Profile</Link></li>
            <li className="mb-4"><Link to="/profile/change-password" className="text-blue-500 hover:underline">Change Password</Link></li>
            <li className="mb-4"><Link to="/profile/notifications" className="text-blue-500 hover:underline">Notification Preferences</Link></li>
            <li><Link to="/profile/deactivate" className="text-blue-500 hover:underline">Deactivate Account</Link></li>
          </ul>
        </aside>
      )}
    </div>
  );
};

export default ProfilePage;
