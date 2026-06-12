import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StorageService } from "../core/database/StorageService";

export default function ModalSalaVirtual({ tutoria, onClose, onSuccess }) {
  const [progreso, setProgreso] = useState(0);
  const [fase, setFase] = useState("conectando");
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (fase === "conectando") {
      timer = setTimeout(() => {
        setFase("en_clase");
      }, 1500);
    } else if (fase === "en_clase") {
      // Simular progreso rápido
      timer = setInterval(() => {
        setProgreso((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setFase("finalizado");

            // Marcar como completada en la BD
            StorageService.updateTutoringSession(tutoria.id, { estado: "Completada" });

            return 100;
          }
          return prev + 2; // Incremento de 2% cada 100ms = 5 segundos total
        });
      }, 100);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(timer);
    };
  }, [fase, tutoria.id]);

  const handleIrAReseñas = () => {
    onSuccess(); // Actualiza la lista de tutorías en el padre
    navigate("/resenas-estudiante");
  };

  const gradientStyle = {
    background: "linear-gradient(135deg, #7B1FA2 0%, #E91E63 100%)",
    color: "white"
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.85)", zIndex: 1060 }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden bg-dark text-white">

          {/* Header */}
          <div className="modal-header border-bottom-0 pb-0 pt-4 px-4">
            <h5 className="modal-title fw-bold">
              <i className="bi bi-camera-video me-2 text-info"></i>
              Sala Virtual: {tutoria.curso}
            </h5>
            {fase !== "en_clase" && (
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            )}
          </div>

          <div className="modal-body p-4 text-center">
            {fase === "conectando" && (
              <div className="py-5">
                <div className="spinner-border text-info mb-3" role="status" style={{ width: "3rem", height: "3rem" }}>
                  <span className="visually-hidden">Conectando...</span>
                </div>
                <h4 className="fw-bold">Estableciendo conexión segura...</h4>
                <p className="text-muted">Preparando el entorno para tu clase con {tutoria.profesorNombre}.</p>
              </div>
            )}

            {fase === "en_clase" && (
              <div className="py-4">
                <div className="position-relative d-inline-block mb-4">
                  <img
                    src={tutoria.foto}
                    className="rounded-circle shadow"
                    style={{ width: "120px", height: "120px", objectFit: "cover", border: "4px solid #E91E63" }}
                    alt="Profesor"
                  />
                  <span className="position-absolute bottom-0 end-0 bg-success border border-dark rounded-circle" style={{ width: "25px", height: "25px" }}></span>
                </div>

                <h4 className="fw-bold mb-1">{tutoria.profesorNombre}</h4>
                <p className="text-info mb-4"><i className="bi bi-mic-fill me-1"></i> Hablando ahora...</p>

                <div className="bg-secondary bg-opacity-25 p-4 rounded-4 mb-4 text-start">
                  <div className="d-flex justify-content-between mb-2">
                    <small className="fw-bold text-uppercase" style={{ letterSpacing: "1px" }}>Progreso de la sesión acelerada</small>
                    <small className="fw-bold">{progreso}%</small>
                  </div>
                  <div className="progress bg-dark" style={{ height: "10px" }}>
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      style={{ width: `${progreso}%`, ...gradientStyle }}
                    ></div>
                  </div>
                  <p className="text-muted small mt-2 mb-0 text-center">
                    <i className="bi bi-info-circle me-1"></i> Simulación acelerada para propósitos de demostración.
                  </p>
                </div>
              </div>
            )}

            {fase === "finalizado" && (
              <div className="py-4 animation-fade-in">
                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4 shadow" style={{ width: "80px", height: "80px" }}>
                  <i className="bi bi-check2-all" style={{ fontSize: "3rem" }}></i>
                </div>
                <h3 className="fw-bold text-white mb-2">¡Tutoría Completada!</h3>
                <p className="text-muted mb-4 fs-5">Has finalizado tu sesión de {tutoria.curso}. Esperamos que hayas aprendido mucho.</p>

                <div className="d-grid gap-3 col-md-8 mx-auto">
                  <button
                    className="btn btn-lg fw-bold border-0 shadow hover-shadow text-white rounded-pill py-3"
                    style={gradientStyle}
                    onClick={handleIrAReseñas}
                  >
                    <i className="bi bi-star-fill me-2 text-warning"></i> Dejar una Reseña Ahora
                  </button>
                  <button
                    className="btn btn-outline-light rounded-pill fw-bold py-2"
                    onClick={() => {
                      onSuccess();
                      onClose();
                    }}
                  >
                    Volver a mis tutorías
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
