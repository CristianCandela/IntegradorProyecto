// Import removed to avoid static data hydration
const KEYS = {
  PROFESSORS: "professors",
  STUDENT_STATS: "student_stats",
  TUTORING_SESSIONS: "tutoring_sessions",
  REVIEWS: "reviews",
  NOTIFICATIONS: "notifications",
  NOTIFICATIONS_PROFESOR: "notifications_profesor", // NUEVA CLAVE PARA PROFESOR
  SESSIONS: "sessions", // SESIONES CREADAS POR PROFESORES
  USERS: "users", // MOCK PARA AUTENTICACIÓN
};

const defaultProfessorValues = {
  foto: "https://via.placeholder.com/150",
  curso: "Pendiente de asignación",
  precioHora: 20,
  rating: 0,
  dificultad: 5.0,
  departamento: "General",
  metodologia: "Por definir",
  etiquetas: ["Nuevo"],
  descripcion: "Perfil de profesor recién creado.",
  perfilCompletado: false,
};

export const StorageService = {
  // --- FASE 0: INICIALIZACIÓN E HIDRATACIÓN ---

  initialize: () => {
    StorageService.hydrateProfessors();
    StorageService.initializeStudentStats();
    
    // Inicializar otras colecciones si no existen para evitar nulos
    if (!localStorage.getItem(KEYS.TUTORING_SESSIONS)) {
      localStorage.setItem(KEYS.TUTORING_SESSIONS, JSON.stringify([]));
    }
    if (!localStorage.getItem(KEYS.REVIEWS)) {
      localStorage.setItem(KEYS.REVIEWS, JSON.stringify([]));
    }
    if (!localStorage.getItem(KEYS.NOTIFICATIONS)) {
      localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify([]));
    }
    // NUEVO: Inicializar notificaciones de profesor
    if (!localStorage.getItem(KEYS.NOTIFICATIONS_PROFESOR)) {
      localStorage.setItem(KEYS.NOTIFICATIONS_PROFESOR, JSON.stringify([]));
    }
    // NUEVO: Inicializar Sesiones Creadas por Profesores
    if (!localStorage.getItem(KEYS.SESSIONS)) {
      localStorage.setItem(KEYS.SESSIONS, JSON.stringify([]));
    }
    // NUEVO: Inicializar Usuarios (Auth Mock)
    if (!localStorage.getItem(KEYS.USERS)) {
      const demoUsers = [
        { id: 1, email: "admin@profematch.com", pass: "admin123", role: "admin", status: "aprobado", nombres: "Admin" },
        { id: 2, email: "prof@profematch.com", pass: "prof123", role: "profesor", status: "aprobado", nombres: "Profesor Demo" },
        { id: 3, email: "estu@profematch.com", pass: "estu123", role: "estudiante", status: "aprobado", nombres: "Estudiante Demo" }
      ];
      localStorage.setItem(KEYS.USERS, JSON.stringify(demoUsers));
    }
  },

  hydrateProfessors: () => {
    // 1. Obtener profesores actuales del localStorage
    let storedProfessors = [];
    try {
      const data = localStorage.getItem(KEYS.PROFESSORS);
      if (data) storedProfessors = JSON.parse(data);
    } catch (e) {
      console.error("Error leyendo profesores del storage", e);
    }

    // 2. Si está vacío, iniciar como arreglo vacío (para esperar datos del backend)
    if (storedProfessors.length === 0) {
      localStorage.setItem(KEYS.PROFESSORS, JSON.stringify([]));
      return;
    }

    // 3. Mejora de conexión futura: Si ya hay profesores, 
    // verificar y aplicar valores por defecto a los incompletos.
    let changed = false;
    const hydratedProfessors = storedProfessors.map(prof => {
      // Si el profesor no tiene departamento o curso, asumimos que es incompleto
      const isIncomplete = !prof.curso || !prof.departamento;
      if (isIncomplete) {
        changed = true;
        return { ...defaultProfessorValues, ...prof, perfilCompletado: false };
      }
      
      if (prof.perfilCompletado === undefined) {
        changed = true;
        return { ...prof, perfilCompletado: true }; 
      }
      return prof;
    });

    if (changed) {
      localStorage.setItem(KEYS.PROFESSORS, JSON.stringify(hydratedProfessors));
    }
  },

  initializeStudentStats: () => {
    const stats = localStorage.getItem(KEYS.STUDENT_STATS);
    if (!stats) {
      const initialStats = {
        score: 100,
        totalHours: 0,
        badges: []
      };
      localStorage.setItem(KEYS.STUDENT_STATS, JSON.stringify(initialStats));
    }
  },

  // --- MÉTODOS CRUD GENÉRICOS ---

  getProfessors: () => {
    const data = localStorage.getItem(KEYS.PROFESSORS);
    return data ? JSON.parse(data) : [];
  },

  getProfessorByEmail: (email) => {
    const profs = StorageService.getProfessors();
    return profs.find(p => p.email === email) || null;
  },

  saveProfessorProfile: (profData) => {
    const profs = StorageService.getProfessors();
    const index = profs.findIndex(p => p.email === profData.email);
    if (index !== -1) {
      profs[index] = { ...profs[index], ...profData, perfilCompletado: true };
    } else {
      profs.push({ ...defaultProfessorValues, ...profData, perfilCompletado: true, id: Date.now() });
    }
    localStorage.setItem(KEYS.PROFESSORS, JSON.stringify(profs));
  },

  // Helper para buscar profesores que sí tienen perfil completo
  getCompleteProfessors: () => {
    const all = StorageService.getProfessors();
    return all.filter(p => p.perfilCompletado);
  },

  getStudentStats: () => {
    const data = localStorage.getItem(KEYS.STUDENT_STATS);
    return data ? JSON.parse(data) : null;
  },

  updateStudentStats: (newStats) => {
    const current = StorageService.getStudentStats() || {};
    const updated = { ...current, ...newStats };
    localStorage.setItem(KEYS.STUDENT_STATS, JSON.stringify(updated));
    return updated;
  },

  updateScore: (pointChange) => {
    const stats = StorageService.getStudentStats();
    if (stats) {
      // Asegurar que el score no baje de 0 ni suba de 100
      const newScore = Math.max(0, Math.min(100, stats.score + pointChange));
      StorageService.updateStudentStats({ score: newScore });
    }
  },

  getTutoringSessions: () => {
    const data = localStorage.getItem(KEYS.TUTORING_SESSIONS);
    return data ? JSON.parse(data) : [];
  },

  saveTutoringSession: (session) => {
    const sessions = StorageService.getTutoringSessions();
    sessions.push({ ...session, id: Date.now() });
    localStorage.setItem(KEYS.TUTORING_SESSIONS, JSON.stringify(sessions));
  },

  updateTutoringSession: (sessionId, updatedFields) => {
    const sessions = StorageService.getTutoringSessions();
    const index = sessions.findIndex(s => s.id === sessionId);
    if (index !== -1) {
      sessions[index] = { ...sessions[index], ...updatedFields };
      localStorage.setItem(KEYS.TUTORING_SESSIONS, JSON.stringify(sessions));
    }
  },

  getReviews: () => {
    const data = localStorage.getItem(KEYS.REVIEWS);
    return data ? JSON.parse(data) : [];
  },

  saveReview: (review) => {
    const reviews = StorageService.getReviews();
    reviews.push({ ...review, id: Date.now() });
    localStorage.setItem(KEYS.REVIEWS, JSON.stringify(reviews));
  },

  getNotifications: () => {
    const data = localStorage.getItem(KEYS.NOTIFICATIONS);
    return data ? JSON.parse(data) : [];
  },

  saveNotification: (notification) => {
    const notifications = StorageService.getNotifications();
    notifications.push({ 
      ...notification, 
      id: Date.now(), 
      read: false,
      timestamp: Date.now()
    });
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  },

  markNotificationAsRead: (notificationId) => {
    const notifications = StorageService.getNotifications();
    const index = notifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      notifications[index].read = true;
      localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    }
  },

  updateProfessorScore: (profesorId, pointChange) => {
    const profesores = StorageService.getProfessors();
    const index = profesores.findIndex(p => p.id === profesorId);
    if (index !== -1) {
      const currentScore = profesores[index].scoreConfiabilidad !== undefined ? profesores[index].scoreConfiabilidad : 100;
      profesores[index].scoreConfiabilidad = Math.max(0, currentScore + pointChange);
      localStorage.setItem(KEYS.PROFESSORS, JSON.stringify(profesores));
    }
  },

  // --- NUEVOS MÉTODOS PARA NOTIFICACIONES DE PROFESOR ---
  
  getNotificationsProfesor: () => {
    const data = localStorage.getItem(KEYS.NOTIFICATIONS_PROFESOR);
    return data ? JSON.parse(data) : [];
  },

  saveNotificationProfesor: (notification) => {
    const notifications = StorageService.getNotificationsProfesor();
    notifications.push({ 
      ...notification, 
      id: Date.now(), 
      read: false,
      timestamp: Date.now()
    });
    localStorage.setItem(KEYS.NOTIFICATIONS_PROFESOR, JSON.stringify(notifications));
  },

  markNotificationProfesorAsRead: (notificationId) => {
    const notifications = StorageService.getNotificationsProfesor();
    const index = notifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      notifications[index].read = true;
      localStorage.setItem(KEYS.NOTIFICATIONS_PROFESOR, JSON.stringify(notifications));
    }
  },

  // --- NUEVOS MÉTODOS PARA SESIONES CREADAS POR PROFESORES ---
  
  getSessions: () => {
    const data = localStorage.getItem(KEYS.SESSIONS);
    return data ? JSON.parse(data) : [];
  },

  saveSession: (session) => {
    const sessions = StorageService.getSessions();
    sessions.push({ 
      ...session, 
      id: Date.now(), 
      inscritos: 0,
      cuposMaximos: 40,
      estado: "Programada", // Programada, Finalizada, Cancelada
      timestamp: Date.now()
    });
    localStorage.setItem(KEYS.SESSIONS, JSON.stringify(sessions));
  },

  updateSession: (sessionId, updatedFields) => {
    const sessions = StorageService.getSessions();
    const index = sessions.findIndex(s => s.id === sessionId);
    if (index !== -1) {
      sessions[index] = { ...sessions[index], ...updatedFields };
      localStorage.setItem(KEYS.SESSIONS, JSON.stringify(sessions));
    }
  },

  // --- NUEVOS MÉTODOS DE AUTENTICACIÓN Y USUARIOS (MOCK DB) ---
  
  getUsers: () => {
    const data = localStorage.getItem(KEYS.USERS);
    let users = data ? JSON.parse(data) : [];
    
    // Forzar inyección de usuarios DEMO si la lista está vacía
    if (users.length === 0) {
      const demoUsers = [
        { id: 1, email: "admin@profematch.com", pass: "admin123", role: "admin", status: "aprobado", nombres: "Admin" },
        { id: 2, email: "prof@profematch.com", pass: "prof123", role: "profesor", status: "aprobado", nombres: "Profesor Demo" },
        { id: 3, email: "estu@profematch.com", pass: "estu123", role: "estudiante", status: "aprobado", nombres: "Estudiante Demo" }
      ];
      localStorage.setItem(KEYS.USERS, JSON.stringify(demoUsers));
      users = demoUsers;
    }
    return users;
  },

  registerUser: (userData) => {
    const users = StorageService.getUsers();
    // Ambos roles ahora entran como pendientes por defecto, a menos que se sobreescriba en el objeto
    const newUser = {
      ...userData,
      id: Date.now(),
      status: userData.status || "pendiente", // 'pendiente' o 'aprobado'
      registeredAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    return newUser;
  },

  loginUser: (email, password) => {
    const users = StorageService.getUsers();
    const user = users.find(u => u.email === email && u.pass === password);
    
    if (!user) {
      return { success: false, error: "invalid_credentials" };
    }

    if (user.status === "pendiente") {
      return { success: false, error: "pending_approval" };
    }

    return { success: true, user };
  },

  updateUserStatus: (userId, newStatus) => {
    const users = StorageService.getUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users[index].status = newStatus;
      localStorage.setItem(KEYS.USERS, JSON.stringify(users));
      return true;
    }
    return false;
  }
};