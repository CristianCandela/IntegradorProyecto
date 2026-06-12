import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import ProfesorCard from "../../components/ProfesorCard";
import CheckoutModal from "../../components/CheckoutModal";
import ModalCancelacion from "../../components/ModalCancelacion";
import { StorageService } from "../../core/database/StorageService";
import { courseDurations } from "../../data/profesoresData";

export default function TutoriasEstudiante() {
  const [tab, setTab] = useState("mis-tutorias"); // 'mis-tutorias' o 'explorar'

  // Data
  const [profesores, setProfesores] = useState([]);
  const [tutoriasAgendadas, setTutoriasAgendadas] = useState([]);

  // Modals state
  const [selectedProfesor, setSelectedProfesor] = useState(null);
  const [tutoriaACancelar, setTutoriaACancelar] = useState(null);

  // Grouping by course
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = () => {
    setProfesores(StorageService.getCompleteProfessors());
    const sesiones = StorageService.getTutoringSessions();
    // Orden cronológico
    sesiones.sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora));
    setTutoriasAgendadas(sesiones);
  };

  const cursosUnicos = [...new Set(profesores.map(p => p.curso))];

  const handleTutoriaAgendada = () => {
    setSelectedProfesor(null);
    cargarDatos();
    setTab("mis-tutorias");
  };

  const handleTutoriaCancelada = () => {
    setTutoriaACancelar(null);
    cargarDatos();
  };

  const isHoy = (fechaISO) => {
    const hoy = new Date();
    const fecha = new Date(fechaISO);
    return hoy.toDateString() === fecha.toDateString();
  };

  const getStatusColor = (estado) => {
    switch (estado) {
      case "Confirmada": return "success"; // Verde
      case "Completada": return "secondary"; // Gris
      case "Cancelada": return "danger"; // Rojo
      default: return "primary";
    }
  };

  const getCourseIcon = (curso) => {
    const icons = {
      "Programación Web": "bi-code-slash",
      "Psicología Social": "bi-person-hearts",
      "Cálculo I": "bi-calculator",
      "Física II": "bi-lightning",
      "Microeconomía": "bi-graph-up-arrow",
      "Base de Datos": "bi-database",
      "Anatomía Humana": "bi-lungs",
      "Redacción Académica": "bi-pen",
      "Gestión de Procesos": "bi-diagram-3",
      "Derecho Constitucional": "bi-bank",
      "Estructura de Datos": "bi-diagram-2",
      "Álgebra Lineal": "bi-bounding-box",
      "Neuropsicología": "bi-brain"
    };
    return icons[curso] || "bi-book";
  };

  // Corporate Gradient Style
  const gradientStyle = {
    background: "linear-gradient(135deg, #801caaff 0%, rgba(127, 56, 221, 1) 100%)",
    color: "white"
  };

  const textGradient = {
    background: "linear-gradient(135deg, #801caaff 0%, rgba(127, 56, 221, 1) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  };

  return (
    <div className="main-layout">
      <Sidebar role="estudiante" />

      <main className="dashboard-content">
        <header className="mb-4">
          <h2 className="fw-bold" style={textGradient}>Centro de Tutorías</h2>
          <p className="text-muted">Gestiona tus sesiones programadas o explora nuevas materias.</p>
        </header>

        {/* TABS */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link fw-bold ${tab === "mis-tutorias" ? "active border-bottom-0" : "text-muted bg-light"}`}
              style={tab === "mis-tutorias" ? textGradient : {}}
              onClick={() => setTab("mis-tutorias")}
            >
              Mis Tutorías Programadas
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link fw-bold ${tab === "explorar" ? "active border-bottom-0" : "text-muted bg-light"}`}
              style={tab === "explorar" ? textGradient : {}}
              onClick={() => {
                setTab("explorar");
                setCursoSeleccionado(null);
              }}
            >
              Explorar Cursos
            </button>
          </li>
        </ul>

        {tab === "mis-tutorias" && (
          <section>
            {tutoriasAgendadas.length === 0 ? (
              <div className="text-center py-5 bg-light rounded-4">
                <i className="bi bi-calendar-x fs-1 text-muted mb-3 d-block"></i>
                <h5 className="text-muted">No tienes tutorías programadas</h5>
                <button
                  className="btn mt-3 fw-bold border-0 shadow-sm px-4 py-2 rounded-pill"
                  style={gradientStyle}
                  onClick={() => setTab("explorar")}
                >
                  Agendar una ahora
                </button>
              </div>
            ) : (
              <div className="row g-4">
                {tutoriasAgendadas.map(tut => (
                  <div key={tut.id} className="col-md-6 col-lg-4">
                    <div className={`card border-0 shadow-sm rounded-4 h-100 border-start border-4 border-${getStatusColor(tut.estado)}`}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <span className={`badge bg-${getStatusColor(tut.estado)} bg-opacity-10 text-${getStatusColor(tut.estado)} px-3 py-2`}>
                            {tut.estado}
                          </span>
                          {isHoy(tut.fechaHora) && tut.estado === "Confirmada" && (
                            <span className="badge bg-warning text-dark shadow-sm px-2 py-1">
                              <i className="bi bi-star-fill me-1"></i> Hoy
                            </span>
                          )}
                        </div>

                        <h5 className="fw-bold text-dark mb-1">{tut.curso}</h5>
                        <div className="d-flex align-items-center mb-3">
                          <img src={tut.foto} alt={tut.profesorNombre} className="rounded-circle me-2" width="30" height="30" style={{ objectFit: 'cover' }} />
                          <small className="text-muted">{tut.profesorNombre}</small>
                        </div>

                        <div className="bg-light rounded p-2 mb-3">
                          <div className="d-flex align-items-center mb-1">
                            <i className="bi bi-calendar-event text-primary me-2"></i>
                            <small className="fw-bold">{new Date(tut.fechaHora).toLocaleDateString()}</small>
                          </div>
                          <div className="d-flex align-items-center">
                            <i className="bi bi-clock text-primary me-2"></i>
                            <small className="fw-bold">
                              {new Date(tut.fechaHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              {tut.duracionEstimada && ` • ${tut.duracionEstimada}h`}
                            </small>
                          </div>
                        </div>

                        {tut.estado === "Confirmada" && (
                          <button
                            className="btn btn-outline-danger btn-sm w-100 fw-bold rounded-pill"
                            onClick={() => setTutoriaACancelar(tut)}
                          >
                            <i className="bi bi-x-circle me-2"></i> Cancelar Tutoría
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {tab === "explorar" && (
          <section>
            {!cursoSeleccionado ? (
              <>
                <h5 className="fw-bold mb-4">¿En qué curso necesitas ayuda?</h5>
                <div className="row g-4">
                  {cursosUnicos.map(curso => {
                    const profesDelCurso = profesores.filter(p => p.curso === curso);
                    const duracion = courseDurations[curso] || 1.5;
                    const numProfesores = profesDelCurso.length;

                    return (
                      <div key={curso} className="col-md-4 col-lg-3">
                        <div
                          className="card border-0 shadow-sm rounded-4 h-100 text-center p-4 position-relative overflow-hidden"
                          onClick={() => setCursoSeleccionado(curso)}
                          style={{ cursor: "pointer", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
                          onMouseOver={e => {
                            e.currentTarget.style.transform = "translateY(-5px)";
                            e.currentTarget.style.boxShadow = "0 10px 20px rgba(123, 31, 162, 0.15)";
                          }}
                          onMouseOut={e => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)";
                          }}
                        >
                          <div className="position-absolute top-0 start-0 w-100" style={{ height: '4px', ...gradientStyle }}></div>

                          <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3 shadow-sm" style={{ width: "60px", height: "60px" }}>
                            <i className={`bi ${getCourseIcon(curso)} fs-3`} style={textGradient}></i>
                          </div>

                          <h6 className="fw-bold text-dark mb-1">{curso}</h6>
                          <div className="d-flex flex-column gap-1 mt-2">
                            <small className="text-muted">
                              <i className="bi bi-clock me-1"></i> {duracion}h estimadas
                            </small>
                            <small className="text-muted fw-bold">
                              {numProfesores} {numProfesores === 1 ? "profesor disponible" : "profesores disponibles"}
                            </small>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <button className="btn btn-link text-decoration-none text-muted p-0 mb-4 fw-bold d-flex align-items-center" onClick={() => setCursoSeleccionado(null)}>
                  <i className="bi bi-arrow-left me-2 fs-5"></i> Volver a cursos
                </button>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center shadow-sm" style={{ width: "50px", height: "50px" }}>
                    <i className={`bi ${getCourseIcon(cursoSeleccionado)} fs-4`} style={textGradient}></i>
                  </div>
                  <div>
                    <h4 className="fw-bold mb-0" style={textGradient}>Profesores de {cursoSeleccionado}</h4>
                    <span className="badge mt-1 shadow-sm" style={gradientStyle}>
                      <i className="bi bi-clock me-1"></i> {courseDurations[cursoSeleccionado] || 1.5}h
                    </span>
                  </div>
                </div>

                <div className="row g-4">
                  {profesores.filter(p => p.curso === cursoSeleccionado).map((profe) => (
                    <div key={profe.id} className="col-sm-6 col-lg-4 col-xl-3">
                      <ProfesorCard
                        profesor={profe}
                        isTutoria={true}
                        onSolicitar={setSelectedProfesor}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        )}

      </main>

      {/* MODALS */}
      {selectedProfesor && (
        <CheckoutModal
          profesor={selectedProfesor}
          onClose={() => setSelectedProfesor(null)}
          onSuccess={handleTutoriaAgendada}
        />
      )}

      {tutoriaACancelar && (
        <ModalCancelacion
          tutoria={tutoriaACancelar}
          onClose={() => setTutoriaACancelar(null)}
          onSuccess={handleTutoriaCancelada}
        />
      )}
    </div>
  );
}