import { useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function InicioAdmin() {
  // 1. BASE DE DATOS CENTRALIZADA
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Daniel Quispe", rol: "Admin", correo: "d.quispe@profe.edu.pe" },
    { id: 2, nombre: "Ana Silva", rol: "Estudiante", correo: "asilva@profe.edu.pe" },
    { id: 3, nombre: "Juan Pérez", rol: "Estudiante", correo: "jperez@profe.edu.pe" },
    { id: 4, nombre: "Carlos Gómez", rol: "Profesor", correo: "cgomez@profe.edu.pe", resenasPositivas: 45, resenasNegativas: 2 },
    { id: 5, nombre: "Marta Rivas", rol: "Profesor", correo: "mrivas@profe.edu.pe", resenasPositivas: 18, resenasNegativas: 5 },
    { id: 6, nombre: "Luis Ramírez", rol: "Profesor", correo: "lramirez@profe.edu.pe", resenasPositivas: 4, resenasNegativas: 12 },
  ]);

  // Nueva Base de Datos de Clases Solicitadas
  const [clases, setClases] = useState([
    { id: 1, alumno: "Ana Silva", materia: "Algoritmos y Estructura de Datos", fecha: "15 May, 10:00 AM", profesor: "Carlos Gómez", estado: "Aprobada" },
    { id: 2, alumno: "Juan Pérez", materia: "Análisis y Diseño de Sistemas", fecha: "16 May, 03:00 PM", profesor: "Marta Rivas", estado: "Pendiente" },
    { id: 3, alumno: "Luis Torres", materia: "Estadística Inferencial", fecha: "18 May, 11:30 AM", profesor: "Por asignar", estado: "Pendiente" },
  ]);

  // 2. ESTADOS PARA MODALES Y UI
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoFiltroModal, setTipoFiltroModal] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", correo: "" });

  // 3. MÉTRICAS
  const metricas = {
    estudiantes: usuarios.filter(u => u.rol === "Estudiante").length,
    profesores: usuarios.filter(u => u.rol === "Profesor").length,
    admins: usuarios.filter(u => u.rol === "Admin").length,
  };

  const evaluarProfesor = (positivas, negativas) => {
    if (positivas > 0 && negativas === 0) return { texto: "⭐ Excelente", color: "text-success" };
    if (positivas >= negativas * 2) return { texto: "👍 Bueno", color: "text-primary" };
    if (negativas > positivas) return { texto: "⚠️ Requiere mejora", color: "text-danger" };
    return { texto: "📊 Regular", color: "text-warning text-dark" };
  };

  const abrirModalDetalle = (rol) => {
    setTipoFiltroModal(rol);
    setEditandoId(null);
    setModalVisible(true);
  };

  const guardarEdicion = (id) => {
    setUsuarios(usuarios.map(u => u.id === id ? { ...u, ...formData } : u));
    setEditandoId(null);
  };

  const usuariosEnModal = usuarios.filter(u => u.rol === tipoFiltroModal);

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f4f7f6" }}>
      <Sidebar role="admin" />

      <div className="flex-grow-1 p-4 p-md-5" style={{ marginLeft: "70px", overflowX: "hidden" }}>
        
        <div className="mb-4 d-flex justify-content-between align-items-end">
          <div>
            <h1 className="fw-bold text-dark mb-1" style={{ letterSpacing: "-1px" }}>Dashboard</h1>
            <p className="text-muted mb-0">Monitoreo en tiempo real de ProfeMatch.</p>
          </div>
        </div>

        {/* TARJETAS INTERACTIVAS CON DEGRADADOS E ÍCONOS */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-md-4">
            <div 
              className="card shadow border-0 h-100 text-white" 
              style={{ background: "linear-gradient(135deg, #007bff 0%, #00c6ff 100%)", cursor: "pointer", transition: "transform 0.2s", borderRadius: "15px" }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              onClick={() => abrirModalDetalle("Estudiante")}
            >
              <div className="card-body position-relative overflow-hidden">
                <h6 className="fw-semibold mb-1 opacity-75">Total Estudiantes</h6>
                <h1 className="fw-bold mb-0 display-4">{metricas.estudiantes}</h1>
                <small className="opacity-75">Ver lista y editar ↗</small>
                <svg className="position-absolute opacity-25" style={{ bottom: "-10px", right: "-10px", width: "100px" }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div 
              className="card shadow border-0 h-100 text-white"
              style={{ background: "linear-gradient(135deg, #17a2b8 0%, #20c997 100%)", cursor: "pointer", transition: "transform 0.2s", borderRadius: "15px" }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              onClick={() => abrirModalDetalle("Profesor")}
            >
              <div className="card-body position-relative overflow-hidden">
                <h6 className="fw-semibold mb-1 opacity-75">Total Profesores</h6>
                <h1 className="fw-bold mb-0 display-4">{metricas.profesores}</h1>
                <small className="opacity-75">Ver evaluaciones ↗</small>
                <svg className="position-absolute opacity-25" style={{ bottom: "-10px", right: "-10px", width: "100px" }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 17A2 2 0 0 0 22 15V4A2 2 0 0 0 20 2H4A2 2 0 0 0 2 4V15A2 2 0 0 0 4 17H8L12 21L16 17H20ZM4 4H20V15H4V4Z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div 
              className="card shadow border-0 h-100 text-white"
              style={{ background: "linear-gradient(135deg, #2b2d42 0%, #8d99ae 100%)", cursor: "pointer", transition: "transform 0.2s", borderRadius: "15px" }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              onClick={() => abrirModalDetalle("Admin")}
            >
              <div className="card-body position-relative overflow-hidden">
                <h6 className="fw-semibold mb-1 opacity-75">Administradores</h6>
                <h1 className="fw-bold mb-0 display-4">{metricas.admins}</h1>
                <small className="opacity-75">Personal de soporte ↗</small>
                <svg className="position-absolute opacity-25" style={{ bottom: "-10px", right: "-10px", width: "100px" }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 10.99H19C18.47 15.11 15.72 18.78 12 19.93V11H5V6.3L12 3.19V10.99Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN INFERIOR: GRÁFICOS Y TABLA */}
        <div className="row g-4">
          
          {/* Columna Izquierda: Gráficos Nativos */}
          <div className="col-12 col-lg-5">
            <div className="card shadow-sm border-0 h-100" style={{ borderRadius: "15px" }}>
              <div className="card-header bg-white border-0 pt-4 pb-0">
                <h5 className="fw-bold mb-0">Análisis de Reseñas</h5>
              </div>
              <div className="card-body d-flex flex-column justify-content-center">
                
                {/* Gráfico 1: Sentimiento Global */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="fw-semibold text-secondary small">Reseñas Positivas</span>
                    <span className="fw-bold text-success">78%</span>
                  </div>
                  <div className="progress" style={{ height: "12px", borderRadius: "10px" }}>
                    <div className="progress-bar bg-success" style={{ width: "78%" }}></div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="fw-semibold text-secondary small">Reseñas Negativas</span>
                    <span className="fw-bold text-danger">15%</span>
                  </div>
                  <div className="progress" style={{ height: "12px", borderRadius: "10px" }}>
                    <div className="progress-bar bg-danger" style={{ width: "15%" }}></div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="fw-semibold text-secondary small">Neutrales</span>
                    <span className="fw-bold text-warning">7%</span>
                  </div>
                  <div className="progress" style={{ height: "12px", borderRadius: "10px" }}>
                    <div className="progress-bar bg-warning" style={{ width: "7%" }}></div>
                  </div>
                </div>

                {/* Mini Gráfico de Barras: Crecimiento */}
                <div className="mt-auto pt-3 border-top">
                  <h6 className="fw-bold mb-3">Crecimiento de Estudiantes</h6>
                  <div className="d-flex align-items-end justify-content-between" style={{ height: "80px" }}>
                    <div className="bg-primary rounded-top opacity-50" style={{ width: "15%", height: "40%" }}></div>
                    <div className="bg-primary rounded-top opacity-50" style={{ width: "15%", height: "55%" }}></div>
                    <div className="bg-primary rounded-top opacity-75" style={{ width: "15%", height: "70%" }}></div>
                    <div className="bg-primary rounded-top" style={{ width: "15%", height: "95%" }}></div>
                  </div>
                  <div className="d-flex justify-content-between mt-1 text-muted" style={{ fontSize: "10px" }}>
                    <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Columna Derecha: Clases Solicitadas */}
          <div className="col-12 col-lg-7">
            <div className="card shadow-sm border-0 h-100" style={{ borderRadius: "15px" }}>
              <div className="card-header bg-white border-0 pt-4 pb-0 d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0">Solicitudes de Tutorías / Clases</h5>
                <span className="badge bg-primary rounded-pill">{clases.length} nuevas</span>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-borderless align-middle table-hover">
                    <thead className="border-bottom">
                      <tr>
                        <th className="text-muted small fw-semibold pb-2">Materia & Alumno</th>
                        <th className="text-muted small fw-semibold pb-2">Fecha y Hora</th>
                        <th className="text-muted small fw-semibold pb-2">Profesor</th>
                        <th className="text-muted small fw-semibold pb-2 text-end">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clases.map((clase) => (
                        <tr key={clase.id} className="border-bottom">
                          <td className="py-3">
                            <div className="fw-bold text-dark">{clase.materia}</div>
                            <div className="text-muted small">Solicitado por: {clase.alumno}</div>
                          </td>
                          <td className="py-3">
                            <div className="badge bg-light text-dark border">
                              <i className="bi bi-calendar me-1"></i> {clase.fecha}
                            </div>
                          </td>
                          <td className="py-3">
                            <span className={clase.profesor === "Por asignar" ? "text-danger fst-italic small" : "fw-semibold small"}>
                              {clase.profesor}
                            </span>
                          </td>
                          <td className="py-3 text-end">
                            <span className={`badge rounded-pill px-3 py-2 ${clase.estado === 'Aprobada' ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-warning-subtle text-warning border border-warning-subtle'}`}>
                              {clase.estado}
                            </span>
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
      </div>

      {/* MODAL GIGANTE DE DETALLES (Mantenido y Mejorado visualmente) */}
      {modalVisible && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(5px)" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: "20px", overflow: "hidden" }}>
              <div className="modal-header border-bottom-0 text-white" style={{ background: tipoFiltroModal === 'Estudiante' ? '#007bff' : tipoFiltroModal === 'Profesor' ? '#17a2b8' : '#2b2d42' }}>
                <h5 className="fw-bold mb-0">Directorio de {tipoFiltroModal === 'Admin' ? 'Administradores' : tipoFiltroModal + 'es'}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setModalVisible(false)}></button>
              </div>
              <div className="modal-body p-0">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4 py-3">Nombre</th>
                      <th className="py-3">Correo</th>
                      {tipoFiltroModal === "Profesor" && <th className="py-3">Desempeño</th>}
                      <th className="text-end pe-4 py-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuariosEnModal.map(u => (
                      <tr key={u.id}>
                        <td className="ps-4 py-3">
                          {editandoId === u.id ? (
                            <input type="text" className="form-control form-control-sm" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
                          ) : (
                            <span className="fw-bold text-dark">{u.nombre}</span>
                          )}
                        </td>
                        <td className="py-3">
                          {editandoId === u.id ? (
                            <input type="email" className="form-control form-control-sm" value={formData.correo} onChange={(e) => setFormData({...formData, correo: e.target.value})} />
                          ) : (
                            <span className="text-muted">{u.correo}</span>
                          )}
                        </td>
                        {tipoFiltroModal === "Profesor" && (
                          <td className="py-3">
                            <span className={`badge bg-light border ${evaluarProfesor(u.resenasPositivas, u.resenasNegativas).color}`}>
                              {evaluarProfesor(u.resenasPositivas, u.resenasNegativas).texto}
                            </span>
                          </td>
                        )}
                        <td className="text-end pe-4 py-3">
                          {editandoId === u.id ? (
                            <button className="btn btn-sm btn-success rounded-pill px-3" onClick={() => guardarEdicion(u.id)}>Guardar</button>
                          ) : (
                            <button className="btn btn-sm btn-outline-primary rounded-pill px-3" onClick={() => { setEditandoId(u.id); setFormData({ nombre: u.nombre, correo: u.correo }); }}>Editar</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}