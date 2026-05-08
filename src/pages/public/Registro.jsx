import { Link } from "react-router-dom";
import Hero from "../../components/Hero";
import heroVideo from "../../images/hero.mp4";

export default function Registro() {
  return (
    <main> 
            <Hero 
                video={heroVideo}
                titulo="Elige al"
                highlight="profesor perfecto"
                subtitulo="Reseñas verificadas y comparativas para tomar las mejores decisiones académicas con ProfeMatch."
            />
            
        <div style={{ paddingTop: "150px", paddingBottom: "80px" }} className="container d-flex justify-content-center">
            <div className="stat-card p-5 shadow-lg border-0 animate__animated animate__fadeIn" style={{ maxWidth: "500px", width: "100%" }}>
                <h2 className="fw-bold text-center mb-2">Crea tu cuenta</h2>
                <p className="text-muted text-center mb-4">Únete a la comunidad de ProfeMatch</p>
                <form>
                <div className="row g-3">
                    <div className="col-12">
                    <input type="text" className="form-control rounded-pill px-4" placeholder="Nombre completo" />
                    </div>
                    <div className="col-12">
                    <input type="email" className="form-control rounded-pill px-4" placeholder="Correo universitario (@u.edu.pe)" />
                    </div>
                    <div className="col-12">
                    <input type="password" className="form-control rounded-pill px-4" placeholder="Contraseña segura" />
                    </div>
                    <div className="col-12 mt-4">
                    <button className="btn btn-primary w-100 rounded-pill py-2 border-0 fw-bold" 
                            style={{ background: "var(--gradient-primary)" }}>
                        Registrarme ahora
                    </button>
                    </div>
                </div>
                <p className="small text-center text-muted mt-4">
                    ¿Ya tienes cuenta? <Link to="/login" className="text-decoration-none indigo-text fw-bold">Inicia sesión</Link>
                </p>
                </form>
            </div>
        </div>
    </main>
  );
}