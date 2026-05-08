import { useState } from "react";
import { Link } from "react-router-dom";
import LoginHero from "../../components/LoginHero";
import heroVideo from "../../images/hero.mp4";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fillForm = (e, p) => {
    setEmail(e);
    setPassword(p);
  };

  return (
    <main className="container-fluid p-0 vh-100 overflow-hidden">
      <div className="row g-0 h-100">
        
         {/* HeERO */}
        <div className="col-lg-6 d-none d-lg-block position-relative p-0">
            <LoginHero 
                video={heroVideo} 
                titulo="Bienvenido a"
                highlight="ProfeMatch"
                subtitulo="La plataforma perfecta para evaluar, recomendar y elegir profesores universitarios."
            />
        </div>


        {/* LADO DERECHO */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center bg-white position-relative">
          
          {/* Botón flotante superior */}
          <div className="position-absolute top-0 end-0 p-4 d-flex align-items-center">
            <span className="small text-muted me-2">¿Aún no eres cliente?</span>
            <button className="btn btn-sm btn-outline-primary rounded-pill">Ver planes</button>
          </div>

          <div className="login-box w-100 p-5" style={{ maxWidth: "500px" }}>
            <div className="text-center mb-4">
              <div className="display-6 mb-2">👤</div>
              <h2 className="fw-bold">Acceso Estudiante</h2>
              <div className="d-flex justify-content-center gap-3 border-bottom pb-2 mt-3 small">
                <span className="fw-bold border-bottom border-primary border-3 pb-2 text-primary">Estudiante</span>
                <span className="text-muted">Profesor</span>
                <span className="text-muted">Administrador</span>
              </div>
            </div>

            <form>
              <div className="mb-3">
                <input 
                  type="email" 
                  className="form-control rounded-pill px-4 py-2" 
                  placeholder="Correo Institucional" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input 
                  type="password" 
                  className="form-control rounded-pill px-4 py-2" 
                  placeholder="Contraseña" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="btn btn-primary w-100 rounded-pill py-2 fw-bold shadow-sm" style={{ background: "var(--gradient-primary)" }}>
                Ingresar como Estudiante
              </button>
            </form>

            {/* CREDENCIALES DEMO */}
            <div className="mt-5 p-4 bg-light rounded-4 border">
              <p className="small fw-bold text-muted mb-3">ℹ️ CREDENCIALES DEMO</p>
              
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="small"><strong>Admin:</strong> admin@profematch.com</div>
                <button className="btn btn-sm btn-white border shadow-sm" onClick={() => fillForm("admin@profematch.com", "admin123")}>Copiar</button>
              </div>
              
              <div className="d-flex justify-content-between align-items-center">
                <div className="small"><strong>Profesor:</strong> prof@profematch.com</div>
                <button className="btn btn-sm btn-white border shadow-sm" onClick={() => fillForm("prof@profematch.com", "prof123")}>Copiar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}