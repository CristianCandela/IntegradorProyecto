import React, { useState } from "react";
import "./Inicio.css";
import Hero from "../../components/Hero";
import heroVideo from "../../images/hero.mp4";

const DATA_MOCK = [
  { id: 1, nombre: "Juan Pérez", curso: "Cálculo I", univ: "ULIMA" },
  { id: 2, nombre: "Maria Garcia", curso: "Diseño de Patrones", univ: "UPC" },
  { id: 3, nombre: "Carlos Rojas", curso: "Base de Datos", univ: "PUCP" },
  { id: 4, nombre: "Ana Aguirre", curso: "Desarrollo Web", univ: "UNMSM" },
  { id: 5, nombre: "Luis Sánchez", curso: "Algoritmos", univ: "U. de Lima" },
];

export default function Inicio() {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

  const manejarBusqueda = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);

    if (valor.length > 1) {
      const filtrados = DATA_MOCK.filter(
        (item) =>
          item.nombre.toLowerCase().includes(valor.toLowerCase()) ||
          item.curso.toLowerCase().includes(valor.toLowerCase()) ||
          item.univ.toLowerCase().includes(valor.toLowerCase())
      );
      setResultados(filtrados);
    } else {
      setResultados([]);
    }
  };

  return (
    <main>
      <Hero
        video={heroVideo}
        titulo="Elige al"
        highlight="profesor perfecto"
        subtitulo="Reseñas verificadas y comparativas para tomar las mejores decisiones académicas con ProfeMatch."
      />

      <section className="py-5">
        <div className="container mt-n5">
          
          {/*busqueda */}
          <section className="pb-5">
            <div className="container text-center">
              <div className="search-content mx-auto" style={{ maxWidth: "800px" }}>
                <h2 className="fw-bold mb-3 text-indigo-deep">
                  Encuentra al docente ideal para tu próximo ciclo
                </h2>
                <p className="text-muted mb-4">
                  Busca profesores por curso, carrera o universidad y descubre experiencias reales de otros estudiantes.
                </p>

                <div className="search-bar-container position-relative">
                  <div className="search-glass-wrapper glass-effect round-pill shadow-purple">
                    <i className="bi bi-search search-icon-main"></i>
                    <input
                      type="text"
                      className="search-input-custom"
                      placeholder="Buscar profesor o curso..."
                      value={busqueda}
                      onChange={manejarBusqueda}
                    />
                    <button className="btn-search-action">Buscar</button>
                  </div>

                  {/*resultados */}
                  {resultados.length > 0 && (
                    <div className="search-results-dropdown text-start glass-effect round-xl shadow-purple">
                      {resultados.map((res) => (
                        <div key={res.id} className="result-item" onClick={() => alert(`Yendo al perfil de ${res.nombre}...`)}>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <strong className="d-block">{res.nombre}</strong>
                              <small className="text-muted">{res.curso} • {res.univ}</small>
                            </div>
                            <i className="bi bi-chevron-right text-muted"></i>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <div className="row g-4">
            {[
              { icon: "👥", val: "500+", label: "Profesores", color: "bg-indigo-soft" },
              { icon: "⭐", val: "10k+", label: "Reseñas", color: "bg-violet-soft" },
              { icon: "📈", val: "95%", label: "Satisfacción", color: "bg-purple-soft" }
            ].map((stat, i) => (
              <div className="col-md-4" key={i}>
                <div className="stat-card glass-effect round-xl shadow-purple hover-lift p-4 text-center">
                  <div className={`icon-box mx-auto ${stat.color} mb-3`}>{stat.icon}</div>
                  <h2 className="fw-bold m-0">{stat.val}</h2>
                  <p className="text-muted m-0">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 text-center bg-light">
        <div className="container py-4">
          <h2 className="fw-bold">¿Por qué ProfeMatch?</h2>
          <p className="text-muted mx-auto mt-3" style={{ maxWidth: "700px" }}>
            Conectamos estudiantes con los mejores docentes mediante datos reales y tutorías personalizadas.
          </p>
        </div>
      </section>
    </main>
  );
}