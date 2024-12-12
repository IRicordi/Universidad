export default {
    navigation: {
        home: "Inicio",
        athletes: "Deportistas",
        clubs: "Clubes",
        calendar: "Calendario",
        favorites: "Favoritos",
        profile: "Perfil",
        devTools: "Herramientas Dev",
        login: "Iniciar Sesión",
        register: "Registrarse"
    },
    auth: {
        bienvenida: "Bienvenido a SwimIt Chile",
        iniciarSesion: "Iniciar Sesión",
        registrarse: "Registrarse",
        invitado: "Entrar como Invitado"
    },
    login: {
        welcome: "¡Bienvenido!",
        enterData: "Ingresa tus datos para continuar",
        email: "Correo Electrónico",
        emailPlaceholder: "alemanon@ejemplo.com",
        password: "Contraseña",
        passwordPlaceholder: "* * * * * * * *",
        loginButton: "Iniciar Sesión",
        loading: "Iniciando sesión...",
        errorTitle: "Error",
        successTitle: "Éxito",
        successMessage: "¡Inicio de sesión exitoso!",
        emptyFields: "Por favor completa todos los campos",
        errors: {
            invalidEmail: "Correo electrónico inválido",
            userNotFound: "No existe una cuenta con este correo",
            wrongPassword: "Contraseña incorrecta",
            tooManyRequests: "Demasiados intentos fallidos. Intenta más tarde",
            networkError: "Error de conexión. Verifica tu internet",
            default: "Error al iniciar sesión. Por favor intenta de nuevo"
        }
    
    },
    register: {
        title: "SwimIt",
        subtitle: "Crear Cuenta",
        fullName: "Nombre Completo",
        fullNamePlaceholder: "Alejandro Manon",
        email: "Correo",
        emailPlaceholder: "alemanon@ejemplo.com",
        password: "Contraseña",
        passwordPlaceholder: "* * * * * * * *",
        confirmPassword: "Confirmar Contraseña",
        confirmPasswordPlaceholder: "* * * * * * * *",
        registerButton: "Registrarse",
        role: "Selecciona tu rol",
        roleRequired: "Por favor selecciona un rol",
        roles: {
            swimmer: "Nadador",
            coach: "Entrenador",
            brand: "Marca"
        },

        errorTitle: "Error",
        successTitle: "Éxito",
        successMessage: "¡Registro completado con éxito!",
        passwordMismatch: "Las contraseñas no coinciden",
        errors: {
            emailInUse: "Este correo electrónico ya está registrado",
            invalidEmail: "Por favor ingresa un correo electrónico válido",
            operationNotAllowed: "Operación no permitida",
            weakPassword: "La contraseña debe tener al menos 6 caracteres",
            default: "Hubo un error en el registro. Por favor, intenta de nuevo."
        }
        
    },
    home: {
        latestNews: "¡Últimas noticias!",
        viewAthletes: "Ver Deportistas",
        viewClubs: "Ver Clubes",
        featuredProfiles: "Perfiles destacados"
    },
    
    profile: {
        title: "Mi Perfil",
        age: "Edad",
        level: "Nivel",
        bestTime: "Mejor Tiempo",
        name: "Nombre",
        email: "Correo electrónico",
        phone: "Teléfono",
        address: "Dirección",
        birthDate: "Fecha de nacimiento",
        notSpecified: "No especificado",
        editProfile: "Editar Perfil",
        save: "Guardar",
        cancel: "Cancelar",
        guest: "Invitado",
        guestMessage: "Inicia sesión o regístrate para acceder a tu perfil",
        loading: "Cargando...",
        successTitle: "Éxito",
        successMessage: "Perfil actualizado correctamente",
        errorTitle: "Error",
        errorMessage: "No se pudo actualizar el perfil",
        phoneError: "El teléfono es obligatorio",
        dateError: "Formato de fecha inválido",
        phonePlaceholder: "Número de teléfono",
        addressPlaceholder: "Dirección",
        birthDatePlaceholder: "Fecha de nacimiento (DD/MM/AAAA)",
        description: "Descripción personal (máximo 100 palabras)",
        achievements: "Logros en Natación",
        addAchievement: "Añade un nuevo logro",
        noAchievements: "No hay logros registrados",
        changeAvatar: "Cambiar avatar",
        deleteAchievement: "Eliminar logro",
        editAchievement: "Editar logro",
        achievementError: "El logro no puede estar vacío",
        descriptionError: "La descripción no puede tener más de 100 palabras",
        dateFormatError: "Por favor ingresa la fecha en formato DD/MM/AAAA",
        invalidDate: "Fecha inválida",
        logros: "Logros"
    },

    screenTitles: {
        athleteDetails: "Detalles del Deportista",
        clubDetails: "Detalles del Club",
        athletesList: "Deportistas",
        clubsList: "Clubes"
    },
    profileCapsules: {
        swimming: "Natación",
        achievements: "Logros",
        viewProfile: "Ver Perfil"
    },
    profileCompletion: {
        title: "¡Completa tu Perfil!",
        message: "Para que tu perfil sea visible en la comunidad, necesitas completar toda tu información.",
        completeButton: "Completar Perfil",
        laterButton: "Más Tarde",
        requirements: {
            name: "Nombre",
            phone: "Teléfono",
            address: "Dirección",
            birthDate: "Fecha de Nacimiento",
            description: "Descripción"
        }
    },
    userDetails: {
        contactInfo: "Información de Contacto",
        about: "Acerca de",
        achievements: "Logros",
        contact: "Contactar",
        phone: "Teléfono",
        email: "Correo",
        address: "Dirección",
        role: {
            swimmer: "Nadador",
            coach: "Entrenador",
            brand: "Marca"
        }
    }
};