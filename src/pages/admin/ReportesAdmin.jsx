import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// IMPORTACIONES PARA EL GRÁFICO ESTADÍSTICO
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function ReportesAdmin() {
  const [reporteProfesores, setReporteProfesores] = useState([
    { id: 1, nombre: "Carlos Gómez", facultad: "Ingeniería", clasesDadas: 18, alumnosAtendidos: 340, calificacion: 4.8, tendencia: "sube" },
    { id: 2, nombre: "Marta Rivas", facultad: "Sistemas", clasesDadas: 14, alumnosAtendidos: 210, calificacion: 4.9, tendencia: "mantiene" },
    { id: 3, nombre: "Luis Ramírez", facultad: "Ciencias Básicas", clasesDadas: 15, alumnosAtendidos: 450, calificacion: 3.2, tendencia: "baja" },
    { id: 4, nombre: "Elena Silva", facultad: "Ingeniería", clasesDadas: 9, alumnosAtendidos: 120, calificacion: 4.5, tendencia: "sube" },
    { id: 5, nombre: "Jorge Peralta", facultad: "Negocios", clasesDadas: 11, alumnosAtendidos: 180, calificacion: 4.1, tendencia: "mantiene" }
  ]);

  const [filtroFacultad, setFiltroFacultad] = useState("Todas");
  const [profesorSeleccionado, setProfesorSeleccionado] = useState(null);

  const profesoresFiltrados = filtroFacultad === "Todas" 
    ? reporteProfesores 
    : reporteProfesores.filter(p => p.facultad === filtroFacultad);

  const datosBarras = {
    labels: profesoresFiltrados.map(p => p.nombre),
    datasets: [
      {
        label: 'Calificación Promedio',
        data: profesoresFiltrados.map(p => p.calificacion),
        backgroundColor: profesoresFiltrados.map(p => p.calificacion >= 4.0 ? '#3F51B5' : '#dc3545'),
        borderRadius: 6,
      },
    ],
  };

  const datosLineas = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4 (Actual)'],
    datasets: [
      {
        label: 'Volumen de Clases (Plataforma)',
        data: [45, 52, 38, 67],
        borderColor: '#7B1FA2',
        backgroundColor: 'rgba(123, 31, 162, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3F51B5'
      },
    ],
  };

  const opcionesGrafico = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, max: 5, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
      x: { grid: { display: false } }
    }
  };

  const opcionesLineas = {
    ...opcionesGrafico,
    scales: { y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' } }, x: { grid: { display: false } } }
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
      const filas = profesoresFiltrados.map(p => [
        p.nombre, p.facultad, p.clasesDadas.toString(), p.alumnosAtendidos.toString(), `${p.calificacion} / 5.0`
      ]);

      autoTable(doc, {
        startY: 45,
        head: [columnas],
        body: filas,
        theme: 'striped',
        headStyles: { fillColor: [63, 81, 181] },
        styles: { fontSize: 9 }
      });

      doc.save(`Reporte_Academico_${filtroFacultad.replace(" ", "_")}.pdf`);
    } catch (error) {
      console.error("Error al generar PDF:", error);
      alert("Hubo un error al generar el documento.");
    }
  };

  const cardStyle = {
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    borderRadius: '15px'
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-4px)";
    e.currentTarget.style.boxShadow = "0 8px 15px rgba(0,0,0,0.1)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div className="d-flex">
      <Sidebar role="admin" />

      {/* CORRECCIÓN APLICADA: Eliminado marginLeft y p-md-5 */}
      <div className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', overflowX: 'hidden' }}>
        
        {/* ENCABEZADO Y EXPORTACIÓN */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold mb-1" style={{ color: '#3F51B5' }}>Informes y Estadísticas</h2>
            <p className="text-muted small mb-0">Análisis académico y rendimiento del profesorado.</p>
          </div>
          <button className="btn text-white fw-semibold shadow-sm px-4 d-flex align-items-center gap-2" style={{ backgroundColor: '#7B1FA2' }} onClick={descargarPDF}>
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/><path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .471.236c.09.112.145.256.164.41.014.12-.005.258-.04.401a6.38 6.38 0 0 1-.26.792c.153.25.309.52.463.805.15.278.297.558.437.834a3.4 3.4 0 0 1 2.25.381c.21.116.4.267.545.452.146.184.254.401.309.638.056.24.053.493-.01.734-.063.242-.18.468-.344.66a.826.826 0 0 1-.611.304c-.22.016-.44-.025-.63-.117a.835.835 0 0 1-.444-.44c-.11-.23-.153-.49-.126-.745.027-.255.105-.5.228-.722l-.11-.06a4.43 4.43 0 0 0-.82-.375 14.39 14.39 0 0 0-1.42-.486c-.44.89-.92 1.74-1.44 2.53-.41.62-.82 1.21-1.21 1.77-.41.58-.8 1.13-1.15 1.63-.3.44-.57.84-.79 1.19-.2.33-.36.62-.48.86-.11.23-.18.42-.2.57-.02.13-.01.24.03.32a.4.4 0 0 0 .15.17c.07.05.16.08.26.09z"/></svg>
            Exportar a PDF
          </button>
        </div>

        {/* BARRA DE FILTROS AVANZADOS */}
        <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '15px' }}>
          <div className="card-body p-3 d-flex align-items-center gap-3">
            <span className="fw-bold text-muted small"><i className="bi bi-funnel-fill"></i> Filtros:</span>
            <select 
              className="form-select bg-light border-0 w-auto fw-semibold text-secondary" 
              value={filtroFacultad} 
              onChange={(e) => setFiltroFacultad(e.target.value)}
            >
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

        {/* KPIs DEL MES */}
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
                <h3 className="fw-bold mb-1" style={{ color: '#D4AF37' }}>4.3 <span className="fs-5">★</span></h3>
                <small className="text-muted d-block mt-2">Evaluación general docente</small>
              </div>
            </div>
          </div>
        </div>

        {/* GRÁFICOS (Chart.js) */}
        <div className="row mb-4">
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="card border-0 shadow-sm bg-white p-4 h-100" style={{ borderRadius: '15px' }}>
              <h6 className="fw-bold text-dark mb-3">📊 Rendimiento Docente (Calificación)</h6>
              <div style={{ height: '240px' }}>
                <Bar data={datosBarras} options={opcionesGrafico} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm bg-white p-4 h-100" style={{ borderRadius: '15px' }}>
              <h6 className="fw-bold text-dark mb-3">📈 Volumen de Clases (Últimas 4 Semanas)</h6>
              <div style={{ height: '240px' }}>
                <Line data={datosLineas} options={opcionesLineas} />
              </div>
            </div>
          </div>
        </div>

        {/* TABLA PRINCIPAL */}
        <div className="card border-0 shadow-sm bg-white" style={{ borderRadius: '15px' }}>
          <div className="card-body p-4">
            <h5 className="fw-bold text-dark mb-3">📋 Desempeño Detallado por Profesor</h5>
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
                      <tr key={prof.id} style={{ cursor: 'pointer' }} onClick={() => setProfesorSeleccionado(prof)} title="Clic para ver detalles">
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
                            {prof.calificacion} ★
                          </span>
                        </td>
                        <td className="text-end pe-3">
                          {prof.tendencia === 'sube' && <span className="badge bg-success-subtle text-success">↑ Subiendo</span>}
                          {prof.tendencia === 'mantiene' && <span className="badge bg-secondary-subtle text-secondary">→ Estable</span>}
                          {prof.tendencia === 'baja' && <span className="badge bg-danger-subtle text-danger">↓ En declive</span>}
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

      {/* MODAL DE DETALLE */}
      {profesorSeleccionado && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050, backdropFilter: 'blur(3px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <div className="text-white d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: '#3F51B5' }}>
                <h5 className="modal-title fw-bold m-0" style={{ fontSize: '1.1rem' }}>🔍 Perfil Académico: {profesorSeleccionado.nombre}</h5>
                <button type="button" className="btn-close btn-close-white shadow-none m-0" onClick={() => setProfesorSeleccionado(null)}></button>
              </div>
              <div className="modal-body p-4 bg-white text-center">
                <div className="mb-4">
                  <h1 className="display-4 fw-bold text-dark mb-0">{profesorSeleccionado.calificacion}</h1>
                  <div className="text-warning fs-4">{'★'.repeat(Math.round(profesorSeleccionado.calificacion))}{'☆'.repeat(5 - Math.round(profesorSeleccionado.calificacion))}</div>
                  <span className="text-muted small">Promedio basado en {profesorSeleccionado.clasesDadas} reseñas</span>
                </div>
                <div className="row text-start border-top pt-3">
                  <div className="col-6 mb-3">
                    <small className="text-muted fw-bold d-block">Facultad</small>
                    <span className="fw-semibold text-dark">{profesorSeleccionado.facultad}</span>
                  </div>
                  <div className="col-6 mb-3">
                    <small className="text-muted fw-bold d-block">Impacto (Alumnos)</small>
                    <span className="fw-semibold text-dark">{profesorSeleccionado.alumnosAtendidos} estudiantes</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 bg-light">
                <button className="btn btn-secondary px-4 fw-semibold rounded-pill w-100" onClick={() => setProfesorSeleccionado(null)}>Cerrar Análisis</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}