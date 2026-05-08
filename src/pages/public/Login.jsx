import { Link } from "react-router-dom";
import Hero from "../../components/Hero";
import heroVideo from "../../images/hero.mp4";

export default function Login() {
  return (
    <main> 
        <Hero 
            video={heroVideo}
            titulo="Elige al"
            highlight="profesor perfecto"
            subtitulo="Reseñas verificadas y comparativas para tomar las mejores decisiones académicas con ProfeMatch."
        />

        <div style={{ paddingTop: "160px", paddingBottom: "80px" }} className="container d-flex justify-content-center">
            <div className="stat-card p-5 shadow-lg border-0" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="fw-bold text-center mb-4">Iniciar Sesión</h3>
                <form>
                <div className="mb-3">
                    <input type="email" className="form-control rounded-pill px-4" placeholder="Correo Institucional" />
                </div>
                <div className="mb-4">
                    <input type="password" className="form-control rounded-pill px-4" placeholder="Contraseña" />
                </div>
                <button className="btn btn-primary w-100 rounded-pill py-2 border-0 fw-bold mb-3" 
                        style={{ background: "var(--gradient-primary)" }}>
                    Ingresar
                </button>
                <p className="small text-center text-muted">
                    ¿No tienes cuenta? <Link to="/registro" className="text-decoration-none indigo-text fw-bold">Regístrate</Link>
                </p>
                </form>
            </div>
        </div>

    </main> 
  );
}