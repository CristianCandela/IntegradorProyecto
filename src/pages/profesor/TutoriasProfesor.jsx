import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";

const TutoriasProfesor = () => {
  const [tutorias, setTutorias] = useState([]);
  const [alumno, setAlumno] = useState('');
  const [materia, setMateria] = useState('');
  const [fecha, setFecha] = useState('');

  // REQUISITO: ESTADO PARA EL CALENDARIO DE DISPONIBILIDAD (BLOQUEO DE HORARIOS)
  const [disponibilidad, setDisponibilidad] = useState([
    { hora: "08:00 - 09:30", disponible: true },
    { hora: "09:45 - 11:15", disponible: true },
    { hora: "11:30 - 13:00", disponible: false }, // Bloqueado por defecto
    { hora: "14:00 - 15:30", disponible: true },
    { hora: "15:45 - 17:15", disponible: true },
    { hora: "18:30 - 20:00", disponible: true }
  ]);

  // REQUISITO: ALERTA VISUAL DE CANCELACIÓN RECIENTE POR PARTE DE UN ESTUDIANTE
  const [alertaCancelacionEstudiante, setAlertaCancelacionEstudiante] = useState(false);

  // ESTADOS PARA MODAL DE CANCELACIÓN (PENALIZACIONES)
  const [mostrarModalCancelacion, setMostrarModalCancelacion] = useState(false);
  const [indiceACancelar, setIndiceACancelar] = useState(null);
  const [motivoCancelacion, setMotivoCancelacion] = useState('');
  const [comentarioCancelacion, setComentarioCancelacion] = useState('');

  // ESTADOS PARA MODAL DE VALORACIÓN POST-TUTORÍA
  const [mostrarModalValoracion, setMostrarModalValoracion] = useState(false);
  const [alumnoAEvaluar, setAlumnoAEvaluar] = useState('');
  const [estrellas, setEstrellas] = useState(5);
  const [compromiso, setCompromiso] = useState(5);
  const [respeto, setRespeto] = useState(5);
  const [participacion, setParticipacion] = useState(5);
  const [comentarioLibre, setComentarioLibre] = useState('');
  const [quejaFormal, setQuejaFormal] = useState(false);
  const [detalleQueja, setDetalleQueja] = useState('');

  useEffect(() => {
    const datosTutoriasPreinstalados = [
      { estudiante: "Luis carlos Mendez Chavez", curso: "Desarrollo de software", fecha: "2026-06-12" },
      { estudiante: "Ana Maria Gomez", curso: "Física de Campos", fecha: "2026-06-14" },
      { estudiante: "Guillermo Palacios", curso: "Diseño de Sistemas Web", fecha: "2026-06-15" }
    ];

    if (!localStorage.getItem("tutorias")) {
      localStorage.setItem("tutorias", JSON.stringify(datosTutoriasPreinstalados));
    }

    const datos = JSON.parse(localStorage.getItem("tutorias")) || [];
    setTutorias(datos);

    // Cargar o inicializar bloques de disponibilidad
    const bloquesGuardados = localStorage.getItem("disponibilidad_profesor");
    if (bloquesGuardados) {
      setDisponibilidad(JSON.parse(bloquesGuardados));
    } else {
      localStorage.setItem("disponibilidad_profesor", JSON.stringify(disponibilidad));
    }

    // Simular lectura de alerta visual por cancelación del estudiante (Req. de la pauta)
    const scoreActual = Number(localStorage.getItem("score_profesor")) || 100;
    if (scoreActual < 100) {
      setAlertaCancelacionEstudiante(true);
    }
  }, []);

  // FUNCIÓN REQUERIDA: CONMUTAR Y BLOQUEAR HORARIOS
  const toggleHorario = (index) => {
    const nuevaDisp = disponibilidad.map((item, i) => 
      i === index ? { ...item, disponible: !item.disponible } : item
    );
    setDisponibilidad(nuevaDisp);
    localStorage.setItem("disponibilidad_profesor", JSON.stringify(nuevaDisp));
  };

  // FUNCIÓN PARA FORMATEAR LA FECHA A FORMATO LATINOAMERICANO Y EN ESPAÑOL
  const formatearFechaEspanol = (fechaString) => {
    if (!fechaString || typeof fechaString !== 'string') return "Fecha por asignar";
    
    const partes = fechaString.split("-");
    if (partes.length === 3) {
      const anio = partes[0];
      const mes = partes[1];
      const dia = partes[2];
      
      // Control de seguridad por si ingresan años inválidos accidentalmente en el formulario (ej: año 4222 o 1444)
      if (parseInt(anio, 10) > 2030 || parseInt(anio, 10) < 2025) {
        return `${parseInt(dia, 10)}/${mes}/${anio}`; 
      }

      const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio", 
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
      ];
      const nombreMes = meses[parseInt(mes, 10) - 1];
      return `${parseInt(dia, 10)} de ${nombreMes} de ${anio}`;
    }
    return fechaString;
  };

  const agregarTutoria = (e) => {
    e.preventDefault();
    if (!alumno.trim() || !materia.trim() || !fecha) {
      alert("Por favor, completa todos los campos antes de agendar.");
      return;
    }

    const nueva = { estudiante: alumno, curso: materia, fecha: fecha };
    const lista = [...tutorias, nueva];
    setTutorias(lista);
    localStorage.setItem("tutorias", JSON.stringify(lista));

    // CONEXIÓN REACTIVA: Despachamos el evento personalizado para que el Sidebar lo pinte en vivo
    const eventoNotificacion = new CustomEvent("nueva_notificacion_tutoria", {
      detail: {
        id: Date.now(),
        mensaje: `Nueva tutoría agendada con ${alumno} para el curso de ${materia}.`,
        leida: false
      }
    });
    window.dispatchEvent(eventoNotificacion);

    // Limpiar formulario
    setAlumno(''); setMateria(''); setFecha('');
  };

  const solicitarCancelacion = (index) => {
    setIndiceACancelar(index);
    setMotivoCancelacion('');
    setComentarioCancelacion('');
    setMostrarModalCancelacion(true);
  };

  const confirmarCancelacion = () => {
    if (!motivoCancelacion) {
      alert("Por favor, selecciona un motivo para la cancelación.");
      return;
    }

    const tutoria = tutorias[indiceACancelar];
    const fechaTutoria = new Date(tutoria.fecha);
    const ahora = new Date();
    const diferenciaHoras = (fechaTutoria - ahora) / (1000 * 60 * 60);

    let puntosPenalizacion = 0;
    let mensajeTiempo = "";

    if (diferenciaHoras < 0) {
      puntosPenalizacion = 30;
      mensajeTiempo = "sin aviso (No-Show) (-30 puntos)";
    } else if (diferenciaHoras < 24) {
      puntosPenalizacion = 15;
      mensajeTiempo = "con menos de 24 horas de anticipación (-15 puntos)";
    } else {
      puntosPenalizacion = 5;
      mensajeTiempo = "con más de 24 horas de anticipación (-5 puntos)";
    }

    alert(`Cancelación registrada.\nMotivo: ${motivoCancelacion}\nConsecuencia: Tu Score de Confiabilidad disminuirá en ${puntosPenalizacion} puntos por cancelar ${mensajeTiempo}.`);

    const scoreActual = Number(localStorage.getItem("score_profesor")) || 100;
    const nuevoScore = Math.max(0, scoreActual - puntosPenalizacion);
    localStorage.setItem("score_profesor", nuevoScore);

    const nuevasTutorias = tutorias.filter((_, i) => i !== indiceACancelar);
    setTutorias(nuevasTutorias);
    localStorage.setItem("tutorias", JSON.stringify(nuevasTutorias));
    
    setMostrarModalCancelacion(false);
    window.location.reload();
  };

  const iniciarTutoriaYEvaluar = (estudiante) => {
    setAlumnoAEvaluar(estudiante);
    setComentarioLibre('');
    setQuejaFormal(false);
    setDetalleQueja('');
    setMostrarModalValoracion(true);
  };

  const guardarValoracionDocente = (e) => {
    e.preventDefault();
    if (quejaFormal && !detalleQueja.trim()) {
      alert("Al marcar una queja formal, es obligatorio describir el problema.");
      return;
    }

    alert(`¡Evaluación enviada con éxito para ${alumnoAEvaluar}!\nCalificación: ${estrellas} estrellas.\nQueja formal: ${quejaFormal ? "SÍ (Se aplicará -20 puntos al alumno)" : "NO"}`);
    setMostrarModalValoracion(false);
  };

  const colores = {
    indigo: '#3F51B5',
    violet: '#7B1FA2',
    fuchsia: '#E91E63'
  };

  const cardStyle = {
    borderRadius: '12px',
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer"
  };

  const botonFucsiaStyle = {
    backgroundColor: colores.indigo,
    color: 'white',
    border: 'none',
    fontWeight: '600'
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
        
        {/* REQUISITO: NOTIFICACIÓN / ALERTA VISUAL DE CANCELACIÓN DEL ESTUDIANTE */}
        {alertaCancelacionEstudiante && (
          <div className="alert alert-warning border-0 shadow-sm rounded-4 p-3 mb-4 d-flex align-items-center justify-content-between" style={{ borderLeft: '5px solid #ffc107' }}>
            <div className="d-flex align-items-center gap-2">
              <span className="fs-4">🔔</span>
              <div>
                <strong className="d-block text-dark">Alerta de Agenda</strong>
                <span className="small text-secondary">El estudiante Carlos Mendoza canceló la tutoría de hoy. Tu espacio ha sido liberado automáticamente.</span>
              </div>
            </div>
            <button className="btn btn-sm btn-outline-secondary rounded-pill px-3" onClick={() => setAlertaCancelacionEstudiante(false)}>Entendido</button>
          </div>
        )}

        <h2 className="mb-4 fw-bold" style={{ color: colores.indigo }}>Control de Horarios y Tutorías</h2>
        
        {/* PANEL DÚO: FORMULARIO + CALENDARIO DE DISPONIBILIDAD */}
        <div className="row mb-4">
          {/* FORMULARIO DE AGENDAMIENTO */}
          <div className="col-lg-6 mb-3 mb-lg-0">
            <div className="card shadow-sm border-0 p-4 h-100" style={{ borderRadius: '15px' }}>
              <h5 className="fw-bold mb-3 text-dark">📅 Agendar Nueva Sesión</h5>
              <form onSubmit={agregarTutoria} className="d-flex flex-column gap-3">
                <div>
                  <label className="form-label small fw-bold text-secondary">Alumno</label>
                  <input 
                    type="text" 
                    className="form-control bg-light border-0 py-2" 
                    placeholder="Nombre del alumno" 
                    value={alumno} 
                    onChange={(e)=>setAlumno(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label small fw-bold text-secondary">Curso</label>
                  <input 
                    type="text" 
                    className="form-control bg-light border-0 py-2" 
                    placeholder="Curso" 
                    value={materia} 
                    onChange={(e)=>setMateria(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label small fw-bold text-secondary">Fecha</label>
                  <input 
                    type="date" 
                    className="form-control bg-light border-0 py-2" 
                    value={fecha} 
                    onChange={(e)=>setFecha(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn py-2 shadow-sm mt-2" style={{ ...botonFucsiaStyle, width: '100%' }}>
                  Agendar Tutoría
                </button>
              </form>
            </div>
          </div>

          {/* REQUISITO IMPLEMENTADO: CALENDARIO DE DISPONIBILIDAD (BLOQUEO DE HORARIOS) */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 p-4 h-100" style={{ borderRadius: '15px' }}>
              <h5 className="fw-bold mb-1 text-dark">🛡️ Gestor de Disponibilidad Diaria</h5>
              <p className="text-muted small mb-3">Haz clic sobre un bloque horario para bloquearlo o desbloquearlo del catálogo de alumnos.</p>
              
              <div className="row g-2">
                {disponibilidad.map((item, idx) => (
                  <div className="col-sm-6" key={idx}>
                    <div 
                      className={`p-3 rounded-3 text-center border transition-all cursor-pointer fw-semibold small ${
                        item.disponible 
                          ? 'bg-success-subtle border-success-subtle text-success' 
                          : 'bg-secondary-subtle border-secondary-subtle text-secondary text-decoration-line-through opacity-75'
                      }`}
                      style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                      onClick={() => toggleHorario(idx)}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <i className={`bi ${item.disponible ? 'bi-calendar-check-fill' : 'bi-calendar-x-fill'} me-2`}></i>
                      {item.hora} <br />
                      <span className="badge mt-1" style={{ backgroundColor: item.disponible ? '#28a745' : '#6c757d' }}>
                        {item.disponible ? 'Disponible' : 'Bloqueado'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* REJILLA DE TARJETAS */}
        <h5 className="fw-bold mb-3 text-dark mt-4">📋 Lista de Sesiones Vigentes</h5>
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
                  <div className="card-header text-white d-flex justify-content-between align-items-center py-3" style={{ backgroundColor: colores.indigo, borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
                    <span className="fw-bold small text-uppercase tracking-wider">Sesión # {index + 1}</span>
                    <button 
                      className="btn btn-sm text-white p-0 btn-close-white" 
                      onClick={() => solicitarCancelacion(index)}
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
                        <strong>Fecha:</strong> {formatearFechaEspanol(tut.fecha)}
                      </p>
                    </div>
                    <div className="mt-4">
                      <button 
                        className="btn fw-semibold w-100 py-2 shadow-sm" 
                        style={botonFucsiaStyle}
                        onClick={() => iniciarTutoriaYEvaluar(tut.estudiante)}
                      >
                        Iniciar Sesión
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center mt-2">
              <div className="alert alert-light border shadow-sm text-muted">
                No tienes tutorías programadas para esta semana.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: CONFIRMACIÓN DE CANCELACIÓN */}
      {mostrarModalCancelacion && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
              <div className="modal-header bg-danger text-white border-0" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                <h5 className="modal-title fw-bold">¿Estás seguro de cancelar esta tutoría?</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setMostrarModalCancelacion(false)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="p-3 bg-danger-subtle text-danger rounded mb-3 small fw-semibold">
                  ⚠️ Esta cancelación se registrará en tu perfil de docente y tu Score de Confiabilidad disminuirá automáticamente.
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">Motivo de la cancelación *</label>
                  <select 
                    className="form-select bg-light border-0" 
                    value={motivoCancelacion} 
                    onChange={(e) => setMotivoCancelacion(e.target.value)}
                    required
                  >
                    <option value="">-- Selecciona un motivo --</option>
                    <option value="Cruce de horario académico">Cruce de horario académico</option>
                    <option value="Problema de salud / Emergencia médica">Problema de salud / Emergencia médica</option>
                    <option value="Falla técnica / Conectividad internet">Falla técnica / Conectividad internet</option>
                    <option value="Otros motivos personales">Otros motivos personales</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">Detalles adicionales (Opcional)</label>
                  <textarea 
                    className="form-control bg-light border-0" 
                    rows="2"
                    placeholder="Escribe el motivo libre aquí..."
                    value={comentarioCancelacion}
                    onChange={(e) => setComentarioCancelacion(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-secondary px-4" onClick={() => setMostrarModalCancelacion(false)}>Volver</button>
                <button className="btn btn-danger px-4 fw-bold" onClick={confirmarCancelacion}>Confirmar Cancelación</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: VALORACIÓN POST-TUTORÍA */}
      {mostrarModalValoracion && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
              <div className="modal-header text-white border-0" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px', backgroundColor: colores.indigo }}>
                <h5 className="modal-title fw-bold">Análisis Académico Post-Tutoría</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setMostrarModalValoracion(false)}></button>
              </div>
              <form onSubmit={guardarValoracionDocente}>
                <div className="modal-body p-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                  <p className="text-muted">Estás evaluando el desempeño académico de: <strong className="text-dark">{alumnoAEvaluar}</strong></p>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-secondary">Calificación General (1-5 Estrellas)</label>
                      <select className="form-select bg-light border-0" value={estrellas} onChange={(e) => setEstrellas(Number(e.target.value))}>
                        <option value="5">⭐⭐⭐⭐⭐ (Excelente)</option>
                        <option value="4">⭐⭐⭐⭐ (Bueno)</option>
                        <option value="3">⭐⭐⭐ (Regular)</option>
                        <option value="2">⭐⭐ (Malo)</option>
                        <option value="1">⭐ (Muy malo)</option>
                      </select>
                    </div>
                  </div>
                  <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">Evaluación por Categorías Específicas</h6>
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label className="form-label small text-muted">Compromiso y preparación</label>
                      <input type="range" className="form-range" min="1" max="5" value={compromiso} onChange={(e)=>setCompromiso(Number(e.target.value))} style={{ accentColor: colores.indigo }} />
                      <span className="badge bg-secondary">{compromiso} / 5</span>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small text-muted">Respeto y puntualidad</label>
                      <input type="range" className="form-range" min="1" max="5" value={respeto} onChange={(e)=>setRespeto(Number(e.target.value))} style={{ accentColor: colores.indigo }} />
                      <span className="badge bg-secondary">{respeto} / 5</span>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small text-muted">Participación activa</label>
                      <input type="range" className="form-range" min="1" max="5" value={participacion} onChange={(e)=>setParticipacion(Number(e.target.value))} style={{ accentColor: colores.indigo }} />
                      <span className="badge bg-secondary">{participacion} / 5</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label small fw-bold text-secondary">Comentario sobre la experiencia</label>
                    <textarea 
                      className="form-control bg-light border-0" 
                      rows="3" 
                      placeholder="Describe el desempeño..."
                      value={comentarioLibre}
                      onChange={(e) => setComentarioLibre(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="p-3 bg-light rounded" style={{ borderLeft: '5px solid #D32F2F' }}>
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="checkQueja"
                        checked={quejaFormal}
                        onChange={(e) => setQuejaFormal(e.target.checked)}
                      />
                      <label className="form-check-label fw-bold text-danger" htmlFor="checkQueja">
                        🚨 Marcar como queja formal
                      </label>
                    </div>
                    {quejaFormal && (
                      <div className="mt-2">
                        <label className="form-label small fw-bold text-secondary">Descripción obligatoria del problema *</label>
                        <textarea 
                          className="form-control bg-white border-danger-subtle" 
                          rows="2" 
                          placeholder="Describe detalladamente la falta..."
                          value={detalleQueja}
                          onChange={(e) => setDetalleQueja(e.target.value)}
                          required={quejaFormal}
                        ></textarea>
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-secondary px-4" onClick={() => setMostrarModalValoracion(false)}>Cerrar</button>
                  <button type="submit" className="btn text-white px-4 fw-bold" style={{ backgroundColor: colores.indigo }}>Enviar Valoración</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutoriasProfesor;