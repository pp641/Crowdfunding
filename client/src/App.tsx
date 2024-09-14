import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Components/Login';
import RegistrationForm from './Components/Registration';
import ForgotPasswordPage from './Components/ForgetPassword';
import ProjectCreationPage from './Components/ProjectCreationpage';
import ProjectDetail from './Components/ProjectDetail'; 
import ProjectList from './Components/ProjectList';
import ProfilePage from './Components/Profilepage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Chatbox from './Components/ChatBox';
import ProtectedRoute from './Components/ProtectedRoute'; // Import the ProtectedRoute component

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/project/:project_id" element={<ProtectedRoute element={<ProjectDetail />} />} />
        <Route path="/project-creation" element={<ProtectedRoute element={<ProjectCreationPage />} />} />
        <Route path="/projects" element={<ProtectedRoute element={<ProjectList />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
        <Route path="/message" element={<ProtectedRoute element={<Chatbox />} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
