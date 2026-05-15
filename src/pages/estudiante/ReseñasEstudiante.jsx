import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { profesoresData } from "../../data/profesoresData";

export default function ReseñasEstudiante() {
  const [misReseñas, setMisReseñas] = useState([
    { id: 1, profesorId: 3, comentario: "Excelente explicando temas complejos.", rating: 5, fecha: "12 May 2026", materia: "Cálculo I" },
    { id: 2, profesorId: 1, comentario: "Muy buen profesor, domina los temas a la perfección.", rating: 4, fecha: "05 May 2026", materia: "Programación Web" },
    { id: 3, profesorId: 7, comentario: "La clase es interesante pero de dificultad muy alta.", rating: 4, fecha: "28 Abr 2026", materia: "Anatomía Humana" }
  ]);

  // Estados para el Modal
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({ id: null, comentario: "", rating: 0 });

  const handleEditar = (res) => {
    setEditData({ id: res.id, comentario: res.comentario, rating: res.rating });
    setShowModal(true);
  };

  const guardarCambios = () => {
    setMisReseñas(prev => prev.map(r => r.id === editData.id ? { ...r, comentario: editData.comentario, rating: editData.rating } : r));
    setShowModal(false);
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar esta reseña?")) {
      setMisReseñas(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="main-layout">
      <Sidebar role="estudiante" />
      <main className="dashboard-content">
        <header className="mb-5">
          <h2 className="fw-bold text-indigo mb-1">Mis Reseñas</h2>
          <p className="text-muted">Gestiona y mejora tus opiniones compartidas.</p>
        </header>

        {/* Stats */}
        <section className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center">
              <small className="text-muted fw-bold text-uppercase">Total</small>
              <h2 className="fw-bold text-indigo mb-0">{misReseñas.length}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center border-start border-4 border-warning">
              <small className="text-muted fw-bold text-uppercase">Promedio</small>
              <h2 className="fw-bold text-warning mb-0">4.3 <i className="bi bi-star-fill"></i></h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center border-start border-4 border-success">
              <small className="text-muted fw-bold text-uppercase">Puntos</small>
              <h2 className="fw-bold text-success mb-0">+150</h2>
            </div>
          </div>
        </section>

        {/* Lista */}
        <div className="d-flex flex-column gap-4">
          {misReseñas.map(res => {
            const profe = profesoresData.find(p => p.id === res.profesorId);
            return (
              <div key={res.id} className="card border-0 shadow-sm rounded-4 bg-white p-4 hover-shadow">
                <div className="row align-items-center">
                  <div className="col-md-3 border-end d-flex align-items-center gap-3">
                    <img src={profe?.foto} className="rounded-circle shadow-sm" width="55" height="55" style={{objectFit:'cover'}} alt=""/>
                    <div>
                      <h6 className="mb-0 fw-bold">{profe?.nombre}</h6>
                      <small className="text-primary fw-bold">{res.materia}</small>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="mb-2">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`bi bi-star-fill ${i < res.rating ? 'text-warning' : 'text-light'} me-1`}></i>
                      ))}
                      <span className="ms-2 badge bg-light text-dark border rounded-pill small">{res.fecha}</span>
                    </div>
                    <p className="text-muted mb-0 small">"{res.comentario}"</p>
                  </div>
                  <div className="col-md-2 text-end">
                    <button onClick={() => handleEditar(res)} className="btn btn-sm btn-outline-primary border-0"><i className="bi bi-pencil-square fs-5"></i></button>
                    <button onClick={() => handleEliminar(res.id)} className="btn btn-sm btn-outline-danger border-0"><i className="bi bi-trash fs-5"></i></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* MODAL FINAL CON ESTRELLAS SELECCIONABLES */}
      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
          <div className="bg-white rounded-4 shadow p-4" style={{ width: "450px" }}>
            <h4 className="fw-bold mb-3 text-indigo">Editar Reseña</h4>
            
            <label className="small fw-bold text-muted mb-2 d-block">Tu calificación:</label>
            <div className="mb-3 fs-3">
              {[...Array(5)].map((_, i) => (
                <i 
                  key={i} 
                  className={`bi ${i < editData.rating ? 'bi-star-fill text-warning' : 'bi-star text-light'} cursor-pointer me-2`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setEditData({ ...editData, rating: i + 1 })}
                ></i>
              ))}
            </div>

            <label className="small fw-bold text-muted mb-2 d-block">Comentario:</label>
            <textarea 
              className="form-control rounded-3 mb-4" 
              rows="4" 
              value={editData.comentario}
              onChange={(e) => setEditData({ ...editData, comentario: e.target.value })}
            />

            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-light rounded-pill px-4" onClick={() => setShowModal(false)}>Cerrar</button>
              <button className="btn text-white rounded-pill px-4 border-0" style={{ background: "linear-gradient(135deg,#493774,#6b51a3)" }} onClick={guardarCambios}>Actualizar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}