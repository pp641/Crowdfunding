import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Ensure the correct path to AuthContext

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="text-xl font-bold text-blue-600">CrowdFundr</Link>
      </div>
    {isAuthenticated ?
    
    <div className="hidden md:flex space-x-4 items-center">
      <Link to="/" className="text-white hover:text-blue-600">Home</Link>
      <Link to="/projects" className="text-white hover:text-blue-600">Projects</Link>
      <Link to="/project-creation" className="text-white hover:text-blue-600">Create Project</Link>
      <Link to="/help" className="text-white hover:text-blue-600">Help</Link>
  </div>
    :
    <div className="flex items-center space-x-4">
    <Link to="/login" className="text-white hover:text-blue-600">Login</Link>
    <Link to="/register" className="text-white hover:text-blue-600">Register</Link>
  </div>
    
    }  


      <div className="flex items-center space-x-6">
        <div className="relative">
          <button className="text-gray-600 hover:text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.293.293a1 1 0 001.414 1.414l1-1A1 1 0 006 12V8a4 4 0 118 0v4a1 1 0 00.293.707l1 1a1 1 0 001.414-1.414L16 11.586V8a6 6 0 00-6-6z" />
              <path d="M10 18a2 2 0 002-2H8a2 2 0 002 2z" />
            </svg>
          </button>
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">3</span>
        </div>

        <div className="relative">
          <button className="flex items-center text-gray-600 hover:text-blue-600">
            <img
              src="https://via.placeholder.com/32"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </button>
          <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10 ${isAuthenticated ? 'block' : 'hidden'}`}>
            <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
            <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
            <button onClick={logout} className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
