import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import ProfesorCard from "../../components/ProfesorCard";
import { profesoresData } from "../../data/profesoresData";

export default function InicioEstudiante() {
  const [userName, setUserName] = useState("Estudiante");

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("userSession"));
    if (session && session.email) {
      const namePart = session.email.split('@')[0];
      setUserName(namePart.charAt(0).toUpperCase() + namePart.slice(1));
    }
  }, []);

  // Seleccionamos los 4 mejores para la sección principal
  const recomendados = [...profesoresData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="main-layout">
      <Sidebar role="estudiante" />

      <main className="dashboard-content">
        
        {/* Cabecera */}
        <header className="mb-5">
          <h1 className="fw-bold text-indigo mb-1">¡Hola, {userName}! 👋</h1>
          <p className="text-muted">Aquí tienes tus recomendaciones personalizadas para este ciclo académico.</p>
        </header>

        {/* Accesos Rápidos (Corregidos sin transition-all) */}
        <section className="row g-4 mb-5">
          <div className="col-md-4">
            <Link to="/buscar-estudiante" className="text-decoration-none">
              <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100 border-start border-4 border-primary hover-shadow">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-3 text-primary">
                    <i className="bi bi-search fs-4"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-0">Buscar Profesores</h5>
                    <small className="text-muted">Filtra por curso o rating</small>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/tutorias-estudiante" className="text-decoration-none">
              <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100 border-start border-4 border-info hover-shadow">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-info bg-opacity-10 p-3 rounded-3 text-info">
                    <i className="bi bi-mortarboard fs-4"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-0">Tutorías</h5>
                    <small className="text-muted">Gestiona tus horarios</small>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/resenas-estudiante" className="text-decoration-none">
              <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100 border-start border-4 border-success hover-shadow">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-success bg-opacity-10 p-3 rounded-3 text-success">
                    <i className="bi bi-chat-left-text fs-4"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-0">Mis Reseñas</h5>
                    <small className="text-muted">Opiniones publicadas</small>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Profesores Recomendados */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <h4 className="fw-bold text-dark mb-0">Profesores Recomendados</h4>
            <Link to="/buscar-estudiante" className="text-indigo fw-bold text-decoration-none">
              Ver todos <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
          
          <div className="row g-4">
            {recomendados.map(profe => (
              <div key={profe.id} className="col-sm-6 col-xl-3">
                <ProfesorCard profesor={profe} />
              </div>
            ))}
          </div>
        </section>

        {/* Sección de Apoyo: Guardados y Actividad */}
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
              <h5 className="fw-bold mb-4">Guardados Recientemente</h5>
              <div className="d-flex flex-column gap-3">
                {profesoresData.slice(0, 3).map(profe => (
                  <div key={profe.id} className="p-2 border rounded-3 d-flex align-items-center gap-3 bg-light bg-opacity-50">
                    <img src={profe.foto} className="rounded-circle shadow-sm" width="45" height="45" style={{objectFit: 'cover'}} alt="" />
                    <div className="flex-grow-1">
                      <h6 className="mb-0 fw-bold small">{profe.nombre}</h6>
                      <small className="text-muted">{profe.curso}</small>
                    </div>
                    <i className="bi bi-bookmark-fill text-primary"></i>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
              <h5 className="fw-bold mb-4">Actividad</h5>
              <div className="d-flex flex-column gap-4">
                <div className="d-flex gap-3 align-items-start">
                  <div className="bg-warning bg-opacity-10 p-2 rounded-circle shadow-sm"><i className="bi bi-star-fill text-warning"></i></div>
                  <div>
                    <p className="mb-0 small fw-bold">Calificaste a Dra. Elena Vargas</p>
                    <small className="text-muted">Ayer, 4:30 PM</small>
                  </div>
                </div>
                <div className="d-flex gap-3 align-items-start">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle shadow-sm"><i className="bi bi-calendar-event text-primary"></i></div>
                  <div>
                    <p className="mb-0 small fw-bold">Tutoría agendada con Prof. Carlos Ramirez</p>
                    <small className="text-muted">Mañana, 10:00 AM</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}