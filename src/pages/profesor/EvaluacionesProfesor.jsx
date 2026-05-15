import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";

const EvaluacionesProfesor = () => {
  const [resenas, setResenas] = useState([]);

  useEffect(() => {
    // Simulamos datos que vendrían de la BD de alumnos calificando al profe
    const iniciales = [
      { id: 1, alumno: "Ana Silva", comentario: "Excelente metodología, muy paciente.", estrellas: 5, fecha: "12/05/2026" },
      { id: 2, alumno: "Gerson Aldair", comentario: "Buen dominio del tema, pero falta material.", estrellas: 4, fecha: "14/05/2026" },
    ];
    
    const datosGuardados = JSON.parse(localStorage.getItem("resenas_profe")) || iniciales;
    setResenas(datosGuardados);
  }, []);

  // Función para convertir el número en estrellas visuales
  const mostrarEstrellas = (cantidad) => "⭐".repeat(cantidad);

  return (
    <div className="d-flex">
      <Sidebar role="profesor" />
    
      <div className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-dark">Mis Reseñas y Calificaciones</h2>
          <div className="bg-white p-2 rounded shadow-sm border">
            <span className="text-muted small">Promedio:</span>
            <span className="ms-2 fw-bold text-primary">4.5 / 5 ⭐</span>
          </div>
        </div>
        
        <div className="row">
          {resenas.length > 0 ? (
            resenas.map((res, index) => (
              <div className="col-md-6 mb-4" key={index}>
                <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h6 className="fw-bold mb-0">{res.alumno}</h6>
                      <small className="text-muted">{res.fecha}</small>
                    </div>
                    <div className="my-2 text-warning">
                      {mostrarEstrellas(res.estrellas)}
                    </div>
                    <p className="card-text text-secondary italic">
                      "{res.comentario}"
                    </p>
                    <div className="d-flex align-items-center">
                      <span className={`badge ${res.estrellas >= 4 ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'} px-3`}>
                        {res.estrellas >= 4 ? 'Recomendado' : 'Neutral'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="alert alert-light text-center border shadow-sm">
                No tienes reseñas registradas todavía.
              </div>
            </div>
          )}
        </div>

        {/* Sección informativa para el profesor */}
        <div className="mt-4 p-4 bg-primary text-white rounded-4 shadow">
          <h5>💡 Tip de Reputación</h5>
          <p className="mb-0 opacity-75">
            Responder a las reseñas de tus alumnos mejora tu visibilidad en ProfeMatch en un 20%.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EvaluacionesProfesor;