import Sidebar from "../../components/Sidebar";

export default function InicioAdmin() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Sidebar role="admin" />
      <div className="flex-grow-1 p-4 p-md-5" style={{ marginLeft: "70px" }}>
        <div className="mb-4">
          <h1 className="fw-bold">Panel de Control</h1>
          <p className="text-muted">Vista general del rendimiento de ProfeMatch.</p>
        </div>

        {/* KPIs Rápidos */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm bg-primary text-white p-3">
              <div className="card-body">
                <h6>Nuevos Usuarios</h6>
                <h2 className="fw-bold">45</h2>
                <small>En las últimas 24 horas</small>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm bg-dark text-white p-3">
              <div className="card-body">
                <h6>Evaluaciones Hoy</h6>
                <h2 className="fw-bold">128</h2>
                <small>Actividad constante</small>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm bg-warning text-dark p-3">
              <div className="card-body">
                <h6>Alertas de Moderación</h6>
                <h2 className="fw-bold">3</h2>
                <small>Requieren atención inmediata</small>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico Placeholder / Actividad */}
        <div className="card border-0 shadow-sm p-4 text-center py-5">
          <h5 className="text-muted">Espacio para gráfico de actividad semanal</h5>
          <p className="small text-muted">Aquí podrías integrar una librería como Chart.js o Recharts.</p>
        </div>
      </div>
    </div>
  );
}