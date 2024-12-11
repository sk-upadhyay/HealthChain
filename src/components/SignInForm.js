import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import firebaseApp from '../firebaseConfig'; // Import your Firebase config
import { firestore } from '../firebaseConfig'; // Ensure you're exporting firestore from your config

const SignUpForm = () => {
  const [role, setRole] = useState("");
  const auth = getAuth(firebaseApp); // Initialize Firebase Auth

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user role and information in Firestore
      const userRef = doc(firestore, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName, // Store the user's display name
        email: user.email,
        role: role, // Assign the role from the input
      });

      alert(`Signed up as: ${user.displayName} with role: ${role}`);
      setRole(""); // Reset role after successful signup
    } catch (error) {
      const errorMessage = error.message;
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={handleRoleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 mb-4"
        />
        <button 
          onClick={handleGoogleSignUp}
          className="w-full p-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-300"
        >
          Sign Up with Google
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
