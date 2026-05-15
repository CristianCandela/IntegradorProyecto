import Sidebar from "../../components/Sidebar";
import ProfesorCard from "../../components/ProfesorCard";
import { profesoresData } from "../../data/profesoresData";

export default function TutoriasEstudiante() {
  
  // Función placeholder para el futuro Perfil
  const irAlPerfil = (id) => {
    console.log("Navegando al perfil del profesor:", id);
    // Aquí irá el navigate(`/perfil-profesor/${id}`) cuando se cree la página
  };

  return (
    <div className="main-layout">
      <Sidebar role="estudiante" />

      <main className="dashboard-content">
        {/* Cabecera de la sección */}
        <header className="mb-4">
          <h2 className="fw-bold text-indigo">Tutorías Disponibles</h2>
          <p className="text-muted">Conecta con profesores expertos para tutorías personalizadas.</p>
        </header>

        {/* Banner Informativo (Estilo Figma) */}
        <section className="alert border-0 rounded-4 p-4 mb-5" style={{ backgroundColor: "#f0f4ff", border: "1px solid #d0e0ff" }}>
          <div className="d-flex gap-3">
            <div className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: "45px", height: "45px", minWidth: "45px" }}>
              <i className="bi bi-calendar-check text-primary fs-4"></i>
            </div>
            <div>
              <h6 className="fw-bold text-dark mb-2">¿Cómo funcionan las tutorías?</h6>
              <ul className="small text-secondary mb-0 ps-3">
                <li>Busca un profesor disponible en el tema que necesitas.</li>
                <li>Revisa su calificación, precio y disponibilidad.</li>
                <li>Solicita una sesión de tutoría directamente.</li>
                <li>Coordina horarios y modalidad (presencial u online).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Grilla de Profesores para Tutoría */}
        <section className="row g-4">
          {profesoresData.map((profe) => (
            <div key={profe.id} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-shadow bg-white">
                <div className="card-body p-4">
                  
                  {/* Encabezado Card: Foto y Nombre */}
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <img 
                      src={profe.foto} 
                      alt={profe.nombre} 
                      className="rounded-circle border border-2 border-light shadow-sm"
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                    <div>
                      <h6 className="fw-bold mb-0 text-dark">{profe.nombre}</h6>
                      <small className="text-muted">{profe.departamento}</small>
                      <div className="text-warning small">
                        <i className="bi bi-star-fill me-1"></i>
                        <span className="fw-bold text-dark">{profe.rating}</span>
                        <span className="text-muted ms-1">(120+)</span>
                      </div>
                    </div>
                  </div>

                  {/* Badge de Precio (Verde Figma) */}
                  <div className="mb-3">
                    <span className="badge bg-success bg-opacity-10 text-success fw-bold px-3 py-2 rounded-3" style={{ fontSize: "0.9rem" }}>
                      ${profe.precioHora}/hora
                    </span>
                  </div>

                  {/* Materias Disponibles */}
                  <div className="mb-3">
                    <p className="small fw-bold text-muted mb-2">Materias disponibles:</p>
                    <div className="d-flex flex-wrap gap-1">
                      <span className="badge bg-primary bg-opacity-10 text-primary border-0 rounded-pill px-2 py-1" style={{ fontSize: "0.7rem" }}>{profe.curso}</span>
                      <span className="badge bg-primary bg-opacity-10 text-primary border-0 rounded-pill px-2 py-1" style={{ fontSize: "0.7rem" }}>Refuerzo Académico</span>
                    </div>
                  </div>

                  {/* Descripción Breve */}
                  <p className="text-muted small mb-4" style={{ display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {profe.descripcion}
                  </p>

                  {/* Indicadores de Rendimiento (Figma) */}
                  <div className="row g-2 mb-4 border-top pt-3">
                    <div className="col-6 border-end text-center">
                      <small className="d-block text-muted" style={{ fontSize: "0.65rem" }}>Metodología</small>
                      <span className="fw-bold text-indigo">9.5/10</span>
                    </div>
                    <div className="col-6 text-center">
                      <small className="d-block text-muted" style={{ fontSize: "0.65rem" }}>Disponibilidad</small>
                      <span className="fw-bold text-success">8.8/10</span>
                    </div>
                  </div>

                  {/* Botones de Acción */}
                  <div className="d-flex gap-2">
                    <button 
                      onClick={() => irAlPerfil(profe.id)}
                      className="btn btn-outline-light text-indigo border fw-bold w-100 rounded-pill btn-sm py-2"
                    >
                      Ver Perfil
                    </button>
                    <button 
                      className="btn btn-primary fw-bold w-100 rounded-pill btn-sm py-2 border-0"
                      style={{ background: "linear-gradient(135deg, #493774 0%, #6b51a3 100%)" }}
                    >
                      <i className="bi bi-chat-dots me-2"></i>Solicitar
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}