import axios from 'axios';
import React, { createContext, useState } from 'react';
import { useUser } from './Context/userContext';

const LoginPage: React.FC = () => {

  const { setToken } = useUser(); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { ...errors };

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'A valid email is required';
      hasError = true;
    } else {
      newErrors.email = '';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      hasError = true;
    } else {
      newErrors.password = '';
    }

    setErrors(newErrors);

    if (!hasError) {
      console.log('Form submitted:', formData);
      axios.post('http://localhost:5001/login',{
        data : formData
      }).then((response)=>{
            console.log("response", response);
            const token = response.data.token;
            localStorage.setItem('token', token);
            setToken(token)
            window.location.href = '/projects'
      }).catch((error)=>{
        console.log("Error", error);
      })
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@example.com"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between mb-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
          <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
        </div>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">Don't have an account?</p>
        <a href="/register" className="text-blue-600 hover:underline">Create an account</a>
      </div>
    </div>
  );
};

export default LoginPage;
