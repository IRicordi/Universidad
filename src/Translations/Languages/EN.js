export default {
    navigation: {
        home: "Home",
        athletes: "Athletes",
        clubs: "Clubs",
        calendar: "Calendar",
        favorites: "Favorites",
        profile: "Profile",
        devTools: "Dev Tools",
        login: "Log In",
        register: "Sign Up"
    },
    auth: {
        bienvenida: "Welcome to SwimIt Chile",
        iniciarSesion: "Log In",
        registrarse: "Sign Up",
        invitado: "Enter as Guest"
    
    },
    login: {
        welcome: "Welcome!",
        enterData: "Enter your data to continue",
        email: "Email",
        emailPlaceholder: "alemanon@example.com",
        password: "Password",
        passwordPlaceholder: "* * * * * * * *",
        loginButton: "Log In",
        loading: "Signing in...",
        errorTitle: "Error",
        successTitle: "Success",
        successMessage: "Successfully signed in!",
        emptyFields: "Please fill in all fields",
        errors: {
            invalidEmail: "Invalid email address",
            userNotFound: "No account exists with this email",
            wrongPassword: "Incorrect password",
            tooManyRequests: "Too many failed attempts. Please try again later",
            networkError: "Connection error. Check your internet connection",
            default: "Login error. Please try again"
        }
    },
    register: {
        title: "SwimIt",
        subtitle: "Create Account",
        fullName: "Full Name",
        fullNamePlaceholder: "Alejandro Manon",
        email: "Email",
        emailPlaceholder: "alemanon@example.com",
        password: "Password",
        passwordPlaceholder: "* * * * * * * *",
        confirmPassword: "Confirm Password",
        confirmPasswordPlaceholder: "* * * * * * * *",
        registerButton: "Sign Up",
        role: "Select your role",
        roleRequired: "Please select a role",
        roles: {
            swimmer: "Swimmer",
            coach: "Coach",
            brand: "Brand"
        },

        errorTitle: "Error",
        successTitle: "Success",
        successMessage: "Registration completed successfully!",
        passwordMismatch: "Passwords do not match",
        errors: {
            emailInUse: "This email is already registered",
            invalidEmail: "Please enter a valid email address",
            operationNotAllowed: "Operation not allowed",
            weakPassword: "Password should be at least 6 characters long",
            default: "Registration error. Please try again."
        }
    },
    home: {
        latestNews: "Latest news!",
        viewAthletes: "View Athletes",
        viewClubs: "View Clubs",
        featuredProfiles: "Featured profiles"
    },
    
    profile: {
        title: "My Profile",
        age: "Age",
        level: "Level",
        bestTime: "Best Time",
        name: "Name",
        email: "Email",
        phone: "Phone",
        address: "Address",
        birthDate: "Birth Date",
        notSpecified: "Not specified",
        editProfile: "Edit Profile",
        save: "Save",
        cancel: "Cancel",
        guest: "Guest",
        guestMessage: "Log in or sign up to access your profile",
        loading: "Loading...",
        successTitle: "Success",
        successMessage: "Profile updated successfully",
        errorTitle: "Error",
        errorMessage: "Could not update profile",
        phoneError: "Phone is required",
        dateError: "Invalid date format",
        phonePlaceholder: "Phone number",
        addressPlaceholder: "Address",
        birthDatePlaceholder: "Birth date (DD/MM/YYYY)",
        description: "Personal description (100 words max)",
        achievements: "Swimming Achievements",
        addAchievement: "Add new achievement",
        noAchievements: "No achievements registered",
        changeAvatar: "Change avatar",
        deleteAchievement: "Delete achievement",
        editAchievement: "Edit achievement",
        achievementError: "Achievement cannot be empty",
        descriptionError: "Description cannot exceed 100 words",
        dateFormatError: "Please enter the date in DD/MM/YYYY format",
        invalidDate: "Invalid date",
        description: "Description",
        logros: "achievements",
        guestMessage: "Log in or sign up to access your profile",
    },

    screenTitles: {
        athleteDetails: "Athlete Details",
        clubDetails: "Club Details",
        athletesList: "Athletes",
        clubsList: "Clubs"
    },
    profileCapsules: {
        swimming: "Swimming",
        achievements: "Achievements",
        viewProfile: "View Profile"
    },
    profileCompletion: {
        title: "Complete Your Profile!",
        message: "To make your profile visible to the community, you need to complete all your information.",
        completeButton: "Complete Profile",
        laterButton: "Later",
        requirements: {
            name: "Name",
            phone: "Phone",
            address: "Address",
            birthDate: "Birth Date",
            description: "Description"
        }
    },
    userDetails: {
        contactInfo: "Contact Information",
        about: "About",
        achievements: "Achievements",
        contact: "Contact",
        phone: "Phone",
        email: "Email",
        address: "Address",
        role: {
            swimmer: "Swimmer",
            coach: "Coach",
            brand: "Brand"
        }
    }
};