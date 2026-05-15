import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import ProfesorCard from "../../components/ProfesorCard";
import { profesoresData } from "../../data/profesoresData";

export default function BuscarEstudiante() {

  const [busqueda, setBusqueda] = useState("");
  const [deptoSel, setDeptoSel] = useState("Todos");
  const [ratingMin, setRatingMin] = useState(0);
  const [difMax, setDifMax] = useState(10);

  const especialidades = [
    "Todos",
    ...new Set(profesoresData.map(p => p.departamento))
  ];

  // TEXTO DINÁMICO DIFICULTAD
  const getDificultadLabel = (val) => {
    if (val <= 3) return "Fácil";
    if (val <= 7) return "Media";
    return "Difícil";
  };

  // TEXTO DINÁMICO RATING
  const getRatingLabel = (val) => {
    if (val === 0) return "Todas";
    if (val <= 2) return "Bajas";
    if (val <= 4) return "Buenas";
    return "Excelentes";
  };

  // FILTRADO DINÁMICO
  const profesoresFiltrados = profesoresData.filter((profe) => {

    const textoBusqueda = busqueda.trim().toLowerCase();

    const cumpleBusqueda =
      profe.nombre.toLowerCase().includes(textoBusqueda) ||
      profe.curso.toLowerCase().includes(textoBusqueda);

    const cumpleDepto =
      deptoSel === "Todos" ||
      profe.departamento === deptoSel;

    const cumpleRating =
      profe.rating >= ratingMin;

    const cumpleDificultad =
      profe.dificultad <= difMax;

    return (
      cumpleBusqueda &&
      cumpleDepto &&
      cumpleRating &&
      cumpleDificultad
    );
  });

  return (
    <div className="main-layout">

      <Sidebar role="estudiante" />

      <main className="dashboard-content">

        <header className="mb-4">
          <h2 className="fw-bold text-indigo">
            Explorar Profesores
          </h2>

          <p className="text-muted">
            Encuentra al mentor ideal basado en su especialidad y desempeño real.
          </p>
        </header>

        {/* FILTROS */}
        <section className="card border-0 shadow-sm p-4 rounded-4 mb-5 bg-white">

          <div className="row g-4 align-items-end">

            {/* BUSCADOR */}
            <div className="col-lg-4">

              <label className="form-label small fw-bold text-secondary">
                Buscar por nombre o curso
              </label>

              <div className="input-group">

                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>

                <input
                  type="text"
                  className="form-control bg-light border-start-0"
                  placeholder="Ej: Miguel o Redacción..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />

              </div>
            </div>

            {/* ESPECIALIDAD */}
            <div className="col-md-4 col-lg-3">

              <label className="form-label small fw-bold text-secondary">
                Especialidad / Curso
              </label>

              <select
                className="form-select bg-light"
                value={deptoSel}
                onChange={(e) => setDeptoSel(e.target.value)}
              >

                {especialidades.map((esp) => (
                  <option key={esp} value={esp}>
                    {esp}
                  </option>
                ))}

              </select>
            </div>

            {/* RATING */}
            <div className="col-md-4 col-lg-2">

              <div className="d-flex justify-content-between align-items-center">

                <label className="form-label small fw-bold text-secondary mb-1">
                  Rating mínimo
                </label>

                <span className="badge bg-warning text-dark">
                  ⭐ {ratingMin.toFixed(1)}
                </span>

              </div>

              <small className="text-muted">
                {getRatingLabel(ratingMin)}
              </small>

              <input
                type="range"
                className="form-range"
                min="0"
                max="5"
                step="0.5"
                value={ratingMin}
                onChange={(e) =>
                  setRatingMin(parseFloat(e.target.value))
                }
              />

            </div>

            {/* DIFICULTAD */}
            <div className="col-md-4 col-lg-2">

              <div className="d-flex justify-content-between align-items-center">

                <label className="form-label small fw-bold text-secondary mb-1">
                  Dificultad máxima
                </label>

                <span
                  className={`badge ${
                    difMax <= 3
                      ? "bg-success"
                      : difMax <= 7
                      ? "bg-info"
                      : "bg-danger"
                  }`}
                >
                  {difMax}
                </span>

              </div>

              <small className="text-muted">
                {getDificultadLabel(difMax)}
              </small>

              <input
                type="range"
                className="form-range"
                min="1"
                max="10"
                step="1"
                value={difMax}
                onChange={(e) =>
                  setDifMax(parseInt(e.target.value))
                }
              />

            </div>

            {/* RESET */}
            <div className="col-lg-1">

              <button
                className="btn btn-light w-100 border text-muted"
                onClick={() => {
                  setBusqueda("");
                  setDeptoSel("Todos");
                  setRatingMin(0);
                  setDifMax(10);
                }}
              >
                <i className="bi bi-arrow-counterclockwise"></i>
              </button>

            </div>

          </div>
        </section>

        {/* RESULTADOS */}
        <div className="d-flex justify-content-between align-items-center mb-4">

          <h5 className="fw-bold mb-0">
            Resultados ({profesoresFiltrados.length})
          </h5>

        </div>

        {/* CARDS */}
        {profesoresFiltrados.length > 0 ? (

          <div className="row g-4">

            {profesoresFiltrados.map((profe) => (

              <div
                key={profe.id}
                className="col-sm-6 col-lg-4 col-xl-3"
              >
                <ProfesorCard profesor={profe} />
              </div>

            ))}

          </div>

        ) : (

          <div className="text-center py-5">

            <div className="bg-light d-inline-block p-4 rounded-circle mb-3">
              <i className="bi bi-emoji-frown fs-1 text-muted"></i>
            </div>

            <h5 className="text-muted">
              No encontramos resultados para tu búsqueda.
            </h5>

          </div>

        )}

      </main>
    </div>
  );
}