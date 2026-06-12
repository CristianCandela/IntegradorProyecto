import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import ProfesorCard from "../../components/ProfesorCard";
import CheckoutModal from "../../components/CheckoutModal";
import ModalCancelacion from "../../components/ModalCancelacion";
import { StorageService } from "../../core/database/StorageService";

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

  return (
    <div className="main-layout">
      <Sidebar role="estudiante" />

      <main className="dashboard-content">
        <header className="mb-4">
          <h2 className="fw-bold text-indigo">Centro de Tutorías</h2>
          <p className="text-muted">Gestiona tus sesiones programadas o explora nuevas materias.</p>
        </header>

        {/* TABS */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link fw-bold ${tab === "mis-tutorias" ? "active text-primary border-bottom-0" : "text-muted bg-light"}`}
              onClick={() => setTab("mis-tutorias")}
            >
              Mis Tutorías Programadas
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link fw-bold ${tab === "explorar" ? "active text-primary border-bottom-0" : "text-muted bg-light"}`}
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
                <button className="btn btn-primary mt-3 fw-bold" onClick={() => setTab("explorar")}>Agendar una ahora</button>
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
                          <img src={tut.foto} alt={tut.profesorNombre} className="rounded-circle me-2" width="30" height="30" />
                          <small className="text-muted">{tut.profesorNombre}</small>
                        </div>

                        <div className="bg-light rounded p-2 mb-3">
                          <div className="d-flex align-items-center mb-1">
                            <i className="bi bi-calendar-event text-primary me-2"></i>
                            <small className="fw-bold">{new Date(tut.fechaHora).toLocaleDateString()}</small>
                          </div>
                          <div className="d-flex align-items-center">
                            <i className="bi bi-clock text-primary me-2"></i>
                            <small className="fw-bold">{new Date(tut.fechaHora).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small>
                          </div>
                        </div>

                        {tut.estado === "Confirmada" && (
                          <button 
                            className="btn btn-outline-danger btn-sm w-100 fw-bold"
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
                    return (
                      <div key={curso} className="col-md-4 col-lg-3">
                        <div 
                          className="card border-0 shadow-sm rounded-4 h-100 text-center p-4"
                          onClick={() => setCursoSeleccionado(curso)}
                          style={{ cursor: "pointer", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
                          onMouseOver={e => e.currentTarget.style.transform = "translateY(-5px)"}
                          onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
                        >
                          <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "60px", height: "60px" }}>
                            <i className="bi bi-book fs-3 text-primary"></i>
                          </div>
                          <h6 className="fw-bold text-dark">{curso}</h6>
                          <small className="text-muted">{profesDelCurso.length} profesores disponibles</small>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <button className="btn btn-link text-decoration-none text-muted p-0 mb-4 fw-bold" onClick={() => setCursoSeleccionado(null)}>
                  <i className="bi bi-arrow-left me-2"></i> Volver a cursos
                </button>
                <h4 className="fw-bold text-indigo mb-4">Profesores de {cursoSeleccionado}</h4>
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