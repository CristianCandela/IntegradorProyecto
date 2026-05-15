import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";

const TutoriasProfesor = () => {
  const [tutorias, setTutorias] = useState([]);
  const [alumno, setAlumno] = useState('');
  const [materia, setMateria] = useState('');
  const [fecha, setFecha] = useState('');

  useEffect(() => {
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

  return (
    <div className="d-flex">
      <Sidebar role="profesor" />
      <div className="container-fluid p-4">
        <h2 className="mb-4 text-primary">Próximas Tutorías</h2>
        
        {/* FORMULARIO */}
        <div className="card shadow-sm mb-4 border-0 p-3">
          <form onSubmit={agregarTutoria} className="row g-2">
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Alumno" value={alumno} onChange={(e)=>setAlumno(e.target.value)}/>
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" placeholder="Curso" value={materia} onChange={(e)=>setMateria(e.target.value)}/>
            </div>
            <div className="col-md-3">
              <input type="date" className="form-control" value={fecha} onChange={(e)=>setFecha(e.target.value)}/>
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-success w-100">Agendar</button>
            </div>
          </form>
        </div>

        {/* LISTADO DE TARJETAS */}
        <div className="row">
          {tutorias.length > 0 ? (
            tutorias.map((tut, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div className="card border-primary shadow-sm h-100">
                  <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <span>Sesión # {index + 1}</span>
                    {/* BOTÓN X PARA ELIMINAR */}
                    <button 
                      className="btn btn-sm text-white p-0" 
                      onClick={() => eliminarTutoria(index)}
                      style={{ fontSize: '1.2rem', lineHeight: '1' }}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-dark fw-bold">{tut.estudiante}</h5>
                    <p className="card-text text-muted">
                      <strong>Curso:</strong> {tut.curso} <br />
                      <strong>Fecha:</strong> {tut.fecha}
                    </p>
                    <button className="btn btn-outline-primary btn-sm w-100">Iniciar Sesión</button>
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