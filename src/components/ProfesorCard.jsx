import { useState, useEffect } from "react";

export default function ProfesorCard({ profesor, showPrice = false, isTutoria = false }) {
  
  const [showModal, setShowModal] = useState(false);
  const [esPremium, setEsPremium] = useState(false);

  const {
    nombre,
    departamento,
    rating,
    dificultad,
    foto,
    precioHora,
    etiquetas,
    curso,
    descripcion, 
    metodologia   
  } = profesor;

  // REQUISITO: Verificar si este profesor tiene el Plan Premium activo para destacarlo
  useEffect(() => {
    // Si es tu propio perfil simulado o si añadimos la propiedad en la base de datos
    const planGuardado = localStorage.getItem("plan_profesor") || "Freemium";
    
    // Para la demo, si el nombre coincide con el tuyo o si el objeto ya viene marcado como destacado
    if (planGuardado === "Premium" && (nombre.includes("Juan Jose") || profesor.isPremium)) {
      setEsPremium(true);
    }
  }, [nombre, profesor]);

  return (
    <>
      <div 
        className={`card h-100 border-0 rounded-4 overflow-hidden shadow-sm hover-shadow position-relative ${
          esPremium ? "border border-2" : ""
        }`}
        style={{ 
          borderColor: esPremium ? "#7B1FA2" : "transparent",
          boxShadow: esPremium ? "0 8px 20px rgba(123, 31, 162, 0.15)" : ""
        }}
      >
        {/* INSIGNIA DE PERFIL DESTACADO PARA PLAN PREMIUM */}
        {esPremium && (
          <span 
            className="position-absolute top-0 end-0 m-3 badge rounded-pill text-white shadow-sm d-flex align-items-center gap-1 px-3 py-2"
            style={{ background: "linear-gradient(135deg, #7B1FA2 0%, #E91E63 100%)", zIndex: 10, fontSize: "0.7rem" }}
          >
            <i className="bi bi-patch-check-fill"></i> Destacado
          </span>
        )}

        <div className="card-body p-4 d-flex flex-column text-center">
          
          {isTutoria ? (
            <>
              <div className="d-flex align-items-center gap-3 mb-3 text-start">
                <img 
                  src={foto} 
                  className="rounded-circle border border-2 border-light shadow-sm" 
                  style={{ width: "60px", height: "60px", objectFit: "cover" }} 
                  alt={nombre}
                />
                <div className="text-start">
                  <h6 className="fw-bold mb-0 text-dark">{nombre}</h6>
                  <small className="text-muted">{departamento}</small>
                  <div className="text-warning small">
                    <i className="bi bi-star-fill me-1"></i>{rating}
                  </div>
                </div>
              </div>
              <div className="mb-3 text-start">
                <span className="badge bg-success bg-opacity-10 text-success fw-bold px-3 py-2 rounded-3">
                  S/. {precioHora}/hora
                </span>
              </div>
              <p className="text-muted small mb-3 text-start" style={{ display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {descripcion}
              </p>
            </>
          ) : (
            <>
              {/* Foto */}
              <div className="mb-3 position-relative d-inline-block mx-auto">
                <img
                  src={foto}
                  alt={nombre}
                  className="rounded-circle shadow-sm border border-3 mx-auto"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderColor: esPremium ? "#7B1FA2" : "white"
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
                  <small className="text-muted" style={{ fontSize: "0.7rem" }}>
                    Rating
                  </small>
                </div>

                <div>
                  <span className="d-block fw-bold text-info">
                    <i className="bi bi-bar-chart-fill me-1"></i>
                    {dificultad}/10
                  </span>
                  <small className="text-muted" style={{ fontSize: "0.7rem" }}>
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
                    S/. {precioHora}/hora
                  </span>
                </div>
              )}
            </>
          )}

          {/* Botones */}
          <div className="d-grid gap-2 mt-auto">
            <button 
              onClick={() => setShowModal(true)} 
              className="btn btn-outline-indigo btn-sm rounded-pill fw-bold py-2"
            >
              Ver Perfil
            </button>

            <button
              className="btn btn-sm rounded-pill fw-bold py-2 text-white border-0"
              style={{
                background: esPremium 
                  ? "linear-gradient(135deg, #7B1FA2 0%, #E91E63 100%)" 
                  : "linear-gradient(135deg, #493774 0%, #6b51a3 100%)"
              }}
            >
              Solicitar
            </button>
          </div>
        </div>
      </div>

      {/* --- MODAL DE PERFIL  */}
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
                className="rounded-circle shadow mb-3 mx-auto" 
                style={{ 
                  width: "110px", 
                  height: "110px", 
                  objectFit: "cover", 
                  border: esPremium ? "4px solid #7B1FA2" : "4px solid white" 
                }} 
                alt={nombre} 
              />
              <h4 className="fw-bold text-dark mb-0">
                {nombre} {esPremium && "⭐"}
              </h4>
              <p className="text-indigo fw-bold small mb-0">{departamento}</p>
            </div>

            {/* Contenido del Modal */}
            <div className="p-4" style={{ maxHeight: "50vh", overflowY: "auto" }}>
              <div className="mb-4 text-start">
                <h6 className="fw-bold text-indigo border-bottom pb-2">Sobre el Profesor</h6>
                <p className="text-muted small mb-0">{descripcion || "Sin descripción disponible."}</p>
              </div>

              <div className="mb-4 text-start">
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
                    <span className="d-block fw-bold text-success">S/. {precioHora}</span>
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
                style={{ background: esPremium ? "#7B1FA2" : "#493774" }}
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