// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDorXbPdPXfuGDIpJaqo_g-EBhUH8v4uCI",
    authDomain: "healthchain-42566.firebaseapp.com",
    projectId: "healthchain-42566",
    storageBucket: "healthchain-42566.appspot.com",
    messagingSenderId: "344758709146",
    appId: "1:344758709146:web:da0265ec8fe466d5202823",
    measurementId: "G-SLX0KYRCDB"
  };



// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

// Export auth and firestore
export { auth, firestore, firebaseApp };
export default firebaseApp;