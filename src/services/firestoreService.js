// src/services/firestoreService.js
import { firestore } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export const saveUserData = async (user, role, additionalData) => {
  try {
    const userRef = doc(firestore, 'users', user.uid);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role,
      ...additionalData, // Role-specific data
    };

    await setDoc(userRef, userData);
    console.log(`User data saved successfully for ${role}: ${user.uid}`);
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};
