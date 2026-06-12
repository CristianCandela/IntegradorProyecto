import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function UsuariosAdmin() {
  // 1. ESTADOS PRINCIPALES (Ahora incluye detalle de quejas)
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Daniel Quispe", rol: "Admin", correo: "d.quispe@profe.edu.pe", score: 100, plan: "N/A", quejas: 0, detalleQuejas: [] },
    { id: 2, nombre: "Ana Silva", rol: "Estudiante", correo: "asilva@profe.edu.pe", score: 95, plan: "N/A", quejas: 0, detalleQuejas: [] },
    { id: 3, nombre: "Carlos Gómez", rol: "Profesor", correo: "cgomez@profe.edu.pe", score: 85, plan: "Premium", quejas: 0, detalleQuejas: [] },
    { id: 4, nombre: "Luis Ramírez", rol: "Profesor", correo: "lramirez@profe.edu.pe", score: 45, plan: "Gratuito", quejas: 2, detalleQuejas: ["Cancelación de clase sin aviso previo (No-show).", "Reporte por llegar 15 minutos tarde a la tutoría."] },
    { id: 5, nombre: "María Torres", rol: "Estudiante", correo: "mtorres@profe.edu.pe", score: 65, plan: "N/A", quejas: 1, detalleQuejas: ["Uso de lenguaje inapropiado en el chat de la sesión."] },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("Todos"); // Nuevo estado para el filtro
  
  // Estados para Modales
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  
  const [modalQuejasVisible, setModalQuejasVisible] = useState(false);
  const [usuarioViendoQuejas, setUsuarioViendoQuejas] = useState(null);
  
  const [formData, setFormData] = useState({
    nombre: "", correo: "", rol: "Estudiante", score: 100, plan: "N/A"
  });

  // 2. MANEJADORES
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const abrirModal = (usuario = null) => {
    if (usuario) {
      setEditandoId(usuario.id);
      setFormData({ 
        nombre: usuario.nombre, correo: usuario.correo, 
        rol: usuario.rol, score: usuario.score, plan: usuario.plan 
      });
    } else {
      setEditandoId(null);
      setFormData({ nombre: "", correo: "", rol: "Estudiante", score: 100, plan: "N/A" });
    }
    setMostrarModal(true);
  };

  const abrirModalQuejas = (usuario) => {
    setUsuarioViendoQuejas(usuario);
    setModalQuejasVisible(true);
  };

  const guardarUsuario = (e) => {
    e.preventDefault();
    if (editandoId) {
      setUsuarios(usuarios.map(u => u.id === editandoId ? { ...u, ...formData } : u));
    } else {
      const nuevoUsuario = { id: Date.now(), quejas: 0, detalleQuejas: [], ...formData };
      setUsuarios([...usuarios, nuevoUsuario]);
    }
    setMostrarModal(false);
  };

  const eliminarUsuario = (id) => {
    if (window.confirm("¿Estás seguro de inhabilitar esta cuenta?")) {
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  // 3. LÓGICA DE DOBLE FILTRADO (Búsqueda + Rol)
  const usuariosFiltrados = usuarios.filter(u => {
    const coincideBusqueda = u.nombre.toLowerCase().includes(busqueda.toLowerCase()) || u.correo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideRol = filtroRol === "Todos" || u.rol === filtroRol;
    return coincideBusqueda && coincideRol;
  });

  const obtenerColorScore = (score) => {
    if (score >= 90) return "bg-success text-white"; 
    if (score >= 70) return "bg-warning text-dark"; 
    if (score >= 50) return "text-white"; 
    return "bg-danger text-white"; 
  };

  return (
    <div className="d-flex">
      <Sidebar role="admin" />
      
      <div className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', overflowX: 'hidden' }}>
        
        {/* ENCABEZADO */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold mb-1" style={{ color: '#1F0954' }}>Directorio de Usuarios</h2>
            <p className="text-muted small mb-0">Gestiona cuentas, planes y audita el Score de Confiabilidad.</p>
          </div>
          <button className="btn text-white fw-semibold shadow-sm px-4 d-flex align-items-center gap-2 rounded-pill" style={{ backgroundColor: '#1F0954' }} onClick={() => abrirModal()}>
            <i className="bi bi-person-plus-fill"></i> Agregar Usuario
          </button>
        </div>

        {/* BARRA DE BÚSQUEDA Y FILTROS INTELIGENTES */}
        <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '15px' }}>
          <div className="card-body p-3 d-flex flex-wrap align-items-center gap-3">
            <div className="input-group flex-grow-1" style={{ minWidth: '250px' }}>
              <span className="input-group-text bg-white border-0 text-muted"><i className="bi bi-search"></i></span>
              <input 
                type="text" 
                className="form-control border-0 bg-light rounded" 
                placeholder="Buscar por nombre, correo o código..." 
                value={busqueda} 
                onChange={(e) => setBusqueda(e.target.value)}
                style={{ boxShadow: 'none' }}
              />
            </div>
            
            {/* NUEVO FILTRO DE ROL */}
            <div className="d-flex align-items-center gap-2 border-start ps-3">
              <span className="fw-bold text-muted small"><i className="bi bi-funnel-fill"></i> Rol:</span>
              <select 
                className="form-select bg-light border-0 fw-semibold text-secondary cursor-pointer" 
                value={filtroRol} 
                onChange={(e) => setFiltroRol(e.target.value)}
                style={{ width: '150px' }}
              >
                <option value="Todos">Todos</option>
                <option value="Estudiante">Estudiantes</option>
                <option value="Profesor">Profesores</option>
                <option value="Admin">Administradores</option>
              </select>
            </div>
          </div>
        </div>

        {/* TABLA PRINCIPAL DE USUARIOS */}
        <div className="card border-0 shadow-sm bg-white" style={{ borderRadius: '15px' }}>
          <div className="card-body p-4">
            <h5 className="fw-bold text-dark mb-3">
              <i className="bi bi-people-fill me-2" style={{ color: '#1F0954' }}></i>Cuentas Registradas
            </h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.85rem' }}>
                <thead className="table-light text-secondary">
                  <tr>
                    <th className="ps-3">Usuario</th>
                    <th>Tipo de Cuenta</th>
                    <th>Score de Confiabilidad</th>
                    <th>Plan / Alertas</th>
                    <th className="text-end pe-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados.length > 0 ? (
                    usuariosFiltrados.map(u => (
                      <tr key={u.id}>
                        <td className="ps-3 py-3">
                          <div className="fw-bold text-dark">{u.nombre}</div>
                          <div className="text-muted small">{u.correo}</div>
                        </td>
                        <td>
                          <span className={`badge px-2 py-1 rounded ${
                            u.rol === 'Admin' ? 'bg-secondary' : 
                            u.rol === 'Profesor' ? 'bg-primary-subtle text-primary border border-primary-subtle' : 
                            'bg-success-subtle text-success border border-success-subtle'
                          }`}>
                            {u.rol}
                          </span>
                        </td>
                        <td>
                          <span 
                            className={`badge rounded-pill px-3 py-1 ${obtenerColorScore(u.score)}`}
                            style={u.score >= 50 && u.score <= 69 ? { backgroundColor: '#fd7e14' } : {}}
                          >
                            {u.score} pts
                          </span>
                        </td>
                        <td>
                          {u.rol === 'Profesor' && u.plan === 'Premium' && (
                            <span className="badge me-2 px-2 py-1 bg-warning text-dark border border-warning">
                              <i className="bi bi-star-fill text-dark me-1"></i> Premium
                            </span>
                          )}
                          {u.rol === 'Profesor' && u.plan === 'Gratuito' && (
                            <span className="badge me-2 px-2 py-1 bg-light text-dark border">
                              Gratuito
                            </span>
                          )}
                          {u.quejas > 0 && (
                            <span 
                              className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1"
                              style={{ cursor: 'pointer', transition: '0.2s' }}
                              onClick={() => abrirModalQuejas(u)}
                              title="Haz clic para ver los reportes"
                            >
                              <i className="bi bi-exclamation-triangle-fill me-1"></i> {u.quejas} Quejas
                            </span>
                          )}
                          {u.rol === 'Estudiante' && u.quejas === 0 && (
                            <span className="text-muted fst-italic small">Sin alertas</span>
                          )}
                        </td>
                        <td className="text-end pe-3">
                          <button className="btn btn-sm btn-outline-primary fw-bold me-2 px-3 rounded-pill" onClick={() => abrirModal(u)}>
                            Editar
                          </button>
                          <button className="btn btn-sm btn-outline-danger px-3 rounded-pill" onClick={() => eliminarUsuario(u.id)}>
                            Bloquear
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-5 text-muted">
                        No se encontraron usuarios bajo esos criterios de búsqueda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* MODAL 1: FORMULARIO DE USUARIO */}
      {mostrarModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050, backdropFilter: 'blur(3px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              
              <div className="text-white d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: '#1F0954' }}>
                <h5 className="modal-title fw-bold m-0" style={{ fontSize: '1.1rem' }}>
                  <i className={`bi ${editandoId ? "bi-pencil-square" : "bi-person-plus-fill"} me-2`}></i>
                  {editandoId ? "Editar Usuario" : "Nuevo Usuario"}
                </h5>
                <button type="button" className="btn-close btn-close-white shadow-none m-0" onClick={() => setMostrarModal(false)}></button>
              </div>

              <form onSubmit={guardarUsuario}>
                <div className="modal-body p-4 bg-white">
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary">Nombre Completo</label>
                    <input type="text" name="nombre" className="form-control bg-light border-0" required value={formData.nombre} onChange={handleInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary">Correo Institucional</label>
                    <input type="email" name="correo" className="form-control bg-light border-0" required value={formData.correo} onChange={handleInputChange} />
                  </div>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <label className="form-label small fw-bold text-secondary">Tipo de Usuario</label>
                      <select name="rol" className="form-select bg-light border-0 cursor-pointer" value={formData.rol} onChange={handleInputChange}>
                        <option value="Estudiante">Estudiante</option>
                        <option value="Admin">Administrador</option>
                        <option value="Profesor">Profesor</option>
                      </select>
                    </div>
                    <div className="col-6 mb-3">
                      <label className="form-label small fw-bold text-secondary">Score Confiabilidad</label>
                      <input type="number" name="score" className="form-control bg-light border-0 fw-bold" min="0" max="100" required value={formData.score} onChange={handleInputChange} />
                    </div>
                  </div>
                  
                  {formData.rol === 'Profesor' && (
                    <div className="mb-3 p-3 rounded" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                      <label className="form-label small fw-bold" style={{ color: '#D4AF37' }}>
                        <i className="bi bi-star-fill text-warning me-2"></i> Plan de Suscripción
                      </label>
                      <select name="plan" className="form-select border-warning cursor-pointer" value={formData.plan} onChange={handleInputChange}>
                        <option value="Gratuito">Básico / Gratuito (20% Comisión)</option>
                        <option value="Premium">Premium (10% Comisión)</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="modal-footer border-0 bg-light">
                  <button type="button" className="btn btn-secondary px-4 fw-semibold rounded-pill" onClick={() => setMostrarModal(false)}>Cancelar</button>
                  <button type="submit" className="btn text-white px-4 fw-semibold rounded-pill" style={{ backgroundColor: '#1F0954' }}>
                    {editandoId ? "Actualizar Datos" : "Registrar Usuario"}
                  </button>
                </div>
              </form>
              
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: VISUALIZADOR DE QUEJAS */}
      {modalQuejasVisible && usuarioViendoQuejas && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050, backdropFilter: 'blur(3px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              
              <div className="text-white d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: '#dc3545' }}>
                <h5 className="modal-title fw-bold m-0" style={{ fontSize: '1.1rem' }}>
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  Auditoría de Quejas Formales
                </h5>
                <button type="button" className="btn-close btn-close-white shadow-none m-0" onClick={() => setModalQuejasVisible(false)}></button>
              </div>

              <div className="modal-body p-4 bg-white">
                <div className="mb-4 d-flex align-items-center gap-3 border-bottom pb-3">
                  <div className="bg-light rounded-circle d-flex justify-content-center align-items-center" style={{ width: '50px', height: '50px' }}>
                    <i className="bi bi-person-fill fs-3 text-secondary"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0">{usuarioViendoQuejas.nombre}</h6>
                    <small className="text-muted">{usuarioViendoQuejas.correo}</small>
                  </div>
                </div>

                <h6 className="fw-bold mb-3 text-dark">Historial de Reportes ({usuarioViendoQuejas.quejas}):</h6>
                <ul className="list-group list-group-flush">
                  {usuarioViendoQuejas.detalleQuejas.map((queja, idx) => (
                    <li key={idx} className="list-group-item px-0 text-muted d-flex align-items-start gap-2 border-0 mb-2">
                      <i className="bi bi-caret-right-fill text-danger mt-1"></i>
                      <span>{queja}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-footer border-0 bg-light">
                <button type="button" className="btn btn-secondary px-4 fw-semibold rounded-pill w-100" onClick={() => setModalQuejasVisible(false)}>Cerrar Reporte</button>
              </div>
              
            </div>
          </div>
        </div>
      )}

    </div>
  );
}