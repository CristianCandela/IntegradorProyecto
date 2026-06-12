import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./Inicio.css";
import Hero from "../../components/Hero";
import CtaFinal from "../../components/CtaFinal";

// Imágenes
import heroVideo from "../../images/hero.mp4";
import imagenProblema from "../../images/elproblema.png";
import fotoMaria from "../../images/maria.png";
import fotoCarlos from "../../images/carlos.png";
import fotoAna from "../../images/ana.png";

const DATA_MOCK = [
  { id: 1, nombre: "Juan Pérez", curso: "Cálculo I", univ: "ULIMA" },
  { id: 2, nombre: "Maria Garcia", curso: "Diseño de Patrones", univ: "UPC" },
  { id: 3, nombre: "Carlos Rojas", curso: "Base de Datos", univ: "PUCP" },
  { id: 4, nombre: "Ana Aguirre", curso: "Desarrollo Web", univ: "UNMSM" },
  { id: 5, nombre: "Luis Sánchez", curso: "Algoritmos", univ: "U. de Lima" },
];

export default function Inicio() {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [indexActivo, setIndexActivo] = useState(0);
  const intervalRef = React.useRef(null);

  // --- DATOS ---
  const pasos = [
    {
      titulo: "Buscar",
      subtitulo: "Explora profesores",
      desc: "Accede a perfiles detallados con información académica, metodologías y puntuaciones reales.",
      icon: "bi-search"
    },
    {
      titulo: "Comparar",
      subtitulo: "Compara experiencias",
      desc: "Analiza reseñas verificadas y encuentra el docente que mejor se adapte a tu forma de aprender.",
      icon: "bi-arrow-left-right"
    },
    {
      titulo: "Elegir",
      subtitulo: "Elige con confianza",
      desc: "Reduce la incertidumbre académica y mejora tu experiencia universitaria desde el primer día.",
      icon: "bi-check2-circle"
    }
  ];

  const destacados = [
    { nombre: "Maria Garcia", curso: "Diseño de Patrones", univ: "UPC", foto: fotoMaria, nota: "4.9", frase: "“Explica muy bien”" },
    { nombre: "Ana Aguirre", curso: "Desarrollo Web", univ: "UNMSM", foto: fotoAna, nota: "4.9", frase: "“Clases dinámicas”" },
    { nombre: "Carlos Rojas", curso: "Base de Datos", univ: "PUCP", foto: fotoCarlos, nota: "4.9", frase: "“Excelente metodologia”" }
  ];

  const estadisticasFinales = [
  { 
    icon: "bi bi-people", 
    val: "500+", 
    label: "Profesores", 
    textColor: "#ffffff" 
  },
  { 
    icon: "bi bi-star-fill", 
    val: "10k+", 
    label: "Reseñas",
    textColor: "#ffffff" 
  },
  { 
    icon: "bi bi-graph-up", 
    val: "100%", 
    label: "Satisfacción",  
    textColor: "#ffffff" 
  }
];
  useEffect(() => {
    // Limpiar intervalo previo si existe
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Iniciar nuevo intervalo
    intervalRef.current = setInterval(() => {
      setIndexActivo((prev) => (prev + 1) % pasos.length);
    }, 5000);

    // Cleanup al desmontar
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [pasos.length]);

  // Función para cambiar manualmente y reiniciar el temporizador
  const cambiarPaso = (nuevoIndex) => {
    if (nuevoIndex !== indexActivo) {
      setIndexActivo(nuevoIndex);
      
      // Reiniciar el temporizador desde cero
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        setIndexActivo((prev) => (prev + 1) % pasos.length);
      }, 5000);
    }
  };

  const manejarBusqueda = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    if (valor.length > 1) {
      const filtrados = DATA_MOCK.filter(item =>
        item.nombre.toLowerCase().includes(valor.toLowerCase()) ||
        item.curso.toLowerCase().includes(valor.toLowerCase()) ||
        item.univ.toLowerCase().includes(valor.toLowerCase())
      );
      setResultados(filtrados);
    } else {
      setResultados([]);
    }
  };


  return (
    <main>
      <Hero
        video={heroVideo}
        titulo="Elige al"
        highlight="profesor perfecto"
        subtitulo="Reseñas verificadas y comparativas para tomar las mejores decisiones académicas con ProfeMatch."
      />

      <section className="py-5">
        <div className="container mt-n5">
          
          {/* SECCIÓN BÚSQUEDA */}
          <section className="pb-5">
            <div className="container text-center">
              <div className="search-content mx-auto" style={{ maxWidth: "800px" }}>
                <h2 className="fw-bold mb-3 text-indigo-deep">
                  Encuentra al docente ideal para tu próximo ciclo
                </h2>
                <p className="text-muted mb-4">
                  Busca profesores por curso, carrera o universidad y descubre experiencias reales de otros estudiantes.
                </p>

                <div className="search-bar-container position-relative">
                  <div className="search-glass-wrapper glass-effect round-pill shadow-purple">
                    <i className="bi bi-search search-icon-main"></i>
                    <input
                      type="text"
                      className="search-input-custom"
                      placeholder="Buscar profesor o curso..."
                      value={busqueda}
                      onChange={manejarBusqueda}
                    />
                    <button className="btn-search-action">Buscar</button>
                  </div>

                  {resultados.length > 0 && (
                    <div className="search-results-dropdown text-start glass-effect round-xl shadow-purple">
                      {resultados.map((res) => (
                        <div key={res.id} className="result-item" onClick={() => alert(`Yendo al perfil de ${res.nombre}...`)}>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <strong className="d-block">{res.nombre}</strong>
                              <small className="text-muted">{res.curso} • {res.univ}</small>
                            </div>
                            <i className="bi bi-chevron-right text-muted"></i>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN CÓMO FUNCIONA */}
          <section className="py-5 bg-white">
            <div className="container">
              <div className="text-center mb-5">
                <h2 className="fw-bold text-indigo-deep">
                  Tomar mejores decisiones académicas nunca fue tan fácil
                </h2>
              </div>

              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="how-it-works-display">
                    {pasos.map((paso, i) => (
                      <div 
                        key={i} 
                        className={`step-card glass-effect round-xl shadow-purple p-5 ${i === indexActivo ? 'active' : 'inactive'}`}
                      >
                        <div className="row align-items-center">
                          <div className="col-md-3 text-center">
                            <div className="step-icon-circle mx-auto mb-3 mb-md-0">
                              <i className={`bi ${paso.icon}`}></i>
                            </div>
                          </div>
                          <div className="col-md-9 text-start">
                            <span className="text-violet-main fw-bold text-uppercase fs-7">Paso {i + 1}</span>
                            <h3 className="fw-bold mt-1">{paso.titulo}</h3>
                            <h5 className="text-indigo-deep mb-3">{paso.subtitulo}</h5>
                            <p className="text-muted mb-0 lead">{paso.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="d-flex justify-content-center mt-4 gap-2">
                      {pasos.map((_, i) => (
                        <div 
                          key={i} 
                          className={`step-dot ${i === indexActivo ? 'active' : ''}`}
                          onClick={() => setIndexActivo(i)}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN EL PROBLEMA */}
          <section className="problem-section py-5 text-white">
            <div className="container py-5">
              <div className="row align-items-center g-5">
                <div className="col-lg-6 text-start">
                  <h2 className="fw-bold mb-4 display-5">
                    La elección incorrecta de un docente puede <span className="text-purple-light">afectar todo un ciclo</span> académico
                  </h2>
                  <p className="lead opacity-75 mb-5">
                    Miles de estudiantes toman decisiones importantes basándose únicamente en rumores o comentarios dispersos en redes sociales. ProfeMatch transforma esa información en una experiencia centralizada, transparente y confiable.
                  </p>

                  <div className="row g-4">
                    {[
                      { icon: "bi-graph-down-arrow", label: "Retiros de cursos", color: "#ff4757" },
                      { icon: "bi-cash-stack", label: "Pérdida económica", color: "#ffa502" },
                      { icon: "bi-emoji-frown", label: "Estrés académico", color: "#a78bfa" }
                    ].map((item, i) => (
                      <div className="col-md-4" key={i}>
                        <div className="problem-stat-card glass-effect round-xl p-3 text-center h-100">
                          <i className={`bi ${item.icon} mb-2 d-block`} style={{ fontSize: '1.6rem', color: item.color }}></i>
                          <span className="small fw-bold">{item.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="image-wrapper position-relative">
                    <img 
                      src={imagenProblema} 
                      alt="Estudiante analizando cursos" 
                      className="img-fluid round-xl shadow-2xl border-glass"
                    />
                    <div className="image-glow-effect"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN PROFESORES DESTACADOS */}
          <section className="py-5 bg-light-soft">
            <div className="container py-5">
              <div className="text-center mb-5">
                <h2 className="fw-bold text-indigo-deep display-5">Docentes mejor valorados</h2>
                <p className="text-muted mx-auto mt-3" style={{ maxWidth: "600px" }}>
                  Descubre profesores recomendados por la comunidad estudiantil gracias a su metodología, comunicación y desempeño académico.
                </p>
              </div>

              <div className="row g-4 justify-content-center">
                {destacados.map((profe, i) => (
                  <div className="col-md-4 col-lg-3" key={i}>
                    <div className="teacher-card glass-effect round-xl p-0 overflow-hidden shadow-purple hover-lift">
                      <div className="teacher-image-container">
                        <img src={profe.foto} alt={profe.nombre} className="teacher-img" />
                        <div className="category-badge">Top Docente</div>
                      </div>
                      
                      <div className="p-4 text-center">
                        <h5 className="fw-bold mb-1">{profe.nombre}</h5>
                        <p className="text-violet-main small fw-semibold mb-2">{profe.curso} • {profe.univ}</p>
                        
                        <div className="rating-pill mx-auto mb-3">
                          <i className="bi bi-star-fill me-1"></i>
                          <span>{profe.nota}</span>
                        </div>
                        
                        <div className="testimonial-quote mb-4">
                          <p className="small italic text-muted mb-0">{profe.frase}</p>
                        </div>
                        
                        <button className="btn-view-profile w-100">Ver perfil</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECCIÓN BENEFICIOS */}
          <section className="benefits-section py-5">
            <div className="container py-5">
              <div className="row g-5 align-items-center">
                
                <div className="col-lg-6 text-start">
                  <div className="benefit-card-student p-4 p-md-5 round-xl shadow-purple-sm">
                    <span className="badge bg-purple-soft text-violet-main mb-3 px-3 py-2 round-pill">Para Estudiantes</span>
                    <h2 className="fw-bold text-indigo-deep mb-4">Pensado para estudiantes</h2>
                    <ul className="list-unstyled benefits-list">
                      {[
                        "Reduce la incertidumbre al matricularte",
                        "Descubre metodologías de enseñanza",
                        "Compara experiencias reales",
                        "Encuentra tutorías fácilmente",
                        "Mejora tu rendimiento académico"
                      ].map((item, index) => (
                        <li key={index} className="d-flex align-items-start mb-3">
                          <div className="check-icon-box me-3"><i className="bi bi-check-lg"></i></div>
                          <span className="text-muted fw-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="col-lg-6 text-start">
                  <div className="benefit-card-teacher p-4 p-md-5 round-xl shadow-lg">
                    <span className="badge bg-white-transparent text-white mb-3 px-3 py-2 round-pill">Para Docentes</span>
                    <h2 className="fw-bold mb-4 text-white">Impulsa también la reputación docente</h2>
                    <p className="opacity-75 mb-4 text-white">
                      ProfeMatch permite que los docentes destaquen su experiencia, construyan una marca personal sólida y conecten con estudiantes interesados en sus cursos y tutorías.
                    </p>
                    <div className="d-flex gap-3 mt-5 position-relative" style={{ zIndex: 2 }}>
                      {[{ icon: "award", text: "Reputación" }, { icon: "megaphone", text: "Alcance" }, { icon: "people", text: "Conexión" }].map((stat, i) => (
                        <div key={i} className="mini-card-stat">
                          <i className={`bi bi-${stat.icon}`}></i>
                          <span className="d-block small mt-1">{stat.text}</span>
                        </div>
                      ))}
                    </div>
                    <div className="deco-circle"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ESTADÍSTICAS */}
          <div className="row g-4 py-5">
            {estadisticasFinales.map((stat, i) => (
              <div className="col-md-4" key={i}>
                <div className="stat-card glass-effect round-xl shadow-purple hover-lift p-4 text-center"
                     style={{
                       background: 'var(--gradient-primary)' 
                     }}>
                  <div className="icon-box mx-auto mb-3 d-flex align-items-center justify-content-center"
                       style={{ color: stat.textColor }}> 
                    <i className={`${stat.icon} fs-3`}></i>
                  </div>
                  <h2 className="fw-bold text-white m-0">{stat.val}</h2>
                  <p className="text-white opacity-75 m-0">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* SECCIÓN FINAL (CTA) */}
      <CtaFinal />
    </main>
  );
}