import { useState } from "react";
import { StorageService } from "../core/database/StorageService";

export default function CheckoutModal({ profesor, onClose, onSuccess }) {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [cvv, setCvv] = useState("");
  const [paso, setPaso] = useState(1); // 1: Formulario, 2: Exito
  const [transaccionId, setTransaccionId] = useState("");

  const tarifa = profesor.precioHora;
  const comision = tarifa * 0.15;
  const total = tarifa + comision;

  const handleConfirmar = (e) => {
    e.preventDefault();
    if (!fecha || !hora || !tarjeta || !vencimiento || !cvv) {
      alert("Por favor completa todos los campos.");
      return;
    }

    // Crear la fecha ISO
    const fechaHoraStr = `${fecha}T${hora}:00`;
    const fechaHora = new Date(fechaHoraStr).toISOString();

    const nuevaTutoria = {
      profesorId: profesor.id,
      profesorNombre: profesor.nombre,
      curso: profesor.curso,
      foto: profesor.foto,
      fechaHora, // ISO
      fechaOriginal: fecha, // Para facilidad visual
      horaOriginal: hora,
      totalPagado: total,
      estado: "Confirmada",
    };

    StorageService.saveTutoringSession(nuevaTutoria);
    setTransaccionId(`TXN-${Math.floor(Math.random() * 1000000)}`);
    setPaso(2);
  };

  const handleCerrar = () => {
    if (paso === 2) {
      onSuccess();
    }
    onClose();
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-4 shadow">
          {paso === 1 ? (
            <>
              <div className="modal-header border-bottom-0 pb-0">
                <h5 className="modal-title fw-bold">Agendar Tutoría</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
              </div>
              <div className="modal-body pt-2">
                <div className="d-flex align-items-center mb-4">
                  <img src={profesor.foto} alt={profesor.nombre} className="rounded-circle me-3" width="50" height="50" />
                  <div>
                    <h6 className="mb-0 fw-bold">{profesor.nombre}</h6>
                    <small className="text-muted">{profesor.curso}</small>
                  </div>
                </div>

                <form onSubmit={handleConfirmar}>
                  <div className="row g-3 mb-4">
                    <div className="col-6">
                      <label className="form-label small fw-bold text-secondary">Fecha</label>
                      <input type="date" className="form-control" value={fecha} onChange={e => setFecha(e.target.value)} required />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-bold text-secondary">Hora</label>
                      <input type="time" className="form-control" value={hora} onChange={e => setHora(e.target.value)} required />
                    </div>
                  </div>

                  <div className="bg-light p-3 rounded-3 mb-4">
                    <h6 className="fw-bold mb-3">Detalle de Pago</h6>
                    <div className="d-flex justify-content-between mb-1 small">
                      <span className="text-muted">Tarifa del profesor</span>
                      <span>S/ {tarifa.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2 small">
                      <span className="text-muted">Comisión ProfeMatch (15%)</span>
                      <span>S/ {comision.toFixed(2)}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="d-flex justify-content-between fw-bold">
                      <span>Total a pagar</span>
                      <span className="text-primary">S/ {total.toFixed(2)}</span>
                    </div>
                  </div>

                  <h6 className="fw-bold mb-3">Método de Pago (Simulado)</h6>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Número de Tarjeta" value={tarjeta} onChange={e => setTarjeta(e.target.value)} required maxLength="16" />
                  </div>
                  <div className="row g-3 mb-4">
                    <div className="col-6">
                      <input type="text" className="form-control" placeholder="MM/YY" value={vencimiento} onChange={e => setVencimiento(e.target.value)} required maxLength="5" />
                    </div>
                    <div className="col-6">
                      <input type="text" className="form-control" placeholder="CVV" value={cvv} onChange={e => setCvv(e.target.value)} required maxLength="3" />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 fw-bold py-2">
                    Confirmar y Pagar
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="modal-body text-center py-5">
              <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px" }}>
                <i className="bi bi-check-lg fs-1"></i>
              </div>
              <h4 className="fw-bold text-dark mb-2">¡Pago Exitoso!</h4>
              <p className="text-muted mb-4">Tu tutoría ha sido agendada y confirmada.</p>
              <div className="bg-light rounded p-3 mb-4 text-start">
                <small className="d-block text-muted mb-1">ID de Transacción</small>
                <strong className="text-dark">{transaccionId}</strong>
              </div>
              <button className="btn btn-primary w-100 fw-bold py-2" onClick={handleCerrar}>
                Ver mis tutorías
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
