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
    getDoc,
    updateDoc 
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    // ... tu configuración actual
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const authService = {
    // Verificar estado del usuario
    async checkUserStatus() {
        const user = auth.currentUser;
        
        if (!user) {
            const isGuest = await AsyncStorage.getItem('isGuest');
            return {
                isLoggedIn: isGuest === 'true',
                isGuest: isGuest === 'true',
                userData: null
            };
        }

        try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            return {
                isLoggedIn: true,
                isGuest: false,
                userData: userDoc.exists() ? userDoc.data() : null
            };
        } catch (error) {
            console.error('Error checking user status:', error);
            return { isLoggedIn: false, isGuest: false, userData: null };
        }
    },

    // Registro
    async register(email, password, userData = {}) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            const userDocData = {
                email,
                ...userData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                telefono: '',
                direccion: '',
                fechaNacimiento: '',
                fotoPerfil: '',
                configuracion: {
                    notificaciones: true,
                    privacidad: 'public',
                    tema: 'light'
                },
                rol: 'usuario',
                isComplete: false
            };

            await setDoc(doc(db, 'users', userCredential.user.uid), userDocData);
            await AsyncStorage.setItem('isGuest', 'false');

            return {
                success: true,
                user: userCredential.user,
                userData: userDocData
            };
        } catch (error) {
            console.error('Error en registro:', error);
            return { success: false, error: error.message };
        }
    },

    // Login
    async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
            await AsyncStorage.setItem('isGuest', 'false');
            
            return {
                success: true,
                user: userCredential.user,
                userData: userDoc.data()
            };
        } catch (error) {
            console.error('Error en login:', error);
            return { success: false, error: error.message };
        }
    },

    // Logout
    async logout() {
        try {
            await signOut(auth);
            await AsyncStorage.removeItem('isGuest');
            return { success: true };
        } catch (error) {
            console.error('Error en logout:', error);
            return { success: false, error: error.message };
        }
    },

    // Entrar como invitado
    async loginAsGuest() {
        try {
            await AsyncStorage.setItem('isGuest', 'true');
            return { success: true, isGuest: true };
        } catch (error) {
            console.error('Error al entrar como invitado:', error);
            return { success: false, error: error.message };
        }
    },

    // Actualizar perfil
    async updateProfile(userId, userData) {
        try {
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, {
                ...userData,
                updatedAt: new Date().toISOString()
            });
            return { success: true };
        } catch (error) {
            console.error('Error actualizando perfil:', error);
            return { success: false, error: error.message };
        }
    }
};