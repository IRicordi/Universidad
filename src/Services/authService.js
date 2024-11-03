import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';


import { 
    getFirestore,
    doc, 
    setDoc, 
    getDoc 
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA8IyIZ5LPgNd9o6BwsShZQnkBqep7MCxA",
    authDomain: "swimit-5a38c.firebaseapp.com",
    projectId: "swimit-5a38c",
    storageBucket: "swimit-5a38c.firebasestorage.app",
    messagingSenderId: "857670387487",
    appId: "1:857670387487:web:534797fb8f0006a9abd22a",
    measurementId: "G-BL0DNKCBLX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
  
  export const authService = {
    // Registro
    async register(email, password, userData = {}) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Guardar datos adicionales en Firestore
        await setDoc(doc(db, 'usuarios', userCredential.user.uid), {
          email,
          ...userData,
          createdAt: new Date().toISOString(),
          preferencias: {
            tema: 'light',
            notificaciones: true
          }
        });
  
        return {
          success: true,
          user: userCredential.user
        };
      } catch (error) {
        console.error('Error en registro:', error);
        return {
          success: false,
          error: error.message
        };
      }
    },
  
    // Login
    async login(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Obtener datos adicionales del usuario
        const userDoc = await getDoc(doc(db, 'usuarios', userCredential.user.uid));
        
        return {
          success: true,
          user: userCredential.user,
          userData: userDoc.data()
        };
      } catch (error) {
        console.error('Error en login:', error);
        return {
          success: false,
          error: error.message
        };
      }
    },
  
    // Logout
    async logout() {
      try {
        await signOut(auth);
        return { success: true };
      } catch (error) {
        console.error('Error en logout:', error);
        return { success: false, error: error.message };
      }
    }
  };