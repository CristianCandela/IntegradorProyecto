import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";

const EvaluacionesProfesor = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);

  // Cargar datos al iniciar
  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem("evaluaciones")) || [];
    setEvaluaciones(datosGuardados);
  }, []);

  // Función para eliminar (opcional, pero recomendada)
  const eliminarEvaluacion = (index) => {
    const nuevasEvaluaciones = evaluaciones.filter((_, i) => i !== index);
    setEvaluaciones(nuevasEvaluaciones);
    localStorage.setItem("evaluaciones", JSON.stringify(nuevasEvaluaciones));
  };

  return (
    <div className="d-flex">
      <Sidebar role="profesor"/>
      <div className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <h2 className="mb-4">Portal de Evaluaciones</h2>
        <p className="text-muted">Gestión de calificaciones por curso y estudiante.</p>

        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Estudiante</th>
                  <th>Curso</th>
                  <th>Nota Final</th>
                  <th>Estado</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {evaluaciones.length > 0 ? (
                  evaluaciones.map((eva, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="fw-bold">{eva.estudiante}</td>
                      <td>{eva.curso}</td>
                      <td>
                        <span className={`badge ${eva.nota >= 12 ? 'bg-success' : 'bg-danger'}`}>
                          {eva.nota}
                        </span>
                      </td>
                      <td>{eva.nota >= 12 ? 'Aprobado' : 'Desaprobado'}</td>
                      <td className="text-center">
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => eliminarEvaluacion(index)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">No hay evaluaciones registradas.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluacionesProfesor;