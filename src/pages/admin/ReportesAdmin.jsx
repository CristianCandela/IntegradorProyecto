import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// IMPORTACIÓN EXPLÍCITA COMPATIBLE CON TU ENTORNO
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale, 
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler 
} from 'chart.js';
import { Bar, Line, Radar } from 'react-chartjs-2';

// Registro manual idéntico al estándar del proyecto
ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ReportesAdmin() {
  const [reporteProfesores, setReporteProfesores] = useState([
    { 
      id: 1, nombre: "Carlos Gómez", facultad: "Ingeniería", clasesDadas: 18, alumnosAtendidos: 340, calificacion: 4.8, tendencia: "sube",
      universidades: ["Universidad Tecnológica del Perú (UTP)", "Universidad Nacional de Ingeniería"],
      infoAcademica: "Ingeniero de Sistemas con Maestría en Arquitectura de Software. Especialista en algoritmos y estructuras de datos.",
      metricasRadar: [4.9, 4.8, 4.5, 4.9, 4.6], 
      resenas: [
        { autor: "Ana Silva", curso: "Algoritmos", fecha: "10 Jun 2026", criterios: { claridad: 5, exigencia: 5, disponibilidad: 4 }, comentario: "Excelente profesor, explica muy bien los árboles binarios y siempre tiene paciencia." },
        { autor: "Anónimo", curso: "Estructura de Datos", fecha: "05 Jun 2026", criterios: { claridad: 4, exigencia: 5, disponibilidad: 5 }, comentario: "Muy exigente con los proyectos, pero se aprende muchísimo. 100% recomendado." },
        { autor: "Luis P.", curso: "Análisis de Sistemas", fecha: "28 May 2026", criterios: { claridad: 5, exigencia: 4, disponibilidad: 4 }, comentario: "Sus diapositivas son muy claras. Me ayudó a salvar el ciclo." }
      ],
      tutorias: [
        { estudiante: "Ana Silva", sesiones: 3, calificacion: 5, comentario: "Resolvió todas mis dudas para el examen parcial.", alerta: null },
        { estudiante: "Marcos R.", sesiones: 1, calificacion: 4, comentario: "Buena clase, aunque fue un poco rápido.", alerta: null }
      ]
    },
    { 
      id: 2, nombre: "Marta Rivas", facultad: "Sistemas", clasesDadas: 14, alumnosAtendidos: 210, calificacion: 4.9, tendencia: "mantiene",
      universidades: ["Universidad Tecnológica del Perú (UTP)"],
      infoAcademica: "Magíster en Gestión de Tecnologías de la Información. Experta en metodologías ágiles y Scrum.",
      metricasRadar: [5.0, 4.9, 4.8, 4.9, 4.5],
      resenas: [
        { autor: "Juan P.", curso: "Ingeniería de Software", fecha: "02 Jun 2026", criterios: { claridad: 5, exigencia: 4, disponibilidad: 5 }, comentario: "La mejor profesora de la facultad. Muy empática y clara." }
      ],
      tutorias: [
        { estudiante: "Juan P.", sesiones: 2, calificacion: 5, comentario: "Excelente asesoría para mi tesis.", alerta: null }
      ]
    },
    { 
      id: 3, nombre: "Luis Ramírez", facultad: "Ciencias Básicas", clasesDadas: 15, alumnosAtendidos: 450, calificacion: 3.2, tendencia: "baja",
      universidades: ["Universidad Tecnológica del Perú (UTP)", "Universidad San Marcos"],
      infoAcademica: "Licenciado en Matemáticas Puras. Docente investigador.",
      metricasRadar: [2.5, 4.8, 2.0, 3.0, 5.0],
      resenas: [
        { autor: "Anónimo", curso: "Cálculo III", fecha: "11 Jun 2026", criterios: { claridad: 2, exigencia: 5, disponibilidad: 1 }, comentario: "Sabe mucho, pero no sabe explicar. Además, cancela las clases a última hora." },
        { autor: "Pedro Ruiz", curso: "Física", fecha: "01 Jun 2026", criterios: { claridad: 3, exigencia: 5, disponibilidad: 2 }, comentario: "Sus exámenes son imposibles y casi nunca responde los correos." }
      ],
      tutorias: [
        { estudiante: "Pedro Ruiz", sesiones: 1, calificacion: 2, comentario: "Llegó tarde y se fue antes.", alerta: "Llegó 20 minutos tarde a la sesión agendada." },
        { estudiante: "María T.", sesiones: 1, calificacion: 1, comentario: "Nunca se presentó.", alerta: "No-show. Cancelación sin previo aviso." }
      ]
    },
    { id: 4, nombre: "Elena Silva", facultad: "Ingeniería", clasesDadas: 9, alumnosAtendidos: 120, calificacion: 4.5, tendencia: "sube", universidades: ["UTP"], infoAcademica: "Ingeniera Civil.", metricasRadar: [4.5, 4.5, 4.5, 4.5, 4.5], resenas: [], tutorias: [] },
    { id: 5, nombre: "Jorge Peralta", facultad: "Negocios", clasesDadas: 11, alumnosAtendidos: 180, calificacion: 4.1, tendencia: "mantiene", universidades: ["UTP"], infoAcademica: "MBA en Administración.", metricasRadar: [4.0, 4.2, 4.0, 4.5, 4.0], resenas: [], tutorias: [] }
  ]);

  const [filtroFacultad, setFiltroFacultad] = useState("Todas");
  const [profesorSeleccionado, setProfesorSeleccionado] = useState(null);

  const profesoresFiltrados = filtroFacultad === "Todas" 
    ? reporteProfesores 
    : reporteProfesores.filter(p => p.facultad === filtroFacultad);

  const datosBarras = {
    labels: profesoresFiltrados.map(p => p.nombre),
    datasets: [{
      label: 'Calificación Promedio',
      data: profesoresFiltrados.map(p => p.calificacion),
      backgroundColor: profesoresFiltrados.map(p => p.calificacion >= 4.0 ? '#1F0954' : '#dc3545'),
      borderRadius: 6,
    }],
  };

  const datosLineas = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4 (Actual)'],
    datasets: [{
      label: 'Volumen de Clases (Plataforma)',
      data: [45, 52, 38, 67],
      borderColor: '#1F0954',
      backgroundColor: 'rgba(31, 9, 84, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#1F0954'
    }],
  };

  // CONFIGURACIÓN CORREGIDA: Exclusiva para el gráfico de barras (Límite 5)
  const opcionesGraficoBarras = { 
    responsive: true, 
    maintainAspectRatio: false, 
    plugins: { legend: { display: false } }, 
    scales: { 
      y: { beginAtZero: true, max: 5, grid: { color: 'rgba(0, 0, 0, 0.05)' } }, 
      x: { grid: { display: false } } 
    } 
  };

  // CONFIGURACIÓN CORREGIDA: Exclusiva para el gráfico de líneas (Sin límite máximo)
  const opcionesGraficoLineas = { 
    responsive: true, 
    maintainAspectRatio: false, 
    plugins: { legend: { display: false } }, 
    scales: { 
      y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' } }, // <-- Se eliminó el 'max: 5' aquí
      x: { grid: { display: false } } 
    } 
  };

  const generarDatosRadar = (metricas) => ({
    labels: ['Claridad Pedagógica', 'Dominio del Tema', 'Disponibilidad', 'Puntualidad', 'Nivel de Exigencia'],
    datasets: [{
      label: 'Puntaje de Evaluación (0-5)',
      data: metricas || [0,0,0,0,0],
      backgroundColor: 'rgba(31, 9, 84, 0.2)', 
      borderColor: '#1F0954',
      pointBackgroundColor: '#1F0954',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#1F0954',
      borderWidth: 2,
    }]
  });

  const opcionesRadar = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: { 
        angleLines: { color: 'rgba(0, 0, 0, 0.1)' }, 
        grid: { color: 'rgba(0, 0, 0, 0.1)' }, 
        pointLabels: { font: { size: 11, weight: 'bold' }, color: '#6c757d' }, 
        ticks: { min: 0, max: 5, stepSize: 1, display: false } 
      }
    },
    plugins: { legend: { display: false } }
  };

  const descargarPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("ProfeMatch - Reporte de Rendimiento Docente", 14, 22);
      doc.setFontSize(10);
      doc.text(`Fecha de emisión: ${new Date().toLocaleDateString()}`, 14, 30);
      doc.text(`Filtro aplicado: ${filtroFacultad}`, 14, 36);

      const columnas = ["Profesor", "Facultad", "Clases Dictadas", "Alumnos", "Calificación"];
      const filas = profesoresFiltrados.map(p => [p.nombre, p.facultad, p.clasesDadas.toString(), p.alumnosAtendidos.toString(), `${p.calificacion} / 5.0`]);

      autoTable(doc, {
        startY: 45,
        head: [columnas],
        body: filas,
        theme: 'striped',
        headStyles: { fillColor: [31, 9, 84] },
        styles: { fontSize: 9 }
      });
      doc.save(`Reporte_Academico_${filtroFacultad.replace(" ", "_")}.pdf`);
    } catch (error) {
      console.error("Error al generar PDF:", error);
      alert("Hubo un error al generar el documento.");
    }
  };

  const cardStyle = { transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)", borderRadius: '15px' };
  const handleMouseEnter = (e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 15px rgba(0,0,0,0.1)"; };
  const handleMouseLeave = (e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; };

  return (
    <div className="d-flex">
      <Sidebar role="admin" />

      <div className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', overflowX: 'hidden' }}>
        
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold mb-1" style={{ color: '#1F0954' }}>Informes y Estadísticas</h2>
            <p className="text-muted small mb-0">Análisis académico y rendimiento del profesorado.</p>
          </div>
          <button className="btn text-white fw-semibold shadow-sm px-4 d-flex align-items-center gap-2 rounded-pill" style={{ backgroundColor: '#1F0954' }} onClick={descargarPDF}>
            <i className="bi bi-file-earmark-pdf-fill"></i> Exportar a PDF
          </button>
        </div>

        <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '15px' }}>
          <div className="card-body p-3 d-flex align-items-center gap-3">
            <span className="fw-bold text-muted small"><i className="bi bi-funnel-fill me-1"></i> Filtros:</span>
            <select className="form-select bg-light border-0 w-auto fw-semibold text-secondary cursor-pointer" value={filtroFacultad} onChange={(e) => setFiltroFacultad(e.target.value)}>
              <option value="Todas">Todas las Facultades</option>
              <option value="Ingeniería">Ingeniería</option>
              <option value="Sistemas">Sistemas</option>
              <option value="Ciencias Básicas">Ciencias Básicas</option>
              <option value="Negocios">Negocios</option>
            </select>
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle ms-auto">
              Mostrando: {profesoresFiltrados.length} docentes
            </span>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="card border-0 shadow-sm h-100 bg-white" style={cardStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div className="card-body p-3 border-start border-primary border-5 rounded-end">
                <span className="text-muted small fw-bold text-uppercase d-block mb-1">Clases Impartidas</span>
                <h3 className="fw-bold text-primary mb-1">202</h3>
                <small className="text-muted d-block mt-2">Mes de Junio (Global)</small>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="card border-0 shadow-sm h-100 bg-white" style={cardStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div className="card-body p-3 border-start border-success border-5 rounded-end">
                <span className="text-muted small fw-bold text-uppercase d-block mb-1">Alumnos Atendidos</span>
                <h3 className="fw-bold text-success mb-1">1,300</h3>
                <small className="text-muted d-block mt-2">Participaciones totales</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 bg-white" style={cardStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div className="card-body p-3 border-start border-warning border-5 rounded-end">
                <span className="text-muted small fw-bold text-uppercase d-block mb-1">Calidad Promedio</span>
                <h3 className="fw-bold mb-1" style={{ color: '#D4AF37' }}>4.3 <i className="bi bi-star-fill fs-5"></i></h3>
                <small className="text-muted d-block mt-2">Evaluación general docente</small>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="card border-0 shadow-sm bg-white p-4 h-100" style={{ borderRadius: '15px' }}>
              <h6 className="fw-bold text-dark mb-3"><i className="bi bi-bar-chart-fill me-2" style={{ color: '#1F0954' }}></i>Rendimiento Docente (Calificación)</h6>
              <div style={{ height: '240px' }}>
                <Bar data={datosBarras} options={opcionesGraficoBarras} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm bg-white p-4 h-100" style={{ borderRadius: '15px' }}>
              <h6 className="fw-bold text-dark mb-3"><i className="bi bi-graph-up-arrow me-2" style={{ color: '#1F0954' }}></i>Volumen de Clases (Últimas 4 Semanas)</h6>
              <div style={{ height: '240px' }}>
                <Line data={datosLineas} options={opcionesGraficoLineas} />
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm bg-white" style={{ borderRadius: '15px' }}>
          <div className="card-body p-4">
            <h5 className="fw-bold text-dark mb-3"><i className="bi bi-card-checklist me-2" style={{ color: '#1F0954' }}></i>Desempeño Detallado por Profesor</h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.85rem' }}>
                <thead className="table-light text-secondary">
                  <tr>
                    <th className="ps-3">Profesor</th>
                    <th>Facultad</th>
                    <th>Clases Dictadas</th>
                    <th>Alumnos Impactados</th>
                    <th>Calificación</th>
                    <th className="text-end pe-3">Análisis</th>
                  </tr>
                </thead>
                <tbody>
                  {profesoresFiltrados.length > 0 ? (
                    profesoresFiltrados.map(prof => (
                      <tr key={prof.id} style={{ cursor: 'pointer' }} onClick={() => setProfesorSeleccionado(prof)} title="Clic para ver expediente académico">
                        <td className="ps-3 py-3 fw-bold text-dark">{prof.nombre}</td>
                        <td className="text-muted">{prof.facultad}</td>
                        <td><span className="badge bg-light text-dark border px-2 py-1">{prof.clasesDadas} clases</span></td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <span className="fw-semibold">{prof.alumnosAtendidos}</span>
                            <div className="progress flex-grow-1" style={{ height: "4px", maxWidth: "80px" }}>
                              <div className="progress-bar bg-info" style={{ width: `${(prof.alumnosAtendidos/500)*100}%` }}></div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`fw-bold ${prof.calificacion >= 4.5 ? 'text-success' : prof.calificacion >= 4.0 ? 'text-primary' : 'text-danger'}`}>
                            {prof.calificacion} <i className="bi bi-star-fill"></i>
                          </span>
                        </td>
                        <td className="text-end pe-3">
                          {prof.tendencia === 'sube' && <span className="badge bg-success-subtle text-success"><i className="bi bi-arrow-up"></i> Subiendo</span>}
                          {prof.tendencia === 'mantiene' && <span className="badge bg-secondary-subtle text-secondary"><i className="bi bi-arrow-right"></i> Estable</span>}
                          {prof.tendencia === 'baja' && <span className="badge bg-danger-subtle text-danger"><i className="bi bi-arrow-down"></i> Declive</span>}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">No hay datos para esta facultad.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* MODAL EXPEDIENTE ACADÉMICO */}
      {profesorSeleccionado && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050, backdropFilter: 'blur(3px)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              
              <div className="text-white d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: '#1F0954' }}>
                <h5 className="modal-title fw-bold m-0" style={{ fontSize: '1.1rem' }}>
                  <i className="bi bi-person-badge-fill me-2"></i>Expediente Académico: {profesorSeleccionado.nombre}
                </h5>
                <button type="button" className="btn-close btn-close-white shadow-none m-0" onClick={() => setProfesorSeleccionado(null)}></button>
              </div>

              <div className="modal-body p-0 bg-light" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                
                <div className="row g-0 bg-white border-bottom">
                  <div className="col-md-5 p-4 d-flex flex-column justify-content-center align-items-center border-end">
                    <h1 className="display-3 fw-bold text-dark mb-0">{profesorSeleccionado.calificacion}</h1>
                    <div className="text-warning fs-4 mb-2">
                      {Array.from({ length: Math.round(profesorSeleccionado?.calificacion || 0) }).map((_, i) => (<i key={`star-fill-${i}`} className="bi bi-star-fill"></i>))}
                      {Array.from({ length: 5 - Math.round(profesorSeleccionado?.calificacion || 0) }).map((_, i) => (<i key={`star-empty-${i}`} className="bi bi-star"></i>))}
                    </div>
                    <span className="text-muted small mb-3">Basado en {profesorSeleccionado.clasesDadas} valoraciones</span>
                    
                    <div className="w-100 text-start mt-3">
                      <h6 className="fw-bold text-dark mb-1"><i className="bi bi-mortarboard-fill me-2" style={{ color: '#1F0954' }}></i>Información Académica</h6>
                      <p className="text-muted small mb-3">{profesorSeleccionado.infoAcademica}</p>
                      
                      <h6 className="fw-bold text-dark mb-1"><i className="bi bi-building-fill me-2" style={{ color: '#1F0954' }}></i>Instituciones Asociadas</h6>
                      <div className="d-flex flex-wrap gap-1">
                        {profesorSeleccionado?.universidades?.map((uni, idx) => (
                          <span key={idx} className="badge bg-secondary-subtle text-secondary border border-secondary-subtle">{uni}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-7 p-4">
                    <h6 className="fw-bold text-dark text-center mb-3 text-uppercase" style={{ letterSpacing: '1px' }}>Rendimiento Estructural</h6>
                    <div style={{ height: '250px' }}>
                      <Radar data={generarDatosRadar(profesorSeleccionado?.metricasRadar)} options={opcionesRadar} />
                    </div>
                  </div>
                </div>

                <div className="p-4 row g-4">
                  <div className="col-md-6">
                    <h6 className="fw-bold text-dark mb-3"><i className="bi bi-chat-quote-fill me-2 text-primary"></i>Últimas Reseñas de Alumnos</h6>
                    {profesorSeleccionado?.resenas && profesorSeleccionado.resenas.length > 0 ? (
                      profesorSeleccionado.resenas.map((resena, idx) => (
                        <div key={idx} className="card border-0 shadow-sm mb-3">
                          <div className="card-body p-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span className="fw-bold text-dark small">{resena.autor}</span>
                              <span className="text-muted" style={{ fontSize: '0.7rem' }}>{resena.fecha}</span>
                            </div>
                            <span className="badge bg-light text-dark border mb-2 d-inline-block" style={{ fontSize: '0.7rem' }}>Curso: {resena.curso}</span>
                            
                            <div className="d-flex gap-2 mb-2" style={{ fontSize: '0.7rem' }}>
                              <span className="text-success"><i className="bi bi-check-circle-fill me-1"></i>Claridad: {resena.criterios.claridad}/5</span>
                              <span className="text-warning"><i className="bi bi-lightning-fill me-1"></i>Exigencia: {resena.criterios.exigencia}/5</span>
                            </div>
                            
                            <p className="mb-0 text-secondary fst-italic" style={{ fontSize: '0.8rem' }}>"{resena.comentario}"</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted small">No hay reseñas recientes registradas.</p>
                    )}
                  </div>

                  <div className="col-md-6">
                    <h6 className="fw-bold text-dark mb-3"><i className="bi bi-journal-bookmark-fill me-2 text-success"></i>Historial de Tutorías Privadas</h6>
                    {profesorSeleccionado?.tutorias && profesorSeleccionado.tutorias.length > 0 ? (
                      profesorSeleccionado.tutorias.map((tutoria, idx) => (
                        <div key={idx} className="card border-0 shadow-sm mb-3 border-start border-3 border-info">
                          <div className="card-body p-3">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <span className="fw-bold text-dark small">Tutoría con: {tutoria.estudiante}</span>
                              <span className="badge bg-primary rounded-pill">{tutoria.calificacion} <i className="bi bi-star-fill"></i></span>
                            </div>
                            <span className="text-muted d-block mb-2" style={{ fontSize: '0.75rem' }}>Total: {tutoria.sesiones} sesión(es) completadas</span>
                            <p className="mb-2 text-secondary" style={{ fontSize: '0.8rem' }}>Comentario: {tutoria.comentario}</p>
                            
                            {tutoria.alerta && (
                              <div className="alert alert-danger p-2 mb-0 mt-2 d-flex align-items-start gap-2" style={{ fontSize: '0.75rem' }}>
                                <i className="bi bi-exclamation-triangle-fill mt-1"></i>
                                <span><strong>Reporte formal:</strong> {tutoria.alerta}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted small">El docente aún no ha registrado tutorías privadas finalizadas.</p>
                    )}
                  </div>
                </div>

              </div>
              <div className="modal-footer border-0 bg-white shadow-sm">
                <button className="btn btn-secondary px-4 fw-semibold rounded-pill w-100" onClick={() => setProfesorSeleccionado(null)}>Cerrar Expediente</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}