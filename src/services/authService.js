// src/services/authService.js
import { auth, firestore } from '../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const provider = new GoogleAuthProvider();

export const signupWithGoogle = async (role, uniqueID) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userRef = doc(firestore, 'users', user.uid);

    // Check if user already exists
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return { status: 'already_registered' };
    }

    // Store user role, uniqueID, and name in Firestore
    await setDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      role,
      uniqueID, // Aadhaar or License Number based on role
    });

    return { status: 'success', user };
  } catch (error) {
    console.error('Google signup failed:', error);
    throw new Error('Signup failed');
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user.uid;
  } catch (error) {
    console.error('Google login failed:', error);
    throw new Error('Login failed');
  }
};

export const getUserRole = async (uid) => {
  try {
    const userRef = doc(firestore, 'users', uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error('No user document found');
      return null;
    }
  } catch (error) {
    console.error('Failed to retrieve user role:', error);
    throw error;
  }
};
