
import logoHeader from "../images/Logo1.png";

export default function LoginHero({ video, titulo, highlight, subtitulo }) {
  const benefits = [
    { icon: "bi bi-people", title: "Evaluación docente anónima" },
    { icon: "bi bi-bar-chart", title: "Comparativas detalladas" },
    { icon: "bi bi-shield-check", title: "Historial verificado" },
    { icon: "bi bi-chat-left-dots", title: "Feedback constructivo" }
  ];

  return (
    <div className="login-hero-wrapper w-100">
      <video autoPlay muted loop playsInline className="hero-video" key={video}>
        <source src={video} type="video/mp4" />
      </video>
      <div className="overlay"></div>

      <div className="position-absolute top-0 start-0 p-5" style={{ zIndex: 10 }}>
        <img src={logoHeader} alt="ProfeMatch Logo" style={{ height: "60px", width: "auto" }} />
      </div>
      
      <div className="login-hero-content text-white p-5">
        <h1 className="display-4 fw-bold mt-4">
          {titulo} <span className="highlight">{highlight}</span>
        </h1>
        <p className="lead mt-3 opacity-90" style={{ maxWidth: "500px" }}>
          {subtitulo}
        </p>

        <div className="row g-3 mt-4">
          {benefits.map((b, i) => (
            <div className="col-6" key={i}>
              {/* Nueva clase: benefit-card-glass */}
              <div className="benefit-card-glass p-4">
                <div className="mb-2">
                  <i className={`${b.icon} fs-3 text-white`}></i>
                </div>
                <div className="small fw-bold text-white">{b.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}