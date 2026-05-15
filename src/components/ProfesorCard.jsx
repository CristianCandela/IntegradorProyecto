import { useState } from "react"; // Añadido para el Modal

export default function ProfesorCard({ profesor, showPrice = false }) {
  // Estado para controlar el Modal
  const [showModal, setShowModal] = useState(false);

  const {
    nombre,
    departamento,
    rating,
    dificultad,
    foto,
    precioHora,
    etiquetas,
    curso,
    descripcion, // Extraído para el Modal
    metodologia   // Extraído para el Modal
  } = profesor;

  return (
    <>
      <div className="card h-100 border-0 rounded-4 overflow-hidden shadow-sm hover-shadow">
        <div className="card-body p-4 d-flex flex-column text-center">
          
          {/* Foto */}
          <div className="mb-3">
            <img
              src={foto}
              alt={nombre}
              className="rounded-circle shadow-sm border border-3 border-white"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover"
              }}
            />
          </div>

          {/* Nombre */}
          <h5 className="fw-bold text-dark mb-1">
            {nombre}
          </h5>

          {/* Curso */}
          <p className="text-muted small mb-3">
            {departamento} | {curso}
          </p>

          {/* Rating */}
          <div className="d-flex justify-content-center gap-4 mb-3">
            <div>
              <span className="d-block fw-bold text-warning">
                <i className="bi bi-star-fill me-1"></i>
                {rating}
              </span>
              <small
                className="text-muted"
                style={{ fontSize: "0.7rem" }}
              >
                Rating
              </small>
            </div>

            <div>
              <span className="d-block fw-bold text-info">
                <i className="bi bi-bar-chart-fill me-1"></i>
                {dificultad}/10
              </span>

              <small
                className="text-muted"
                style={{ fontSize: "0.7rem" }}
              >
                Dificultad
              </small>
            </div>
          </div>

          {/* Tags */}
          <div className="d-flex flex-wrap justify-content-center gap-1 mb-4">
            {etiquetas.map((tag, index) => (
              <span
                key={index}
                className="badge bg-light text-indigo border rounded-pill px-2 py-1"
                style={{ fontSize: "0.65rem" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Precio */}
          {showPrice && (
            <div className="mb-3">
              <span
                className="badge text-bg-success w-100 p-2 rounded-3"
                style={{ fontSize: "0.95rem" }}
              >
                ${precioHora}/hora
              </span>
            </div>
          )}

          {/* Botones */}
          <div className="d-grid gap-2 mt-auto">
            {/* CLICK PARA ABRIR MODAL */}
            <button 
              onClick={() => setShowModal(true)} 
              className="btn btn-outline-indigo btn-sm rounded-pill fw-bold py-2"
            >
              Ver Perfil
            </button>

            <button
              className="btn btn-sm rounded-pill fw-bold py-2 text-white border-0"
              style={{
                background:
                  "linear-gradient(135deg, #493774 0%, #6b51a3 100%)"
              }}
            >
              Solicitar
            </button>
          </div>
        </div>
      </div>

      {/* --- MODAL DE PERFIL (INTEGRADO) --- */}
      {showModal && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
          style={{ background: "rgba(0,0,0,0.7)", zIndex: 1060 }}
        >
          <div 
            className="bg-white rounded-4 shadow-lg overflow-hidden" 
            style={{ width: "90%", maxWidth: "550px", animation: "fadeInUp 0.3s ease" }}
          >
            {/* Header del Modal */}
            <div className="p-4 text-center border-bottom bg-light position-relative">
              <button 
                onClick={() => setShowModal(false)} 
                className="btn-close position-absolute top-0 end-0 m-3"
              ></button>
              
              <img 
                src={foto} 
                className="rounded-circle shadow mb-3" 
                style={{ width: "110px", height: "110px", objectFit: "cover", border: "4px solid white" }} 
                alt="" 
              />
              <h4 className="fw-bold text-dark mb-0">{nombre}</h4>
              <p className="text-indigo fw-bold small mb-0">{departamento}</p>
            </div>

            {/* Contenido del Modal */}
            <div className="p-4" style={{ maxHeight: "50vh", overflowY: "auto" }}>
              <div className="mb-4">
                <h6 className="fw-bold text-indigo border-bottom pb-2">Sobre el Profesor</h6>
                <p className="text-muted small mb-0">{descripcion || "Sin descripción disponible."}</p>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold text-indigo border-bottom pb-2">Metodología</h6>
                <p className="text-muted small mb-0">{metodologia || "Basada en casos prácticos y teoría aplicada."}</p>
              </div>

              <div className="row text-center g-2">
                <div className="col-4">
                  <div className="p-2 bg-light rounded-3">
                    <span className="d-block fw-bold text-warning">{rating} ⭐</span>
                    <small className="text-muted" style={{fontSize: '0.6rem'}}>RATING</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-2 bg-light rounded-3">
                    <span className="d-block fw-bold text-info">{dificultad}/10</span>
                    <small className="text-muted" style={{fontSize: '0.6rem'}}>DIFICULTAD</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-2 bg-light rounded-3">
                    <span className="d-block fw-bold text-success">${precioHora}</span>
                    <small className="text-muted" style={{fontSize: '0.6rem'}}>PRECIO/H</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones del Modal */}
            <div className="p-3 border-top d-flex gap-2 bg-white">
              <button 
                onClick={() => setShowModal(false)} 
                className="btn btn-light rounded-pill w-100 fw-bold"
              >
                Cerrar
              </button>
              <button 
                className="btn btn-primary rounded-pill w-100 fw-bold border-0" 
                style={{ background: "#493774" }}
              >
                Solicitar Tutoría
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}