import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";

const TutoriasProfesor = () => {
  const [tutorias, setTutorias] = useState([]);
  const [alumno, setAlumno] = useState('');
  const [materia, setMateria] = useState('');
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    // 1. IDEA 1: MOCK DATA AUTOMATIZADO (Para asegurar que la demo nunca esté vacía al iniciar)
    const datosTutoriasPreinstalados = [
      { estudiante: "Luis carlos Mendez Chavez", curso: "Desarrollo de software", fecha: "2026-02-12" },
      { estudiante: "Ana Maria Gomez", curso: "Física de Campos", fecha: "2026-06-04" },
      { estudiante: "Guillermo Palacios", curso: "Diseño de Sistemas Web", fecha: "2026-06-05" }
    ];

    if (!localStorage.getItem("tutorias")) {
      localStorage.setItem("tutorias", JSON.stringify(datosTutoriasPreinstalados));
    }

    const datos = JSON.parse(localStorage.getItem("tutorias")) || [];
    setTutorias(datos);
  }, []);

  const agregarTutoria = (e) => {
    e.preventDefault();
    
    // VALIDACIÓN: Evita que se guarden tarjetas sin datos
    if (!alumno.trim() || !materia.trim() || !fecha) {
      alert("Por favor, completa todos los campos antes de agendar.");
      return;
    }

    const nueva = { estudiante: alumno, curso: materia, fecha: fecha };
    const lista = [...tutorias, nueva];
    setTutorias(lista);
    localStorage.setItem("tutorias", JSON.stringify(lista));
    setAlumno(''); setMateria(''); setFecha('');
  };

  // FUNCIÓN PARA ELIMINAR: Filtra la lista y actualiza el almacenamiento
  const eliminarTutoria = (index) => {
    const nuevasTutorias = tutorias.filter((_, i) => i !== index);
    setTutorias(nuevasTutorias);
    localStorage.setItem("tutorias", JSON.stringify(nuevasTutorias));
  };

  // ESTILOS INTERACTIVOS (Efecto Hover para UI/UX coherente con el Inicio)
  const cardStyle = {
    borderRadius: '12px',
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer"
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.12)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 .125rem .25rem";
  };

  return (
    <div className="d-flex">
      <Sidebar role="profesor" />
      <div className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <h2 className="mb-4 text-primary fw-bold">Próximas Tutorías</h2>
        
        {/* FORMULARIO MEJORADO VISUALMENTE */}
        <div className="card shadow-sm mb-4 border-0 p-4" style={{ borderRadius: '15px' }}>
          <form onSubmit={agregarTutoria} className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label small fw-bold text-secondary">Alumno</label>
              <input 
                type="text" 
                className="form-control bg-light border-0 py-2" 
                placeholder="Nombre del alumno" 
                value={alumno} 
                onChange={(e)=>setAlumno(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold text-secondary">Curso</label>
              <input 
                type="text" 
                className="form-control bg-light border-0 py-2" 
                placeholder="Curso" 
                value={materia} 
                onChange={(e)=>setMateria(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold text-secondary">Fecha</label>
              <input 
                type="date" 
                className="form-control bg-light border-0 py-2" 
                value={fecha} 
                onChange={(e)=>setFecha(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-success w-100 py-2 fw-semibold shadow-sm">Agendar</button>
            </div>
          </form>
        </div>

        {/* LISTADO DE TARJETAS EN GRID RESPONSIVO */}
        <div className="row">
          {tutorias.length > 0 ? (
            tutorias.map((tut, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div 
                  className="card border-0 shadow-sm h-100 bg-white"
                  style={cardStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3" style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
                    <span className="fw-bold small text-uppercase tracking-wider">Sesión # {index + 1}</span>
                    {/* BOTÓN X PARA ELIMINAR */}
                    <button 
                      className="btn btn-sm text-white p-0 btn-close-white" 
                      onClick={() => eliminarTutoria(index)}
                      style={{ fontSize: '1.2rem', lineHeight: '1', border: 'none', background: 'none' }}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="card-body p-4 d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title text-dark fw-bold mb-3">{tut.estudiante}</h5>
                      <p className="card-text text-muted small">
                        <strong>Curso:</strong> {tut.curso} <br />
                        <strong>Fecha:</strong> {tut.fecha}
                      </p>
                    </div>
                    <div className="mt-4">
                      <button className="btn btn-outline-primary fw-semibold w-100 py-2 shadow-sm">Iniciar Sesión</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center mt-4">
              <div className="alert alert-info border-0 shadow-sm">
                No tienes tutorías programadas para esta semana.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutoriasProfesor;