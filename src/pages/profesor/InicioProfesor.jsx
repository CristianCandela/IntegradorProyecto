import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";

const InicioProfesor = () => {
  const [resumen, setResumen] = useState({
    totalTutorias: 0,
    totalEvaluaciones: 0,
    promedioNotas: 0
  });

  useEffect(() => {
    // Cargar datos de localStorage para el resumen
    const tutorias = JSON.parse(localStorage.getItem("tutorias")) || [];
    const evaluaciones = JSON.parse(localStorage.getItem("evaluaciones")) || [];
    
    const sumaNotas = evaluaciones.reduce((acc, curr) => acc + Number(curr.nota), 0);
    const promedio = evaluaciones.length > 0 ? (sumaNotas / evaluaciones.length).toFixed(1) : 0;

    setResumen({
      totalTutorias: tutorias.length,
      totalEvaluaciones: evaluaciones.length,
      promedioNotas: promedio
    });
  }, []);

  return (
    <div className="d-flex">
      <Sidebar role="profesor" />
      <div className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <h2 className="mb-4">Bienvenido, Profesor</h2>
        <div className="row">
          
          {/* Tarjeta 1: Tutorías */}
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm bg-primary text-white">
              <div className="card-body">
                <h5 className="card-title">Tutorías Pendientes</h5>
                <h2 className="display-4">{resumen.totalTutorias}</h2>
                <p className="card-text">Sesiones programadas para esta semana.</p>
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Evaluaciones */}
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm bg-success text-white">
              <div className="card-body">
                <h5 className="card-title">Evaluaciones Realizadas</h5>
                <h2 className="display-4">{resumen.totalEvaluaciones}</h2>
                <p className="card-text">Total de registros en el sistema.</p>
              </div>
            </div>
          </div>

          {/* Tarjeta 3: Rendimiento */}
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm bg-warning text-dark">
              <div className="card-body">
                <h5 className="card-title">Promedio General</h5>
                <h2 className="display-4">{resumen.promedioNotas}</h2>
                <p className="card-text">Calificación promedio de tus cursos.</p>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-4 p-5 bg-white rounded shadow-sm">
          <h4>Acceso Rápido</h4>
          <p className="text-muted">Selecciona una opción en la barra lateral para gestionar tus clases.</p>
          <hr />
          <div className="d-flex gap-3">
            <button className="btn btn-outline-primary">Ver Calendario</button>
            <button className="btn btn-outline-secondary">Generar Reporte</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InicioProfesor;