import { useState } from "react";
import { StorageService } from "../core/database/StorageService";

export default function ModalCancelacion({ tutoria, onClose, onSuccess }) {
  const [motivo, setMotivo] = useState("");
  const [explicacion, setExplicacion] = useState("");
  const [penalizacion, setPenalizacion] = useState(0);

  // Calcular la penalización basada en el tiempo restante
  const calcularPenalizacion = () => {
    const ahora = new Date();
    const fechaTutoria = new Date(tutoria.fechaHora);
    const difHoras = (fechaTutoria - ahora) / (1000 * 60 * 60);

    if (difHoras > 24) return 5;
    if (difHoras > 0 && difHoras <= 24) return 15;
    return 30;
  };

  // Se calcula una sola vez al montar o si cambia la tutoría
  if (penalizacion === 0 && tutoria) {
    setPenalizacion(calcularPenalizacion());
  }

  const handleConfirmar = (e) => {
    e.preventDefault();
    if (!motivo || !explicacion.trim()) {
      alert("Por favor selecciona un motivo y escribe una breve explicación.");
      return;
    }

    // 1. Actualizar estado de tutoría
    StorageService.updateTutoringSession(tutoria.id, { estado: "Cancelada" });

    // 2. Aplicar penalización al Score
    StorageService.updateScore(-penalizacion);

    // 3. Generar notificación al docente (simulada)
    const notificacion = {
      tipo: "cancelacion",
      mensaje: `Tu tutoría con Estudiante ha sido cancelada. Motivo: ${motivo}.`,
      fechaHoraRef: tutoria.fechaHora,
    };
    StorageService.saveNotification(notificacion);

    onSuccess();
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-4 shadow-lg">
          <div className="modal-header border-bottom-0 pb-0">
            <h5 className="modal-title fw-bold text-danger">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              ¿Estás seguro de cancelar esta tutoría?
            </h5>
            {/* Modal bloqueante: No tiene botón de cerrar 'X', se debe usar el botón Volver */}
          </div>

          <div className="modal-body pt-3">
            <div className="alert alert-warning border-warning border-opacity-50 text-dark small mb-4">
              <ul className="mb-0 ps-3">
                <li>Esta cancelación se registrará en tu perfil.</li>
                <li>
                  Tu Score de Confiabilidad disminuirá en <strong>{penalizacion} puntos</strong>.
                </li>
                {penalizacion >= 15 && (
                  <li className="text-danger fw-bold">Se aplica penalización adicional por cancelar con poca anticipación.</li>
                )}
              </ul>
            </div>

            <div className="bg-light p-3 rounded mb-4">
              <h6 className="fw-bold mb-2 text-dark">{tutoria.profesorNombre}</h6>
              <p className="small text-muted mb-0">
                Curso: {tutoria.curso} <br />
                Fecha agendada: {new Date(tutoria.fechaHora).toLocaleString()}
              </p>
            </div>

            <form id="form-cancelacion" onSubmit={handleConfirmar}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">Motivo de Cancelación</label>
                <select className="form-select" value={motivo} onChange={e => setMotivo(e.target.value)} required>
                  <option value="">Selecciona un motivo...</option>
                  <option value="Cruce de horarios">Cruce de horarios imprevisto</option>
                  <option value="Emergencia médica">Emergencia médica / salud</option>
                  <option value="Problemas técnicos">Problemas técnicos (Internet, PC)</option>
                  <option value="Ya no necesito la tutoría">Ya no necesito ayuda en el tema</option>
                  <option value="Otro">Otro motivo</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">Explica brevemente</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Escribe el motivo detallado..."
                  value={explicacion}
                  onChange={e => setExplicacion(e.target.value)}
                  required
                ></textarea>
              </div>
            </form>
          </div>

          <div className="modal-footer border-top-0 pt-0 d-flex gap-2">
            <button type="button" className="btn btn-secondary flex-grow-1" onClick={onClose}>
              Volver
            </button>
            <button type="submit" form="form-cancelacion" className="btn btn-danger flex-grow-1 fw-bold">
              Confirmar Cancelación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
