import "./Login.css";

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
        <div className="col-lg-6 d-flex align-items-center justify-content-center position-relative px-4">
            {/* Link de registro arriba */}
            <div className="position-absolute top-0 end-0 p-4">
                <span className="text-muted small">¿Eres nuevo?</span>
                <Link to="/registro" className="ms-2 fw-bold text-primary text-decoration-none small hover-link">
                Crea una cuenta
                </Link>
            </div>

            {/* CONTENEDOR */}
            <div className="login-card p-5 shadow-lg rounded-5 bg-white w-100" style={{ maxWidth: "460px", border: "1px solid #f1f5f9" }}>
                <div className="text-center mb-4">
                <div className="icon-badge-top mb-3 shadow-sm">
                    <i className="bi bi-shield-lock-fill text-primary"></i>
                </div>
                <h2 className="fw-bold text-dark">¡Hola de nuevo!</h2>
                <p className="text-muted small">Ingresa a tu cuenta de ProfeMatch</p>
                </div>

                <form className="mb-4">
                
                <div className="input-group mb-3">
                    <span className="input-group-text bg-light border-0 rounded-start-4">
                    <i className="bi bi-envelope text-muted"></i>
                    </span>
                    <input 
                    type="email" 
                    className="form-control bg-light border-0 py-3 rounded-end-4" 
                    placeholder="Correo Institucional"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                <div className="input-group mb-4">
                    <span className="input-group-text bg-light border-0 rounded-start-4">
                    <i className="bi bi-lock text-muted"></i>
                    </span>
                    <input 
                    type="password" 
                    className="form-control bg-light border-0 py-3 rounded-end-4" 
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="d-grid gap-3">
                    <button className="btn btn-auth btn-admin-grad py-3">
                    Acceso Administrador
                    </button>
                    <div className="row g-2">
                    <div className="col-6">
                        <button className="btn btn-auth btn-prof-grad w-100 py-2">Profesor</button>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-auth btn-estu-grad w-100 py-2">Estudiante</button>
                    </div>
                    </div>
                </div>
                </form>

                {/* Sección Demo */}
                <div className="demo-box p-3 rounded-4 bg-light border-0">
                <div className="d-flex align-items-center mb-2 justify-content-center">
                    <span className="extra-small fw-bold text-secondary text-uppercase tracking-wider">Prueba rápida</span>
                </div>
                <div className="d-flex justify-content-center gap-2">
                    <button onClick={() => fillForm("admin@profematch.com", "admin123")} className="btn-tag">Admin</button>
                    <button onClick={() => fillForm("prof@profematch.com", "prof123")} className="btn-tag">Prof</button>
                    <button onClick={() => fillForm("estu@profematch.com", "estu123")} className="btn-tag">Estu</button>
                </div>
                </div>
            </div>
            </div>
      </div>
    </main>
  );
}