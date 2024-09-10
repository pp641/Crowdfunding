import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/Login';
import RegistrationForm from './Components/Registration';
import ForgotPasswordPage from './Components/ForgetPassword';
import ProjectCreationPage from './Components/ProjectCreationpage';
import ProjectDetail from './Components/ProjectDetail'; 
import ProjectList from './Components/ProjectList';
import ProfilePage from './Components/Profilepage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer'
import Chatbox from './Components/ChatBox';


const App: React.FC = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/project/:project_id" element={<ProjectDetail />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/project-creation" element={<ProjectCreationPage/>}/>
        <Route path="/projects" element={<ProjectList/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path = "/message" element= {<Chatbox />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
