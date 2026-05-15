import { useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function ReportesAdmin() {
  // 1. BASE DE DATOS SIMULADA: Reporte mensual de profesores
  const [reporteProfesores, setReporteProfesores] = useState([
    { id: 1, nombre: "Carlos Gómez", facultad: "Ingeniería", clasesDadas: 12, alumnosAtendidos: 340, calificacion: 4.8, tendencia: "sube" },
    { id: 2, nombre: "Marta Rivas", facultad: "Sistemas", clasesDadas: 8, alumnosAtendidos: 210, calificacion: 4.9, tendencia: "mantiene" },
    { id: 3, nombre: "Luis Ramírez", facultad: "Ciencias Básicas", clasesDadas: 15, alumnosAtendidos: 450, calificacion: 3.2, tendencia: "baja" },
    { id: 4, nombre: "Elena Silva", facultad: "Ingeniería", clasesDadas: 5, alumnosAtendidos: 120, calificacion: 4.5, tendencia: "sube" }
  ]);

  // 2. BASE DE DATOS SIMULADA: Detalle de clases recientes
  const [detalleClases, setDetalleClases] = useState([
    { id: 101, materia: "Algoritmos y Estructura de Datos", profesor: "Carlos Gómez", fecha: "12 May 2026", cantAlumnos: 28, alumnosDestacados: "Ana Silva, Juan Pérez..." },
    { id: 102, materia: "Análisis de Sistemas", profesor: "Marta Rivas", fecha: "10 May 2026", cantAlumnos: 35, alumnosDestacados: "Luis Torres, María López..." },
    { id: 103, materia: "Estadística Inferencial", profesor: "Luis Ramírez", fecha: "08 May 2026", cantAlumnos: 40, alumnosDestacados: "Daniel Quispe, Pedro Ruiz..." },
  ]);

  // 3. FUNCIONES DE EXPORTACIÓN (Simuladas por ahora)
  const handleExportar = (formato) => {
    alert(`Generando y descargando el reporte mensual en formato ${formato}... \n\n(Esta función se conectará al backend más adelante).`);
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f4f7f6" }}>
      <Sidebar role="admin" />

      <div className="flex-grow-1 p-4 p-md-5" style={{ marginLeft: "70px", overflowX: "hidden" }}>
        
        {/* ENCABEZADO Y BOTONES DE EXPORTACIÓN */}
        <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
          <div>
            <h1 className="fw-bold text-dark mb-1" style={{ letterSpacing: "-1px" }}>Informes y Estadísticas</h1>
            <p className="text-muted mb-0">Resumen académico del mes: <strong>Mayo 2026</strong></p>
          </div>
          <div className="d-flex gap-2">
            <button onClick={() => handleExportar('Excel')} className="btn btn-success shadow-sm d-flex align-items-center gap-2">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z"/><path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/></svg>
              Exportar Excel
            </button>
            <button onClick={() => handleExportar('PDF')} className="btn btn-danger shadow-sm d-flex align-items-center gap-2">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/><path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .471.236c.09.112.145.256.164.41.014.12-.005.258-.04.401a6.38 6.38 0 0 1-.26.792c.153.25.309.52.463.805.15.278.297.558.437.834a3.4 3.4 0 0 1 2.25.381c.21.116.4.267.545.452.146.184.254.401.309.638.056.24.053.493-.01.734-.063.242-.18.468-.344.66a.826.826 0 0 1-.611.304c-.22.016-.44-.025-.63-.117a.835.835 0 0 1-.444-.44c-.11-.23-.153-.49-.126-.745.027-.255.105-.5.228-.722l-.11-.06a4.43 4.43 0 0 0-.82-.375 14.39 14.39 0 0 0-1.42-.486c-.44.89-.92 1.74-1.44 2.53-.41.62-.82 1.21-1.21 1.77-.41.58-.8 1.13-1.15 1.63-.3.44-.57.84-.79 1.19-.2.33-.36.62-.48.86-.11.23-.18.42-.2.57-.02.13-.01.24.03.32a.4.4 0 0 0 .15.17c.07.05.16.08.26.09z"/></svg>
              Exportar PDF
            </button>
          </div>
        </div>

        {/* KPIs DEL MES */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-md-4">
            <div className="card shadow-sm border-0 h-100" style={{ borderRadius: "12px", borderLeft: "5px solid #007bff" }}>
              <div className="card-body">
                <h6 className="text-muted fw-semibold">Clases Impartidas</h6>
                <h2 className="fw-bold mb-0 text-dark">40</h2>
                <small className="text-muted">En el mes de Mayo</small>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card shadow-sm border-0 h-100" style={{ borderRadius: "12px", borderLeft: "5px solid #20c997" }}>
              <div className="card-body">
                <h6 className="text-muted fw-semibold">Alumnos Atendidos</h6>
                <h2 className="fw-bold mb-0 text-dark">1,120</h2>
                <small className="text-muted">Participaciones totales</small>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card shadow-sm border-0 h-100" style={{ borderRadius: "12px", borderLeft: "5px solid #ffc107" }}>
              <div className="card-body">
                <h6 className="text-muted fw-semibold">Promedio General</h6>
                <h2 className="fw-bold mb-0 text-dark">4.2 <span className="fs-5 text-warning">★</span></h2>
                <small className="text-muted">Calificación docente global</small>
              </div>
            </div>
          </div>
        </div>

        {/* TABLA 1: RENDIMIENTO DOCENTE DETALLADO */}
        <div className="card shadow-sm border-0 mb-5" style={{ borderRadius: "15px" }}>
          <div className="card-header bg-white border-bottom-0 pt-4 pb-3">
            <h5 className="fw-bold mb-0">Rendimiento por Profesor</h5>
            <p className="text-muted small mb-0">Análisis de volumen de clases y evaluación estudiantil.</p>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Profesor</th>
                    <th>Clases Dictadas</th>
                    <th>Alumnos Impactados</th>
                    <th>Calificación Promedio</th>
                    <th className="text-end pe-4">Tendencia</th>
                  </tr>
                </thead>
                <tbody>
                  {reporteProfesores.map(prof => (
                    <tr key={prof.id}>
                      <td className="ps-4 py-3">
                        <div className="fw-bold text-dark">{prof.nombre}</div>
                        <div className="small text-muted">{prof.facultad}</div>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border px-3 py-2 fs-6">
                          {prof.clasesDadas} clases
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <span className="fw-semibold">{prof.alumnosAtendidos}</span>
                          <div className="progress w-50" style={{ height: "6px" }}>
                            <div className="progress-bar bg-info" style={{ width: `${(prof.alumnosAtendidos/500)*100}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <span className={`fw-bold ${prof.calificacion >= 4.5 ? 'text-success' : prof.calificacion >= 4.0 ? 'text-primary' : 'text-danger'}`}>
                            {prof.calificacion}/5.0
                          </span>
                        </div>
                      </td>
                      <td className="text-end pe-4">
                        {prof.tendencia === 'sube' && <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">↑ Mejorando</span>}
                        {prof.tendencia === 'mantiene' && <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle px-2 py-1">→ Estable</span>}
                        {prof.tendencia === 'baja' && <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1">↓ En declive</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* TABLA 2: HISTORIAL DE CLASES Y ASISTENCIA */}
        <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
          <div className="card-header bg-white border-bottom-0 pt-4 pb-3">
            <h5 className="fw-bold mb-0">Historial de Clases Recientes</h5>
            <p className="text-muted small mb-0">Registro detallado de qué alumnos asistieron a qué materia.</p>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-borderless table-striped align-middle mb-0">
                <thead className="border-bottom">
                  <tr>
                    <th className="ps-4">Fecha</th>
                    <th>Materia / Curso</th>
                    <th>Profesor a Cargo</th>
                    <th>Asistencia</th>
                    <th className="pe-4">Alumnos Registrados</th>
                  </tr>
                </thead>
                <tbody>
                  {detalleClases.map(clase => (
                    <tr key={clase.id}>
                      <td className="ps-4 py-3 text-muted small fw-semibold">{clase.fecha}</td>
                      <td className="fw-bold text-dark">{clase.materia}</td>
                      <td>{clase.profesor}</td>
                      <td>
                        <span className="badge bg-primary rounded-pill px-3">{clase.cantAlumnos} alumnos</span>
                      </td>
                      <td className="pe-4 text-muted small fst-italic">
                        {clase.alumnosDestacados} <a href="#" className="text-decoration-none ms-1">Ver todos</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}