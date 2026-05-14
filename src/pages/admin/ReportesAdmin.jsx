import Sidebar from "../../components/Sidebar";

export default function ReportesAdmin() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Sidebar role="admin" />
      <div className="flex-grow-1 p-4 p-md-5" style={{ marginLeft: "70px" }}>
        <div className="mb-4">
          <h1 className="fw-bold">Informes y Estadísticas</h1>
          <p className="text-muted">Análisis detallado de las evaluaciones docentes.</p>
        </div>

        <div className="row g-4">
          {/* Top Profesores Mejor Evaluados */}
          <div className="col-12 col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white pt-4 border-0">
                <h5 className="fw-bold">Profesores Destacados</h5>
              </div>
              <div className="card-body p-4">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Carlos Gómez <span className="badge bg-success rounded-pill">4.9/5.0</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Marta Rivas <span className="badge bg-success rounded-pill">4.8/5.0</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Exportar Data */}
          <div className="col-12 col-lg-6">
            <div className="card border-0 shadow-sm bg-gradient p-4 h-100" style={{ background: 'linear-gradient(45deg, #1e3a8a, #3b82f6)', color: 'white' }}>
              <h5 className="fw-bold">Exportar Base de Datos</h5>
              <p>Descarga todos los reportes de calidad en formato Excel o PDF para juntas académicas.</p>
              <div className="mt-auto d-flex gap-2">
                <button className="btn btn-light w-100 fw-semibold">Excel</button>
                <button className="btn btn-outline-light w-100 fw-semibold">PDF</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}