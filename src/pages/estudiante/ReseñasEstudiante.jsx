import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { StorageService } from "../../core/database/StorageService";

export default function ReseñasEstudiante() {
  const [misReseñas, setMisReseñas] = useState([]);
  const [tutoriasCompletadas, setTutoriasCompletadas] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [selectedTutoria, setSelectedTutoria] = useState(null);
  const [categorias, setCategorias] = useState({
    puntualidad: 0,
    claridad: 0,
    dominio: 0,
    profesionalismo: 0
  });
  const [comentario, setComentario] = useState("");
  const [recomendaria, setRecomendaria] = useState(true);
  const [quejaFormal, setQuejaFormal] = useState(false);
  const [motivoQueja, setMotivoQueja] = useState("");

  const numCategoriasEvaluadas = Object.values(categorias).filter(val => val > 0).length;
  const sumaCategorias = Object.values(categorias).reduce((a, b) => a + b, 0);
  // Calculamos el rating solo en base a las categorías que ya fueron tocadas (o /4 si queremos obligar)
  // Para ser precisos, se calcula sobre las 4 categorías:
  const rating = sumaCategorias > 0 ? Math.round(sumaCategorias / 4) : 0;

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = () => {
    const reviews = StorageService.getReviews();
    setMisReseñas(reviews);

    // Cargar tutorias completadas para que el usuario pueda evaluarlas
    const sesiones = StorageService.getTutoringSessions();
    const completadas = sesiones.filter(s => s.estado === "Completada");

    // Filtrar las que ya tienen reseña
    const pendientes = completadas.filter(comp => !reviews.some(r => r.tutoriaId === comp.id));
    setTutoriasCompletadas(pendientes);

    // Mostrar modal automáticamente si hay una recién completada
    // Simulación: Si hay al menos una pendiente, sugerimos valorarla.
    if (pendientes.length > 0 && reviews.length === 0) {
      // setShowAddModal(true); // Opcional: auto-abrir si es la primera vez
    }
  };

  const handleAbrirModal = (tutoria = null) => {
    setSelectedTutoria(tutoria);
    setCategorias({ puntualidad: 0, claridad: 0, dominio: 0, profesionalismo: 0 });
    setComentario("");
    setRecomendaria(true);
    setQuejaFormal(false);
    setMotivoQueja("");
    setShowAddModal(true);
  };

  const guardarReseña = (e) => {
    e.preventDefault();
    if (!selectedTutoria) {
      alert("Por favor selecciona una tutoría para evaluar.");
      return;
    }
    // Asegurar que evaluó todas las categorías
    if (Object.values(categorias).some(val => val === 0)) {
      alert("Por favor evalúa todas las subcategorías (Puntualidad, Claridad, etc).");
      return;
    }
    if (comentario.trim().length < 20) {
      alert("El comentario debe tener al menos 20 caracteres.");
      return;
    }
    if (quejaFormal && motivoQueja.trim().length < 10) {
      alert("Por favor describe el motivo de tu queja formal.");
      return;
    }

    const nuevaReseña = {
      tutoriaId: selectedTutoria.id,
      profesorId: selectedTutoria.profesorId,
      profesorNombre: selectedTutoria.profesorNombre,
      foto: selectedTutoria.foto,
      materia: selectedTutoria.curso,
      rating,
      categorias,
      comentario,
      recomendaria,
      quejaFormal,
      motivoQueja,
      fecha: new Date().toLocaleDateString()
    };

    StorageService.saveReview(nuevaReseña);

    if (quejaFormal) {
      StorageService.updateProfessorScore(selectedTutoria.profesorId, -20);
      alert("La reseña y la queja formal han sido registradas. El docente será notificado.");
    }

    setShowAddModal(false);
    cargarDatos();
  };

  const renderStars = (currentRating, onClickHandler) => {
    return [...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`bi ${i < currentRating ? "bi-star-fill text-warning" : "bi-star text-secondary"} me-1`}
        style={{ cursor: onClickHandler ? "pointer" : "default" }}
        onClick={() => onClickHandler && onClickHandler(i + 1)}
      ></i>
    ));
  };

  const promedioCalculado = misReseñas.length
    ? (misReseñas.reduce((acc, r) => acc + r.rating, 0) / misReseñas.length).toFixed(1)
    : 0;

  return (
    <div className="main-layout">
      <Sidebar role="estudiante" />

      <main className="dashboard-content">
        <header className="mb-5">
          <h2 className="fw-bold text-indigo mb-1">Mis Valoraciones</h2>
          <p className="text-muted">Evalúa a tus profesores y ayuda a la comunidad de ProfeMatch.</p>
        </header>

        {/* Stats */}
        <section className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center">
              <small className="text-muted fw-bold text-uppercase">Reseñas Emitidas</small>
              <h2 className="fw-bold text-indigo mb-0">{misReseñas.length}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center border-start border-4 border-warning">
              <small className="text-muted fw-bold text-uppercase">Calificación Promedio Dada</small>
              <h2 className="fw-bold text-warning mb-0">
                {promedioCalculado} <i className="bi bi-star-fill"></i>
              </h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center border-start border-4 border-danger">
              <small className="text-muted fw-bold text-uppercase">Quejas Formales</small>
              <h2 className="fw-bold text-danger mb-0">
                {misReseñas.filter(r => r.quejaFormal).length}
              </h2>
            </div>
          </div>
        </section>

        {/* BOTON NUEVO */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Historial de Valoraciones</h5>
          <button
            className="btn text-white rounded-pill px-4 border-0 shadow-sm fw-bold"
            style={{ background: "linear-gradient(135deg,#493774,#6b51a3)" }}
            onClick={() => handleAbrirModal()}
          >
            <i className="bi bi-star-half me-2"></i>
            Valorar Tutoría
          </button>
        </div>

        {/* Lista */}
        {misReseñas.length === 0 ? (
          <div className="text-center py-5 bg-light rounded-4">
            <i className="bi bi-chat-square-quote fs-1 text-muted mb-3 d-block"></i>
            <h5 className="text-muted">Aún no has escrito ninguna reseña.</h5>
            <p className="small text-muted">Las reseñas que dejes aparecerán aquí.</p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-4">
            {misReseñas.map(res => (
              <div key={res.id} className="card border-0 shadow-sm rounded-4 bg-white p-4">
                <div className="row">
                  <div className="col-md-3 border-end d-flex align-items-center gap-3">
                    <img src={res.foto} className="rounded-circle shadow-sm" width="55" height="55" style={{ objectFit: 'cover' }} alt="" />
                    <div>
                      <h6 className="mb-0 fw-bold">{res.profesorNombre}</h6>
                      <small className="text-primary fw-bold">{res.materia}</small>
                    </div>
                  </div>

                  <div className="col-md-9 px-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        {renderStars(res.rating)}
                        {res.recomendaria && <span className="badge bg-success ms-3"><i className="bi bi-hand-thumbs-up-fill me-1"></i> Recomendado</span>}
                        {res.quejaFormal && <span className="badge bg-danger ms-2"><i className="bi bi-exclamation-triangle-fill me-1"></i> Queja Formal Emitida</span>}
                      </div>
                      <span className="badge bg-light text-dark border rounded-pill small">
                        {res.fecha}
                      </span>
                    </div>
                    <p className="text-muted mb-0 fst-italic">"{res.comentario}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* MODAL AÑADIR/EVALUAR */}
      {showAddModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 rounded-4 shadow-lg">
              <div className="modal-header border-bottom-0 pb-0">
                <h5 className="fw-bold text-indigo mb-0">Evaluar Tutoría</h5>
                <button className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>

              <div className="modal-body pt-3">
                <form onSubmit={guardarReseña}>
                  {/* Selector de Tutoría */}
                  <div className="mb-4">
                    <label className="form-label small fw-bold text-secondary">Selecciona una tutoría completada pendiente de evaluación:</label>
                    <select
                      className="form-select bg-light"
                      required
                      value={selectedTutoria ? selectedTutoria.id : ""}
                      onChange={e => {
                        const tut = tutoriasCompletadas.find(t => t.id === parseInt(e.target.value));
                        setSelectedTutoria(tut);
                      }}
                    >
                      <option value="">-- Elige una tutoría --</option>
                      {tutoriasCompletadas.map(tut => (
                        <option key={tut.id} value={tut.id}>
                          {tut.curso} con {tut.profesorNombre} ({new Date(tut.fechaHora).toLocaleDateString()})
                        </option>
                      ))}
                    </select>
                    {tutoriasCompletadas.length === 0 && (
                      <small className="text-danger mt-1 d-block">No tienes tutorías "Completadas" pendientes de evaluar. (Prueba creando y finalizando una tutoría primero).</small>
                    )}
                  </div>

                  {selectedTutoria && (
                    <>
                      {/* Calificación General (Solo Lectura) */}
                      <div className="text-center mb-4 p-3 bg-light rounded-4">
                        <label className="d-block fw-bold text-dark mb-1">Calificación General (Automática)</label>
                        <small className="text-muted d-block mb-2">Se calcula en base a tus respuestas abajo</small>
                        <div className="fs-2">
                          {renderStars(rating)}
                        </div>
                      </div>

                      {/* Categorías */}
                      <div className="row g-3 mb-4">
                        {Object.keys(categorias).map(cat => (
                          <div key={cat} className="col-md-6 d-flex justify-content-between align-items-center">
                            <span className="small fw-bold text-secondary text-capitalize">{cat}:</span>
                            <div>
                              {renderStars(categorias[cat], (val) => setCategorias({ ...categorias, [cat]: val }))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Comentario Libre */}
                      <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary">Comentario (Mín. 20 caracteres)</label>
                        <textarea
                          className="form-control bg-light"
                          rows="3"
                          minLength="20"
                          required
                          placeholder="Describe tu experiencia detalladamente..."
                          value={comentario}
                          onChange={(e) => setComentario(e.target.value)}
                        />
                        <div className="text-end small text-muted mt-1">{comentario.length} caracteres</div>
                      </div>

                      {/* Recomendación */}
                      <div className="form-check form-switch mb-4">
                        <input className="form-check-input" type="checkbox" role="switch" id="recomendar" checked={recomendaria} onChange={e => setRecomendaria(e.target.checked)} />
                        <label className="form-check-label fw-bold text-dark" htmlFor="recomendar">¿Recomendarías a este profesor?</label>
                      </div>

                      {/* Queja Formal (Condicional) */}
                      {rating > 0 && rating < 3 && (
                        <div className="alert alert-danger border-0 rounded-4">
                          <div className="form-check fw-bold text-danger mb-2">
                            <input className="form-check-input" type="checkbox" id="queja" checked={quejaFormal} onChange={e => setQuejaFormal(e.target.checked)} />
                            <label className="form-check-label" htmlFor="queja">Marcar como Queja Formal</label>
                          </div>
                          {quejaFormal && (
                            <>
                              <p className="small mb-2">Las quejas formales son revisadas por administración y restan puntos severamente al docente.</p>
                              <textarea
                                className="form-control"
                                rows="2"
                                placeholder="Describe el incidente (Obligatorio)..."
                                required
                                value={motivoQueja}
                                onChange={e => setMotivoQueja(e.target.value)}
                              />
                            </>
                          )}
                        </div>
                      )}

                      <div className="d-flex gap-2">
                        <button type="button" className="btn btn-light fw-bold flex-grow-1" onClick={() => setShowAddModal(false)}>Cancelar</button>
                        <button type="submit" className="btn btn-primary fw-bold flex-grow-1">Enviar Valoración</button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}