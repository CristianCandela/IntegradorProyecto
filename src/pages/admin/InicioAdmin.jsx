import React, { useState, useEffect } from 'react';
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
  ArcElement
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const InicioAdmin = () => {
  const [finanzas, setFinanzas] = useState({
    ingresoNetoTotal: 0,
    comisiones: 0,
    suscripciones: 0
  });

  const [moderacion, setModeracion] = useState({
    quejasPendientes: 0,
    usuariosRiesgo: 0
  });

  const [historialAuditoria, setHistorialAuditoria] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    // 1. SIMULACIÓN DE DATA
    const comisionesMes = 3250.00; 
    const suscripcionesMes = 1600.50; 
    
    setFinanzas({
      ingresoNetoTotal: comisionesMes + suscripcionesMes,
      comisiones: comisionesMes,
      suscripciones: suscripcionesMes
    });

    setModeracion({
      quejasPendientes: 12,
      usuariosRiesgo: 8
    });

    setHistorialAuditoria([
      { id: "CASO-001", fecha: "2026-05-14", reportado: "Ana Silva", acusado: "Luis Ramírez", tipo: "No-show (Falta)", gravedad: "Alta", estado: "Pendiente" },
      { id: "CASO-002", fecha: "2026-05-13", reportado: "Sistema", acusado: "Pedro Ruiz", tipo: "Score Crítico (30pts)", gravedad: "Media", estado: "En Revisión" },
    ]);
  }, []);

  // CONFIGURACIÓN DE GRÁFICOS
  const datosBarras = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        label: 'Ingresos Plataforma (S/.)',
        data: [1200, 1800, 1500, 350], // Valores estables para evitar errores visuales
        backgroundColor: '#3F51B5',
        borderRadius: 6,
      },
    ],
  };

  const datosDistribucion = {
    labels: ['Excelente (90-100)', 'Bueno (70-89)', 'Regular (50-69)', 'Crítico (0-49)'],
    datasets: [
      {
        data: [65, 20, 10, 5],
        backgroundColor: ['#198754', '#ffc107', '#fd7e14', '#dc3545'],
        borderWidth: 0,
      },
    ],
  };

  const opcionesGrafico = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.03)' } },
      x: { grid: { display: false } }
    }
  };

  const opcionesDoughnut = {
    responsive: true,
    maintainAspectRatio: false,
    // Ocultamos la leyenda nativa para crear la nuestra propia sin que empuje el gráfico
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    cutout: '75%'
  };

  // EXPORTACIÓN A PDF
  const descargarPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("ProfeMatch - Reporte Gerencial de Administración", 14, 22);
      doc.setFontSize(10);
      doc.text(`Fecha de corte: ${new Date().toLocaleDateString()}`, 14, 30);
      doc.text(`Ingreso Total de la Plataforma: S/. ${finanzas.ingresoNetoTotal.toFixed(2)}`, 14, 46);
      doc.save(`Reporte_Gerencial_ProfeMatch.pdf`);
    } catch (error) {
      console.error("Error en jsPDF:", error);
      alert("Error al construir el documento PDF.");
    }
  };

  // ESTILOS DE TARJETAS Y ANIMACIONES
  const cardStyle = {
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    borderRadius: '15px',
    cursor: 'pointer'
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
      
      {/* CORRECCIÓN DE ESPACIADO: Eliminado el marginLeft y el p-md-5. Ahora usa la misma clase que tu compañero. */}
      <div className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', overflowX: 'hidden' }}>
        
        {/* ENCABEZADO */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold mb-1" style={{ color: '#3F51B5' }}>Centro de Comando Administrativo</h2>
            <p className="text-muted small mb-0">Monitorea los ingresos de la plataforma y el comportamiento de la comunidad.</p>
          </div>
          <button className="btn text-white fw-semibold shadow-sm px-4 d-flex align-items-center gap-2" style={{ backgroundColor: '#7B1FA2' }} onClick={descargarPDF}>
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/><path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .471.236c.09.112.145.256.164.41.014.12-.005.258-.04.401a6.38 6.38 0 0 1-.26.792c.153.25.309.52.463.805.15.278.297.558.437.834a3.4 3.4 0 0 1 2.25.381c.21.116.4.267.545.452.146.184.254.401.309.638.056.24.053.493-.01.734-.063.242-.18.468-.344.66a.826.826 0 0 1-.611.304c-.22.016-.44-.025-.63-.117a.835.835 0 0 1-.444-.44c-.11-.23-.153-.49-.126-.745.027-.255.105-.5.228-.722l-.11-.06a4.43 4.43 0 0 0-.82-.375 14.39 14.39 0 0 0-1.42-.486c-.44.89-.92 1.74-1.44 2.53-.41.62-.82 1.21-1.21 1.77-.41.58-.8 1.13-1.15 1.63-.3.44-.57.84-.79 1.19-.2.33-.36.62-.48.86-.11.23-.18.42-.2.57-.02.13-.01.24.03.32a.4.4 0 0 0 .15.17c.07.05.16.08.26.09z"/></svg>
            Exportar Reporte
          </button>
        </div>

        {/* ALERTA CRÍTICA */}
        {moderacion.quejasPendientes > 0 && (
          <div className="alert border-0 text-white p-3 mb-4 d-flex justify-content-between align-items-center shadow-sm" style={{ backgroundColor: '#D32F2F', borderRadius: '12px' }}>
            <div className="d-flex align-items-center gap-2">
              <span style={{ fontSize: '1.5rem' }}>⚠️</span>
              <div>
                <strong className="d-block">Atención Requerida: Moderación de Comunidad</strong>
                <span className="small opacity-90">Existen {moderacion.quejasPendientes} quejas formales esperando resolución. Esto afecta el Score de Confiabilidad.</span>
              </div>
            </div>
            <button className="btn btn-light btn-sm text-danger fw-bold shadow-sm" onClick={() => setMostrarModal(true)}>Resolver ahora</button>
          </div>
        )}

        {/* CARDS KPIs */}
        <div className="row mb-2">
          <div className="col-md-3 mb-4">
            <div className="card border-0 shadow-sm h-100 bg-white" style={cardStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div className="card-body p-3 border-start border-success border-5 rounded-end">
                <span className="text-muted small fw-bold text-uppercase d-block mb-1">Caja ProfeMatch</span>
                <h3 className="fw-bold text-success mb-1">S/. {finanzas.ingresoNetoTotal.toFixed(2)}</h3>
                <small className="text-muted d-block mt-2">Mes Actual</small>
                <span className="badge bg-success-subtle text-success px-2 py-1 mt-1" style={{ fontSize: '0.7rem' }}>+14.5% Crecimiento</span>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card border-0 shadow-sm h-100 bg-white" style={cardStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div className="card-body p-3 border-start border-primary border-5 rounded-end">
                <span className="text-muted small fw-bold text-uppercase d-block mb-1">Comisiones (15%)</span>
                <h3 className="fw-bold text-primary mb-1">S/. {finanzas.comisiones.toFixed(2)}</h3>
                <small className="text-muted d-block mt-2">Retención por tutorías</small>
                <span className="badge bg-primary-subtle text-primary px-2 py-1 mt-1" style={{ fontSize: '0.7rem' }}>Principal fuente</span>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card border-0 shadow-sm h-100 bg-white" style={cardStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div className="card-body p-3 border-start border-warning border-5 rounded-end">
                <span className="text-muted small fw-bold text-uppercase d-block mb-1">Suscripciones Premium</span>
                <h3 className="fw-bold mb-1" style={{ color: '#D4AF37' }}>S/. {finanzas.suscripciones.toFixed(2)}</h3>
                <small className="text-muted d-block mt-2">Planes S/ 9.99 mensuales</small>
                <span className="badge px-2 py-1 mt-1" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37' }}>Pagos Recurrentes</span>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card border-0 shadow-sm h-100 bg-white" style={cardStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => setMostrarModal(true)}>
              <div className="card-body p-3 border-start border-danger border-5 rounded-end">
                <span className="text-muted small fw-bold text-uppercase d-block mb-1">Usuarios en Riesgo</span>
                <h3 className="fw-bold text-danger mb-1">{moderacion.usuariosRiesgo} Cuentas</h3>
                <small className="text-muted d-block mt-2">Score crítico (0-49 pts)</small>
                <span className="badge bg-danger-subtle text-danger px-2 py-1 mt-1" style={{ fontSize: '0.7rem' }}>Auditoría necesaria</span>
              </div>
            </div>
          </div>
        </div>

        {/* GRAFICOS */}
        <div className="row mb-4">
          <div className="col-md-7 mb-3">
            <div className="card border-0 shadow-sm bg-white p-4 h-100" style={{ borderRadius: '15px' }}>
              <h6 className="fw-bold text-dark mb-3">📊 Ingresos de ProfeMatch (Semanales)</h6>
              <div style={{ height: '240px' }}>
                <Bar data={datosBarras} options={opcionesGrafico} />
              </div>
            </div>
          </div>
          
          {/* CORRECCIÓN DE LA GRÁFICA DE ANILLO (Ahora usa flexbox y nunca se monta el texto) */}
          <div className="col-md-5 mb-3">
            <div className="card border-0 shadow-sm bg-white p-4 h-100" style={{ borderRadius: '15px' }}>
              <h6 className="fw-bold text-dark mb-3">Salud de Comunidad (Scores)</h6>
              <div className="row align-items-center h-100 pb-3">
                <div className="col-6 position-relative" style={{ height: '180px' }}>
                  <Doughnut data={datosDistribucion} options={opcionesDoughnut} />
                  {/* Texto absolutamente centrado dentro del contenedor del canvas */}
                  <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
                    <span className="fs-4 fw-bold text-success">65%</span>
                  </div>
                </div>
                {/* Leyenda HTML personalizada que se adapta perfectamente */}
                <div className="col-6">
                  <ul className="list-unstyled mb-0 small text-muted">
                    <li className="mb-2 d-flex align-items-center"><span className="bg-success rounded-circle me-2" style={{ width:"12px", height:"12px" }}></span> Excelente (90-100)</li>
                    <li className="mb-2 d-flex align-items-center"><span className="bg-warning rounded-circle me-2" style={{ width:"12px", height:"12px" }}></span> Bueno (70-89)</li>
                    <li className="mb-2 d-flex align-items-center"><span className="rounded-circle me-2" style={{ width:"12px", height:"12px", backgroundColor:"#fd7e14" }}></span> Regular (50-69)</li>
                    <li className="d-flex align-items-center"><span className="bg-danger rounded-circle me-2" style={{ width:"12px", height:"12px" }}></span> Crítico (0-49)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL DEL TRIBUNAL DE AUDITORÍA (Mantenido intacto) */}
        {mostrarModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050, backdropFilter: 'blur(3px)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px', backgroundColor: '#ffffff', overflow: 'hidden' }}>
                <div className="text-white d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: '#3F51B5' }}>
                  <h5 className="modal-title fw-bold m-0" style={{ fontSize: '1.1rem' }}>⚖️ Tribunal de Resolución de Penalizaciones</h5>
                  <button type="button" className="btn-close btn-close-white shadow-none m-0" onClick={() => setMostrarModal(false)}></button>
                </div>
                <div className="modal-body p-4">
                  <table className="table table-hover border mb-0 align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Acusado</th>
                        <th>Infracción</th>
                        <th>Penalidad Sugerida</th>
                        <th className="text-end">Acción Administrativa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historialAuditoria.filter(c => c.estado !== "Resuelto").map(caso => (
                        <tr key={caso.id}>
                          <td className="fw-bold text-dark">{caso.acusado}</td>
                          <td>{caso.tipo}</td>
                          <td><span className="badge bg-danger px-2">-30 pts</span></td>
                          <td className="text-end">
                            <button className="btn btn-sm btn-outline-danger fw-bold me-2">Aplicar Sanción</button>
                            <button className="btn btn-sm btn-light text-muted">Desestimar</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer border-0 bg-light">
                  <button className="btn btn-secondary px-4 fw-semibold" onClick={() => setMostrarModal(false)}>Cerrar Tribunal</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default InicioAdmin;