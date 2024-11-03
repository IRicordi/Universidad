import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
  } from 'firebase/auth';
  import { 
    doc, 
    setDoc, 
    getDoc 
  } from 'firebase/firestore';
  import { auth, db } from './config/firebase';
  
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