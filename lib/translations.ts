export type Language = "en" | "es"

export const translations = {
  en: {
    // Page
    pageTitle: "Workout Tracker",
    pageDescription: "Track your workout exercises and progress",

    // Workout Log
    workoutLog: "Your Workout Log",
    addExercise: "Add Exercise",
    addFirstExercise: "Add Your First Exercise",
    cancel: "Cancel",
    noExercises: "No exercises added yet.",

    // Form
    newExercise: "New Exercise",
    exerciseName: "Exercise Name",
    exerciseNamePlaceholder: "e.g., Bench Press",
    category: "Category",
    selectCategory: "Select a category",
    subcategory: "Subcategory",
    selectSubcategory: "Select a subcategory",
    sets: "Sets",
    reps: "Reps",
    weight: "Weight (kg)",
    date: "Date",
    pickDate: "Pick a date",
    notes: "Notes",
    notesPlaceholder: "Any additional notes about this exercise...",
    notesDescription: "Optional: Add any details about your form, difficulty, etc.",

    // Categories
    all: "All",
    strength: "Strength",
    cardio: "Cardio",
    flexibility: "Flexibility",
    balance: "Balance",

    // Subcategories - Strength
    squats: "Squats",
    squatsDesc: "A fundamental movement that builds strength in your legs and glutes",
    deadlifts: "Deadlifts",
    deadliftsDesc: "A compound exercise that builds strength in your back, legs, and arms",
    benchPress: "Bench Press",
    benchPressDesc: "A popular exercise that builds chest muscles",
    pushUps: "Push-ups",
    pushUpsDesc: "A bodyweight exercise that builds strength in your arms, chest, and core",

    // Subcategories - Cardio
    running: "Running",
    runningDesc: "A high-calorie burn exercise that can be done on sidewalks, trails, or treadmills",
    cycling: "Cycling",
    cyclingDesc: "An effective way to improve stamina and muscle strength",
    aerobicClasses: "Aerobic Classes",
    aerobicClassesDesc: "A gym activity that gets your heart pumping",

    // Subcategories - Flexibility
    stretching: "Stretching",
    stretchingDesc: "Improves the range of motion in your joints and the elasticity of your muscles",
    bosuBall: "BOSU Ball Exercises",
    bosuBallDesc: "Enhances balance and stability",

    // Subcategories - Balance
    farmersWalk: "Farmer's Walk",
    farmersWalkDesc: "Carrying weights while walking improves grip and core strength",
    calfRaise: "Dumbbell Standing Calf Raise",
    calfRaiseDesc: "Builds strength and definition in your lower legs",

    // Notifications
    exerciseAdded: "Exercise added",
    exerciseAddedDesc: "{name} has been added to your workout log.",
    exerciseRemoved: "Exercise removed",
    exerciseRemovedDesc: "The exercise has been removed from your workout log.",
    dataSaved: "Data saved",
    dataSavedDesc: "Your workout data has been saved.",
    dataLoaded: "Data loaded",
    dataLoadedDesc: "Your workout data has been loaded.",

    // Language
    switchLanguage: "Español",

    // Auth
    loginSignup: "Login / Sign Up",
    welcomeTitle: "Welcome to Workout Tracker",
    welcomeDesc: "Sign in to your account or create a new one to save your workout data across devices.",
    login: "Login",
    signup: "Sign Up",
    email: "Email",
    password: "Password",
    loggingIn: "Logging in...",
    signingUp: "Signing up...",
    orContinueAs: "Or continue as",
    continueAsGuest: "Continue as Guest",
    myAccount: "My Account",
    logout: "Logout",
    guestUser: "Guest User",
    guestMode: "Guest Mode",

    // Auth Notifications
    loginSuccess: "Login successful",
    loginSuccessDesc: "Welcome back to Workout Tracker!",
    loginError: "Login failed",
    signupSuccess: "Sign up successful",
    signupSuccessDesc: "Welcome to Workout Tracker!",
    signupError: "Sign up failed",
    logoutSuccess: "Logged out",
    logoutSuccessDesc: "You have been logged out successfully.",
    logoutError: "Logout failed",
    guestModeActive: "Guest mode active",
    guestModeActiveDesc: "Your data will be saved locally on this device.",

    // Data Sync
    dataSyncSuccess: "Data synchronized",
    dataSyncSuccessDesc: "Your workout data has been synchronized with your account.",
    dataSyncError: "Sync failed",
  },
  es: {
    // Page
    pageTitle: "Registro de Ejercicios",
    pageDescription: "Registra tus ejercicios y progreso",

    // Workout Log
    workoutLog: "Tu Registro de Ejercicios",
    addExercise: "Añadir Ejercicio",
    addFirstExercise: "Añade Tu Primer Ejercicio",
    cancel: "Cancelar",
    noExercises: "Aún no hay ejercicios añadidos.",

    // Form
    newExercise: "Nuevo Ejercicio",
    exerciseName: "Nombre del Ejercicio",
    exerciseNamePlaceholder: "ej., Press de Banca",
    category: "Categoría",
    selectCategory: "Selecciona una categoría",
    subcategory: "Subcategoría",
    selectSubcategory: "Selecciona una subcategoría",
    sets: "Series",
    reps: "Repeticiones",
    weight: "Peso (kg)",
    date: "Fecha",
    pickDate: "Elige una fecha",
    notes: "Notas",
    notesPlaceholder: "Cualquier nota adicional sobre este ejercicio...",
    notesDescription: "Opcional: Añade detalles sobre tu forma, dificultad, etc.",

    // Categories
    all: "Todos",
    strength: "Fuerza",
    cardio: "Cardio",
    flexibility: "Flexibilidad",
    balance: "Equilibrio",

    // Subcategories - Strength
    squats: "Sentadillas",
    squatsDesc: "Un movimiento fundamental que desarrolla fuerza en piernas y glúteos",
    deadlifts: "Peso Muerto",
    deadliftsDesc: "Un ejercicio compuesto que desarrolla fuerza en espalda, piernas y brazos",
    benchPress: "Press de Banca",
    benchPressDesc: "Un ejercicio popular que desarrolla los músculos del pecho",
    pushUps: "Flexiones",
    pushUpsDesc: "Un ejercicio con peso corporal que desarrolla fuerza en brazos, pecho y core",

    // Subcategories - Cardio
    running: "Correr",
    runningDesc: "Un ejercicio de alta quema de calorías que se puede hacer en aceras, senderos o cintas de correr",
    cycling: "Ciclismo",
    cyclingDesc: "Una forma efectiva de mejorar la resistencia y la fuerza muscular",
    aerobicClasses: "Clases de Aeróbic",
    aerobicClassesDesc: "Una actividad de gimnasio que acelera tu ritmo cardíaco",

    // Subcategories - Flexibility
    stretching: "Estiramientos",
    stretchingDesc: "Mejora el rango de movimiento en tus articulaciones y la elasticidad de tus músculos",
    bosuBall: "Ejercicios con Balón BOSU",
    bosuBallDesc: "Mejora el equilibrio y la estabilidad",

    // Subcategories - Balance
    farmersWalk: "Caminata del Granjero",
    farmersWalkDesc: "Cargar pesos mientras caminas mejora el agarre y la fuerza del core",
    calfRaise: "Elevación de Talones con Mancuerna",
    calfRaiseDesc: "Desarrolla fuerza y definición en las pantorrillas",

    // Notifications
    exerciseAdded: "Ejercicio añadido",
    exerciseAddedDesc: "{name} ha sido añadido a tu registro de ejercicios.",
    exerciseRemoved: "Ejercicio eliminado",
    exerciseRemovedDesc: "El ejercicio ha sido eliminado de tu registro de ejercicios.",
    dataSaved: "Datos guardados",
    dataSavedDesc: "Tus datos de ejercicios han sido guardados.",
    dataLoaded: "Datos cargados",
    dataLoadedDesc: "Tus datos de ejercicios han sido cargados.",

    // Language
    switchLanguage: "English",

    // Auth
    loginSignup: "Iniciar Sesión / Registrarse",
    welcomeTitle: "Bienvenido a Registro de Ejercicios",
    welcomeDesc:
      "Inicia sesión en tu cuenta o crea una nueva para guardar tus datos de ejercicios en todos tus dispositivos.",
    login: "Iniciar Sesión",
    signup: "Registrarse",
    email: "Correo Electrónico",
    password: "Contraseña",
    loggingIn: "Iniciando sesión...",
    signingUp: "Registrando...",
    orContinueAs: "O continúa como",
    continueAsGuest: "Continuar como Invitado",
    myAccount: "Mi Cuenta",
    logout: "Cerrar Sesión",
    guestUser: "Usuario Invitado",
    guestMode: "Modo Invitado",

    // Auth Notifications
    loginSuccess: "Inicio de sesión exitoso",
    loginSuccessDesc: "¡Bienvenido de nuevo a Registro de Ejercicios!",
    loginError: "Error al iniciar sesión",
    signupSuccess: "Registro exitoso",
    signupSuccessDesc: "¡Bienvenido a Registro de Ejercicios!",
    signupError: "Error al registrarse",
    logoutSuccess: "Sesión cerrada",
    logoutSuccessDesc: "Has cerrado sesión correctamente.",
    logoutError: "Error al cerrar sesión",
    guestModeActive: "Modo invitado activo",
    guestModeActiveDesc: "Tus datos se guardarán localmente en este dispositivo.",

    // Data Sync
    dataSyncSuccess: "Datos sincronizados",
    dataSyncSuccessDesc: "Tus datos de ejercicios han sido sincronizados con tu cuenta.",
    dataSyncError: "Error de sincronización",
  },
}

