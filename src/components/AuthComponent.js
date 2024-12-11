// src/components/AuthComponent.js
import React, { useState } from 'react';
import { signupWithGoogle, loginWithGoogle, getUserRole } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from "react-icons/fc";

const AuthComponent = () => {
  const [role, setRole] = useState('');
  const [uniqueID, setUniqueID] = useState('');
  const navigate = useNavigate();

  const navigateToDashboard = (userRole) => {
    if (userRole === 'doctor') navigate('/doctor-dashboard');
    else if (userRole === 'patient') navigate('/patient-dashboard');
    else if (userRole === 'pharmacy') navigate('/pharmacy-dashboard');
    else toast.error('Role not assigned');
  };

  const handleSignup = async () => {
    if (!role || !uniqueID) {
      toast.error('Role and Unique ID are required for signup');
      return;
    }

    try {
      const result = await signupWithGoogle(role, uniqueID);
      if (result.status === 'already_registered') {
        toast.info('User already registered with this email.');
      } else if (result.status === 'success') {
        toast.success('Signup successful!');
        navigateToDashboard(role);
      }
    } catch (error) {
      console.error('Signup Error:', error);
      toast.error('Signup failed');
    }
  };

  const handleLogin = async () => {
    try {
      const userAddress = await loginWithGoogle();
      const roleData = await getUserRole(userAddress);
      if (roleData) navigateToDashboard(roleData.role);
      else toast.error('User role not found');
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('https://media.licdn.com/dms/image/C4E12AQFFdK7w_QExvg/article-cover_image-shrink_720_1280/0/1520085556238?e=2147483647&v=beta&t=IRecWaXE3FN_Utg8f8ZrBEvT5xixbNZgJwPWdRSrS5w')` }}
    >
      <h1 className="fixed top-4 left-4 text-5xl font-extrabold text-white">HealthChain</h1>
      <div className="bg-white bg-opacity-80 rounded-lg p-8 shadow-lg w-96 mt-20">
        <div className="mb-4">
          <select 
            onChange={(e) => setRole(e.target.value)} 
            value={role} 
            className="w-full p-2 border rounded"
          >
            <option value="">Select Role</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
            <option value="pharmacy">Pharmacy</option>
          </select>
        </div>
        {role && (
          <input 
            type="text" 
            placeholder={
              role === 'doctor' ? "License Number" : 
              role === 'patient' ? "Aadhaar Number" : 
              "Medical License Number"
            } 
            value={uniqueID}
            onChange={(e) => setUniqueID(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
        )}
        <div className="flex space-x-4 mb-4">
          <button 
            onClick={handleSignup} 
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
          >
            <FcGoogle className="mr-2" />
            Signup
          </button>
          <button 
            onClick={handleLogin} 
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center"
          >
            <FcGoogle className="mr-2" />
            Login
          </button>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default AuthComponent;
