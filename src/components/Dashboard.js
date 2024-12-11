// src/components/Dashboard.js
import React from 'react';

const Dashboard = ({ role }) => {
  return (
    <div>
      <h2>Welcome, {role}</h2>
      {role === 'doctor' && <h3>Doctor's Dashboard</h3>}
      {role === 'patient' && <h3>Patient's Dashboard</h3>}
      {role === 'pharmacy' && <h3>Pharmacy's Dashboard</h3>}
    </div>
  );
};

export default Dashboard;
