export default function ProfesorCard({ profesor, showPrice = false }) {
  const {
    nombre,
    departamento,
    rating,
    dificultad,
    foto,
    precioHora,
    etiquetas,
    curso
  } = profesor;

  return (
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
          <button className="btn btn-outline-indigo btn-sm rounded-pill fw-bold py-2">
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
  );
}