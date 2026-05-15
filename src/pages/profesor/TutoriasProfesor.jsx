import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";

const TutoriasProfesor = () => {
  const [tutorias, setTutorias] = useState([]);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("tutorias")) || [];
    setTutorias(datos);
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid p-4">
        <h2 className="mb-4 text-primary">Próximas Tutorías</h2>
        
        <div className="row">
          {tutorias.length > 0 ? (
            tutorias.map((tut, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div className="card border-primary shadow-sm h-100">
                  <div className="card-header bg-primary text-white">
                    Sesión # {index + 1}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{tut.estudiante}</h5>
                    <p className="card-text">
                      <strong>Curso:</strong> {tut.curso} <br />
                      <strong>Fecha:</strong> {new Date(tut.fecha).toLocaleDateString()}
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