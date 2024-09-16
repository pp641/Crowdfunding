import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './Context/userContext'; 
import axios from 'axios';

interface Project {
  _id: string;
  title: string;
}

interface UserProfile {
  _id: string;
  name?: string;
  email: string;
  createdProjects: Project[];
  projectsCreatedCount: number;
}

const ProfilePage: React.FC = () => {
  const { token } = useUser(); 
  const id = localStorage.getItem('userId'); 
  const [userData, setUserData] = useState<UserProfile | null>(null); 
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false); 
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/profile/${id}`);
        setUserData(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchUserData(); 
    }
  }, []);

  const toggleSettingsPane = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

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
                <h2 className="text-2xl font-semibold">
                  {userData?.name || 'Anonymous User'}
                </h2>
                <p className="text-gray-700">{userData?.email}</p>
              </div>
            </div>

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-4">My Projects</h3>
              <ul>
                {userData?.createdProjects.map((project) => (
                  <li key={project._id}>
                    <Link
                      to={`/project/${project._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {project.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4">Projects Created</h3>
              <p>{userData?.projectsCreatedCount || 0} Projects Created</p>
            </section>
          </div>
        </div>
      </div>

      {isSettingsOpen && (
        <aside className="w-64 bg-gray-100 p-6 shadow-md fixed top-0 right-0 h-full">
          <h2 className="text-2xl font-semibold mb-4">Settings</h2>
          <ul>
            <li className="mb-4">
              <Link to="/profile/edit" className="text-blue-500 hover:underline">
                Edit Profile
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/profile/change-password"
                className="text-blue-500 hover:underline"
              >
                Change Password
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/profile/notifications"
                className="text-blue-500 hover:underline"
              >
                Notification Preferences
              </Link>
            </li>
            <li>
              <Link to="/profile/deactivate" className="text-blue-500 hover:underline">
                Deactivate Account
              </Link>
            </li>
          </ul>
        </aside>
      )}
    </div>
  );
};

export default ProfilePage;
