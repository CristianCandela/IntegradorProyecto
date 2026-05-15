import Hero from "../../components/Hero";
import "./Nosotros.css";
import heroNVideo from "../../images/heroN.mp4";
import CtaFinal from "../../components/CtaFinal";
import InfoSection from "../../components/InfoSection";
import historiaImg from "../../images/historia-team.png";

export default function Nosotros() {
  const historiaData = {
    badge: "Nuestra Historia",
    titulo: "¿Cómo nació",
    highlight: "ProfeMatch?",
    imagen: historiaImg,
    parrafos: [
      "ProfeMatch nace a partir de una problemática común entre estudiantes universitarios: elegir docentes sin información clara ni confiable. Muchas decisiones académicas importantes se toman únicamente por comentarios dispersos en redes sociales o recomendaciones informales.",
      "Frente a esta situación, surgió la idea de crear una plataforma moderna y centralizada donde los estudiantes puedan acceder a reseñas verificadas, comparar experiencias y encontrar tutorías académicas de manera más segura y transparente."
    ],
    stats: [
      { value: "+1000", label: "Estudiantes" },
      { value: "100%", label: "Transparencia" }
    ]
  };

  return (
    <main>
      <Hero 
        video={heroNVideo}
        titulo="Conoce "
        highlight="ProfeMatch"
        subtitulo="Transformamos la manera en que los estudiantes eligen a sus docentes universitarios."
      />

      <InfoSection {...historiaData} imageRight={true} />

        {/* SECCIÓN EL PROBLEMA  */}
        <section className="problem-light-section py-8 position-relative">
          <div className="gradient-sphere-light"></div>
          
          <div className="container position-relative" style={{ zIndex: 1 }}>
            <div className="text-center mb-5 animate__animated animate__fadeIn">
              <span className="badge bg-purple-soft text-violet-main mb-3 px-3 py-2 round-pill fw-bold">
                El Desafío
              </span>
              {/* Título en color oscuro para que contraste */}
              <h2 className="display-4 fw-bold text-dark">
                La incertidumbre académica afecta a <br className="d-none d-md-block" /> 
                <span className="text-violet-main">miles de estudiantes</span>
              </h2>
            </div>

            <div className="row g-4 mt-2">
              {[
                {
                  icon: "bi-question-circle",
                  title: "Decisiones sin información",
                  text: "Muchos estudiantes eligen docentes sin conocer realmente su metodología o desempeño."
                },
                {
                  icon: "bi-graph-down-arrow",
                  title: "Mala experiencia académica",
                  text: "Una mala elección puede generar estrés, retiros de cursos y pérdida económica."
                },
                {
                  icon: "bi-eye-slash",
                  title: "Falta de transparencia",
                  text: "La información sobre docentes suele estar dispersa y poco organizada."
                }
              ].map((card, index) => (
                <div className="col-lg-4" key={index}>
                  {/* Card blanca con sombra suave */}
                  <div className="problem-card-light h-100 p-4 p-lg-5 round-xl hover-lift">
                    <div className="icon-display mb-4 text-violet-main">
                      <i className={`bi ${card.icon}`}></i>
                    </div>
                    {/* Textos oscuros */}
                    <h4 className="fw-bold text-dark mb-3">{card.title}</h4>
                    <p className="text-muted mb-0 leading-relaxed">
                      {card.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* NUESTRA MISIÓN */}
        <section className="mission-section py-8 bg-indigo-deep position-relative overflow-hidden">
          {/* Decoración de fondo para que el índigo se vea moderno */}
          <div className="mission-light-effect"></div>
          
          <div className="container position-relative" style={{ zIndex: 1 }}>
            <div className="row justify-content-center">
              <div className="col-lg-10 col-xl-8">
                <div className="mission-card p-5 p-md-5 text-center animate__animated animate__fadeInUp">
                  <span className="badge bg-violet-main text-white mb-4 px-4 py-2 round-pill fw-bold shadow-sm">
                    Nuestra Misión
                  </span>
                  
                  <h2 className="display-4 fw-bold text-white mb-4">
                    Impulsando la <span className="text-purple-light">transparencia académica</span>
                  </h2>
                  
                  <p className="lead text-white opacity-90 mb-0 px-md-4">
                    Brindar a los estudiantes una plataforma confiable e intuitiva que les permita 
                    tomar mejores decisiones académicas mediante información transparente, 
                    reseñas verificadas y acceso a tutorías personalizadas.
                  </p>
                
                  <div className="mission-divider mx-auto mt-5"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* ¿QUÉ NOS HACE DIFERENTES? */}
        <section className="differentiation-section py-8 position-relative overflow-hidden">
          <div className="container">
            <div className="row align-items-center g-5">
              
              {/* Columna Izquierda*/}
              <div className="col-lg-6 animate__animated animate__fadeInLeft">
                <span className="badge bg-purple-soft text-violet-main mb-3 px-3 py-2 round-pill fw-bold">
                  ¿Por qué ProfeMatch?
                </span>
                <h2 className="display-4 fw-bold text-indigo-deep mb-4">
                  Más que una plataforma <br /> 
                  <span className="text-gradient-primary">de reseñas</span>
                </h2>
                
                <div className="row g-3 mt-2">
                  {[
                    "Comparación de docentes",
                    "Reseñas verificadas",
                    "Tutorías privadas",
                    "Perfiles académicos",
                    "Comunidad estudiantil",
                    "Reputación docente digital"
                  ].map((item, index) => (
                    <div className="col-md-6" key={index}>
                      <div className="d-flex align-items-center gap-3 py-2">
                        <div className="check-icon-box shadow-purple-sm">
                          <i className="bi bi-check-lg"></i>
                        </div>
                        <span className="fw-medium text-dark-blue">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Columna Derecha */}
              <div className="col-lg-6 position-relative animate__animated animate__fadeInRight">
                <div className="diff-visual-container">
                  {/* Tarjeta 1  */}
                  <div className="floating-info-card card-1 glass-effect shadow-lg p-4">
                    <div className="icon-circle bg-gradient-primary text-white mb-3">
                      <i className="bi bi-shield-check"></i>
                    </div>
                    <h5 className="fw-bold text-indigo-deep">Seguridad</h5>
                    <p className="small text-muted mb-0">Algoritmos de verificación para evitar spam.</p>
                  </div>

                  {/* Tarjeta 2  */}
                  <div className="floating-info-card card-2 glass-effect shadow-lg p-4">
                    <div className="icon-circle bg-gradient-primary text-white mb-3">
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <h5 className="fw-bold text-indigo-deep">Top 1%</h5>
                    <p className="small text-muted mb-0">Solo los mejores perfiles académicos.</p>
                  </div>

                  <div className="gradient-sphere-light "></div>
                </div>
              </div>

            </div>
          </div>
        </section>
        {/* SECCIÓN 5: EQUIPO DE DESARROLLO */}
        <section className="team-section py-8 bg-light">
          <div className="container">
            <div className="text-center mb-5 animate__animated animate__fadeIn">
              
              <h2 className="display-4 fw-bold text-indigo-deep mb-3">
                Equipo de desarrollo
              </h2>
              <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
                Este proyecto fue desarrollado como parte de una iniciativa académica enfocada en mejorar la experiencia universitaria mediante soluciones tecnológicas innovadoras.
              </p>
            </div>

            <div className="row g-4 justify-content-center">
              {[
                "Candela Escudero, Cristian Efaisto",
                "Contreras Canchapoma, Leticia",
                "Campomanes Vergara, Frank Erick",
                "Mendoza Ariza, Dennis Kevin",
                "Quispe de la Cruz Daniel Omar"
              ].map((nombre, index) => (
                <div className="col-md-6 col-lg-4" key={index}>
                  <div className="team-card p-4 round-xl shadow-sm hover-lift bg-white border-0">
                    <div className="d-flex align-items-center gap-4">
                      <div className="avatar-placeholder shadow-purple-sm">
                        <i className="bi bi-person-fill text-white"></i>
                      </div>
                      <div className="team-info">
                        <h6 className="fw-bold text-indigo-deep mb-1">{nombre}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      <CtaFinal />
    </main>
  );
}
