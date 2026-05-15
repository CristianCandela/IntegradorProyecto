import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";

const TutoriasProfesor = () => {
  const [tutorias, setTutorias] = useState([]);
  // --- NUEVA INFORMACIÓN AGREGADA ---
  const [alumno, setAlumno] = useState('');
  const [materia, setMateria] = useState('');
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("tutorias")) || [];
    setTutorias(datos);
  }, []);

  const agregarTutoria = (e) => {
    e.preventDefault();
    const nueva = { estudiante: alumno, curso: materia, fecha: fecha };
    const lista = [...tutorias, nueva];
    setTutorias(lista);
    localStorage.setItem("tutorias", JSON.stringify(lista));
    setAlumno(''); setMateria(''); setFecha('');
  };
  // ---------------------------------

  return (
    <div className="d-flex">
<<<<<<< HEAD
      <Sidebar role="profesor" />
=======
      <Sidebar role="profesor"/>
>>>>>>> fafc95a80da91cdd52138ed3bbbbc80b30438de8
      <div className="container-fluid p-4">
        <h2 className="mb-4 text-primary">Próximas Tutorías</h2>
        
        {/* FORMULARIO AGREGADO */}
        <div className="card shadow-sm mb-4 border-0 p-3">
          <form onSubmit={agregarTutoria} className="row g-2">
            <div className="col-md-4"><input type="text" className="form-control" placeholder="Alumno" value={alumno} onChange={(e)=>setAlumno(e.target.value)}/></div>
            <div className="col-md-3"><input type="text" className="form-control" placeholder="Curso" value={materia} onChange={(e)=>setMateria(e.target.value)}/></div>
            <div className="col-md-3"><input type="date" className="form-control" value={fecha} onChange={(e)=>setFecha(e.target.value)}/></div>
            <div className="col-md-2"><button type="submit" className="btn btn-success w-100">Agendar</button></div>
          </form>
        </div>

        <div className="row">
          {tutorias.length > 0 ? (
            tutorias.map((tut, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div className="card border-primary shadow-sm h-100">
                  <div className="card-header bg-primary text-white">Sesión # {index + 1}</div>
                  <div className="card-body">
                    <h5 className="card-title">{tut.estudiante}</h5>
                    <p className="card-text">
                      <strong>Curso:</strong> {tut.curso} <br />
                      <strong>Fecha:</strong> {tut.fecha}
                    </p>
                    <button className="btn btn-primary btn-sm w-100">Iniciar Sesión</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-info">No tienes tutorías programadas para esta semana.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutoriasProfesor;