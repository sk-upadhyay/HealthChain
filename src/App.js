import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import AuthComponent from './components/AuthComponent';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import PharmacyDashboard from './components/PharmacyDashboard';
import { auth } from './firebaseConfig';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up subscription
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional loading spinner
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/patient-dashboard" /> : <AuthComponent />} />
        <Route path="/doctor-dashboard" element={isAuthenticated ? <DoctorDashboard /> : <Navigate to="/" />} />
        <Route path="/patient-dashboard" element={isAuthenticated ? <PatientDashboard /> : <Navigate to="/" />} />
        <Route path="/pharmacy-dashboard" element={isAuthenticated ? <PharmacyDashboard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
