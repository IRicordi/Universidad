// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

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
export const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const FIREBASE_DB = getFirestore(FIREBASE_APP);