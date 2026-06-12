import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";

const EvaluacionesProfesor = () => {
  const [resenas, setResenas] = useState([]);
  const [filtro, setFiltro] = useState(0); // 0 = Ver todas
  const [palabraFiltro, setPalabraFiltro] = useState(''); // Filtro por Nube de Palabras
  const [respuestas, setRespuestas] = useState({});
  const [nubePalabras, setNubePalabras] = useState([]);

  useEffect(() => {
    const iniciales = [
      { id: 1, alumno: "Ana Silva", comentario: "Excelente metodología, muy paciente.", estrellas: 5, fecha: "12/05/2026" },
      { id: 2, alumno: "Gerson Aldair", comentario: "Buen dominio del tema, pero falta material.", estrellas: 4, fecha: "14/05/2026" },
      { id: 3, alumno: "Julio Casas", comentario: "La clase es interesante pero un poco rápida.", estrellas: 3, fecha: "15/05/2026" },
    ];
    
    const datosGuardados = JSON.parse(localStorage.getItem("resenas_profe")) || iniciales;
    setResenas(datosGuardados);
    generarNubePalabras(datosGuardados);
  }, []);

  // LÓGICA REQUERIDA: PROCESAR COMENTARIOS PARA LA NUBE DE PALABRAS (TAG CLOUD)
  const generarNubePalabras = (listaResenas) => {
    const palabrasExcluidas = ['la', 'el', 'los', 'las', 'un', 'una', 'en', 'de', 'del', 'y', 'es', 'son', 'pero', 'un', 'muy', 'con', 'para'];
    const conteo = {};

    listaResenas.forEach(r => {
      // Limpiar signos de puntuación y pasar a minúsculas
      const palabras = r.comentario
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .split(/\s+/);

      palabras.forEach(palabra => {
        if (palabra.length > 2 && !palabrasExcluidas.includes(palabra)) {
          conteo[palabra] = (conteo[palabra] || 0) + 1;
        }
      });
    });

    // Convertir a estructura de array con tamaños adaptativos para CSS
    const resultadoNube = Object.keys(conteo).map(text => {
      const repeticiones = conteo[text];
      let size = '0.75rem';
      if (repeticiones > 2) size = '1.3rem';
      else if (repeticiones === 2) size = '1.05rem';

      return { text, size, count: repeticiones };
    });

    setNubePalabras(resultadoNube.sort((a, b) => b.count - a.count));
  };

  // Función para manejar las respuestas del profesor
  const enviarRespuesta = (id, texto) => {
    if (!texto.trim()) return;
    setRespuestas({ ...respuestas, [id]: texto });
  };

  const mostrarEstrellas = (cantidad) => "⭐".repeat(cantidad);

  // Lógica de filtrado combinada (Estrellas + Palabra seleccionada de la Nube)
  const resenasFiltradas = resenas.filter(r => {
    const cumpleEstrellas = filtro === 0 || r.estrellas === filtro;
    const cumplePalabra = !palabraFiltro || r.comentario.toLowerCase().includes(palabraFiltro.toLowerCase());
    return cumpleEstrellas && cumplePalabra;
  });

  return (
    <div className="d-flex">
      <Sidebar role="profesor" />
    
      <div className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        
        {/* HEADER CON FILTRO */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1 fw-bold" style={{ color: '#3F51B5' }}>Mis Reseñas y Calificaciones</h2>
            <p className="text-muted small mb-0">Gestiona tu feedback y analiza los términos más comunes de tus alumnos.</p>
          </div>
          <div className="d-flex gap-3 align-items-center">
            {palabraFiltro && (
              <button 
                className="btn btn-sm btn-danger rounded-pill px-3"
                onClick={() => setPalabraFiltro('')}
              >
                Limpiar Filtro: "{palabraFiltro}" ✕
              </button>
            )}
            <select 
              className="form-select shadow-sm border-0" 
              style={{ width: '200px' }}
              value={filtro}
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
          {/* COLUMNA IZQUIERDA: LISTA DE RESEÑAS */}
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
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    enviarRespuesta(res.id, e.target.value);
                                    e.target.value = '';
                                  }
                                }}
                              />
                              <button 
                                className="btn btn-outline-primary"
                                onClick={(e) => {
                                  const input = e.target.previousSibling;
                                  enviarRespuesta(res.id, input.value);
                                  input.value = '';
                                }}
                              >
                                Responder
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <div className="alert alert-light border shadow-sm text-muted">
                    No se encontraron reseñas con los criterios seleccionados.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* COLUMNA DERECHA: DISTRIBUCIÓN Y NUEVA NUBE DE PALABRAS */}
          <div className="col-lg-4">
            {/* COMPONENTE EXIGIDO: NUBE DE PALABRAS (TAG CLOUD) */}
            <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: '15px' }}>
              <h5 className="fw-bold mb-1 text-dark">☁️ Nube de Palabras</h5>
              <p className="text-muted small mb-3">Términos recurrentes en las opiniones. Haz clic en uno para filtrar.</p>
              
              <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 p-2 bg-light rounded-4 border border-light-subtle" style={{ minHeight: '120px' }}>
                {nubePalabras.length > 0 ? (
                  nubePalabras.map((word, i) => (
                    <span
                      key={i}
                      className={`badge cursor-pointer p-2 rounded-pill shadow-sm transition-all ${
                        palabraFiltro === word.text ? 'bg-primary text-white' : 'bg-white text-indigo border text-dark'
                      }`}
                      style={{ 
                        fontSize: word.size, 
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                      }}
                      onClick={() => setPalabraFiltro(word.text === palabraFiltro ? '' : word.text)}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      {word.text} <span className="opacity-50 font-normal" style={{ fontSize: '0.65rem' }}>({word.count})</span>
                    </span>
                  ))
                ) : (
                  <span className="small text-muted text-center">No hay suficientes datos para compilar palabras clave.</span>
                )}
              </div>
            </div>

            {/* DISTRIBUCIÓN ESTADÍSTICA */}
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
                    <div className="progress" style={{ height: '8px', backgroundColor: '#e9ecef' }}>
                      <div 
                        className="progress-bar bg-warning" 
                        style={{ width: `${porcentaje}%`, borderRadius: '4px' }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECCIÓN INFORMATIVA REPARADA CON COLOR ÍNDIGO SÓLIDO (#3F51B5) */}
        <div className="mt-4 p-3 text-white rounded-4 shadow-sm" style={{ backgroundColor: '#3F51B5' }}>
          <h6 className="fw-bold mb-1">💡 Tip de Reputación Docente</h6>
          <p className="mb-0 small opacity-90">
            Responder a las reseñas de tus alumnos mejora tu visibilidad en ProfeMatch en un 20%. Mantén un canal activo de retroalimentación.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EvaluacionesProfesor;