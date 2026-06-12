export const courseDurations = {
  "Programación Web": 1.5,
  "Psicología Social": 2.0,
  "Cálculo I": 2.0,
  "Física II": 2.5,
  "Microeconomía": 1.5,
  "Base de Datos": 2.0,
  "Anatomía Humana": 3.0,
  "Redacción Académica": 1.0,
  "Gestión de Procesos": 1.5,
  "Derecho Constitucional": 2.0,
  "Estructura de Datos": 2.0,
  "Álgebra Lineal": 1.5,
  "Neuropsicología": 2.0
};

export const profesoresData = [
  {
    id: 1,
    nombre: "Prof. Carlos Ramirez",
    departamento: "Ingeniería de Sistemas",
    curso: "Programación Web",
    rating: 4.9,
    dificultad: 7.5,
    precioHora: 30,
    foto: "https://randomuser.me/api/portraits/men/10.jpg",
    metodologia: "Aprendizaje basado en proyectos y principios SOLID.",
    etiquetas: ["Innovador", "Exigente", "Claro"],
    descripcion: "Especialista en desarrollo Fullstack con más de 10 años de experiencia en la industria tecnológica."
  },
  {
    id: 11, // Mismo profesor, otro curso
    nombre: "Prof. Carlos Ramirez",
    departamento: "Ingeniería de Sistemas",
    curso: "Base de Datos",
    rating: 4.8,
    dificultad: 8.0,
    precioHora: 35,
    foto: "https://randomuser.me/api/portraits/men/10.jpg",
    metodologia: "Modelado relacional intensivo.",
    etiquetas: ["Estructurado", "Práctico"],
    descripcion: "Especialista en desarrollo Fullstack con más de 10 años de experiencia en la industria tecnológica."
  },
  {
    id: 2,
    nombre: "Dra. Carmen López",
    departamento: "Psicología",
    curso: "Psicología Social",
    rating: 4.9,
    dificultad: 4.8,
    precioHora: 22,
    foto: "https://randomuser.me/api/portraits/women/11.jpg",
    metodologia: "Enfoque humanista con dinámicas grupales constantes.",
    etiquetas: ["Empático", "Comprensivo", "Dinámico"],
    descripcion: "Investigadora enfocada en el comportamiento organizacional."
  },
  {
    id: 12, // Mismo profesor, otro curso
    nombre: "Dra. Carmen López",
    departamento: "Psicología",
    curso: "Neuropsicología",
    rating: 4.7,
    dificultad: 7.5,
    precioHora: 28,
    foto: "https://randomuser.me/api/portraits/women/11.jpg",
    metodologia: "Análisis clínico y mapas cerebrales interactivos.",
    etiquetas: ["Analítica", "Paciente"],
    descripcion: "Investigadora con especialidad en redes neuronales cognitivas."
  },
  {
    id: 3,
    nombre: "Dr. Ana Martinez",
    departamento: "Matemáticas",
    curso: "Cálculo I",
    rating: 4.8,
    dificultad: 9.2,
    precioHora: 25,
    foto: "https://randomuser.me/api/portraits/women/12.jpg",
    metodologia: "Resolución intensiva de problemas y rigor académico.",
    etiquetas: ["Claro", "Exigente", "Puntual"],
    descripcion: "Doctora en Ciencias Matemáticas enfocada en algoritmos complejos."
  },
  {
    id: 13, // Mismo curso (Cálculo I), diferente profesor (Competencia)
    nombre: "Prof. Mateo Rojas",
    departamento: "Matemáticas",
    curso: "Cálculo I",
    rating: 4.2,
    dificultad: 6.5,
    precioHora: 15,
    foto: "https://randomuser.me/api/portraits/men/22.jpg",
    metodologia: "Repaso de fórmulas con ejercicios guiados paso a paso.",
    etiquetas: ["Básico", "Accesible", "Paciente"],
    descripcion: "Estudiante de maestría apasionado por la enseñanza introductoria."
  },
  {
    id: 4,
    nombre: "Dra. Patricia Silva",
    departamento: "Física",
    curso: "Física II",
    rating: 4.7,
    dificultad: 8.5,
    precioHora: 35,
    foto: "https://randomuser.me/api/portraits/women/13.jpg",
    metodologia: "Uso de simuladores virtuales y experimentos en clase.",
    etiquetas: ["Brillante", "Desafiante"],
    descripcion: "Experta en mecánica cuántica y aplicación de leyes físicas."
  },
  {
    id: 5,
    nombre: "Prof. Luis Hernández",
    departamento: "Economía",
    curso: "Microeconomía",
    rating: 4.6,
    dificultad: 6.8,
    precioHora: 20,
    foto: "https://randomuser.me/api/portraits/men/14.jpg",
    metodologia: "Análisis de casos reales del mercado financiero.",
    etiquetas: ["Práctico", "Actualizado"],
    descripcion: "Consultor económico con visión sobre tendencias de mercado."
  },
  {
    id: 6,
    nombre: "Prof. Roberto Diaz",
    departamento: "Ingeniería de Sistemas",
    curso: "Base de Datos",
    rating: 4.4,
    dificultad: 7.9,
    precioHora: 27,
    foto: "https://randomuser.me/api/portraits/men/16.jpg",
    metodologia: "Laboratorios prácticos integrando SQL y NoSQL.",
    etiquetas: ["Técnico", "Organizado"],
    descripcion: "Arquitecto de datos con enfoque en sistemas distribuidos."
  },
  {
    id: 14, // Nuevo profesor, Programación Web (Competencia)
    nombre: "Ing. Sofia Morales",
    departamento: "Ingeniería de Sistemas",
    curso: "Programación Web",
    rating: 4.9,
    dificultad: 8.2,
    precioHora: 45,
    foto: "https://randomuser.me/api/portraits/women/24.jpg",
    metodologia: "Bootcamp intensivo enfocado en React y Node.js.",
    etiquetas: ["Moderna", "Rápida", "Premium"],
    descripcion: "Senior Frontend Developer en una compañía multinacional."
  },
  {
    id: 15, // Nuevo profesor, Estructura de Datos
    nombre: "Ing. Sofia Morales",
    departamento: "Ingeniería de Sistemas",
    curso: "Estructura de Datos",
    rating: 4.6,
    dificultad: 8.9,
    precioHora: 40,
    foto: "https://randomuser.me/api/portraits/women/24.jpg",
    metodologia: "Análisis asintótico y resolución de problemas de LeetCode.",
    etiquetas: ["Teórica", "Exigente"],
    descripcion: "Senior Frontend Developer con fuerte base algorítmica."
  },
  {
    id: 7,
    nombre: "Dra. Elena Vargas",
    departamento: "Medicina",
    curso: "Anatomía Humana",
    rating: 4.8,
    dificultad: 9.4,
    precioHora: 40,
    foto: "https://randomuser.me/api/portraits/women/17.jpg",
    metodologia: "Aprendizaje clínico con simulaciones médicas.",
    etiquetas: ["Estricta", "Experta", "Metódica"],
    descripcion: "Especialista en cirugía y formación médica universitaria."
  },
  {
    id: 8,
    nombre: "Prof. Miguel Torres",
    departamento: "Literatura",
    curso: "Redacción Académica",
    rating: 4.5,
    dificultad: 5.1,
    precioHora: 18,
    foto: "https://randomuser.me/api/portraits/men/18.jpg",
    metodologia: "Escritura práctica y análisis crítico.",
    etiquetas: ["Creativo", "Amigable", "Paciente"],
    descripcion: "Editor académico y asesor de publicaciones universitarias."
  },
  {
    id: 9,
    nombre: "Ing. Valeria Castro",
    departamento: "Ingeniería Industrial",
    curso: "Gestión de Procesos",
    rating: 4.7,
    dificultad: 6.9,
    precioHora: 29,
    foto: "https://randomuser.me/api/portraits/women/19.jpg",
    metodologia: "Optimización basada en casos empresariales reales.",
    etiquetas: ["Liderazgo", "Analítica", "Dinámica"],
    descripcion: "Consultora en mejora continua y transformación digital."
  },
  {
    id: 10,
    nombre: "Prof. Diego Salazar",
    departamento: "Derecho",
    curso: "Derecho Constitucional",
    rating: 4.3,
    dificultad: 7.1,
    precioHora: 24,
    foto: "https://randomuser.me/api/portraits/men/20.jpg",
    metodologia: "Debates académicos y análisis jurisprudencial.",
    etiquetas: ["Argumentativo", "Directo", "Culto"],
    descripcion: "Abogado litigante especializado en derecho público."
  },
  {
    id: 16, // Nuevo profesor, Álgebra Lineal
    nombre: "Prof. Hector Lira",
    departamento: "Matemáticas",
    curso: "Álgebra Lineal",
    rating: 4.1,
    dificultad: 6.0,
    precioHora: 18,
    foto: "https://randomuser.me/api/portraits/men/25.jpg",
    metodologia: "Explicación gráfica de vectores y matrices.",
    etiquetas: ["Claro", "Paciente", "Amigable"],
    descripcion: "Especialista en didáctica matemática."
  }
];