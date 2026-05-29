import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// IMPORTACIONES PARA EL GRÁFICO ESTADÍSTICO
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InicioProfesor = () => {
  const [resumen, setResumen] = useState({
    totalTutorias: 0,
    totalEvaluaciones: 0,
    promedioNotas: 0
  });

  const [ultimasEvaluaciones, setUltimasEvaluaciones] = useState([]);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  useEffect(() => {
    // 1. IDEA 1: MOCK DATA AUTOMATIZADO (Para asegurar que la demo nunca esté en cero)
    const datosTutoriasPreinstalados = [
      { id: 1, curso: "Cálculo Avanzado", fecha: "2026-05-25", estado: "Pendiente" },
      { id: 2, curso: "Física de Campos", fecha: "2026-05-28", estado: "Pendiente" },
      { id: 3, curso: "Diseño de Sistemas Web", fecha: "2026-05-29", estado: "Pendiente" },
      { id: 4, curso: "Arquitectura de Software", fecha: "2026-06-02", estado: "Pendiente" }
    ];

    const datosEvaluacionesPreinstaladas = [
      { id: 1, estudiante: "Ana Maria Gomez", curso: "Física de Campos", nota: 5, fecha: "2026-05-20" },
      { id: 2, estudiante: "Guillermo Palacios", curso: "Diseño de Sistemas Web", nota: 4, fecha: "2026-05-24" },
      { id: 3, estudiante: "Julio Cárdenas", curso: "Arquitectura de Software", nota: 5, fecha: "2026-05-26" },
      { id: 4, estudiante: "Celia Benavides", curso: "Cálculo Avanzado", nota: 4, fecha: "2026-05-28" }
    ];

    // Verificar e inyectar si están vacíos
    if (!localStorage.getItem("tutorias")) {
      localStorage.setItem("tutorias", JSON.stringify(datosTutoriasPreinstalados));
    }
    if (!localStorage.getItem("evaluaciones")) {
      localStorage.setItem("evaluaciones", JSON.stringify(datosEvaluacionesPreinstaladas));
    }

    // 2. LEER DATOS ACTUALIZADOS
    const tutorias = JSON.parse(localStorage.getItem("tutorias")) || [];
    const evaluaciones = JSON.parse(localStorage.getItem("evaluaciones")) || [];
    
    const sumaNotas = evaluaciones.reduce((acc, curr) => acc + Number(curr.nota), 0);
    const promedio = evaluaciones.length > 0 ? (sumaNotas / evaluaciones.length).toFixed(1) : 0;

    setResumen({
      totalTutorias: tutorias.length,
      totalEvaluaciones: evaluaciones.length,
      promedioNotas: promedio
    });

    // Guardar las últimas 3 evaluaciones para mostrarlas en la tabla inferior (Idea 3)
    setUltimasEvaluaciones(evaluaciones.slice(-3).reverse());
  }, []);

  // CONFIGURACIÓN DE DATOS PARA EL GRÁFICO
  const datosGrafico = {
    labels: ['Tutorías Pendientes', 'Evaluaciones Realizadas', 'Promedio General (x10)'],
    datasets: [
      {
        label: 'Métricas de Rendimiento',
        data: [resumen.totalTutorias, resumen.totalEvaluaciones, resumen.promedioNotas * 10],
        backgroundColor: [
          'rgba(0, 123, 255, 0.85)',
          'rgba(40, 167, 69, 0.85)',
          'rgba(255, 193, 7, 0.85)'
        ],
        borderRadius: 8,
        borderWidth: 0,
      },
    ],
  };

  const opcionesGrafico = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
      x: { grid: { display: false } }
    }
  };

  const descargarPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.text("ProfeMatch - Reporte de Actividad Académica", 14, 22);
      
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Fecha de emisión: ${new Date().toLocaleDateString()}`, 14, 30);
      doc.text("Profesor: Juan Jose Silva N.", 14, 36);

      const columnas = ["Indicador Académico", "Cantidad / Resultado"];
      const filas = [
        ["Tutorías Pendientes", resumen.totalTutorias],
        ["Evaluaciones Realizadas", resumen.totalEvaluaciones],
        ["Promedio General del Instructor", `${resumen.promedioNotas} / 5`],
      ];

      doc.autoTable({
        startY: 44,
        head: [columnas],
        body: filas,
        theme: 'striped',
        headStyles: { fillColor: [0, 123, 255] },
        styles: { fontSize: 11 }
      });

      doc.save(`Reporte_Academico_${new Date().getFullYear()}_${new Date().getMonth() + 1}.pdf`);
    } catch (error) {
      const docFailsafe = new jsPDF();
      docFailsafe.setFontSize(16);
      docFailsafe.text("ProfeMatch - Reporte de Actividad Académica", 14, 22);
      docFailsafe.setFontSize(10);
      docFailsafe.text(`Fecha de emisión: ${new Date().toLocaleDateString()}`, 14, 30);
      docFailsafe.text("Profesor: Juan Jose Silva N.", 14, 36);
      
      docFailsafe.setFontSize(12);
      docFailsafe.text(`----------------------------------------------------------------------`, 14, 42);
      docFailsafe.text(`• Tutorías Pendientes: ${resumen.totalTutorias}`, 14, 52);
      docFailsafe.text(`• Evaluaciones Realizadas: ${resumen.totalEvaluaciones}`, 14, 62);
      docFailsafe.text(`• Promedio General del Instructor: ${resumen.promedioNotas} / 5`, 14, 72);
      docFailsafe.text(`----------------------------------------------------------------------`, 14, 82);
      docFailsafe.save(`Reporte_Academico_Simple.pdf`);
    }
  };

  const estandarCardStyle = {
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer"
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.12)";
  };

  const handleMouseLeave = (e, baseShadow = "0 .125rem .25rem") => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = baseShadow;
  };

  return (
    <div className="d-flex">
      <Sidebar role="profesor" />
      
      <div className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <h2 className="mb-4 fw-bold text-dark">Bienvenido, Profesor</h2>
        
        {/* TARJETAS DE MÉTRICAS */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <div 
              className="card border-0 shadow-sm bg-primary text-white h-100"
              style={estandarCardStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={(e) => handleMouseLeave(e)}
            >
              <div className="card-body text-center d-flex flex-column justify-content-center py-4">
                <h5 className="card-title opacity-90">Tutorías Pendientes</h5>
                <h1 className="display-3 fw-bold my-2">{resumen.totalTutorias}</h1>
                <p className="card-text small opacity-75 mb-0">Sesiones registradas en el sistema.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div 
              className="card border-0 shadow-sm bg-success text-white h-100"
              style={estandarCardStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={(e) => handleMouseLeave(e)}
            >
              <div className="card-body text-center d-flex flex-column justify-content-center py-4">
                <h5 className="card-title opacity-90">Evaluaciones Realizadas</h5>
                <h1 className="display-3 fw-bold my-2">{resumen.totalEvaluaciones}</h1>
                <p className="card-text small opacity-75 mb-0">Total de estudiantes calificados.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div 
              className="card border-0 shadow-sm bg-warning text-dark h-100"
              style={estandarCardStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={(e) => handleMouseLeave(e)}
            >
              <div className="card-body text-center d-flex flex-column justify-content-center py-4">
                <h5 className="card-title text-dark opacity-90">Promedio General</h5>
                <h1 className="display-3 fw-bold my-2">{resumen.promedioNotas}</h1>
                <p className="card-text small text-secondary mb-0">Nivel de rendimiento de tus cursos.</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN PRINCIPAL */}
        <div className="row mt-2">
          
          {/* COLUMNA IZQUIERDA: PANEL DE CONTROL COMPLETO */}
          <div className="col-md-8 mb-4">
            <div className="card border-0 shadow-sm bg-white h-100" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4 d-flex flex-column justify-content-between">
                <div>
                  <h4 className="fw-bold text-dark">Panel de Control</h4>
                  <p className="text-muted mb-3">Resumen visual y acciones rápidas de tu actividad académica.</p>
                  
                  {/* GRÁFICO */}
                  <div style={{ height: '200px', width: '100%', marginBottom: '25px' }}>
                    <Bar data={datosGrafico} options={opcionesGrafico} />
                  </div>
                  
                  {/* IDEA 3: HISTORIAL DE ÚLTIMAS EVALUACIONES REGISTRADAS */}
                  <div className="mt-4">
                    <h6 className="fw-bold text-dark mb-3">📋 Últimas Calificaciones Emitidas</h6>
                    <div className="table-responsive">
                      <table className="table table-sm table-hover border-0 align-middle mb-0" style={{ fontSize: '0.85rem' }}>
                        <thead>
                          <tr className="text-secondary border-bottom">
                            <th className="pb-2 border-0">Estudiante</th>
                            <th className="pb-2 border-0">Curso</th>
                            <th className="pb-2 border-0 text-center">Nota</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ultimasEvaluaciones.map((evaluacion) => (
                            <tr key={evaluacion.id} className="border-bottom-0">
                              <td className="py-2 text-dark fw-medium">{evaluacion.estudiante}</td>
                              <td className="py-2 text-muted">{evaluacion.curso}</td>
                              <td className="py-2 text-center">
                                <span className={`badge px-2 py-1 ${evaluacion.nota >= 4 ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                                  {evaluacion.nota} / 5
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <hr className="my-3 text-muted opacity-25" />
                </div>
                
                <div className="d-flex gap-3 mt-2">
                  <button 
                    className="btn btn-outline-primary shadow-sm px-4 fw-semibold"
                    onClick={() => setMostrarCalendario(true)}
                  >
                    Ver Calendario Académico
                  </button>
                  <button 
                    className="btn btn-outline-secondary shadow-sm px-4 fw-semibold"
                    onClick={descargarPDF}
                  >
                    Descargar Reporte PDF
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: MINI BIOGRAFÍA */}
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm bg-white h-100" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold text-uppercase me-3" 
                       style={{ width: '55px', height: '55px', fontSize: '1.2rem', minWidth: '55px' }}>
                    JS
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-0">Juan Jose Silva N.</h5>
                    <span className="badge bg-success-subtle text-success mt-1" style={{ fontSize: '0.75rem' }}>Docente Verificado</span>
                  </div>
                </div>

                <p className="text-secondary small mb-3 lh-sm">
                  "Apasionado por la ingeniería de software y el desarrollo de sistemas web interactivos. 
                  Me enfoco en brindar tutorías prácticas que ayuden a los estudiantes a resolver problemas reales de código."
                </p>

                <div className="row g-2 pt-2 border-top text-muted" style={{ fontSize: '0.8rem' }}>
                  <div className="col-6">
                    <strong>🎓 Universidad:</strong> <span className="d-block text-dark fw-medium">UTP</span>
                  </div>
                  <div className="col-6">
                    <strong>💻 Especialidad:</strong> <span className="d-block text-dark fw-medium">Software & UI/UX</span>
                  </div>
                  <div className="col-6 mt-2">
                    <strong>⭐ Reputación:</strong> <span className="d-block text-dark fw-medium">4.5 / 5 (Excelente)</span>
                  </div>
                  <div className="col-6 mt-2">
                    <strong>⏳ Antigüedad:</strong> <span className="d-block text-dark fw-medium">Ciclo 2026-I</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL DEL CALENDARIO */}
        {mostrarCalendario && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                <div className="modal-header bg-primary text-white border-0" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                  <h5 className="modal-title fw-bold">📅 Calendario Académico 2026-I</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setMostrarCalendario(false)}></button>
                </div>
                <div className="modal-body p-4">
                  <table className="table table-hover border mb-0 align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Event Académico</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="fw-medium">Inicio de Clases</td>
                        <td>15 de Marzo</td>
                        <td><span className="badge bg-success-subtle text-success border border-success-subtle px-2">Completado</span></td>
                      </tr>
                      <tr>
                        <td className="fw-medium">Exámenes Parciales</td>
                        <td>10 de Mayo</td>
                        <td><span className="badge bg-warning-subtle text-warning border border-warning-subtle px-2">En curso</span></td>
                      </tr>
                      <tr>
                        <td className="fw-medium">Exámenes Finales</td>
                        <td>05 de Julio</td>
                        <td><span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle px-2">Pendiente</span></td>
                      </tr>
                      <tr>
                        <td className="fw-medium">Cierre del Ciclo</td>
                        <td>15 de Julio</td>
                        <td><span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2">Próximo</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer border-0">
                  <button className="btn btn-secondary px-4" onClick={() => setMostrarCalendario(false)}>Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default InicioProfesor;