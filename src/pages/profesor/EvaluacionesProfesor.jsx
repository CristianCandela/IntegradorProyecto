import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";

const EvaluacionesProfesor = () => {
  const [resenas, setResenas] = useState([]);
  const [filtro, setFiltro] = useState(0); // 0 = Ver todas
  const [respuestas, setRespuestas] = useState({});

  useEffect(() => {
    const iniciales = [
      { id: 1, alumno: "Ana Silva", comentario: "Excelente metodología, muy paciente.", estrellas: 5, fecha: "12/05/2026" },
      { id: 2, alumno: "Gerson Aldair", comentario: "Buen dominio del tema, pero falta material.", estrellas: 4, fecha: "14/05/2026" },
      { id: 3, alumno: "Julio Casas", comentario: "La clase es interesante pero un poco rápida.", estrellas: 3, fecha: "15/05/2026" },
    ];
    
    const datosGuardados = JSON.parse(localStorage.getItem("resenas_profe")) || iniciales;
    setResenas(datosGuardados);
  }, []);

  // Función para manejar las respuestas del profesor
  const enviarRespuesta = (id, texto) => {
    if (!texto.trim()) return;
    setRespuestas({ ...respuestas, [id]: texto });
  };

  const mostrarEstrellas = (cantidad) => "⭐".repeat(cantidad);

  // Lógica de filtrado
  const resenasFiltradas = filtro === 0 
    ? resenas 
    : resenas.filter(r => r.estrellas === filtro);

  return (
    <div className="d-flex">
      <Sidebar role="profesor" />
    
      <div className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        
        {/* HEADER CON FILTRO (Mejora 1) */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark">Mis Reseñas y Calificaciones</h2>
            <p className="text-muted small">Gestiona tu feedback y mejora tu ranking.</p>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <select 
              className="form-select shadow-sm border-0" 
              style={{ width: '200px' }}
              onChange={(e) => setFiltro(Number(e.target.value))}
            >
              <option value="0">Todas las estrellas</option>
              <option value="5">5 Estrellas</option>
              <option value="4">4 Estrellas</option>
              <option value="3">3 Estrellas</option>
            </select>
            <div className="bg-white p-2 rounded shadow-sm border px-3">
              <span className="fw-bold text-primary">4.5 / 5 ⭐</span>
            </div>
          </div>
        </div>
        
        <div className="row">
          {/* LISTA DE RESEÑAS CON RESPUESTAS (Mejora 2) */}
          <div className="col-lg-8">
            <div className="row">
              {resenasFiltradas.length > 0 ? (
                resenasFiltradas.map((res, index) => (
                  <div className="col-12 mb-4" key={index}>
                    <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <h6 className="fw-bold mb-0">{res.alumno}</h6>
                          <small className="text-muted">{res.fecha}</small>
                        </div>
                        <div className="my-2 text-warning">
                          {mostrarEstrellas(res.estrellas)}
                        </div>
                        <p className="card-text text-secondary italic">"{res.comentario}"</p>
                        
                        {/* SECCIÓN DE RESPUESTA */}
                        <div className="mt-3 pt-3 border-top">
                          {respuestas[res.id] ? (
                            <div className="p-2 rounded bg-light border-start border-primary border-4">
                              <small className="fw-bold d-block text-primary">Tu respuesta:</small>
                              <span className="small text-muted">{respuestas[res.id]}</span>
                            </div>
                          ) : (
                            <div className="input-group input-group-sm">
                              <input 
                                type="text" 
                                className="form-control border-light-subtle" 
                                placeholder="Agradece el feedback..."
                                onKeyDown={(e) => e.key === 'Enter' && enviarRespuesta(res.id, e.target.value)}
                              />
                              <button className="btn btn-outline-primary">Responder</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <div className="alert alert-light border shadow-sm">No hay reseñas con esta calificación.</div>
                </div>
              )}
            </div>
          </div>

          {/* RESUMEN ESTADÍSTICO (Mejora 3) */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
              <h5 className="fw-bold mb-4">Distribución</h5>
              {[5, 4, 3, 2, 1].map(num => {
                const cantidad = resenas.filter(r => r.estrellas === num).length;
                const porcentaje = (cantidad / resenas.length) * 100 || 0;
                return (
                  <div className="mb-3" key={num}>
                    <div className="d-flex justify-content-between small mb-1">
                      <span>{num} estrellas</span>
                      <span className="text-muted">{cantidad}</span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div 
                        className="progress-bar bg-warning" 
                        style={{ width: `${porcentaje}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sección informativa */}
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