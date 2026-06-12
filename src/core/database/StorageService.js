import { profesoresData } from "../../data/profesoresData";

const KEYS = {
  PROFESSORS: "professors",
  STUDENT_STATS: "student_stats",
  TUTORING_SESSIONS: "tutoring_sessions",
  REVIEWS: "reviews",
  NOTIFICATIONS: "notifications",
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

    // 2. Si está vacío, cargar directamente el archivo estático
    if (storedProfessors.length === 0) {
      const initialProfessors = profesoresData.map(prof => ({
        ...prof,
        perfilCompletado: true
      }));
      localStorage.setItem(KEYS.PROFESSORS, JSON.stringify(initialProfessors));
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
  }
};
