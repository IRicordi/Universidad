import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA8IyIZ5LPgNd9o6BwsShZQnkBqep7MCxA",
    authDomain: "swimit-5a38c.firebaseapp.com",
    projectId: "swimit-5a38c",
    storageBucket: "swimit-5a38c.firebasestorage.app",
    messagingSenderId: "857670387487",
    appId: "1:857670387487:web:534797fb8f0006a9abd22a",
    measurementId: "G-BL0DNKCBLX"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;