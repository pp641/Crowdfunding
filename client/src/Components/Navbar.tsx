import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './Context/userContext';

const Navbar: React.FC = () => {
  const { token } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }


  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const logout = () =>{ 
    localStorage.removeItem('token');
    window.location.href = "/login"
  }

  document.addEventListener('click', (e : MouseEvent)  => {
    const target  = e.target as HTMLElement;
    if ( target && !target.closest('.dropdown-button') && !target.closest('.dropdown-menu')) {
      closeDropdown();
    }
  });

  return (
    <nav className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="text-xl font-bold text-blue-600">CrowdFundr</Link>
      </div>
    {token !== null ?
    
    <div className="hidden md:flex space-x-4 items-center">
      <Link to="/" className="text-white hover:text-blue-600">Home</Link>
      <Link to="/projects" className="text-white hover:text-blue-600">Projects</Link>
      <Link to="/project-creation" className="text-white hover:text-blue-600">Create Project</Link>
      <Link to="/users" className="text-white hover:text-blue-600">Users</Link>
  </div>
    :
    <div className="flex items-center space-x-4">
    <Link to="/login" className="text-white hover:text-blue-600">Login</Link>
    <Link to="/register" className="text-white hover:text-blue-600">Register</Link>
  </div>
    
    }  

      <div className="flex items-center space-x-6">

      <div className="relative">
      <button 
        className="flex items-center text-gray-600 hover:text-blue-600 dropdown-button"
        onClick={toggleDropdown}
      >
        <img
          src="https://via.placeholder.com/32"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10 dropdown-menu">
          <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
          <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
          <button onClick={logout} className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
        </div>
      )}
    </div>
      </div>
    </nav>
  );
};

export default Navbar;
