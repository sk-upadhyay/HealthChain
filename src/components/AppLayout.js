// src/components/AppLayout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const AppLayout = ({ children, userType, userName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col" style={{ backgroundImage: `url('https://media.licdn.com/dms/image/C4E12AQFFdK7w_QExvg/article-cover_image-shrink_720_1280/0/1520085556238?e=2147483647&v=beta&t=IRecWaXE3FN_Utg8f8ZrBEvT5xixbNZgJwPWdRSrS5w')` }}>
      <header className="bg-black bg-opacity-70 text-white p-4 flex justify-between items-center">
        <h1 className="text-4xl font-extrabold font-white">HealthChain</h1>
        <div className="flex items-center gap-4">
          <span className="text-lg">{userName}</span>
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600">Logout</button>
        </div>
      </header>
      <main className="flex-1 flex justify-center items-start mt-8 p-4">
        <div className={`max-w-2xl w-full p-6 bg-white bg-opacity-90 rounded shadow-lg ${userType === 'doctor' ? 'border-blue-500' : userType === 'patient' ? 'border-green-500' : 'border-purple-500'} border-l-4`}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
