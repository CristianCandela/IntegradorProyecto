import Sidebar from "../../components/Sidebar";

export default function InicioAdmin() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* El Sidebar se mantiene intacto */}
      <Sidebar role="admin" />

      {/* Contenedor principal adaptable */}
      <div className="flex-grow-1 p-4 p-md-5" style={{ marginLeft: "70px", overflowX: "hidden" }}>
        
        {/* Encabezado */}
        <div className="mb-4">
          <h1 className="fw-bold text-dark mb-1">Panel de Administrador</h1>
          <p className="text-muted">Bienvenido, aquí gestionarás la plataforma ProfeMatch.</p>
        </div>

        {/* Sección de Tarjetas de Resumen (Métricas Clave) */}
        <div className="row g-4 mb-5">
          {/* Tarjeta 1: Total Estudiantes */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h6 className="text-muted fw-semibold mb-2">Total Estudiantes</h6>
                <h2 className="fw-bold mb-0 text-primary">1,245</h2>
                <small className="text-success">↑ 12% este mes</small>
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Profesores Registrados */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h6 className="text-muted fw-semibold mb-2">Profesores</h6>
                <h2 className="fw-bold mb-0 text-info">84</h2>
                <small className="text-muted">En 5 facultades</small>
              </div>
            </div>
          </div>

          {/* Tarjeta 3: Evaluaciones Realizadas */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h6 className="text-muted fw-semibold mb-2">Reseñas Publicadas</h6>
                <h2 className="fw-bold mb-0 text-success">3,890</h2>
                <small className="text-success">↑ Alta participación</small>
              </div>
            </div>
          </div>

          {/* Tarjeta 4: Reportes Pendientes */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h6 className="text-muted fw-semibold mb-2">Reportes Pendientes</h6>
                <h2 className="fw-bold mb-0 text-danger">12</h2>
                <small className="text-danger">Requieren revisión</small>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Actividad Reciente (Tabla Responsiva) */}
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white border-bottom-0 pt-4 pb-0">
            <h5 className="fw-bold mb-0">Actividad Reciente</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Usuario</th>
                    <th scope="col">Acción</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="fw-semibold">Juan Pérez</div>
                      <small className="text-muted">Estudiante</small>
                    </td>
                    <td>Evaluó al Prof. Carlos Gómez</td>
                    <td>Hace 2 horas</td>
                    <td><span className="badge bg-success">Aprobado</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="fw-semibold">Ana Silva</div>
                      <small className="text-muted">Estudiante</small>
                    </td>
                    <td>Reportó un comentario</td>
                    <td>Hace 5 horas</td>
                    <td><span className="badge bg-warning text-dark">Pendiente</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="fw-semibold">Luis Ramírez</div>
                      <small className="text-muted">Profesor</small>
                    </td>
                    <td>Actualizó su perfil</td>
                    <td>Ayer</td>
                    <td><span className="badge bg-info">Completado</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}