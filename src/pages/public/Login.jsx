import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginHero from "../../components/LoginHero";
import heroVideo from "../../images/hero.mp4";
import WhatsappBtn from "../../components/WhatsappBtn";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  const fillForm = (e, p, r) => {
    setEmail(e);
    setPassword(p);
    setRole(r);
  };

  return (
    <main className="container-fluid p-0 vh-100 overflow-hidden">
      <div className="row g-0 h-100">
        <div className="col-lg-6 d-none d-lg-block p-0">
          <LoginHero 
            video={heroVideo} 
            titulo="Bienvenido a" highlight="ProfeMatch"
            subtitulo="La plataforma perfecta para evaluar profesores."
          />
        </div>

        <div className="col-lg-6 d-flex align-items-center justify-content-center position-relative px-4">
          <div className="position-absolute top-0 end-0 p-4">
            <span className="text-muted small">¿Eres nuevo?</span>
            <Link to="/registro" className="ms-2 fw-bold text-decoration-none small hover-link">Crea una cuenta</Link>
          </div>

          <div className="login-card p-5 shadow-lg rounded-5 bg-white w-100" style={{ maxWidth: "460px" }}>
            <div className="text-center mb-4">
              <div className="icon-badge-top mb-3 shadow-sm"><i className="bi bi-shield-lock-fill text-white"></i></div>
              <h2 className="fw-bold text-dark">¡Hola de nuevo!</h2>
              <p className="text-muted small">Ingresando como <strong className="text-indigo text-capitalize">{role}</strong></p>
            </div>

            <form className="mb-4" onSubmit={(e) => e.preventDefault()}>
              {['email', 'password'].map((type) => (
                <div className={`input-group mb-${type === 'email' ? '3' : '4'}`} key={type}>
                  <span className="input-group-text bg-light border-0 rounded-start-4">
                    <i className={`bi bi-${type === 'email' ? 'envelope' : 'lock'} text-muted`}></i>
                  </span>
                  <input 
                    type={type} 
                    className="form-control bg-light border-0 py-3 rounded-end-4" 
                    placeholder={type === 'email' ? `Correo ${role === 'admin' ? 'Admin' : 'Institucional'}` : 'Contraseña'}
                    value={type === 'email' ? email : password}
                    onChange={(e) => type === 'email' ? setEmail(e.target.value) : setPassword(e.target.value)}
                    required
                  />
                </div>
              ))}

              <div className="d-grid gap-3">
                <button type="submit" className={`btn btn-auth py-3 shadow btn-${role}-grad`}>
                  Ingresar como {role}
                </button>
                
                <div className="row g-2">
                  {['admin', 'profesor', 'estudiante'].filter(r => r !== role).map(r => (
                    <div className="col" key={r}>
                      <button type="button" onClick={() => setRole(r)} className="btn w-100 py-2 small hover-effect text-capitalize">
                        Soy {r}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </form>

            <div className="demo-section p-3 rounded-4">
              <div className="text-center mb-2"><span className="demo-label">PRUEBA RÁPIDA</span></div>
              <div className="d-flex justify-content-center gap-2">
                {[['admin', 'admin123', 'admin'], ['prof', 'prof123', 'profesor'], ['estu', 'estu123', 'estudiante']].map(([u, p, r]) => (
                  <button key={r} type="button" onClick={() => fillForm(`${u}@profematch.com`, p, r)} className="btn-tag text-capitalize">{u}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhatsappBtn /> 
    </main>
  );
}