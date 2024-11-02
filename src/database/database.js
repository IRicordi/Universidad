// database.js - Configuración de la base de datos
//por ahora solo un ejemplo
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('swimit.db');

export const initDatabase = () => {
  db.transaction(tx => {
    // Tabla de usuarios
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    );

    // Tabla de perfiles
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS perfiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        edad INTEGER,
        nivel TEXT,
        club TEXT,
        estilo_preferido TEXT,
        mejor_tiempo TEXT,
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
      )`
    );

    // Tabla de entrenamientos
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS entrenamientos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        fecha DATETIME,
        distancia INTEGER,
        tiempo TEXT,
        tipo TEXT,
        notas TEXT,
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
      )`
    );
  });
};

// Funciones para manejar usuarios
export const registerUser = (userData) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
        [userData.nombre, userData.email, userData.password],
        (_, result) => {
          resolve(result.insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM usuarios WHERE email = ?',
        [email],
        (_, { rows: { _array } }) => {
          resolve(_array[0]);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// Modificación de tu RegisterScreen.jsx
import { registerUser } from './database';

const Register = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [error, setError] = useState('');

  const handleRegistration = async (values) => {
    try {
      if (values.password !== values.confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }

      const userId = await registerUser({
        nombre: values.nombre,
        email: values.email,
        password: values.password // En una app real, deberías hashear la contraseña
      });

      // Navegar al siguiente paso o al login
      navigation.navigate('Login');
    } catch (error) {
      if (error.message.includes('UNIQUE')) {
        setError('Este correo ya está registrado');
      } else {
        setError('Error al registrar usuario');
      }
    }
  };

  return (
    // ... tu código existente del RegisterScreen ...
    <Formik
      initialValues={{
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={handleRegistration}
    >
      {/* ... resto del código ... */}
    </Formik>
  );
};

// Ejemplo de uso en ProfileScreen.jsx
export const getUserProfile = (userId) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT u.*, p.*
         FROM usuarios u
         LEFT JOIN perfiles p ON u.id = p.usuario_id
         WHERE u.id = ?`,
        [userId],
        (_, { rows: { _array } }) => {
          resolve(_array[0]);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// Función para guardar un entrenamiento
export const saveTraining = (trainingData) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO entrenamientos 
         (usuario_id, fecha, distancia, tiempo, tipo, notas) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          trainingData.userId,
          trainingData.fecha,
          trainingData.distancia,
          trainingData.tiempo,
          trainingData.tipo,
          trainingData.notas
        ],
        (_, result) => {
          resolve(result.insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};