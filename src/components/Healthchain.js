// src/components/HealthChain.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthComponent from './AuthComponent';
import Dashboard from './Dashboard';

const HealthChain = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthComponent />} />
        <Route path="/doctor-dashboard" element={<Dashboard role="doctor" />} />
        <Route path="/patient-dashboard" element={<Dashboard role="patient" />} />
        <Route path="/pharmacy-dashboard" element={<Dashboard role="pharmacy" />} />
      </Routes>
    </Router>
  );
};

export default HealthChain;
