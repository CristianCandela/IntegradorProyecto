import Sidebar from "../../components/Sidebar";

export default function UsuariosAdmin() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Sidebar role="admin" />
      <div className="flex-grow-1 p-4 p-md-5" style={{ marginLeft: "70px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h1 className="fw-bold">Gestión de Usuarios</h1>
            <p className="text-muted">Administra permisos y cuentas de ProfeMatch.</p>
          </div>
          <button className="btn btn-primary shadow-sm">+ Nuevo Usuario</button>
        </div>

        {/* Buscador */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <input type="text" className="form-control" placeholder="Buscar por nombre, correo o código..." />
          </div>
        </div>

        {/* Tabla de Usuarios */}
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>Nombre</th>
                  <th>Rol</th>
                  <th>Correo Institucional</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Daniel Quispe</td>
                  <td><span className="badge bg-secondary text-white">Admin</span></td>
                  <td>d.quispe@profe.edu.pe</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">Editar</button>
                    <button className="btn btn-sm btn-outline-danger">Inhabilitar</button>
                  </td>
                </tr>
                {/* Repetir dinámicamente */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}