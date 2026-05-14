import "./Inicio.css";
import Hero from "../../components/Hero";
import heroVideo from "../../images/hero.mp4";


export default function Inicio() {
  return (
    <main>
      {/* HERO SECTION */}
      <Hero 
        video={heroVideo}
        titulo="Elige al"
        highlight="profesor perfecto"
        subtitulo="Reseñas verificadas y comparativas para tomar las mejores decisiones académicas con ProfeMatch."
      />

      {/* CARDS */}
      <section className="py-5">
        <div className="container mt-n5">
          {/* Busqueda*/}
          <section className="search-section py-5">
            <div className="container text-center">
              <div className="search-content mx-auto" style={{ maxWidth: "800px" }}>
                <h2 className="fw-bold mb-3 text-indigo-deep">
                  Encuentra al docente ideal para tu próximo ciclo
                </h2>
                <p className="text-muted mb-4">
                  Busca profesores por curso, carrera o universidad y descubre experiencias reales de otros estudiantes.
                </p>
                
                <div className="search-bar-container">
                  <div className="search-glass-wrapper">
                    <i className="bi bi-search search-icon-main"></i>
                    <input 
                      type="text" 
                      className="search-input-custom" 
                      placeholder="Buscar profesor o curso..." 
                    />
                    <button className="btn-search-action">Buscar</button>
                  </div>
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
                <div className="stat-card p-4 text-center">
                  <div className={`icon-box mx-auto ${stat.color}`}>{stat.icon}</div>
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