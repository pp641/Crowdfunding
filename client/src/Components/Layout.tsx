import React from 'react';
import { Outlet } from 'react-router-dom';
import Chatbox from './ChatBox';

const Layout: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <div className="pb-16">  
        <Outlet /> 
      </div>

      <Chatbox />
    </div>
  );
};

export default Layout;
