// src/components/SignupComponent.js

import React, { useState } from 'react';
import { signupWithGoogle } from '../services/authService';

const SignupComponent = () => {
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    const user = await signupWithGoogle();
    if (user) {
      console.log('User signed up:', user);
      // Redirect to another page if needed
    } else {
      setError('Google signup failed');
    }
  };

  return (
    <div>
      <h2>Signup with Google</h2>
      <button onClick={handleSignup}>Sign Up</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SignupComponent;
