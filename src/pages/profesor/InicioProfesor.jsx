import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";

const InicioProfesor = () => {
  const [resumen, setResumen] = useState({
    totalTutorias: 0,
    totalEvaluaciones: 0,
    promedioNotas: 0
  });

  useEffect(() => {
    // 1. Obtener datos del LocalStorage (lo que guardas en las otras vistas)
    const tutorias = JSON.parse(localStorage.getItem("tutorias")) || [];
    const evaluaciones = JSON.parse(localStorage.getItem("evaluaciones")) || [];
    
    // 2. Calcular el promedio de notas de forma automática
    const sumaNotas = evaluaciones.reduce((acc, curr) => acc + Number(curr.nota), 0);
    const promedio = evaluaciones.length > 0 ? (sumaNotas / evaluaciones.length).toFixed(1) : 0;

    // 3. Actualizar el estado del tablero
    setResumen({
      totalTutorias: tutorias.length,
      totalEvaluaciones: evaluaciones.length,
      promedioNotas: promedio
    });
  }, []);

  return (
    <div className="d-flex">
<<<<<<< HEAD
      {/* Se mantiene el Sidebar del pull con el rol asignado */}
      <Sidebar role="profesor" />
      
=======
      <Sidebar role="profesor" />
>>>>>>> fafc95a80da91cdd52138ed3bbbbc80b30438de8
      <div className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <h2 className="mb-4">Bienvenido, Profesor</h2>
        
        <div className="row">
          
          {/* Tarjeta de Tutorías: Se actualiza con el total de la lista */}
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm bg-primary text-white">
              <div className="card-body text-center">
                <h5 className="card-title">Tutorías Pendientes</h5>
                <h1 className="display-3 fw-bold">{resumen.totalTutorias}</h1>
                <p className="card-text">Sesiones registradas en el sistema.</p>
              </div>
            </div>
          </div>

          {/* Tarjeta de Evaluaciones: Muestra cuántas notas has subido */}
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm bg-success text-white">
              <div className="card-body text-center">
                <h5 className="card-title">Evaluaciones Realizadas</h5>
                <h1 className="display-3 fw-bold">{resumen.totalEvaluaciones}</h1>
                <p className="card-text">Total de estudiantes calificados.</p>
              </div>
            </div>
          </div>

          {/* Tarjeta de Rendimiento: Calcula el promedio real de las notas */}
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm bg-warning text-dark">
              <div className="card-body text-center">
                <h5 className="card-title">Promedio General</h5>
                <h1 className="display-3 fw-bold">{resumen.promedioNotas}</h1>
                <p className="card-text">Nivel de rendimiento de tus cursos.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Sección de accesos rápidos para navegación */}
        <div className="mt-2 p-5 bg-white rounded shadow-sm border">
          <h4>Panel de Control</h4>
          <p className="text-muted">Desde aquí puedes ver un resumen rápido de tu actividad académica.</p>
          <hr />
          <div className="d-flex gap-3">
            <button className="btn btn-outline-primary shadow-sm">Ver Calendario Académico</button>
            <button className="btn btn-outline-secondary shadow-sm">Descargar Reporte PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InicioProfesor;