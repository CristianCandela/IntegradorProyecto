import { useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function UsuariosAdmin() {
  // 1. ESTADOS PRINCIPALES
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Daniel Quispe", rol: "Admin", correo: "d.quispe@profe.edu.pe" },
    { id: 2, nombre: "Ana Silva", rol: "Estudiante", correo: "asilva@profe.edu.pe" },
  ]);

  const [busqueda, setBusqueda] = useState("");
  
  // Estados para el Formulario/Modal
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editandoId, setEditandoId] = useState(null); // null = nuevo, número = editando
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    rol: "Estudiante"
  });

  // 2. MANEJADORES DE FORMULARIO
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const abrirModal = (usuario = null) => {
    if (usuario) {
      setEditandoId(usuario.id);
      setFormData({ nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol });
    } else {
      setEditandoId(null);
      setFormData({ nombre: "", correo: "", rol: "Estudiante" });
    }
    setMostrarModal(true);
  };

  const guardarUsuario = (e) => {
    e.preventDefault();
    
    if (editandoId) {
      // Lógica de Edición
      setUsuarios(usuarios.map(u => u.id === editandoId ? { ...u, ...formData } : u));
    } else {
      // Lógica de Creación
      const nuevoUsuario = { id: Date.now(), ...formData };
      setUsuarios([...usuarios, nuevoUsuario]);
    }
    setMostrarModal(false);
  };

  const eliminarUsuario = (id) => {
    if (window.confirm("¿Eliminar definitivamente a este usuario?")) {
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  // Filtrado para el buscador
  const usuariosFiltrados = usuarios.filter(u => 
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    u.correo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Sidebar role="admin" />
      
      <div className="flex-grow-1 p-4 p-md-5" style={{ marginLeft: "70px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Gestión de Usuarios</h2>
          <button className="btn btn-primary shadow-sm" onClick={() => abrirModal()}>
            + Agregar Usuario
          </button>
        </div>

        {/* Buscador */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <input 
              type="text" className="form-control" placeholder="Buscar por nombre o correo..." 
              value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>

        {/* Tabla */}
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Tipo de Usuario</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map(u => (
                  <tr key={u.id}>
                    <td>{u.nombre}</td>
                    <td>{u.correo}</td>
                    <td>
                      <span className={`badge ${u.rol === 'Admin' ? 'bg-dark' : u.rol === 'Profesor' ? 'bg-info' : u.rol === 'Tecnico' ? 'bg-warning text-dark' : 'bg-success'}`}>
                        {u.rol}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => abrirModal(u)}>Editar</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL PERSONALIZADO (Se muestra condicionalmente) */}
      {mostrarModal && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="fw-bold">{editandoId ? "Editar Usuario" : "Nuevo Usuario"}</h5>
                <button type="button" className="btn-close" onClick={() => setMostrarModal(false)}></button>
              </div>
              <form onSubmit={guardarUsuario}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Nombre Completo</label>
                    <input type="text" name="nombre" className="form-control" required value={formData.nombre} onChange={handleInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Correo Institucional</label>
                    <input type="email" name="correo" className="form-control" required value={formData.correo} onChange={handleInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Tipo de Usuario</label>
                    <select name="rol" className="form-select" value={formData.rol} onChange={handleInputChange}>
                      <option value="Estudiante">Estudiante</option>
                      <option value="Admin">Admin</option>
                      <option value="Profesor">Profesor</option>
                      <option value="Tecnico">Técnico</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-light" onClick={() => setMostrarModal(false)}>Cancelar</button>
                  <button type="submit" className="btn btn-primary px-4">{editandoId ? "Actualizar" : "Guardar"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}