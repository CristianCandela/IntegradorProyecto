import { Link } from "react-router-dom"; 
import logoHeader from "../images/Logo1.png";

export default function LoginHero({ video, titulo, highlight, subtitulo }) {
  const benefits = [
    { icon: "bi bi-people", title: "Evaluación docente anónima" },
    { icon: "bi bi-bar-chart", title: "Comparativas detalladas" },
    { icon: "bi bi-shield-check", title: "Historial verificado" },
    { icon: "bi bi-chat-left-dots", title: "Feedback constructivo" }
  ];

  return (
    <div className="login-hero-wrapper w-100 h-100 position-relative">
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="hero-video w-100 h-100 object-cover"
        key={video}
      >
        <source src={video} type="video/mp4" />
      </video>
      
      <div className="overlay position-absolute inset-0"></div>

      {/* LOGO */}
      <div className="position-absolute top-0 start-0 p-5" style={{ zIndex: 10 }}>
        <Link to="/" className="d-block transition-hover"> 
          <img 
            src={logoHeader} 
            alt="ProfeMatch Logo" 
            style={{ height: "60px", width: "auto", cursor: "pointer" }} 
          />
        </Link>
      </div>
      
      <div className="login-hero-content text-white p-5 position-relative z-1">
        <h1 className="display-4 fw-bold mt-4">
          {titulo} <span className="highlight">{highlight}</span>
        </h1>
        <p className="lead mt-3 opacity-90" style={{ maxWidth: "500px" }}>
          {subtitulo}
        </p>

        <div className="row g-3 mt-4">
          {benefits.map((b, i) => (
            <div className="col-6" key={i}>
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